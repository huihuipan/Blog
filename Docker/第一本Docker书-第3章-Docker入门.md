---
title: 《第一本Docker书》- 第三章 docker 入门
date: 2020-10-07 23:38:28
tags: Docker
---

# 3 docker 入门

## 3.1 确认 docker 已经就绪

`sudo docker info`

## 3.2 运行我们的第一个容器

`sudo docker run -i -t ubuntu /bin/bash`

`docker run`: 提供 *Docker* 容器创建到启动的功能
`-i`: 保证容器中 *STDIN* 是开启的
`-t`: 为创建的容器分配一个伪 tty 终端
`ubuntu`: 使用 *ubuntu* 镜像
`/bin/bash`: 容器创建完毕后执行容器的 `/bin/bash` 镜像

## 3.3 使用第一个容器

当前我们已经以 root 用户登录到新容器中

这是一个完整的 ubuntu 系统！

你可以在里面执行任何操作！

```bash
# 返回到宿主机的命令行提示符
exit

# 查看正在运行的容器
docker ps

# 查看当前系统中的容器的列表
docker ps -a

# 查看最后一次运行的容器，包括正在运行的和已经停止的
docker ps -l

# 返回容器列表内容器的 UUID
docker ps -q
```

## 3.4 容器命名

指代唯一容器的三种方式

1. 短 *UUID*
2. 长 *UUID*
3. *NAME*

指定 *NAME*
`sudo docker run --name my_first_container -i -t ubuntu /bin/bash`

`--name my_first_container`: 指定容器名称为 *my_first_container*

* 不指定名称 *docker* 会随机生成一个 *NAME*
* 容器命名唯一，重复则命令失败，容器生成失败

```bash
# 通过 NAME 删除容器
docker rm my_first_container
```

## 3.5 重新启动已经停止的容器

```bash
# 重新启动一个已经停止的容器
docker start my_first_container

# 重启一个容器
docker restart my_first_container
```

## 3.6 附着到容器上

```bash
# 重新附着到容器会话
docker attach my_first_container
```

## 3.7 创建守护式容器

上述例子创建了一个交互式容器

以下将创建一个交互式容器

```bash
docker run --name daemon_dave -d ubuntu /bin/sh -c "while true; do echo hello world; sleep 1; done"
```

```-d```: 将容器放在后台运行
```/bin/sh -c```: 执行一个 shell 脚本
```"while true; do echo hello world; sleep 1; done"```: shell 脚本

## 3.8 容器内部都在干些什么

```bash
# 打印容器日志
docker logs daemon_dave

# 监控容器日志
docker logs -f daemon_dave

# 监控最后10行日志内容
docker logs --tail 10 -f daemon_dave

# 从倒数第 5 行开始持续监控日志
docker logs --tail 5 -f daemon_dave
```

## 3.9 查看容器内的进程

```bash
# 查看容器内的所有进程、运行进程的用户 及 进程id
docker top daemon_dave
```

## 3.10 在容器内部运行进程

使用 `docker exec` 在容器内部额外启动新进程

可以在容器内运行的进程有两种：*后台任务* 和 *交互式任务*
*后台任务*：在容器内运行且没有交互需求

```bash
docker exec -d daemon_dave touch /etc/new_config_file
```

```docker exec```: 在容器内部额外启动新进程
```-d```: 表示是一个后台任务
```daemon_dave```: 容器名
```touch /etc/new_config_file```: 新进程

*交互式任务*： 保持在前台运行

```bash
docker exec -t -i daemon_dave /bin/bash
```

```docker exec```: 在容器内部额外启动新进程
```-t -i```: 表示是一个交互式任务
```daemon_dave```: 容器名
```/bin/bash```: 新进程

## 3.11 停止守护式容器

```bash
# 停止守护式容器 (向容器进程发送SIGTERM信号)
docker stop daemon_dave

# 杀死守护式容器（向容器进程发送SIGKILL信号）
docker kill daemon_dave

# 查看最后 10 个容器（不论正在运行或已经停止）
docker ps -n 10
```

## 3.12 自动重启容器

自动重启由于某种错误而导致容器停止运行的容器

```bash
docker run --restart=always --name daemon_dave -d ubuntu /bin/sh -c "while true; do echo hello world; sleep 1; done"
```

```--restart=aways```: *--restart* 标志设置为 *always* 表示无论容器的退出代码是什么 *Docker* 都会自动重启该容器，另外还可以设置为：
*on-failure*: 表示只有当容器的退出代码为非 0 值的时候才会自动重启；
*on-failure:5*: 表示嘴多重启 5 次

## 3.13 深入容器

```bash
# 获取容器更多信息
docker inspect daemon_dave

# 获取容器指定信息
docker inspect --format="{{ .State.Running }}" daemon_dave

# --format 支持完成的 *go 语言*模板
docker inspect --format '{{.Name}} {{.State.Running}}' daemon_dave my_first_container
```

## 3.14 删除容器

```bash
# 删除指定容器
docker rm daemon_dave

# 删除所有容器
docker rm `docker ps -a -q`
```

## 3.15 小结

本章节主要介绍了 *docker* 容器的基本工作原理及基础

本章节出现过的 docker 命令
| 命令  | 意义 |
|---|---|
| docker info    | 查看 docker 信息 |
| docker run     | 查找镜像并创建容器 |
| docker start   | 启动容器 |
| docker restart | 重启容器 |
| docker stop    | 停止容器 |
| docker kill    | 杀死容器 |
| docker rm      | 删除容器 |
| docker attach  | 重新附着到容器会话上 |
| docker exec    | 给容器额外运行任务 |
| docker ps      | 查看容器列表 |
| docker logs    | 打印容器日志 |
| docker inspect | 查看容器/镜像详细信息 |
| docker top     | 查看容器内所有进程，执行进程的用户 及 进程 id |