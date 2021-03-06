## How to Contribute
Thank you for being interested in contributing to phsim. There are many ways to contribute:
* You can report bugs.
* You can make contributions to the code by forking it and using your fork to make a pull request.
## When adding code
* Add any major changes to the CHANGELOG.md file.
* Avoid commiting directly to the master branch.
* It is recommended that you use ESLint to check for bad coding practices. This can be done by running `npm run lint` in the terminal.
* To generate a minified distribution file, run `npm run minify`. 
## Important notes
* The previous stable release is kept as a seperate branch so that it can be forked to make patches.
* There is seperate branch that has the same name as the next version. Every once in a while, it is synced with the master branch. The purpose of this branch is avoid editing conflicts.
