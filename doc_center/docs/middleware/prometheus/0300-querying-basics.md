---
title: Querying Basics
---

Prometheus provides a functional query language called **PromQL** (Prometheus Query Language) that lets the user select and aggregate time series data in real time. The result of an expression can either be shown as a graph, viewed as tabular data in Prometheus's expression browser, or consumed by external systems via the **HTTP API**

## Expression language data types

an expression or sub-expression can evaluate to one of four types:

- Instant vector - a set of time series containing a single sample for each time series, all sharing the same timestamp
- Range vector - a set of time series containing a range of data points over time for each time series
- Scalar - a simple numeric floating point value
- String - a simple string value; currently unused

## Literals

### String literals

Strings may be specified as literals in `single quotes`, `double quotes` or `backticks`

No escaping is processed inside backticks

### Float literals

Scalar float values can be written as literal integer or floating-point numbers in the format (whitespace only included for better readability):

```re
[-+]?(
      [0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?
    | 0[xX][0-9a-fA-F]+
    | [nN][aA][nN]
    | [iI][nN][fF]
)
```

## Time series Selectors

### Instant vector selectors

The following label matching operators exist:

- `=`: Select labels that are exactly equal to the provided string.
- `!=`: Select labels that are not equal to the provided string.
- `=~`: Select labels that regex-match the provided string.
- `!~`: Select labels that do not regex-match the provided string

Regex matches are fully anchored. A match of `env=~"foo"` is treated as `env=~"^foo$"`

```r
http_requests_total{environment=~"staging|testing|development",method!="GET"}
```

Label matchers can also be applied to metric names by matching against the internal `__name__` label. For example, the expression http_requests_total is equivalent to `{__name__="http_requests_total"}`

### Range Vector Selectors

a time duration is appended in square brackets (`[]`) at the end of a vector selector to specify how far back in time values should be fetched for each resulting range vector element. The range is a **closed interval**, i.e. samples with timestamps coinciding with either boundary of the range are still included in the selection

```r
http_requests_total{job="prometheus"}[5m]
```

### Time Durations

Time durations are specified as a number, followed immediately by one of the following units:

- ms - milliseconds
- s - seconds
- m - minutes
- h - hours
- d - days - assuming a day has always 24h
- w - weeks - assuming a week has always 7d
- y - years - assuming a year has always 365d

```
5h
1h30m
5m
10s
```

### Offset modifier

```r
sum(http_requests_total{method="GET"} offset 5m)

rate(http_requests_total[5m] offset 1w)
```

### @ modifier

```r
sum(http_requests_total{method="GET"} @ 1609746000)
```

## Gotchas

### Staleness

If a query is evaluated at a sampling timestamp after a time series is marked stale, then no value is returned for that time series. If new samples are subsequently ingested for that time series, they will be returned as normal

If no sample is found (by default) **5 minutes** before a sampling timestamp, no value is returned for that time series at this point in time. This effectively means that time series "disappear" from graphs at times where their latest collected sample is older than 5 minutes or after they are marked stale.


