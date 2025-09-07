---
# Basic data
slug: 'jamin-around-with-contentful'
title: "Jamin' around with Contentful"
description: 'My initial impressions of Contentful after experimenting with it to power benryder.me'
isFeatured: false
isPublished: true
tags: []
# Timestamps
createdAt: 2021-03-31T00:00:00.000Z
# Related content
relatedProjects: []
relatedPosts: []
---

In web development today the Jamstack is an interesting alternative to monolithic content management systems like Drupal and Wordpress. The JAM stack is:
> A modern web development architecture based on client-side JavaScript, reusable APIs, and prebuilt Markup.  
> **Netlify.com**

At its core the Jamstack decouples content and display, allowing for more flexibility in the tools and services that can be used so you can pick the best tools for the job you need.
Within this decouples architecture content often comes from a Headless CMS, and that is where Contentful comes in.  

In this post I will focus generally on what Contentful is, some features I think make it a great option as a Headless CMS and what my initial experience with it has been like.

## What is Contentful?

Contentful is a content management system. It aims to be a single hub from which editors can create and manage content, and makes this content available via APIs so developers can pull the data into products as required.

## Why use it?

Contentful has a lot of features that help make it an attractive choice:

### Environments & Content Workflows

- There is built-in support for environments. For example, you can set up a staging and live environment, or create environments specifically when working on a new feature.
- Content can be in "draft" or "published" states meaning you can start adding content but keep it hidden until it's ready to publish.

### Third Party Ecosystem

- The editor user interface can be extended and customised by using UI extensions.
- External services can be integrated via apps. For example the Gatsby or Netlify apps can help you trigger builds on content updates, the Shopify app can be used to integrate your Shopify products & the Google Analytics app can let you view analytics from within Contentful itself.

### Media Library

- Contentful comes with a Media library allowing you to upload images, documents, videos and more.

### Localization

- Contentful supported creating content in multiple languages. This means you can set up content to be multilingual if required.

### Developers Tools

- It can be a hard task to maintain and work on a content model. contentful-migration allows developers to define the content model within version control, and build the content model without having to use the website interface.
- There are a number of API libraries prebuilt for developers to use when integrating Contentful with apps and services. These include a Javascript library, Gatsby plugin, Android APK and a variety of different endpoints for interacting with content. The contentful-cli can also be used to easily manage Contentful applications from the command line.

## Who is using Contentful?
Contentful is being used by many top brands, at the time of writing this includes:

- Figma
- Shutterstock
- Stripe
- Spotify Artists

You can view more on [contentful.com](https://contentful.com).

## My Experience

Most of my experience with Contentful has been in developing my personal website. This site was a great contender to practise using the Jamstack architecture because the content doesn’t change often.

I decided to structure my content model using components, so within Contentful I can create pages and then add components in order to build out the page.

At the time of writing these components (or content types) include things such as:

- Article 
- Page 
- Footer & Footer Menu 
- Hero 
- Greeter 
- Netlify Form 
- Text Section 
- View

I found it relatively easy to set up and was surprised at how flexible Contentful was about how you set up your content model. I was able to pretty much structure my content as I wanted.

Once I had the CMS groundwork's in place it was also straightforward to start using that content by installing the Contentful JS package to allow me to integrate it into my front-end Netlify site which uses Eleventy to process the Contentful data and build the static site.

I’ve had a positive experience with Contentful in developing my site, however the pricing plan can get quite expensive. This means that if you outgrow the ‘’Community” space you get for free, or if you want more than one space, you’d need to up your budget.

When it comes to the default interface too, I personally find it can become quite confusing when dealing with multiple layers of content, which happens often when opting to build a component based content system. I think there are probably ways to improve this though by using or developing custom Editor Interfaces.


## Conclusion

Overall you can see that there are a number of great features that make Contentful an attractive choice for a headless CMS. Looking at the number of leading brands using Contentful, it looks like they agree too!

However, if you’re developing on a small scale the pricing plans might be too expensive if the free community space offering isn’t enough for you. If that is the case there are plenty of alternatives with similar feature sets at lower costs such as Prismic and Strapi.
