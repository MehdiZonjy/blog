---
author: Mehdi Zonjy
pubDatetime: 2018-08-22T17:01:00Z
title: "Know Thy Domain"
slug: know-thy-domain
featured: false
draft: false
tags:
  - domain-driven-design
  - software-engineering
description: "The importance of understanding your domain when building software."
---

Whenever I switch jobs or change teams, I find myself spending all of my time learning the new technology stack and all the fancy tooling that are being used in my new workplace.

I've been reading more of the [Domain Driven Design book by Eric Evans](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215) and one particular paragraph stuck with me as it made me reflect on my attitude towards software engineering in general.

> The heart of software is its ability to solve domain-related problems for its user. All other features, vital though they may be, support this basic purpose. When the domain is complex, this is a difficult task, calling for the concentrated effort of talented and skilled people. Developers have to steep themselves in the domain to build up knowledge of the business. They must hone their modeling skills and master domain design.
> 
> Yet these are not the priorities on most software projects. Most talented developers do not have much interest in learning about the specific domain in which they are working, much less making a major commitment to expand their domain-modeling skills. Technical people enjoy quantifiable problems that exercise their technical skills. Domain work is messy and demands a lot of complicated new knowledge that doesn't seem to add to a computer scientist's capabilities..
> 
> Instead, the technical talent goes to work on elaborate frame-works, trying to solve domain problems with technology. Learning about and modeling the domain is left to others. Complexity in the heart of software has to be tackled head-on. To do otherwise is to risk irrelevance.

I am guilty of this behavior myself. Often when kicking off discussions regarding a new project, my mind drifts-off searching for the best and fanciest technologies that can accomplish the job.

While I do ask questions to understand the requirements and get clarity on what I'm going to build, I don't think that's enough. In retrospective I should start spending more time and effort studying the domain I'm dealing with. My current interpretation is too broad to what that means and will evolve overtime:

-   Do research on the domain, whether it's eLearning, VOD, Fintech..... That doesn't mean I should turn to an expert in the domain (I don't intend to be an accountant), as that's unrealistic, but I should know enough to explain to someone over a lunch discussion what i do and how the software I build models the realworld. I reckon This should also help me communicate better with PM\\\\PO. 
-   Sometimes users don't know what they want, and unless I know enough about the domain, I won't be able to ask the right questions to get a better understanding of the problem that the software I'm building is supposed to solve. I remember back when i got my first freelance job, I was asked to build a certain feature. After delivering that feature and having further discussions with the client, it turned out "it's not exactly what he wanted" and it's not useful to him at all. Had I knew back then enough about his domain, and the real-world problem he was trying to solve, I would have been able to ask the correct questions to get a better clarity and build a useful software 

In the current organization where I work. We ask people that we interview to work on a simple coding assignment. Looking back over the past year, I realize that almost all of the people we hired are those who understood the problem well, and knew exactly what they were asked to build. Therefore, they were able to take into consideration all the invalid input and scenarios that could crash their program, even though no-one had told them about those edgecases.

Right now i'm torn between being Domain-Driven and Tech-Driven. While on one hand I do love technologies and learning about what's new, the software I build would be absolutely rubbish and  useless if it isn't useful to users and can't model and abstract the real world domain properly. I'm not sure where the middle ground is, and that perhaps is an area I need to grow in.
