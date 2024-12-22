
[https://www.mongodb.com/docs/mongodb-shell/connect/](https://www.mongodb.com/docs/mongodb-shell/connect/)

## Connect to a Local Deployment on the Default Port

```shell
mongosh

mongosh "mongodb://localhost:27017"
```

## Connect to a Local Deployment on a Non-Default Port

```shell
mongosh "mongodb://localhost:28015"

mongosh --port 28015
```

## Connect to a Deployment on a Remote Host

```shell
mongosh "mongodb://mongodb0.example.com:28015"

mongosh --host mongodb0.example.com --port 28015
```

## Specify Connection Options

### Connect With Authentication

```shell
mongosh "mongodb://mongodb0.example.com:28015" --username alice --authenticationDatabase admin
```

### Connect to a Specific Database

```shell
mongosh "mongodb://localhost:27017/qa"
```
