---
# Basic data
slug: 'uncommon-common-git-operations'
title: 'Uncommon Common Git Operations'
description: 'A collection of git operations I find myself searching for surprisingly often.'
tags:
  - command-line
  - quick-tips
# Blog post data
isFeatured: false
# Timestamps
createdAt: 2022-10-02T00:00:00.000Z
updatedAt: 2023-08-15T00:00:00.000Z
# Related content
relatedBlogPosts: []
relatedProjects: []
---

This aims to be a collection of "Uncommon common" git operations, meaning they are relatively uncommon operations that I find myself searching for often enough to write them down somewhere.
This is in no way meant to be an exhaustive list, just a reference for myself that might be useful to others.

**Contents:**
- [Apply the latest gitignore changes](#apply-the-latest-gitignore-changes)
- [Moving a commit to a different branch](#moving-a-commit-to-a-different-branch)
- [Ensure all commits share the same author](#ensure-all-commits-share-the-same-author)

## Apply the latest gitignore changes
If you make gitignore changes it's possible that your repository will need to be "refreshed" for all rules to apply, especially if you add rules for files that are currently being tracked by git.
To ensure your repository is up to date with the latest gitignore changes you can run the following commands:

```bash
git rm -r --cached .
git add .
git commit -m "Updating repo with gitignore changes."  
```

**Note: It's important that you commit or stash all work prior to running these commands as you will lose all untracked changes.**

## Moving a commit to a different branch
Every now and again it's possible you may commit directly to the `master` or `develop` branch forgetting to create a feature branch first. Luckily - assuming you haven't pushed the changes yet - it's quick and painless to move that commit to a feature branch.

If `<base-branch>` contains 1 rogue commit you want to move to `<new-feature-branch>` then you can run the following:

```bash
git checkout -b <new-feature-branch>
git reset --hard HEAD~1 <base-branch>
```

If you have more than one commit to undo you can change `HEAD~1` to use a different number.
This operation rewrites the base branch history which may cause issues if the branch has already been pushed. In these cases you could use the `--force` flag to force overwrite history however if there are other developers on the project you should avoid that and use `git revert` or similar instead.

## Ensure all commits share the same author
There are times where you might forget to change your git user config before working on a project.
If you have already pushed your commit, this is a quick and dirty way to effectively ensure all commits in your project share the same user name and email:

```bash
git filter-branch -f --env-filter "GIT_AUTHOR_NAME='<name>'; GIT_AUTHOR_EMAIL='<email>'; GIT_COMMITTER_NAME='<name>'; GIT_COMMITTER_EMAIL='<email>';" HEAD;
git push --force origin <current-branch>
```

**Important Note: This is force pushing a history rewrite. You should only really use it on a project where you are the only developer and/or you know this won't effect anyone else.**
