---
title: 账户
---

## account-names

[https://dev.mysql.com/doc/refman/8.0/en/account-names.html](https://dev.mysql.com/doc/refman/8.0/en/account-names.html)

MySQL account names consist of a user name and a host name, which enables creation of distinct accounts for users with the same user name who connect from different hosts

- Account name syntax is 'user_name'@'host_name'
- The @'host_name' part is optional. An account name consisting only of a user name is equivalent to 'user_name'@'%'

MySQL stores account names in grant tables in the mysql system database using separate columns for the user name and host name parts

- For access-checking purposes, comparisons of User values are case-sensitive. Comparisons of Host values are not case-sensitive

## Alter User

[https://dev.mysql.com/doc/refman/8.0/en/alter-user.html](https://dev.mysql.com/doc/refman/8.0/en/alter-user.html)

For each affected account, ALTER USER modifies the corresponding row in the mysql.user system table to reflect the properties specified in the statement. Unspecified properties retain their current values

For ALTER USER syntax that permits an auth_option value to follow a user value, **auth_option** indicates how the account authenticates by specifying an **account authentication plugin**, credentials (for example, a password), or both

### The Default Authentication Plugin

[https://dev.mysql.com/doc/refman/8.0/en/pluggable-authentication.html#pluggable-authentication-default-plugin](https://dev.mysql.com/doc/refman/8.0/en/pluggable-authentication.html#pluggable-authentication-default-plugin)

```sql
SHOW VARIABLES LIKE '%default_authentication%';

# default_authentication_plugin	mysql_native_password
```

## Password

Assigning a new `root`@localhost` password

```
mysql> ALTER USER ‘root’@‘localhost’ IDENTIFIED BY ‘new-password’;

ALTER USER user
  IDENTIFIED WITH caching_sha2_password
  BY 'password';
```  

## User and Grant

[https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html](https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html)

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

