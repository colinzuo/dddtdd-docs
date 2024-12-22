# Connect to MongoDB

## Create a MongoClient

### Connection URI

- `mongodb://` Required. A prefix that identifies this as a string in the standard connection format.
- `username:password` Optional. Authentication credentials. If you include these, the client authenticates the user against the database specified in authSource. For more information about the authSource connection option, see Authentication Mechanisms.
- `host[:port]` Required. The host and optional port number where MongoDB is running. If you don't include the port number, the driver uses the default port, 27017.
- `/defaultauthdb` Optional. The authentication database to use if the connection string includes username:password@ authentication credentials but not the authSource option. If you don't include this component, the client authenticates the user against the admin database.
- `?<options>` Optional. A query string that specifies connection-specific options as `<name>=<value>` pairs. See Specify Connection Options for a full description of these options.

### MongoClient

```py
from pymongo import MongoClient

uri = "mongodb://localhost:27017/"
client = MongoClient(uri)
```

## Specify Connection Options

```py
uri = "mongodb://<hostname>:<port>/?connectTimeoutMS=60000&tls=true"
client = pymongo.MongoClient(uri)
```

```py
uri = "mongodb://<hostname>:<port>"
client = pymongo.MongoClient(uri, connectTimeoutMS=60000, tls=True)
```

## Limit Server Execution Time

When you use PyMongo to perform a server operation, you can also limit the amount of time the server has to finish this operation. To do so, specify a **client-side operation timeout**. The timeout applies **all steps** needed to complete the operation, including server selection, connection checkout, serialization, and server-side execution

### timeout() Method

The timeout you specify **applies to all operations** inside the with block

```py
with pymongo.timeout(10):
    coll.insert_one({"name": "Yngwie"})
    coll.find_one({"name": "Yngwie"})
```

### timeoutMS Connection Option

```py
client = pymongo.MongoClient("mongodb://<db_username>:<db_password>@<hostname:<port>",
                             timeoutMS=10000)
```

```py
uri = "mongodb://<db_username>:<db_password>@<hostname:<port>/?timeoutMS=10000"
client = pymongo.MongoClient(uri)
```
