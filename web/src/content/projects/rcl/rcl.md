---
# Basic data
slug: 'rcl'
title: 'rcl'
description: "A simple command line wrapper for rclone focused on easy folder syncing. It is loosely based on git's interface and uses concepts such as 'local' and 'remote' along with having commands such as pull, push and diff."
isFeatured: false
isPublished: true
tags:
- tools
# Project data
productUrl: "https://pypi.org/project/rcl"
repositoryUrl: "https://github.com/ben-ryder/rcl"
# Timestamps
createdAt: 2022-07-12T00:00:00.000Z
updatedAt: 2023-10-04T00:00:00.000Z
# Related content
relatedBlogPosts: []
relatedProjects: []
---

`rcl` is a simple command line wrapper for rclone focused on easy folder syncing. It is loosely based on git's interface and therefore uses the concepts of "local" and "remote" along with having commands such as pull, push and diff.

I created rcl as I found rclone commands to be quite cumbersome. This offers an easier way to interact with cloud storage from the command line and is especially suited to archival storage where you only need to update files occasionally.

It is published on PyPi here: https://pypi.org/project/rcl/.

## Example Usage

This project is designed to be used as a wrapper around rclone, so initial setup of remotes still has to be done through rclone.
Once you have set up a remote (for example called `gdrive`) you can do things like...

```bash
# Add a new local/remote pair called "music"
rcl add music /home/user/Music gdrive:Music

# View the difference between the local and remote folder
rcl diff music

# Push local changes to the remote. (Sync remote with local).
rcl push music

# Pull remote changes to your local. (Sync local with remote).
rcl pull music
```
