---
# Basic data
path: '/project-conventions'
slug: 'project-conventions'
title: 'Project Conventions'
description: 'A general list of process and coding conventions I use across projects.'
isPublished: true
# Timestamps
createdAt: 2024-01-25T14:31:52.183Z
updatedAt: 2024-05-08T21:53:21.855Z
---

# Project Conventions

This is a general list of process and coding conventions I use across projects.

## Branches
- `main` is the default production branch, and releases are tagged when ready from a commit on `main`.
- feature branches are used for most work, usually in the form `<type>/<ticket-ref>-<short-description>` for example `feat/123-new-feature-description`. The type matches the types used in commits.
- Long-lived branches like `dev` or similar can exist, but feature branches and merging often (via fast-forward) should be preferred.

## Commits
Repositories are set up to use commitlint, where commits can be the following types:
- release - a publish/release
- revert - reverting work
- docs - a docs only update
- tests - work or updates to tests
- feat - any work that isn't a bug fix
- fix - fixing a bug
- tools - changes to tooling like CI, deployments, local dev, dependency updates
- wip - a work in progress
- refactor - refactoring existing work
- style - code styling/formatting, tasks that are very minor and don't affect functionality

 ```json
{
  "extends": [
    "@commitlint/config-conventional"
  ],
  "rules": {
    "type-enum": [2, "always", [
      "release",
      "revert",
      "docs",
      "tests",
      "feat",
      "fix",
      "tools",
      "wip",
      "refactor",
      "style"
    ]]
  }
}
 ```
