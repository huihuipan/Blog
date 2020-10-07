---
title: CentOS 安装 Nginx
date: 2020-10-07 23:38:28
tags: Linux CentOS Nginx
---

# CentOS 安装 Nginx

  1、添加源
```bash
sudo rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
```

2、安装Nginx

　　通过yum search nginx看看是否已经添加源成功。如果成功则执行下列命令安装Nginx。
```bash
sudo yum install -y nginx
```

3、启动Nginx并设置开机自动运行
```bash
sudo systemctl start nginx.service
sudo systemctl enable nginx.service
```
