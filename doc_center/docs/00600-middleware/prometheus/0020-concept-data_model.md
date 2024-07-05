---
title: DATA MODEL
---

Every time series is uniquely identified by its **metric name** and optional **key-value pairs called labels**

**metric name** must match the regex `[a-zA-Z_:][a-zA-Z0-9_:]*`

**Label names** must match the regex `[a-zA-Z_][a-zA-Z0-9_]*`. Label names beginning with __ (two "_") are reserved for internal use

**Label values** may contain any Unicode characters

A label with an **empty label value** is considered equivalent to a label that does not exist

Each sample consists of:

- a float64 value
- a millisecond-precision timestamp
