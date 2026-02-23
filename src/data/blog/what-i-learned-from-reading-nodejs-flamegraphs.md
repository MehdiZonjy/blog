---
author: Mehdi Zonjy
pubDatetime: 2019-04-06T02:04:00Z
title: "What I learned from Reading Nodejs FlameGraphs"
slug: what-i-learned-from-reading-nodejs-flamegraphs
featured: false
draft: false
tags:
  - nodejs
  - javascript
  - performance
  - flamegraph
description: "Lessons learned from profiling Node.js applications using flame graphs."
---

awhile ago i run into performance issues with two services at work, and couldn't figure out what was causing the high response time. I had to bring out the big guns and used FlameGraphs to gain a better insight on what are the hot codepaths.

## Getting Started

I followed this [guide written by Brendan Greg](http://www.brendangregg.com/blog/2014-09-17/node-flame-graphs-on-linux.html) on generating flamegraphs using [perf](https://perf.wiki.kernel.org/index.php/Main_Page). I couldn't get perf from linux-tool package to work as the container's host was running a custom kernel version. I had to compile perf from Linux repo and hunt down all the required dependencies. I've included the steps in [this gist](https://gist.github.com/MehdiZonjy/d5f827d14367ccc91984936d5db5782a)

## The sinful JSON.parse(JSON.stringify(..))

![](/blog-images/2020/01/5ca85d8e1c0615001a1eed53-ff0495f86000c789721ff1d1ec140de3-1024x285.png)
![](/blog-images/2020/01/5ca85d8e1c0615001a1eed53-2b4faf93a7e32a8efc4284d3d2a9e5d8-1024x311.png)

Mutations are the source of plenty of bugs in a large enough codebase. One technique to preserve immutability I've been seeing is JSON.parse(JSON.stringify(..)) to create a clone of an object\\\\parameter to prevent mutations from leaking outside a function. The problem with such approach is that JSON.parse and JSON.stringify run on the main thread of nodejs which impacts heavily systems that need to service high throughput.  
  
  
This exact callstack was distributed all over the flamegraph that i generated. After eliminating all of the calls to JSON.parse and JSON.stringify the response time of the service increased drastically.  
  
I do believe that immutability should be a discipline and easy escapes like creating deep-clones should be avoided at all cost. The [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Spread_in_object_literals) offers a fast way of changing objects while preserving immutability 

## Closures, Callback..Where is My Code

![](/blog-images/2020/01/5ca85d8e1c0615001a1eed53-0a27045ff5bd8786ea1e1a9f9dc33436-1024x867.png)

given how nodejs relies heavily on closures and callbacks. Looking at a stackframe might not tell you exactly where a call has originated from.  
This is a callstack made to aws-sdk. Examining the callstack top to bottom won't show any functions from my source code. In such cases it was necessary for me to understand the sourcecode i'm profiling   

## Dafuq GRPC

![](/blog-images/2020/01/5ca85d8e1c0615001a1eed53-3d5c59b89ee4ffabbaf7beed86b4ef01-1024x813.png)
![](/blog-images/2020/01/5ca85d8e1c0615001a1eed53-d50a9a1957fbf7b411bf49837f09a893-1024x486.png)

This one is a mystery to me that i still can't explain. I profiled one service that uses grpc to communicate with an upstream. The services use [bidirectional stream](https://grpc.io/docs/guides/concepts.html#bidirectional-streaming-rpc) to communicate. The flamegraph yielded a surprising result. The graph showed that 30% of the cpu time was being spent in grpc land  
  
  
  
I'm not sure if this is due to the overhead of protobuff deserialization or something else. Comparing the response time after moving the services away from grpc to REST is shocking  

Given what I keep hearing about grpc performance, i'm convinced that i'm missing something here. I just don't know what it is.
