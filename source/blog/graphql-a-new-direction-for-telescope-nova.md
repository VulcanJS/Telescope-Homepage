---
title: 'GraphQL: A New Direction For Telescope Nova'
published: true
author: sacha
date: 2016/12/22
---

A year ago, Telescope was at a crossroads: I felt like the codebase's technical debt was piling on, and I was having strong doubts about the project's future.

I briefly considered quitting altogether, but instead I decided to take a clean break with the past, and start fresh on a React-based version of Telescope, codenamed **Nova**. 

READMORE

Looking back one year later, I think embracing the React exosystem was the right decision. What's more, I've been joined on the core team by [Xavier Cazalot](https://github.com/xavcz/), and together we've been working hard on porting Nova to [GraphQL](http://graphql.org).

### Introducing GraphQL

Like React, GraphQL is an open-source technology first developed and used by Facebook. In a nutshell, it's a specification for a new way of transmitting data between the server and client, and many people are predicting it will soon replace REST. 

But beyond the merits of GraphQL itself, the big advantage of embracing it is that it's an open technology with a growing community. As great as "classic" Meteor was, there was always a point where you hit the limits of the framework. With GraphQL, when you hit that point you'll now have the option of porting your Nova app to a different server stack altogether.

### Meteor, Apollo, & React

That doesn't mean saying goodbye to Meteor though. Nova still runs on top of Meteor, and it also uses [Apollo](http://www.apollodata.com/), a set of GraphQL tools developed by the same team as Meteor. 

The difference is that we can now leverage Meteor's strengths without being held back by its weaknesses. 

### The Nova Framework

With this new release, we also want to put more focus on using Nova as a framework, and not just a "build your own Hacker News" platform.

What I mean by this is that Nova includes many lower-level tools to help you do things like generate your GraphQL schema, load data on the client, manage data updates, and generate and process forms. 

In a way, Nova is the missing link between GraphQL's flexibility and Meteor's "it just works" approach.

### Getting Started

You can find the new GraphQL version of Nova [on the `devel` branch](https://github.com/TelescopeJS/Telescope/tree/devel), and the best way to get started is to check out the brand new [documentation](http://nova-docs.telescopeapp.org). 

I especially recommend checking out [this tutorial](http://nova-docs.telescopeapp.org/tutorial-framework.html), which will take you through using the underlying Nova framework to manage your own custom collections. 

And if you'd like to learn more about GraphQL and Apollo, I recommend the excellent [Learn Apollo](https://www.learnapollo.com/) interactive tutorial. 

### What's Next

So what's next on the roadmap? Right now, our priority is putting this new version in as many hands as possible and working out any bugs. 

Next, the switch to GraphQL should enable us to get rid of many now-redundant packages, which should improve bundle size and performance. 

And beyond that, now that the API is stable we'll be looking to building more plugins, packages, and themes, to make Nova even more useful. 

### Learn More

As always, if you have any questions about Nova please come say hello in the [Slack chatroom](http://slack.telescopeapp.org)!