# Get Started with PyMongo

[https://www.mongodb.com/docs/languages/python/pymongo-driver/current/](https://www.mongodb.com/docs/languages/python/pymongo-driver/current/)
[https://pymongo.readthedocs.io/en/stable/](https://pymongo.readthedocs.io/en/stable/)

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
