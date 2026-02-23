---
author: Mehdi Zonjy
pubDatetime: 2016-11-06T05:20:00Z
title: "Jawaker Cards Counter"
slug: jawaker-cards-counter
featured: false
draft: false
tags:
  - chrome-extension
  - javascript
description: "Building a Chrome extension to count cards in the Jawaker card game."
---

So I get back from work looking forward to playing something relaxing. Why not some card games? So I log into [Jawaker](https://www.jawaker.com/) (a famous website the provides plenty of card games that you can play with your friends or random people). I pick a card game called Trix ( I won't go into the details of the game as that's out of the scope of this post, but just keep in mind it's tremendously helpful if you can count cards).

1st game I get my ass handed to me; 2nd game I get the worst cards I've ever seen; 3rd game my vision started to get bleak and blood started to boil in my head (so much for having relaxing fun); 4th game, some screw gets loose in my brain and I flip into rage mood.

![](/blog-images/2020/01/desk_flip-2-300x271.jpg)

Most people will probably leave some pleasant comments in the chat then rage quit, but not me. It was personal. I had to cheat my way through this game. 

I wanted to build some tool that can help me count cards. it should figure out which cards haven't been played yet, and which have already been played. 

### Introducing Jwaker Cards Counter

Using the chrome developer tools and JQuery I was able to track exactly which div held the face-up cards in the round. 

  
I knew that Chrome extensions allows me to inject JavaScript into the page, so it's the perfect tool for the task at hand. I can use them to inject a JavaScript code that can count cards in each round. I knew nothing about how to build Chrome extension, so I guess I can always say, that i built a Chrome extension for the pursuit  of knowledge and not for cheating .

The idea is very simple. There are two scripts involved:

1.  **(cards-counter.js)** A script that is injected into the page. It handles counting every played card and when a new game starts, it resets itself. Via Chrome extension events system, it can handle custom events such as what cards have been played and return an array of already played cards .
2.  **(popup.js)** Another script that  runs in the extension popup window. It queries the cards-counter.js script via Chrome extension events system to get information such as.
    -   **getCards**: Which cards have been played
    -   **clearCards:** The cards the player is holding in his hand
    -   **clearCards**: Reset cards counter
    -   **remove:** Detach Script from window

### Demo

I created a simple demo demonstrating how to use the extension (sorry about the quality, but my potato internet connection can't handle large sizes).

https://www.youtube.com/watch?v=kJs2JU5KlRI

### How To Get It

you can get the extension by two means:

#### 1\. Packed extension file (crx)

you can download the extension package file I already created and add it to chrome from [Here](https://goo.gl/zTGNsf).

adding the extension should be pretty easy, just type "chrome://extensions/" in the Url bar then drag and drop the extension file 

#### 2\. Build sources

The sources are available on Github over [Here](https://github.com/MehdiZonjy/jawaker-cards-counter). To build the sources just run the following in your terminal/command-line

first we need to install the required dependencies so run

```
npm run install
```

once done, we need to create script bundle via Webpack. I've already added an npm script for that so just run

```
npm run build
```

You should now have a "dist" directory containing scripts bundles, now we need to add the unpacked extension files to chrome. Type "chrome://extensions" in the Url bar, then click "Load unpacked extension" button and choose the directory containing the source code and that's it. More details can be found over [Here](https://developer.chrome.com/extensions/getstarted#unpacked)  

What's Next

Now that I figured out how to tell which cards have been played yet, and which cards I have in hand, I'd like to take this to the next level. I want to build a bot that can play Trix. It won't be an easy task, but It will be fun for sure.  

### Final Words

In all seriousness, I built this extension for educational purposes. It's not my intention to harm Jawaker in any shape or form. I played on Jawaker almost weekly and I don't use this extension. Cheating takes the fun out of a game.

### Downloads:

-   [Packed extension](https://goo.gl/zTGNsf)
-   [GitHub Sources](https://github.com/MehdiZonjy/jawaker-cards-counter)
