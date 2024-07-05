
[https://dev.mysql.com/doc/refman/8.0/en/backup-and-recovery.html](https://dev.mysql.com/doc/refman/8.0/en/backup-and-recovery.html)

## Backup And Recovery Types

### Physical (Raw) Versus Logical Backups

- Physical backup methods are faster than logical because they involve only file copying without conversion.
- Backups can be performed while the MySQL server is not running. If the server is running, it is necessary to perform appropriate **locking** so that the server does not change database contents during the backup

### Online Versus Offline Backups

**Online backups** take place while the MySQL server is running so that the database information can be obtained from the server. **Offline backups** take place while the server is stopped. This distinction can also be described as “hot” versus “cold” backups; a **“warm” backup** is one where the server remains running but locked against modifying data while you access database files externally

#### Offline backup methods have these characteristics

- Clients can be affected adversely because the server is unavailable during backup. For that reason, such backups are often taken **from a replica** that can be taken offline without harming availability.
- The backup procedure is **simpler** because there is no possibility of interference from client activity

## Database Backup Methods

### Workbench


