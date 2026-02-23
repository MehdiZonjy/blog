---
author: Mehdi Zonjy
pubDatetime: 2016-12-14T16:37:00Z
title: "Generate Article Short Description"
slug: generate-article-short-description
featured: false
draft: false
tags:
  - algorithms
  - javascript
  - nodejs
description: "Generating short descriptions for articles programmatically."
---

Hello internet people, it's been awhile since I shared something with you.

I came across an interesting usecase awhile ago and I think it's worth sharing. Let's say you are building a blog, and you need to display on the home page an excerpts foreach of the most recent articles (blog teaser). In a nutshell you have an article and you need an algorithm to generate a short description (excerpt) for it,

I can think of few approaches to tackle this problem:

## 1\. Display the first X Chars

This is the easiest solution and it's quite easy, you just do a substring and use the first X chars (let's say 400) and you are done.JavaScript

```
const description  = article.substring(0,400);
```

The good side is it's quick, it's fast and straightforward. Alas good solutions are never this obvious, so let's see what's wrong with this approach.

1.  since most likely your article is in HTML format, by doing a substring you will probably end up with broken html tags. You could cut HTML tags before they are closed. for exampleMarkup`<h1> Hello World </h1>` for simplicity let's say you will generate the description by using the first 8 letters, this means you will end up with badly formatted H1 tag as followsMarkup`<h1> Hell`and this leads us to the second issue
2.  Cutting words before they are finished, the "Hello" turned into "Hell"

## 2\. Escape HTML Tags Then Use Regular Expression

This is an improvement over the first approach. In order to make sure you never end up with badly formatted HTML tags and cut off words, you can do the following:

1.  Escape HTML tags
2.  Use Regular Expression instead of substring to generate the article description

I prefer to use a simple RegX that says something like give me the first 200 words.JavaScript

```
const striptags = require('striptags');//<-- npm module that strips html tags
const cleanAtricle = striptags(article);
const description = cleanArticle.match(/(\\S+\\s?){1,200}/)
```

  Much better than the previous approach, wouldn't you agree?

Now the only down side I can think of is this: Our "<br>" are now gone. What if our article had an "<img>" in the beginning. What if we had "ol","li","a" and all of those tags that we might want to show in the short description. Now they are all gone. You can white list those tags so they don't get stripped, but when you  do the regx step you will endup with broken tags.

Ofcourse you can come up with some super badass Regx that makes sure all selected tags are closed but that would be a kind of complicated.

## 3\. Select A Subset Of The DOM

Now bare with me for a second. What if you didn't strip any HTML tags in the first place, but instead you used the article's DOM to generate the article description. In other words you can parse the article in some JQuery like library that can manage the article's DOM and allows you traverse through it. Than you can select a subset of the article's DOM tree that has 400 chars .

I think it's better to explain this in code rather than words. I'll be using a JQuery like library called [Cheerio](https://github.com/cheeriojs/cheerio) that's runs on the server.JavaScript

```
//you can get cheerio form npm
const cheerio= require('cheerio');

function generateShortDescription(article,descriptionLength = 400){

    //first parse article's DOM in Cheerio 
    const $ = cheerio.load(article);

    //get all the first level tags in the DOM tree
    const parentTags=$.root().children();

    //will hold the description text stripped of any html tags
    let descriptionText='';

    //will hold the description including the html tags
    let descriptionHTML='';

    //iterate over the first level tags in the DOM tree
    for(let i=0,l=parentTags.length;i<l;i++){

       //append the stripped HTML tag's text
       shortText+=$(parentTags.get(i)).text();

       //append the tag including it's HTML
       shortHtml+=$(parentTags.get(i)).toString();

       //once we have descriptionLength chars of text then stop 
       if(shortText.length>descriptionLength)
          break;
    }
    return descriptionHTML;
}
```

For example: We want to generate a description of length 40 for the following HTMLMarkup

```
<h1> Hello world </h1>
<p> some paragraph </p>
<ol>
  <li>one</li>
  <li>two</li>
  <li>three</li>
  <li>four</li>
</ol>
<p>
some loooooooooooong paragraph that won't be included in the article short description
</p>
```

Only the last "p" tag won't be included in the description. Also the description length is alittle more than 40 chars, because the "ol" tag is going to be included and all of its sub "li" tags.

There is a gatcha in this approach and you may have noticied it. What if the whole article was wrapped inside a single tag like thisMarkup

```
<div>
some long article should go here.....
</div>
```

Then the description is going to include the entire article.

Also this is probably going to be slow to execute, so you may want to store the article's description in the DB or cache it.

_note:_ I'm certain there are JQuery like libraries for other environments beside Node, a quick search should reveal some.

## Summery:

Those are the the three approaches I can think of. For me personally I'm using the third method (Cheerio) for my blog as it fits my usecase. If you have a better solution please let me know ( I might implement it for this blog :P ). I think depending on your use case you should pick the approach that suits you.

happy coding.
