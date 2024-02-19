
## cleanup

```sql
SET SQL_SAFE_UPDATES = 0;
delete FROM database.table where timestamp < '2023-01-01';

OPTIMIZE TABLE database.table;
```

```sql
SELECT * FROM database.table order by id desc LIMIT 0, 1000;

delete FROM database.table where id < ID_Value;
```