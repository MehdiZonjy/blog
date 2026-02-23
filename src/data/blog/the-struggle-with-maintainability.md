---
author: Mehdi Zonjy
pubDatetime: 2018-07-19T17:00:00Z
title: "The Struggle With Maintainability"
slug: the-struggle-with-maintainability
featured: false
draft: false
tags:
  - software-engineering
  - maintainability
description: "Thoughts on the challenges of writing maintainable software."
---

Looking over the past 3-4 years I realize the way I build software hasn't evolved as much as I would hope. I hate to admit this, but I find myself repeating the same mistakes and stumbling  over the same challenges in my projects over and over again. While I have adopted (specially over the past year) cloud computing and different techniques to ensure service availability and better fault tolerance, application code maintenance hasn't improved by much.

I find myself able to push features (relatively) fast, but overtime adding features and fixing bugs exponentially starts taking more time and effort. At somepoint working on the project becomes abhorrent and a nightmare

I recently picked up Domain Design Driven - Tackling Complexities in the Heart of Software by Eric Evans. One statement in the preface clicked with me deeply:

> _I watched one project get out of the gate fast, by delivering a useful, simple Web-based trading system. Developers were flying by the seat of their pants, but this didn't hinder them because simple software can be written with little attention to design. As a result of this initial success, expectations for future development were sky-high. That is when I was asked to work on the second version. When I took a close look, I saw that they lacked a domain model, or even a common language on the project, and were saddled with an unstructured design. The project leaders did not agree with my assessment, and I declined the job. A year later, the team found itself bogged down and unable to deliver a second version. Although their use of technology was not exemplary, it was the business logic that over-came them. Their first release had ossified prematurely into a high-maintenance legacy_

I always thought that domain driven design is about modeling your "domain" classes after your business entities. Which is something I always do by giving my classes names such as  (User, Course, Enrollment, Certificate). According to Greg Young my domain classes are incomplete as they are only nouns and don't contain any verbs (as the whole logic is written in Service classes).

For the next month I'm going to focus more effort into finishing Eric Evans book as well as other resources on this subject and trying to reflect on past projects and how they could have been improved. I'll most likely write another post on this topic once my research is complete
