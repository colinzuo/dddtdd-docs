
<https://docs.github.com/en/github/collaborating-with-pull-requests/working-with-forks/syncing-a-fork>

```bash
git remote -v

git remote add upstream git@github.com:xxx/xxx.git

git fetch upstream

git checkout master

git merge upstream/master

git checkout BRANCH_NAME

git merge origin/master
```
