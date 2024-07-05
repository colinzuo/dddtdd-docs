---
title: 安装环境
---

## 安装Node.js

[nodejs.org](https://nodejs.org/en/download/)

安装一个LTS版本, 比如14.15.1
+ 要检查node版本, 在命令行运行node -v

```bash
node -v
```

### Ubuntu环境下安装

参照[Node.js binary distributions](https://github.com/nodesource/distributions/blob/master/README.md)

```bash
curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## 安装yarn

参照[Yarn Installation](https://classic.yarnpkg.com/en/docs/install/#debian-stable)

### Ubuntu环境下安装

```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt update && sudo apt install yarn
```