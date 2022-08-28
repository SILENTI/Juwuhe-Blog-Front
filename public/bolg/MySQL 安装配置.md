## MySql简介

MySQL是一个开放源码的小型关联式数据库管理系统，最初的开发者为瑞典MySQL AB公司。在2008年1月16号该公司被Sun公司收购，而2009年,SUN又被Oracal收购，因此现在的MySQL由Oracle公司管理和维护，但依然开放源代码。MySQL由于其体积小、速度快、总体拥有成本低，尤其是开放源码这一特点，许多互联网企业选择了MySQL来管理自己的数据，如Google、Facebook，百度，阿里巴巴（去IOE运动）、网易等。 

## 安装Mysql

**Mysql 数据库官网： **[https://www.mysql.com/](https://www.mysql.com/)

### windows 安装数据库



1. 访问官网下载安装包

![MySQL-MySQL-Downloads.png](https://images.juwuhe.top/i/2022/06/08/ire1hg-3.png)![MySQL-MySQL-Community-Downloads.png](https://images.juwuhe.top/i/2022/06/08/irfklf-3.png)
![MySQL-Download-MySQL-Community-Server.png](https://images.juwuhe.top/i/2022/06/08/irg5px-3.png)

![MySQL-Download-MySQL-Installer.png](https://images.juwuhe.top/i/2022/06/08/irr8dh-3.png)
![MySQL-Begin-Your-Download.png](https://images.juwuhe.top/i/2022/06/08/irtb2b-3.png)

2. 数据库安装

![屏幕截图 2021-10-08 080634.png](https://images.juwuhe.top/i/2022/06/08/xs2c6w-3.png)
![屏幕截图 2021-10-08 080658.png](https://images.juwuhe.top/i/2022/06/08/xs34qy-3.png)

### Linux 安装数据库

在Linux系统中安装数据库，提供两种方式，一种通过**wget命令**直接安装数据库，另一种是在Windows端下载好，安装文件，通过Xshell上传到Linux端中，后安装。
在此更加推荐第一种。

1. 访问官网

注意自己Linux系统的版本，与之Mysql版本对应。
复制其下载地址：[https://downloads.mysql.com/archives/get/p/3/file/mysql-connector-java-8.0.28-1.el7.noarch.rpm](https://downloads.mysql.com/archives/get/p/3/file/mysql-connector-java-8.0.28-1.el7.noarch.rpm)
![image.png](https://images.juwuhe.top/i/2022/06/08/xs3zqq-3.png)
![image.png](https://images.juwuhe.top/i/2022/06/08/xsf93m-3.png)

2. 安装mysql

```shell
#查询系统是否安装Mysql
rpm -qa | grep mysql
```

* 通过命令下载Mysql

```shell
#安装wget
yum -y install wget

#通过wget下载mysql的压缩包-复制上一步的链接
wget https://cdn.mysql.com/archives/mysql-5.7/mysql-5.7.37-1.el7.x86_64.rpm-bundle.tar

#解压安装包
tar zxvf mysql-8.0.29-1.el7.x86_64.rpm-bundle.tar

#安装Mysql
yum -y install ... or rpm -vih ... 

#一键安装全部
yum -y install mysql-* or rpm -vih mysql-*;
```

* 通过Xshell上传Mysql

将下载好的Mysql压缩包，解压后上传到Linux系统中。
![image.png](https://images.juwuhe.top/i/2022/06/08/xsh1ng-3.png)
在使用rpm -vih ... 出现一下错误时，也就是安装包依赖问题，请在末尾添加 **--nodeps --force，**其作用就是在安装时，忽略关系。

```shell
warning: mysql-community-server-8.0.29-1.el7.x86_64.rpm: Header V4 RSA/SHA256 Signature, key ID 3a79bd29: NOKEY
error: Failed dependencies:
        mysql-community-client(x86-64) >= 8.0.11 is needed by mysql-community-server-8.0.29-1.el7.x86_64
        mysql-community-common(x86-64) = 8.0.29-1.el7 is needed by mysql-community-server-8.0.29-1.el7.x86_64
        mysql-community-icu-data-files = 8.0.29-1.el7 is needed by mysql-community-server-8.0.29-1.el7.x86_64
```

```shell
#安装目录
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock

#日志存储位置
log-error=/var/log/mysqld.log
pid-file=/var/run/mysqld/mysqld.pid
```

3. 启动数据库

```shell
#启动数据库
systemctl start mysqld

#查看默认用户的密码
grep 'temporary password' /var/log/mysqld.log

#使用默认账户登录- v,PW-2lwqbtx，此为我的默认密码
mysql -u root -p

#或者修改配置文件-实现免登录需要root管理员-不推荐
vi /etc/my.cnf

添加 skip-grant-tables

#重启输几局库
systemctl restart mysqld
```

4. 用户修改

```shell
#修改密码强度
set global validate_password_policy=LOW; 

#修改密码的长度
set global validate_password_length=4;

#修改密码
alter user 'root'@'localhost' identified by 'root'

#刷新权限
flush privileges;

#创建新用户
INSERT INTO user 
          (host, user, password, 
           select_priv, insert_priv, update_priv) 
           VALUES ('localhost', 'silenti', 
           PASSWORD('root'), 'Y', 'Y', 'Y');
          
#勇猛密码策略
validate_password_length 密码长度
validate_password_dictionary_file 密码验证的文件路径
validate_password_mixed_case_count
validate_password_number_count
validate_password_policy 密码强度，默认MEDIUM（验证长度、数字、大小写、特殊字符），Low（验证长度）
```

5. Linux中数据库相关命令

- 启动数据库

```shell
systemctl start mysqld
```

   - 重启数据库

```shell
systemctl restart mysqld
```

   - 查看mysql运行情况

```shell
systemctl status mysqld
```

![image.png](https://images.juwuhe.top/i/2022/06/08/xsiyh9-3.png)

## 卸载Mysql

```shell
#查看mysql程序
rpm -qa | grep mysql

#卸载所有
rpm -e msyql-*
```

## 连接Mysql

通过native for mysql 连接数据库，出现错误`1130 - Host 'xxx.xxx.xxx.x' is not allowed to connect to this MySQL server`。

1. 出现原因

出现该问题的原因，可能为3306端口未开启，或者虚拟机中mysql中host为本地localhost。
![image.png](https://images.juwuhe.top/i/2022/06/08/xskhqu-3.png)
		

2. 解决方法

- 开启端口

```shell
#添加指定需要开放的端口：
firewall-cmd --add-port=3306/tcp --permanent

#重载入添加的端口：
firewall-cmd --reload

#查询指定端口是否开启成功：
firewall-cmd --query-port=3306/tcp
```

- 查询host

```shell
#进入mysql
mysql -u root -p

use mysql

#获取host信息
select user,host from user;

```

![image.png](https://images.juwuhe.top/i/2022/06/08/xslffe-3.png)

- 修改host

```shell
#修改用户host
update user set host = '% or IP地址' where user = 'root';

#更新权限
flush privileges

#重启数据库
saystemctl restart mysqld
```

4. 重新连接

