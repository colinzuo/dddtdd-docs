---
title: 账户
---

## Password

Assigning a new `root`@localhost` password

```
mysql> ALTER USER ‘root’@‘localhost’ IDENTIFIED BY ‘new-password’;

ALTER USER user
  IDENTIFIED WITH caching_sha2_password
  BY 'password';
```  

## User and Grant

https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html

```
CREATE USER 'rcusim'@'localhost'
  IDENTIFIED BY 'brysjhhrhl!';
GRANT ALL
  ON rcusim.*
  TO 'rcusim'@'localhost'
  WITH GRANT OPTION;

CREATE USER 'rcusim'@'%'
  IDENTIFIED BY 'brysjhhrhl!';
GRANT ALL
  ON rcusim.*
  TO 'rcusim'@'%'
  WITH GRANT OPTION;

REVOKE ALL
  ON *.*
  FROM 'finley'@'%.example.com';

DROP USER 'finley'@'localhost';

mysql> CREATE USER ‘lig’@‘localhost’ IDENTIFIED BY ‘S3cr3t’;

mysql> SHOW GRANTS;

mysql> SHOW GRANTS FOR 'test'@'localhost';

mysql> REVOKE DELETE ON test.t1 FROM 'test'@'localhost';

mysql> REVOKE USAGE ON *.* FROM 'test'@'localhost';

GRANT ALL ON menagerie.* TO 'your_mysql_name'@'your_client_host';

```

GRANT OPTION

Enables you to grant to or revoke from other users those privileges that you yourself possess.

To specify an anonymous user in SQL statements, use a quoted empty user name part, such as ''@'localhost'.

