---
title: 标准
sidebar_position: 1
---

## Introduction

R2DBC stands for Reactive Relational Database Connectivity.

R2DBC specifies a **service-provider interface (SPI)** that is intended to be implemented by driver vendors and used by client libraries.

You can also use the R2DBC SPI to interact with **multiple data sources** in a distributed, heterogeneous environment.

## Goals

The R2DBC SPI aims for being primarily consumed though client library implementations

## Overview

A primary motivation for R2DBC SPI is to provide a standard API for reactive applications to integrate with a wide variety of data sources.

### Establishing a Connection

R2DBC uses the Connection interface to define a logical connection API to the underlying data source

#### Using ConnectionFactory Discovery

A typical use case is the separation of concerns in which data-source coordinates are supplied by using a URL while login credentials originate from a different configuration source.

#### R2DBC Connection URL

```
r2dbc:a-driver:pipes://localhost:3306/my_database?locale=en_US
\___/ \______/ \___/   \____________/\__________/\___________/
  |       |      |           |           |           |
scheme  driver  protocol  authority    path        query
```

```java
ConnectionFactory factory = ConnectionFactories.get("r2dbc:a-driver:pipes://localhost:3306/my_database?locale=en_US");
```

### Running SQL and Retrieving Results

Applications use methods in the Connection interface to specify transaction attributes and create Statement or Batch objects. These statements are used to execute SQL and retrieve results and allow for binding values to parameter bind markers. The Result interface encapsulates the results of an SQL query. Statements may also be batched, allowing an application to submit multiple commands to a database as a single unit of execution.

## Connections

From a R2DBC driver perspective, a Connection object represents a single client session. It has associated state information, such as user ID and what transaction semantics are in effect.

A connection object can be shared across multiple threads that serially run operations by **using appropriate synchronization mechanisms.**

### The ConnectionFactory Interface

```java
public interface ConnectionFactory {

    Publisher<? extends Connection> create();

    ConnectionFactoryMetadata getMetadata();

}
```

### ConnectionFactory Discovery Mechanism

Drivers must include a file called **META-INF/services/io.r2dbc.spi.ConnectionFactoryProvider**

```java
public interface ConnectionFactoryProvider {

    ConnectionFactory create(ConnectionFactoryOptions connectionFactoryOptions);

    boolean supports(ConnectionFactoryOptions connectionFactoryOptions);

    String getDriver();

}
```

### The ConnectionFactoryOptions Class

```java
ConnectionFactoryOptions options = ConnectionFactoryOptions.builder()
    .option(ConnectionFactoryOptions.HOST, "…")
    .option(Option.valueOf("tenant"), "…")
    .option(Option.sensitiveValueOf("encryptionKey"), "…")
    .build();
```

### Obtaining Connection Objects

```java
// factory is a ConnectionFactory object
Publisher<? extends Connection> publisher = factory.create();
```

### Connection Metadata

```java
public interface ConnectionMetadata {

    String getDatabaseProductName();

    String getDatabaseVersion();

}
```

### Validating Connection Objects

The `Connection.validate(…)` method indicates whether the Connection is still valid. The ValidationDepth argument passed to this method indicates the depth to which a connection should be validated: **LOCAL or REMOTE.**

### Closing Connection Objects

```java
// connection is a ConnectionFactory object
Publisher<Void> close = connection.close();
```

## Transactions

### Transaction Boundaries

You can **implicitly or explicitly** start transactions

### Auto-commit Mode

A ConnectionFactory creates new Connection objects **with auto-commit mode enabled**, unless specified otherwise through connection configuration options.

If the value of auto-commit is changed during an active transaction, the current transaction is committed. 

### Transaction Isolation

The default transaction level for a Connection object is **vendor-specific and determined by the driver** that supplied the connection

### Savepoints

- createSavepoint
- releaseSavepoint
- rollbackTransactionToSavepoint

## Statements

### The Statement Interface

```java
// connection is a Connection object
Statement statement = connection.createStatement("SELECT title FROM books");
```

Each Connection object can create multiple Statement objects that the program can **concurrently run** at any time.

```java
// statement is a Statement object
Publisher<? extends Result> publisher = statement.execute();
```

### Parameterized Statements

The SQL that is used to create a statement can be parameterized by using vendor-specific bind markers. **The portability of SQL statements across R2DBC implementations is not a goal.**

```java
// connection is a Connection object
Statement statement1 = connection.createStatement("SELECT title FROM books WHERE author = :author");

Statement statement2 = connection.createStatement("SELECT title FROM books WHERE author = @P0");

Statement statement3 = connection.createStatement("SELECT title FROM books WHERE author = $1");
```

#### Binding Parameters

```java
// connection is a Connection object
Statement statement = connection.createStatement("SELECT title FROM books WHERE author = $1 and publisher = $2");
statement.bind("$1", "John Doe");
statement.bind("$2", "Happy Books LLC");
```

```java
// connection is a Connection object
Statement statement = connection.createStatement("SELECT title FROM books WHERE author = $1 and publisher = $2");
statement.bind(0, "John Doe");
statement.bind(1, "Happy Books LLC");
```

The execute method validates a parameterized Statement and throws an IllegalStateException if a bind marker is left without a binding.

#### Batching

```java
// connection is a Connection object
Statement statement = connection.createStatement("INSERT INTO books (author, publisher) VALUES ($1, $2)");
statement.bind(0, "John Doe").bind(1, "Happy Books LLC").add();
statement.bind(0, "Jane Doe").bind(1, "Scary Books Inc");
Publisher<? extends Result> publisher = statement.execute();
```

#### Setting NULL Parameters

```java
// statement is a Statement object
statement.bindNull(0, String.class);
```

### Retrieving Auto Generated Values

```java
// connection is a Connection object
Statement statement = connection.createStatement("INSERT INTO books (author, publisher) VALUES ('John Doe', 'Happy Books LLC')").returnGeneratedValues("id");
Publisher<? extends Result> publisher = statement.execute();

// later
result.map((row, metadata) -> row.get("id"));
```

## Batches

The Batch interface defines methods for running groups of SQL statements. SQL statements **may not contain parameter bind markers** for input parameters. A batch is created to run multiple SQL statements for performance reasons.

```java
// connection is a Connection object
Batch batch = connection.createBatch();
Publisher<? extends Result> publisher = batch.add("SELECT title, author FROM books")
    .add("INSERT INTO books VALUES('John Doe', 'HappyBooks LLC')")
    .execute();
```

## Results

### Result Characteristics

two result types
- Tabular results
- Update count

it contains the rows that satisfy the query at **either the time the query is run or as the rows are retrieved**. An R2DBC driver can obtain a Result **either directly or by using cursors.**

```java
// result is a Result object
Publisher<Integer> rowsUpdated = result.getRowsUpdated();
```

### Creating Result Objects

```java
// connection is a Connection object
Statement statement = connection.createStatement("SELECT title, author FROM books");
Publisher<? extends Result> results = statement.execute();
```

### Rows

The Result interface provides a map(…) method for retrieving values from Row objects. The map method accepts a BiFunction (also referred to as mapping function) object that accepts **Row and RowMetadata**

A Row is only valid during the mapping function callback and is **invalid outside of the mapping function callback.** Thus, Row objects must be entirely consumed by the mapping function.

### Interface Methods

- `Object get(int)`
- `Object get(String)`
- `<T> T get(int, Class<T>)`
- `<T> T get(String, Class<T>)`

```java
// result is a Result object
Publisher<Object> values = result.map((row, rowMetadata) -> row.get(0));

// result is a Result object
Publisher<Object> titles = result.map((row, rowMetadata) -> row.get("title"));

// result is a Result object
Publisher<String> values = result.map((row, rowMetadata) -> row.get(0, String.class));

// result is a Result object
Publisher<Book> values = result.map((row, rowMetadata) -> {
    String title = row.get("title", String.class);
    String author = row.get("author", String.class);

    return new Book(title, author);
});
```

Calling get without specifying a target type returns a suitable value representation according to **Mapping of Data Types.**

## Column and Row Metadata

RowMetadata exposes ColumnMetadata for each column in the result.

### Obtaining a RowMetadata Object

```java
// result is a Result object
result.map(new BiFunction<Row, RowMetadata, Object>() {

    @Override
    public Object apply(Row row, RowMetadata rowMetadata) {
        ColumnMetadata my_column = rowMetadata.getColumnMetadata("my_column");
        ColumnMetadata.Nullability nullability = my_column.getNullability();
        // …
    }
})
```

## Retrieving ColumnMetadata

- `getColumnMetadata(int)`
- `getColumnMetadata(String)`
- `getColumnMetadatas()`

### Retrieving General Information for a Column

```java
row.getColumnMetadatas().forEach(columnMetadata -> {

    String name = columnMetadata.getName();
    Integer precision = columnMetadata.getPrecision();
    Integer scale = columnMetadata.getScale();
});
```

## Exceptions

### General Exceptions

- IllegalArgumentException
- IllegalStateException
- UnsupportedOperationException
- R2dbcException: Drivers throw an instance of R2dbcException when an error occurs during an interaction with a data source.

### Categorized Exceptions

#### Non-Transient Exceptions

A non-transient exception must extend the abstract class, **R2dbcNonTransientException**

- R2dbcBadGrammarException
- R2dbcDataIntegrityViolationException
- R2dbcPermissionDeniedException
- R2dbcNonTransientResourceException

#### Transient Exceptions

A transient exception must extend the abstract class, **R2dbcTransientException.**

- R2dbcRollbackException
- R2dbcTimeoutException
- R2dbcTransientResourceException

## Data Types

### Mapping of Data Types

- Character Types
- Boolean Types
- Binary Types
- Numeric Types
- Datetime Types
- Collection Types

### Mapping of Advanced Data Types

```java
// charstream is a Publisher<String> object
  // statement is a Statement object
Clob clob = Clob.from(charstream);
statement.bind("text", clob);

// result is a Row object
Publisher<Clob> clob = result.map((row, rowMetadata) -> row.get("clob", Clob.class));

// clob is a Clob object
Publisher<CharSequence> charstream = clob.stream();

// clob is a Clob object
Publisher<Void> charstream = clob.discard();
charstream.subscribe(…);
```

## Extensions

```java
class ConnectionWrapper implements Connection, Wrapped<Connection> {

    private final Connection wrapped;

    @Override
    public Connection unwrap() {
        return this.wrapped;
    }

    // constructors and implementation methods omitted for brevity.
}

// connection is a Connection object implementing Wrapped

if (connection instanceof Wrapped) {
    connection = ((Wrapped<Connection>) connection).unwrap();
}
```
