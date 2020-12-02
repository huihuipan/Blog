---
title: CentOS 安装 docker
date: 2020-10-07 23:38:28
tags: Linux CentOS Docker
---

# CentOS 安装 docker

卸载旧版本

```bash
$ sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

安装依赖

```bash
$ sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2
```

添加源

```bash
$ sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

安装docker

```bash
sudo yum install docker-ce docker-ce-cli containerd.io
```

启动docker

```bash
sudo systemctl start docker
```

docker 常用命令

```bash
# 查看版本
$ docker version

# service 命令 启动 docker 服务
$ sudo service docker start

# systemctl 命令 启动 docker 服务
$ sudo systemctl start docker

# 列出本机的所有 image 文件。
$ docker image ls

# 删除 image 文件
$ docker image rm [imageName]

# 下载镜像
$ docker image pull library/hello-world
$ docker image pull hello-world

# 运行镜像（创建容器）
$ docker container run hello-world

# 停止容器
$ docker container kill [containID]

# 退出并关闭容器
$ exit

# 退出但不关闭容器
Ctrl+P+Q

# 列出正在运行的容器
$ docker container ls

# 列出所有容器
$ docker container ls --all

# 删除容器
$ docker container rm [containerID]

# 制作镜像


```

## 参考资料

[Get Docker Engine - Community for CentOS](https://docs.docker.com/install/linux/docker-ce/centos/)

[Docker 入门教程 ———— 阮一峰](http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)