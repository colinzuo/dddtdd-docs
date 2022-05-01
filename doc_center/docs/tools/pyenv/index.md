---
title: 介绍
---

<https://github.com/pyenv/pyenv>

<https://github.com/pyenv-win/pyenv-win>

## install on windows 10

- 先通过官方安装包安装python，并且安装pipenv

```
pip install pyenv-win --target $HOME\\.pyenv

[System.Environment]::SetEnvironmentVariable('PYENV',$env:USERPROFILE + "\.pyenv\pyenv-win\","User")
[System.Environment]::SetEnvironmentVariable('PYENV_ROOT',$env:USERPROFILE + "\.pyenv\pyenv-win\","User")
[System.Environment]::SetEnvironmentVariable('PYENV_HOME',$env:USERPROFILE + "\.pyenv\pyenv-win\","User")

[System.Environment]::SetEnvironmentVariable('path', $env:USERPROFILE + "\.pyenv\pyenv-win\bin;" + $env:USERPROFILE + "\.pyenv\pyenv-win\shims;" + [System.Environment]::GetEnvironmentVariable('path', "User"),"User")
```

## install python 3.8.10

```
pyenv install 3.8.10

pyenv global 3.8.10
```
