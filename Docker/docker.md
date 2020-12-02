---
title: docker 初体验
date: 2020-10-07 23:38:28
tags: Docker
---

# docker 
## 第一章 docker 安装
### 略

## 第二章 docker 架构与实践
### 常用指令

| 指令 | 用途 |
| --- | --- |
| docker pull | 获取 image |
| docker build | 创建 image |
| docker images | 列出 iamge |
| docker run | 运行 container |
| docker ps | 列出 container |
| docker rm | 删除 container |
| docker rmi | 删除 image |
| docker cp | 在 host 和 container 之间拷贝文件 |
| docker commit | 保存改动为新的 image |

## 第三章 Dockerfile
通过配置文件创建 docker 镜像

### example: 
```Dockerfile
FROM alpine:latest
MAINTAINER xbf
CMD echo 'hello docker'
```
### 实践
1. 编写 Dockerfile
```Dockerfile
 # 基础镜像
FROM ubuntu                               
 # 作者             
MAINTAINER huihuipan                                 
# 更换节点  
RUN sed -i 's/archive.ubuntu.com/mirros.ustc.edu.cn/g' /etc/apt/sources.list                                            
# 执行命令1
RUN apt-get update                                      
# 执行命令2
RUN apt-get install -y nginx                            
# 复制文件
COPY index.html /var/www/html                           
# 暴露入口
ENTRYPOINT ["/usr/sbin/nginx", "-g", "daemon off;"]     
# 端口
EXPOSE 80                                               
```

### 小结
| 命令 | 用途 | 镜像分层 |
| FROM | base iamge |
| RUN | 执行命令 |
| ADD | 添加文件 |
| COPY | 拷贝文件 |
| CMD | 执行命令 |
| EXPOSE | 暴露端口 |
| WORKDIR | 指定路径 |
| MAINTAINER | 维护者 |
| ENV | 设定环境变量 |
| ENTRYPOINT | 容器入口 |
| USER | 指定用户 |
| VOLUME | mount point |

## 第四章 存储
提供```独立```于容器之外的```持久化```存储
```bash
docker run -d --name nginx -v /usr/share/nginx/html nginx

docker inspect nginx
```
目录挂载
```bash
docker run -p 80:80 -d -v $PWD/html:/usr/share/nginx/html nginx
```

```bash
docker create -v $PWD/data:/var/mydata --name data_container ubuntu
docker run -it --volume-from data_container ubuntu /bin/bash
```

## 第五章 镜像仓库
### 术语
| English | 中文 |
| --- | --- |
| host | 宿主机 |
| image | 镜像 |
| container | 容器 |
| registry | 仓库 |
| deamon | 守护程序 |
| client | 客户端 |

```bash
# 搜索镜像 
docker search whalesay

# 拉取镜像
docker pull whalesay

# 推送镜像
docker push myname/whalesay
```

## 第六章 多容器 app
### 安装 docker-compose
windows mac 自带
linux 需要单独安装

### 实战
#### 实战目录
```


## 第七章 总结