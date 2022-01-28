# 个人与工作两不误的 git 配置

本文以 macOS 为例，其他系统酌情参考。

## 背景

张三是一个程序员，他的英文名叫 *outlaw*，emial: *outlaw@163.com*。
张三入职了一家公司，公司给张三的企业邮箱是 *zhangsan@company.com*
这一次，他 0 元购了一台新笔记本，需要配置一下 git

## git 账号配置

- 配置全局用户名及邮箱
```sh
git config --global user.name 'outlaw'
git config --global user.email 'outlaw@163.com'
```

- 查看用户名及邮箱
```sh
git config user.name # outlaw
git config user.email # outlaw@163.com
```

这下，张三电脑上所有的 git 提交信息都会以 outlaw 的名字提交记录，配置完用户信息之后，张三想要在 github 发布自己的个人项目，张三需要用 ssh 的方式传输
(什么是ssh？留个坑)

## 配置公钥和私钥

```sh
# 输入
ssh-keygen -t rsa -C "outlaw@163.com" 
# 输出
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/outlaw/.ssh/id_rsa): /Users/outlaw/.ssh/outlaw_github_id_rsa #这里输入张三想要的 rsa 文件名
Enter passphrase (empty for no passphrase): # 这里是密码，不需要可以直接回车
Enter same passphrase again: # 同上
The key fingerprint is:
SHA256:itev5ap5JasdasdbCJNPA3bKs1cbuKBjjc1Wg7UeFI outlaw@outlawdeMacBook-Pro.local
The key's randomart image is:
+---[RSA 3072]----+
|   +E+           |
|  .+=o=          |
|  +.+*0o         |
| . C.++ .        |
|  + @.b+S.       |
| o o *oo+ .      |
|. = + oo...      |
| . . . ..+       |
|      oOooo      |
+----[SHA256]-----+
# 输出上面这一段说明已经创建成功了
```
这时在 .ssh 文件夹下可以看到创建了两个文件
```sh
# 输入
ls -la ~/.ssh

# 输出
outlaw_id_rsa     # 私钥（答应我永远不要告诉别人好吗）
outlaw_id_rsa.pub # 公钥 
```

张三把公钥配置到 github 之后，张三就可以把自己的项目推到 github 了

## 公司 git 账号配置

张三公司使用 gitlab，刚刚张三配置的公私钥是使用了自己的邮箱创建的，那么在公司的项目的公私钥应该使用公司邮箱创建，和上面的步骤一样

```ssh
ssh-keygen -t rsa -C "zhangsan@company.com" 
```

创建完了，此时张三的电脑有两对公私钥
- outlaw_github_id_ras | outlaw_github_id_ras.pub
- zhangsan_gitlab_id_ras | zhangsan_gitlab_id_ras.pub

此时为了顺利进行各自的远程推送，还需要配置一下 git config
```
# ~/.ssh/config

# Github
Host 148.70.192.106
HostName 148.70.192.106
User outlaw
IdentityFile ~/.ssh/outlaw_github_id_ras

# 张三公司
Host ssh.conpamy.net
HostName ssh.conpamy.net
User zhangsan
IdentityFile ~/.ssh/zhangsan_gitlab_id_ras

```

配置完后可以通过一下命令测试是否能连接成功
```sh
# github
ssh -T git@github.com
# Hi outlaw! ...

# 张三公司
ssh -T git@ssh.company.net
# Welcome to GitLab, @zhangsan!
```

## 为项目配置用户信息

此时张三已经可以顺利推送项目到 github 或者 gitlab 了，但是张三在第一步的时候，使用的是 ```git config --global user.name 'outlaw'``` 所以他推送的所有信息都会以 *outlaw* 的名字推送上去，在公司项目上，张三肯定是不希望公司的人知道他的另一面是法外狂徒的，所以针对公司的项目，张三从公司远程库拉下来后，还需要给项目输入两行代码

```sh
cd ~/company/company-admin  # 公司项目目录

git config user.name 'zhangsan'
git config user.email 'zhangsan@company.com'
```
这时，张三在 company-admin 项目才能以 *zhangsan* 的名字提交信息。

张三想，公司几十个项目，每次都要这样配置，很容易忘记配置导致别人知道我真实身份的啊！

## 使用 Include 解决用户信息问题

张三心里想，公司项目都在 company 目录下，那能不能给这个目录搞个配置，只要这个目录下的就是 *zhangsan* 而不是 *outlaw* 呢？

答案是可以！

首先创建一个文件
```sh
sudo vim ~/.gitconfig-company # 这个文件和 .gitconfig 同一目录好管理
```

内容如下：
```
# ～/.gitconfig-company

[user]
    name = zhangsan
    email = zhangsan@company.com 
```

然后去 .gitconfig 修改

在 .gitconfig 最后增加一行

```
# ～/.gitconfig

[http]

...

[includeIf "gitdir:~/company/"]
    path = .gitconfig-company
```

到这里，张三在 company 目录下的项目都会以 zhangsan 的名字提交，而 company 以外的项目都会以 outlaw 的名字提交了。

## 参考
[Git 和 GitHub/GitLab 多账号配置](https://juejin.cn/post/6904911691658559501)
[git-config Includes](https://git-scm.com/docs/git-config#_includes)