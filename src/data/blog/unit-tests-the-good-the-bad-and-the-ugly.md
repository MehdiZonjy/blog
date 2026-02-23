---
author: Mehdi Zonjy
pubDatetime: 2018-02-04T16:55:00Z
title: "Unit Tests: the Good the Bad and the Ugly"
slug: unit-tests-the-good-the-bad-and-the-ugly
featured: false
draft: false
tags:
  - testing
  - unit-test
description: "Reflections on writing good unit tests and avoiding common pitfalls."
---

Over the past year I've embraced writing unit tests. My attitude towards unit tests has evolved through three stages (so far). The Good the Bad and the Ugly. In this post I wish to summarize my experience, and the lessons I've learned and the challenges so far.

## The Good

In my previous job I was a solo developer most of the time. I used to get a set of requirements for a new product, and push features in a relatively fast pace. At the time I didn't write any automated tests for my code as I deemed them unnecessary. They add an extra overhead and require more time to complete.

After working on few products, I started to notice a certain pattern emerging. I would finish an initial version of product A, and then start working on product B. After completing the first cycle of product B, I would get some feedback and modifications I need to implement in product A. However, in many cases, I would end-up breaking existing functionality. And as I start juggling 3 products or more (developed over 2 years or so) maintenance became a nightmare. Also, coming back to a piece of code that I wrote 1 year ago and trying to figure how a service A is supposed to behave became an issue, even though I usually leave few comments on tricky code as tips for future me (or someone else), but this wasn't always enough.

My 2017 resolution was to always write a Unit Test for every piece of code I add. If I create a file A there will always be  a "A.test" file. Yes this did slow the pace I would finish my tasks, however in the long run it was worth it. The unit tests not only smoothed maintenance, but they served as a form of documentation. By  going through the different test-cases for a function, I'm able to figure out how the function is supposed to behave even without reading the source code.

The way I write my code also changed. Now I have to structure my code in a way the makes it testable, by breaking what would be large service classes into smaller components that can be injected and mocked.

For awhile It seemed like my approach to unit testing was a magical wand that fixed all of the challenges I faced; Alas things are never this simple.

## The Bad

Being a unit test evangelist has gotten me into two issues

1\. Due to the way I was writing my tests (for every file A, there is a file A.test) I ended up shooting myself in the foot and spammed test files everywhere. Not only they require more maintenance, they also crippled my development speed and sometimes, the code was so simple, it didn't need to be tested separately and mocked. I think the tricky part here is defining what a "Unit" is. My current definition was a Unit is a function, or a classes. After doing more research, I came to the conclusion that my definition of a Unit has to change.

A Unit is ......well a Unit. It's up to you how to define it. For example; Given two functions A and B.  A is doing something very simple and it's being called by function B. When writing a unit test, you could consider both ( A and B  as a whole ) one unit, and therefore just test B (you will be testing A as well implicitly). You got to be careful though, you might find yourself venturing into Integration Test realm if you abuse and broaden your "Unit" definition.

2\. I found myself wasting a good amount of time trying to figure out how to test some components in the system ( I'm looking at you controllers, loggers ) . One day I was pairing with a colleague and I asked him let's develop unit tests for a controller, however he voiced his concerns that controllers are not worth testing. At first I was at unease by his feedback, however as I a thought about it it made more sense.

Controllers are supposed to be stupid. They accept request A, unwrap the values and pass them on to some Service. Also  Controllers might return HTML or a framework object that wraps some HTML, in that case E2E tests will add higher value and confidence to the system    

Defining what a Unit is and which part of code are worth unit testing gave me a great confidence in my tests, and the functionality I developed, however something dangerous was lurking in the shadows and I wasn't aware of it. 

## The Ugly

Recently we  started migrating some code to AWS Lambda. We wrote DAO (Data Access Objects) alongside some unit tests. The Unit Tests were mocking AWS DynamoDB SDK and making sure that we are calling the sdk with expected parameters. Although the Unit Tests were passing, the functionality failed UAT (User Acceptance Test), because we weren't calling the sdk properly (missing few flags and settings). The unit tests gave us _**False Confidence.**_

False Confidence is a tricky one as I don't believe there is a rule of thumb to address it. However so far I've been following these strategies

-   In the case of DAO, perhaps It's better to write Integration Tests against an  in-momory DB implementation.
-   A test that is always green is worse than having no test at all, so usually after writing a test I like to go back to the code, make changes that should break the test, and then verify that the test has failed.
-   Phrase the title of test-suite and test-case using business domain terminology (when possible). That way I can make sure I'm testing the right thing. For example, I may have a test-case titled _"It should sum the price of all products in shopping cart and return the total cost"_

## Conclusion

My attitude towards unit testing has been going through rapid evolvement. With each shit I'm able to address more complex issues, I'm much more confident in the software I'm building right now than I was half a year ago. I believe the key here is to identify smelly patterns  as they start to emerge after few iterations, and thinking of different ways to address them.
