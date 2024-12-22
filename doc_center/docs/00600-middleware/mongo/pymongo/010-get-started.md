# Get Started with PyMongo

## Download and Install

```shell
python3 -m pip install pymongo
```

## Connect to MongoDB

```py
from pymongo import MongoClient

uri = "<connection string URI>"
client = MongoClient(uri)
```
