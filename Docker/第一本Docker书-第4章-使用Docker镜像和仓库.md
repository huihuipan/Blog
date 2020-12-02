---
title: 《第一本Docker书》- 第四章 使用 Docker 镜像和仓库
date: 2020-10-07 23:38:28
tags: Docker
---

# 4.使用 Docker 镜像和仓库

## 4.1 什么是 docker 镜像
Docker 文件系统层
```
可写容器
    ↑
镜像3：加入 Apache
    ↑
镜像2：加入emacs
    ↑
基础镜像： Ubunut
    ↑
引导文件系统
    ↑
容器组、
命名空间、
设备映射
    ↑
内核
```

## 4.2列出镜像

镜像仓库: [Docker Hub](https://hub.docker.com/)

```
# 列出镜像
docker images
```

## 4.3 拉取镜像
```
# 拉取 ubuntu 最新镜像
docker pull ubuntu

# 获取指定标签名的镜像创建容器
docker run -t -i --name new_container ubuntu:12.04 /bin/bash
```
```ubuntu:12.04```: 指定标签的 ubuntu 镜像

```bash
# 拉取指定镜像但不创建容器
docker pull fedora:20
```

## 4.4 查找镜像
```bash
# 查找镜像
docker search node
```

## 4.5 构建镜像
1.使用 docker commit 命令（不推荐）
2.使用 Dockerfile (推荐) + docker build 命令

### 4.5.1 登录 docker hub
```bash
docker login
```

### 4.5.1 创建 Docker Hub 账号

### 4.5.2 使用 commit 命令创建镜像 (不推荐)
```
docker commit daemon_dave huihuipan/test1:01
```
```docker commit```: 提交修改
```daemon_dave```: 当前容器名称/UUID
```huihuipan/test1:01```: ${账号}/${镜像名称}:${镜像标签}

设置更多信息
```
docker commit -m="just a test" --author="aoker" daemon_dave huihuipan/test2:02
```
```-m="just a test"```: 设置 镜像 Comment 为 'just a test'
```--author="aoker"```: 设置 镜像 Auchor 为 aoker

### 4.5.3 使用 Dockerfile 构建镜像

```Dockerfile
# Version: 0.0.1
FROM ubuntu:14.04
MAINTAINER StephonDogg "huihuipan163@163.com"
RUN apt-get update
RUN apt-get install -y nginx
RUN echo 'Hi, I am in your container' \
    >/usr/share/nginx/html/index.html
EXPOSE 80
```
Dockerfile 的每一条指令都会 commit 一次

```FROM ubuntu:14.04```: 以 *ubuntu:14.04* 作为基础镜像
```MAINTAINER StephonDogg "huihuipan163@163.com"```: 告诉 docker 该镜像的作者是谁以及作者的电子邮箱地址
```RUN apt-get update```: *RUN* 指令会在 *shell* 里面使用命令包装器 ```/bin/sh -c``` 来执行，如果是 不支持 *shell* 平台或不希望在 *shell* 中运行，也可以使用 ```exec``` 格式的RUN 指令，如下
```Dockerfile
# exec 格式的 RUN 指令
RUN [ "apt-get", "install", "-y", "nginx" ]
```
```EXPOSE 80```: 向外部公开 80 端口

### 4.5.4 基于 Dockerfile 构建新镜像
```
docker build -t huihuipan/myimages .
```
```docker build```: 构建新镜像
```-t huihuipan/myimages .```: 设置仓库和名称

### 4.5.5 指令失败时会怎样
上面说过，***dockerfile*** 内的每一条指令都会提交一个新的镜像

```bash
Sending build context to Docker daemon  4.608kB
Step 1/6 : FROM ubuntu:14.04
 ---> 6e4f1fe62ff1
Step 2/6 : MAINTAINER StephonDogg "huihuipan163@163.com"
 ---> Using cache
 ---> 3c8f7a74c133
Step 3/6 : RUN apt-get update
 ---> Using cache
 ---> be238cf6e7c0
Step 4/6 : RUN apt-get install -y ngix
 ---> Running in f7f96bee421a
Reading package lists...
Building dependency tree...
Reading state information...
E: Unable to locate package ngix
The command '/bin/sh -c apt-get install -y ngix' returned a non-zero code: 100
```
错误信息中会返回镜像的 ***hash*** 值，此时可以使用 ```docker run``` 命令进行调试 
```bash
# 用 docker run 命令来基于这次构建到目前为止已经成功的最后一步创建一个容器
docker run -t -i be238cf6e7c0 /bin/bash
```

### 4.5.6 Dockerfile 和构建缓存
如果不需要使用缓存构建
```bash
docker build --no-cache -t="huihuipan/no_catch_image" .
```