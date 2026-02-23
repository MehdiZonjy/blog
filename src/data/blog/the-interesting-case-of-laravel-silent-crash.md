---
author: Mehdi Zonjy
pubDatetime: 2016-11-07T15:46:00Z
title: "The Interesting Case Of Laravel Silent Crash"
slug: the-interesting-case-of-laravel-silent-crash
featured: false
draft: false
tags:
  - laravel
  - php
  - debugging
description: "Investigating a mysterious silent crash in Laravel."
---

So I worked on this website at work, where users need to enter a card key they purchased in order to login. In the admin dashboard I needed to add a page where the admin can view each card in the system, and every user that had used each card.

The way I initially implemented this usecase is by paginating the Cards and eager loading�the users associated with each card. It was easy, simple and I managed to get all the data I need in one trip to the Database. It worked fine on my local machine. I can't imagine a card being used by more than 20,50,100 users, so eager loading the users seemed to make sense.......

![](/blog-images/2020/01/7cc-300x225.jpg)

Once I uploaded the changes to the production server it crashed.When requesting the cards page I would get an empty screen; No�response status code, no logs.....Just a blank white page. As if the connection was forcibly closed before the server could return anything.�I rechecked the same code on my local machine and It was working fine. After further investigation on the production server I noticed that only when viewing the first page of cards this error was happening. When viewing the second page of cards or any other patch of cards it worked fine. Something in the data on the live server was causing this bug. Now I was�closer to finding the source of the problem.

When analyzing the data I noticed that one card was used by about 30k users, and that's when it hit me. For few months we run the website for free, and we implemented the free login by automatically logging in the users by using a card that had a large balance. 

No wonder the system crashed when loading a batch of cards (that included the free-login pass card) and the (30k) users associated with that card.

The solution is quite simple, I ended splitting the functionality into two pages, paginating the cards as well as paginating the users associated for each card.

I guess the moral of the story is regardless of how you think an edge case is rare and unlikely to happen, it doesn't mean it won't happen. You should build your code with such cases in mind otherwise at some point those rare cases will come around and bite you.
