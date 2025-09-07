---
# Basic data
slug: 'tmux-reference'
title: 'tmux Reference'
description: 'A reference on how to use tmux.'
isFeatured: true
isPublished: true
tags: []
# Timestamps
createdAt: 2025-06-05T00:00:00.000Z
# Related content
relatedProjects: []
relatedPosts: []
---

tmux is a terminal multiplexier. I personally find it an invaluable tool for working with remote devices such as a home server, VPS or Raspberry Pi as tmux allows you to run commands without worrying about connection issues.

This reference is intended to be a high level overview for everyday use, not an exhaustive guide. To learn more, try visiting [tmuxcheatsheet.com](https://tmuxcheatsheet.com/) or [github.com/tmux/tmux](https://github.com/tmux/tmux/wiki/Getting-Started) .

## Usage
Start a new session, with the provided `name`:
```bash
tmux new -s name
```
Detach from a session:
```
CTRL + B, then D
```

Attach to the last session:
```bash
tmux a
```

Attach to a session with the provided `name`:
```bash
tmux a -t name
```

Kill a session with the provided `name`:
```bash
tmux kill-ses -t name
```
