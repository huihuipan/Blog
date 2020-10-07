---
title: CentOS 安装 Git
date: 2020-10-07 23:38:28
tags: Linux CentOS Git
---

# 	CentOS 安装 Git

CentOS 使用 yum 安装 git 默认版本是 **v1.8.3.1**

安装 git v2.x

首先卸载当前git

```yum remove git ```

安装指定版本 git

```bash
[root@localhost test1]#  cd /usr/local/src/

[root@localhost test1]#  wget https://www.kernel.org/pub/software/scm/git/git-2.15.1.tar.xz

[root@localhost test1]#  tar -vxf git-2.15.1.tar.xz

[root@localhost test1]#  cd git-2.15.1

[root@localhost test1]#  make prefix=/usr/local/git all

[root@localhost test1]#  make prefix=/usr/local/git install

[root@localhost test1]#  echo "export PATH=$PATH:/usr/local/git/bin" >> /etc/profile

[root@localhost test1]#  source /etc/profile

[root@localhost test1]#  git --version
```

执行 ```make prefix=/usr/local/git all``` 可能会报

```bash
[root@VM_0_13_centos git-2.15.1]# make prefix=/usr/local all
    CC credential-store.o
In file included from cache.h:4:0,
                 from credential-store.c:1:
git-compat-util.h:283:25: fatal error: openssl/ssl.h: No such file or directory
 #include <openssl/ssl.h>
                         ^
compilation terminated.
make: *** [credential-store.o] Error 1
```

此时需要安装 openssl

```yum install openssl*```

再执行

```bash
make prefix=/usr/local/git all
```

执行  ```make prefix=/usr/local/git install``` 报错

```
yum install curl-devel
yum install expat-devel
```