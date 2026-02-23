---
author: Mehdi Zonjy
pubDatetime: 2016-12-18T16:41:00Z
title: "A Quick Guide To SEO"
slug: a-quick-guide-to-seo
featured: false
draft: false
tags:
  - seo
  - web
description: "A practical guide to Search Engine Optimization."
---

The following are simple steps you can take to make your website visible to search engines. They are easier to implement than you think.

### 1\. Title

A meaningful title helps search engines to index your page properly. The Title shows up in the search results screen. It should go inside the <head> tag.

It can be auto generated from the content of your page

-   in case of a blog this can be the title of your article
-   in case of a news website([BBC](https://www.bbc.com/news)), it can be the news headline
-   in case of a Q&A website ([StackOverFlow](https://stackoverflow.com/)) it's the title of a question
-   in case of a code repository ([GitHub](https://github.com/)) it's the repository name. 

Markup

```
<title>Enter some click-bait here :) </title>
```

### 2. Keywords

Keywords should describe the key topics in the page. It goes inside the <head> tag. For example, in a page talking about using Node.JS to build a REST api  the keywords could  be:Markup

```
<meta name="keywords" content="JavaScript,Node.JS,REST-API">
```

You can auto-generate the keywords field by using the most used words in your page content, or you can manually add them.

### 3\. Description

Description should describe briefly what the page is all about. Try to keep it minimum (max 160 chars). Description shows up to the user in the search results screen, so you might want to choose it wisely. It goes inside the <head> tag and it looks something like thisMarkup

```
<meta name="description" content="This  page is meaningless, I have no idea why you want to visit it, or why it showed up in the search results"/>
```

####  Important:

Honestly, I'm a little bit confused. I've seen cases where content oriented websites have completely ditched Description and Keywords all together such as ([Wikipedia](https://en.wikipedia.org/wiki/C_Sharp_\(programming_language\))). Also some sites seem to include only Description ([BBC](https://www.bbc.com/news/science-environment-38324177)). Search engines are quite smart and they can generate proper description and keywords when none are provided. If you know more about this please let me know. I'm planning to make an experiment for a month and disable keywords and descriptions on blog pages on my website and monitor the results.  

### 4\. Friendly URLs

In short, Instead of showing some awful long Id in the url such as "[http://mysite.com/blog/abc30-def92-acd11](http://mysite.com/blog/abc30-def92-acd11)". You should use a meaningful and readably approach such "[http://mysite.com/blog/how-to-make-pie](http://mysite.com/blog/how-to-make-pie)". You can implement this in either two approaches

-   Enter it manually and store in the database  :P
-   Use the same content as the Title  after stripping all the  non alphanumeric chars. For example: 

```
const title="Look, I've found a Treasure!!";
const friendlyUrl = encodeURIComponent(title.replace(/\\W+/g, "-"))
```

### 5\. Social Medias

The more external links there are to your page the better. Sharing a page on social medias will not only give you more external links, but it will provide you with better exposure. Adding  Social Media Share buttons is easier than you might think. I'm personally using [AddToAny](https://www.addtoany.com/). Just customize the look of the share buttons there and embed the script in your page 

### 6\. Google Webmaster

This is probably **the most important tip**. Once you create a new website there won't be any external links that lead to it, so how on earth is it going to be indexed by Google. It turns out to be quite simple. Google has a service called [WebMasters](https://www.google.com/webmasters) where you can add your website to be indexed. You can view search related analytics there as well,  such as what search words lead to your website. They also notify you of any problems related to indexing your website. 

**note:** You have to prove that you own the domain before adding it to webmasters. The simplest way is to add [GoogleAnalytics](https://analytics.google.com/) to your web page. GoogleAnalytics should be added from the same account that you wish to use in WebMasters. 

### 7\. Mobile Friendly 

Have you ever visited a website on your mobile and it kept opening ad-popups on every click event you make. Please don't do that as Google will butcher your SEO ranking. Also making your website design mobile friendly and responsive is a great+ not only for your users but also for SEO.   

### 8\. Disqus

This is an extra as it will add more external links to your website. [Disqus](https://disqus.com/) is a forum like service that provides you with a comment section that you can embed in your pages (or maybe add it as a Guests Book). It provides you with a way to allow your users to leave comments on sections of your website, and those comments still show up in Disqus as well as links that lead back to your page. It's free and easy to setup. For more information you can check out [their website.](https://disqus.com/) 

## Summery:

Those are the steps that I'm using for my blog. If i got something wrong, or if you have some extra tips for me, please let me know. As I mentioned above I find the absense of Keywords and Descriptions on some website a bit confusing. If you know more about this feel free to leave a comment below.
