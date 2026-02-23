---
author: Mehdi Zonjy
pubDatetime: 2019-12-22T18:37:00Z
title: "JVM Performance Tools"
slug: jvm-performance-tools
featured: false
draft: false
tags:
  - java
  - jvm
  - performance
  - flamegraph
description: "A survey of tools for analyzing JVM performance."
---

Over the past few months i got the opportunity to run an enterprise JVM webapp in production. A Weekly deployment schedule made tackling production performance issues and outages  challenging as CD wasn't an option. I needed to find ways to debug a production instance without taking it down, or making any code changes.

[Java Performance: The Definitive Guide](https://www.amazon.ca/Java-Performance-Definitive-Guide-Getting/dp/1449358454) has been tremendously valuable in helping me understand how JVM works. In this post I'd like to list few tools and techniques i learned from the book, as well as few scripts i wrote in the process.

**Note:** there are no shortcuts to understanding your systems. You need to invest in Observability (Traces, Metrics, Logs). The following are extra tools to keep under your belt and i hope they will aid you in some tasks.

## 1. GC Activity

Usually you should pull this data from your APM (if you don't have one, then consider investing and building a case for one). But in-case you don't have an access to an APM, JDK ships with the cli _jstat_ that will give you some insights on how GC is performing.

This is helpful when you notice a _very high CPU utilization_ and the webapp appears _unresponsive_ or _extremely slow_. Those are usually signs of memory exhaustion (unless your webapp is compute heavy and high CPU utilisation is common)

```
jstat -gcutil <pid> <interval in ms>
```

-   pid: jvm process id. can be acquired by running \`jcmd\`.

This will present you with an output similar to this: 

![](/blog-images/2020/01/5dfe2b84023059001a1697e9-36595ff8617e31313008eeb40b3a5ac8-1024x89.png)

-   S0: Survivor space 0 utilization as a percentage of the space's current capacity.
-   S1: Survivor space 1 utilization as a percentage of the space's current capacity.
-   E: Eden space utilization as a percentage of the space's current capacity.
-   O: Old space utilization as a percentage of the space's current capacity.
-   M: Metaspace utilization as a percentage of the space's current capacity.
-   CCS: Compressed class space utilization as a percentage.
-   YGC: Number of young generation GC events.
-   YGCT: Young generation garbage collection time.
-   FGC: Number of full GC events.
-   FGCT: Full garbage collection time.
-   GCT: Total garbage collection time.

**Note**: In my production environment (jdk 8) S0 is always 0 and S1 is always 100. [This discussion](https://discuss.elastic.co/t/gc-s1-always-used-100-never-less-than-100/111076/4) mentions that there may be  incompatibility between G1GC and jstat  

### How To Interpret The Result

 Keep an eye on how frequently FGC keeps increasing. if the frequency is high (once every few seconds; or less) then you might be dealing with a memory exhaustion problem.

## 2 Memory Histogram

So you have established that GC activity is high, and you are wondering what sort of objects are loaded into the heap. While taking a full heap dump for further analysis is quite effective; it can be slow and dangerous to perform when the system is unstable. _jcmd_ allows us to generate a histogram of all the objects loaded in memory.

```
jcmd <pid> GC.class_histogram
```

The output contains a list of all objects loaded into the heap (in descending order), and the count of instances per object size as well as size in bytes.

**Note**: From what I've observed, it's common for Strings and Bytes to show up in 1st and 2nd places in the class histogram

### How To Interpret The Result

If you notice an abnormality (a very high number of instances for a particular class). You could then try to tie back these objects to what user flows that might interact with them. This is a good opportunity to checkout the **Traces** (if you don't have them, add them. Tracing will drastically improve your debugging experience). Perhaps some bad code changes were deployed that impacted some part of the app (causing it to load large number of objects into memory).

It's helpful to capture multiple class histograms, and then calculate deltas between them to determine which classes are constantly causing high allocations.

I wrote a [script](https://github.com/MehdiZonjy/jvm-performance-tools/blob/master/class-historgram-sampler.sh) that captures multiple class histograms at a requested interval. The results can be then analyzed with [jcha](https://github.com/trivago/jcha) 

## 3 Thread Dump

If you want to know what does the call stack for each thread in the jvm process at a given moment looks like, it's possible to use _jcmd_ to capture the callstack for each thread. This is helpful when:

-   GC utilization is high, and you want to know which code paths might be the culprits. There is a good chance (not always) that Thread Dump might contain some clues.
-   Webapp is slow or unresponsive but GC and CPU utilization is low; In such a case the process might be spending too much time on blocking synchronous IO operations (calling another service, reading from disk...). a thread dump can tell you which lines of code are making the IO requests.

```
jcmd <pid> Thread.print
```

### How To Interpret The Result

Take a look at the threads in the running state. Pay attention to any threads that are consistently stuck in IO land (Http Calls, DB Queries, Disk ....). if you are experiencing high gc activity, the thread dump may tell you which threads are loading too many objects into memory (this may require abit of  understanding of the code).

a better way to visualize the thread dumps is [fastthread.io](http://fastthread.io/). Once you feed it multiple samples it can help you visualize the state of each thread and generate flamegraphs as well. I wrote a [script](https://github.com/MehdiZonjy/jvm-performance-tools/blob/master/thread-dump-sampler.sh) that captures multiple thread dumps and outputs an archive file that can be uploaded to fastthread for analysis 

## Summary

JDK ships with few tools that are great for debugging production instances. Also consider investing more effort at improving your platform observability. Strive to always know the Root Cause of your IRs.
