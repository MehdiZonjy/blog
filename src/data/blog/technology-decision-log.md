---
author: Mehdi Zonjy
pubDatetime: 2024-10-10T18:53:57Z
title: "Technology Decision Log"
slug: technology-decision-log
featured: false
draft: false
tags:
  - software-engineering
description: "Keeping a technology decision log for better engineering decisions."
---

### Introduction

The company I worked at recently shut down. I worked there for over four and a half years, and I was involved in many of the decisions that influenced the engineering organization's technology choices. Some of those decisions paid great dividends down the line, and some did not. I found myself thinking: If I were to join a new organization, would I make the same bets, or what would I change?

### Disclaimer

This is purely my subjective opinion. Every organization's context is different. Understanding that context and the long term vision is crucial to making sound decisions.

### Decision Log

Choice

Decision

Notes

AWS

Good

To name a few benefits: AWS allowed us to scale dynamically to the business growth and demands. It was a cornerstone of our DevOps culture and kept our infrastructure teams lean. AWS was responsible for 2-3 incidents that crippled the business which is impressive for the duration we used them. I would stay out of us-east-1, however.

Fargate

Good

We run most of the production systems on Fargate. Fargate enabled us to delegate most of maintenance work to AWS (ec2 batching, upgrades,..etc) and have the SREs focus on other value-enabling streams.

Kubernetes

Bad

There are legitimate use-cases for k8s. However I believe that most of the organizations that think they need k8s, don't need it. Supporting k8s platform would have required massive bandwidth from the infrastructure teams for the ongoing maintenance and KTLO. Public Cloud providers have solutions that work for most organizations unless there is a business need that demands k8s.

Postgres

Good

We run one of the biggest transactional DBs I've ever worked with in my career (~10TB-14TB). It was a solid choice, and I'd definitely use it again

Aurora

Bad

Expensive!! We were able to scale well with vanilla Postgres high throughput (read and write) systems.

Redis

Good

Great In-memory database and cache. Never use it as your main db however (well...never say never)

Elasticcache

Bad

Expensive! Most of the usecases we had didn't really need ElasticSearch. If I ever needed a full-text-search or realtime metrics analytics then ES is a great tool for that.

SNS, SQS, Eventbus

Good

They are reliable and reasonably easy to setup.

Kinesis

Bad

Too expensive if all you need is a regular message bus, try SNS, SQS, Eventbus first. There are legitimate usecases for Kinesis and Firehose and those are strong products in their respective areas

Dynamodb

Bad

It is ok for a simple key-value storage. However, for the love of god, don't use it to hammer every nail. It struggles to adapt to changing business requirements and can get expensive real quick if you aren't careful.

Cloudfront

Good

While it doesn't have as many features as Akami and Cloudflare,it does integrate well with AWS and can do some powerful routing when combined with Lambdas.

AWS WAF

Good

After launching WAF, we started blocking one third of production traffic outside ofbusiness hours. Overall easy to use with AWS Firewall Manager to ensure WAF protection is enabled for every endpoint in your environment. The AWS-managed rules worked well..

ACM

Good

Setting up SSL certificates has never been easier.

VPC Lattice

Good

For connecting applications across multiple VPCs, I highly recommmend VPC Lattice for most usecases.

VPC Private Endpoint

Good

Perfect for connecting to datastores across multiple VPCs

VPC Peering

Bad

It's been offset by a few product launches over the past few years (Transit Gateway, Lattice, Private Endpoints)

VPC Transit Gateway

Bad

Try Lattice and Private Endpoints first.

Terraform

Good

This was one of the best bets we made. We started using Terraform to manage AWS infrastructure, but eventually expanded to Github, Launchdarkly, Datadog and configuration management in many providers.

Cloudformation

Bad

Unreliable, unreadable and limited to AWS

Serverless Lambda Apps

Bad

Lambda is excellent for building custom integrations between AWS services and small one-off scripts. However, as with Dynamodb, things get ugly when you hammer every nail with a lambda function. Building complex business application workflows on Lambda will give you a handicap. It gets expensive, complicated, and challenging to maintain really quickly.

CDK

Bad

Infrastucture and configuration management should be easy and simple. CDK stacks can sometime get complicated and allow engineers to shoot themselves in the foot by building infrastructure configuration that are as complicated as the business logic itself

Terraform Cloud (TFC)

Bad

It's a glorified and expensive Terraform CICD. Overtime, it became too expensive. Their new pricing model that charges you by the number of resources is absolutely insane, and they know it. It also leads to having two cicd platforms (infra cicd and services cicd) which isn't ideal and too much cognitive load. You could replace it with Terraform Cli + S3 backend + Your regular CICD platform

Terraform Sentinel

Bad

I'm all for compliance as policy. However, Sentinel is coupled with TFC. Nowadays, You can replace it with [OpenPolicyAgent](https://www.notion.so/mzmuse/Terraform-Sentinel-31050236c68b4bfeadd21e4646baaf19?pvs=4)

Python

Good

Given Python's popularity, hiring Python engineers is easy. Many of the vendors on this list treat it as a first-class citizen with support at first launch.

Ruby

Undecided

Many of the engineers we hired had to learn Ruby on Day 1. Given how opinionated the Rails ecosystem is, this meant that engineers would often run into some friction for the first few weeks. In addition, many of the vendors we worked with didn't support Ruby on the same level as Python or Java. That being said, in the hands of capable engineers familiar with how Ruby (and especially Rails) operates, it is a performant solution that can accelerate development velocity/.

Github

Good

While GH is great, Gitlab is a really good alternative. It offers full devops package inlcuding cicd, sast, test coverage,�etc and would be a better choice. However, Github Copilot is uncontested

Buildkite

Bad

At the time (2020), it was the best solution in the market for hybrid CICD platforms. You host the compute and Buildkite hosts the control plane. BK is a great vendor and I greatly respect what they built. As of 2024, GH Action added support for self-hosted agents and their library of GH Actions is uncontested.

Github Actions

Good

Great community support and massive library of ready-to-use actions. They have added self-hosted agents in recent years. Their great integration with Github platform is a huge plus

Artifactory

Good

There are good alternatives depending on which languages you need to support (GIthub Packages, AWS CodeArtifact). Unfortunately, neither supports both Ruby and Python.

Opsgenie

Bad

I can�t remember the last time Opsgenie released anything new that I was excited about. I�d go for PagerDuty instead or DD Incident Management tool. I wouldn't be surprised if Datadog expanded their catalogue to provide both incident managenet (currently supported) and oncall (not supported yet) functionality 

Datadog

Good

It is expensive but it is the best in the market. It is no longer just a monitoring tool but rather a platform that ingest most of the engineering operations telemetries with best in the market integrations. Datadog was one of the most innovative vendors we worked with

Honeybadger

Bad

Good errors tracker, but in the spirit of consolidating vendors, DD can replace it

Splunk

Bad

I have nothing nice to say about them: bad support, bad product, bad company and rotten sales department.

Trivy

Good

Great tool for enforcing terraform and infrastructure best practices

Snyk

Bad

it does the job, but it lacks some core functionality like native github integration (work inprogress). DD can replace it and there are free open source tools that would work well for small companies 

LogRocket

Bad

Not a bad product; but DD has replaced it

Swagger Hub

Bad

Fewer features than Postman

Postman

Good

It can be expensive but it is a good product overall.

OpenVPN

Undecided

It gets the job done and is reliable. The free version however is �not enterprisey� enough. Another alternative that i never explored myself but was recommended to me is [https://tailscale.com/pricing](https://tailscale.com/pricing)

LaunchDarkly

Good

We introduced it too late but I had positive experience overall. Great Terraform support

Sophos EDR

Bad

Having seen what Defender offers, it is difficult to consider Sophos ever again

Slack

Good

I love the integrations and level of customization Slack provides.

Jira

Good

It is bulky, it is slow but it is customizable. We used it to track incidents postmortem analysis, services, teams and all sorts of metadata.

Confluence

Good

I love what Confluence provides. However, knowledge management at scale is challenging for every product and organization. As years go by, the knowledge keeps growing, and it takes hard and deliberate effort to maintain it (remove irrelevant pages, organize content, simplify knowledge discovery, etc.). I'm not aware of a product in the market that has solved these problems yet but I am hopeful that someone will finally crack them.

Zoom

Good

Overall, it is stable and reliable, and Zoom keeps innovating. The meeting summary feature has so much potential.

EntraID

Good

I would not want to manage on-prem Active Directory. It is an enterprise-grade identity provider. It can be complicated to manage, but overall, the positives outweigh the negatives.

Microsoft Defender

Good

One of the best products out there. Defender can ingest signals from many systems with minimal configuration and provide full end-to-end security monitoring. It is expensive, but I think it is worth every penny.

Exchange Online

Good

Reasonably reliable (With the exception of when your email gets quarantined and it is not very clear why it got flagged). When combined with the Microsoft entire eco-system you get an enterprise grade package (DLPs, Compliance, Security,..etc).

Auth0

Good

Identity management is challenging, and Auth0 provides an initial boost to help you get started. However, as the company's requirements evolved, we had to build additional internal abstractions on top of Auth0.

Meraki

Good

Reliable hardware, cloudbased and easy to setup and maintain.

Arbua

Bad

Given a redo chance, sticking with one vendor such as Meraki would be prime

Rapid7

Bad

Their product is more geared towards on-prem enterprises. We had few bad experiences with their CSOC. I'd like to give CrowdStrike a shot.

New Relic

Bad

My experience is based on an older pricing model they changed four years ago. That being said, Datadog's platform offers more features beyond observability platform (Khajiit has wares if you got the coins)
