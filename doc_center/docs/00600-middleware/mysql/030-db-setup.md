
## create db

```sql
CREATE SCHEMA `zhiyoufy_20231114` ;
```

## assign permission to user

```sql
GRANT ALL
  ON zhiyoufy_20231114.*
  TO 'zhiyoufy'@'%'
  WITH GRANT OPTION;
```
