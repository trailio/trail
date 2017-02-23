# Contributing

## Detailed Workflow

### Fork the repo

Use github’s interface to make a fork of the repo, then add that repo as an upstream remote:

```
git remote add upstream https://github.com/trailio/trail.git
```

### Cut a namespaced feature branch from master

Your branch should follow this naming convention:
  - feat/...
  - test/...
  - doc/...
  - refactor/...
  - fix/...
  - build/...
  etc

These commands will help you do this:

``` bash

# Creates your branch and brings you there
git checkout -b `your-branch-name`
```

### Make commits to your feature branch.

Prefix each commit like so
  - (feat) Added a new feature
  - (fix) Fixed inconsistent tests [Fixes #0]
  - (refactor) ...
  - (cleanup) ...
  - (test) ...
  - (doc) ...

Make changes and commits on your branch, and make sure that you
only make changes that are relevant to this branch. If you find
yourself making unrelated changes, make a new branch for those
changes.

### Rebase upstream changes into your branch

Once you are done making changes, you can begin the process of getting
your code merged into the main repo.

First switch to your master branch and grab the latest updates from upstream

```bash
git checkout master
git pull --rebase upstream master
```

Then go back to your branch and rebase those changes to your branch:

```bash
git checkout `your-branch-name`
git rebase master
```


<img width="689" alt="rebase_found_conflicts" src="http://i.imgur.com/N74Munz.png">

If a conflict arises between your new code and what exists on upstream,
git will yell at you to fix the conflicts. To get a better picture of what
conflicts you need to fix, type:

```bash
git status
```

You should see a picture something like this:
<img width="689" alt="rebase_conflicts_to_resolve" src="http://i.imgur.com/dnQQR8q.png">

In this example, it's saying there's a conflict in the package.json file. If you navigate to that file in your editor (sublime or atom), you'll see something like this:

<img width="689" alt="rebase_before_resolve" src="http://i.imgur.com/ssWqZeO.png">


In this particular example, Maurice had added the dependencies mysql and sequelize while I had added request. To resolve this issue, simply delete the text that git inserted (the red highlighted text), and format the package.json to include all 3 (mysql, sequelize, and request):

<img width="689" alt="rebase_after_resolve" src="http://i.imgur.com/sj98bod.png">

Once you are done fixing conflicts for a specific commit, run:

```bash
git rebase --continue
```

This will continue the rebasing process. If all conflicts are resolved,
the rebase should complete. Go back to master and merge your branch with your
master as follows:

```bash
git checkout master
git merge --ff-only `your-branch-name`
```

Before pushing to your repo, check to see if your master branch has a linear
commit history that is the same linear history of the upstream master, *plus*
the additional commits you have with:

```bash
ghist
```

Note: If you don't have the `ghist` alias, open your .gitconfig file and
add the following alias:
```bash
alias ghist='git log --pretty=format:"%h %ad | %s%d [%an]" --graph --date=short'
```

Finally, push your code to your fork (origin/master). You will likely
run into difficulty pushing to your origin (i.e.
it says your local master has diverged from origin/master), so to successfully
push, type:

```bash
git push origin master -f
```

### Make a pull request

Make a clear pull request from your fork and branch to the upstream master
branch, detailing exactly what changes you made and what feature this
should add. The clearer your pull request is the faster you can get
your changes incorporated into this repo.

At least one other person MUST give your changes a code review, and once
they are satisfied they will merge your changes into upstream. Alternatively,
they may have some requested changes. You should make more commits to your
branch to fix these, then follow this process again from rebasing onwards.

If all changes are good to go, instead of doing the default merge, select the
drop down arrow next to the button and select the "Rebase and merge" option:

<img width="689" alt="rebase_and_merge" src="http://i.imgur.com/dy4z08o.png">

This should give us a nice, clean, linear history :)

Thanks for contributing!

### Guidelines

1. Uphold the current code standard:
    - Keep your code [DRY][].
    - Apply the [boy scout rule][].
    - Follow [_STYLE-GUIDE.md](_STYLE-GUIDE.md)
1. Run the [tests][] before submitting a pull request.
1. Tests are very, very important. Submit tests if your pull request contains
   new, testable behavior.
1. Your pull request is comprised of a single ([squashed][]) commit.

## Checklist:

This is just to help you organize your process

- [ ] Did I cut my work branch off of master (don't cut new branches from existing feature brances)?
- [ ] Did I follow the correct naming convention for my branch?
- [ ] Is my branch focused on a single main change?
 - [ ] Do all of my changes directly relate to this change?
- [ ] Did I rebase the upstream master branch after I finished all my
  work?
- [ ] Did I write a clear pull request message detailing what changes I made?
- [ ] Did I get a code review?
 - [ ] Did I make any requested changes from that code review?

If you follow all of these guidelines and make good changes, you should have
no problem getting your changes merged in.


<!-- Links -->
[style guide]: https://github.com/reactorcore/style-guide
[n-queens]: https://github.com/reactorcore/n-queens
[Underbar]: https://github.com/reactorcore/underbar
[curriculum workflow diagram]: http://i.imgur.com/p0e4tQK.png
[cons of merge]: https://f.cloud.github.com/assets/1577682/1458274/1391ac28-435e-11e3-88b6-69c85029c978.png
[Bookstrap]: https://github.com/reactorcore/bookstrap
[Taser]: https://github.com/reactorcore/bookstrap
[tools workflow diagram]: http://i.imgur.com/kzlrDj7.png
[Git Flow]: http://nvie.com/posts/a-successful-git-branching-model/
[GitHub Flow]: http://scottchacon.com/2011/08/31/github-flow.html
[Squash]: http://gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html
