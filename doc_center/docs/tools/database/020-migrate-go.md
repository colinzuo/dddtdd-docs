
## golang-migrate

<https://github.com/golang-migrate/migrate>

### Create migrations

```bash
migrate create -ext sql -dir db/migrations -seq create_users_table
```

### Run migrations

```bash
migrate -database YOUR_DATABASE_URL -path PATH_TO_YOUR_MIGRATIONS up
```

### Forcing your database version

In case you run a migration that contained an error, migrate will not let you run other migrations on the same database. You will see an error like `Dirty database version 1. Fix and force version`, even when you fix the erred migration

```bash
migrate -path PATH_TO_YOUR_MIGRATIONS -database YOUR_DATABASE_URL force VERSION
```

### Migration Filename Format

```go
{version}_{title}.up.{extension}
{version}_{title}.down.{extension}
```

The title of each migration is unused, and is only for readability. Similarly, the extension of the migration files is not checked by the library, and should be an appropriate format for the database in use

### FAQ

<https://github.com/golang-migrate/migrate/blob/master/FAQ.md>

#### What does "dirty" database mean

Before a migration runs, each database sets a dirty flag. Execution stops if a migration fails and the dirty state persists, which prevents attempts to run more migrations on top of a failed migration. You need to manually fix the error and then "force" the expected version

#### What happens if two programs try and update the database at the same time

Database-specific locking features are used by some database drivers to prevent multiple instances of migrate from running migrations at the same time the same database at the same time. For example, the MySQL driver uses the `GET_LOCK` function, while the Postgres driver uses the `pg_advisory_lock` function
