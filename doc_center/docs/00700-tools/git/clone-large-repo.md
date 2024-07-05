
## clone large repo

[https://stackoverflow.com/questions/21277806/fatal-early-eof-fatal-index-pack-failed/22317479#22317479](https://stackoverflow.com/questions/21277806/fatal-early-eof-fatal-index-pack-failed/22317479#22317479)

```bash
git config --global core.compression 0

git clone --depth 1 <repo_URI>

git fetch --unshallow 

git pull --all
```
