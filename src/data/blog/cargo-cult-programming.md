---
author: Mehdi Zonjy
pubDatetime: 2019-03-05T17:03:00Z
title: "Cargo Cult Programming"
slug: cargo-cult-programming
featured: false
draft: false
tags:
  - software-engineering
description: "On the dangers of cargo cult programming and how to avoid it."
---

> _A style of  computer programming characterized by the ritual inclusion of code or program structures that serve no real purpose. Cargo cult programming is typically symptomatic of a programmer not understanding either a bug they were attempting to solve or the apparent solution. Cargo cult programming can also refer to the practice of applying a design pattern or coding style blindly without understanding the reasons behind that design principle._

  
Recently I've been learning Kubernetes from a course I bought on Udemy. After spending a couple of hours, i realized all what the instructor is doing, is showing me various commands and how to execute them using kubectl. Even though I had already invested couple of hours into this course I still had along trail of questions related to fundamental concepts; What is a Pod? are Services a physical thing, or just an abstraction of rules defined in IPTables....and many more questions.

while I appreciate how platforms such as udemy made information available and accessible for many, I feel the kind of content being distributed is dangerous (specially when it's consumed by someone who is just starting on their career). Many courses that i bought over the years turned out to be as bad as the k8s one. They are passing superficial techniques without building solid understanding of the concepts that empower them. 

I don't mean to bash on Udemy (i'm just using it as an example) as this is a problem that's bigger than any platform. I think it's a requirement for engineers to have an indepth understanding that goes beyond basic commands and techniques; To settle otherwise is an acceptable.

Not knowing how things work (and the absence of curiosity to pursue that knowledge) could lead to invalid decisions that accelerate the rate at which tech-dept accumulate, eventually crippling and slowing software development.

Doing the right thing is often difficult and exhausting. For example:

-   When a process crashes due to OOM, It much easier to throw enough RAM at the process, until the problem is less noticeable VS going through the heapdump  to understand the root-cause (if there is a memory leak).
-   If DB is unable to handle production traffic load, using higher specs to host the db (although that will lead to higher running costs) is easier than going through the queries and trying to better understand how they are executed and optimize them.

Software engineering is mentally exhausting, difficult and sometimes it can be frustrating, however it is rewarding. Nothing beats that satisfaction you get after spending time on a difficult problem, and finally you crack it. I live for and cherish those moments <3
