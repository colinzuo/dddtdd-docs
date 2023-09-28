---
title: Functions
---

## delta()

`delta(v range-vector)` calculates the difference between the first and last value of each time series element in a range vector v, returning an instant vector with the given deltas and equivalent labels

```r
delta(cpu_temp_celsius{host="zeus"}[2h])
```

## increase()

`increase(v range-vector)` calculates the increase in the time series in the range vector

```r
increase(http_requests_total{job="api-server"}[5m])
```

increase should only be used with counters

It is syntactic sugar for `rate(v)` multiplied by the number of seconds under the specified time range window, and should be used primarily for human readability. Use rate in recording rules so that increases are tracked consistently on a per-second basis.

## irate()

`irate(v range-vector)` calculates the **per-second instant rate** of increase of the time series in the range vector. This is based on the **last two data points**

```r
irate(http_requests_total{job="api-server"}[5m])
```

`irate` should only be used when graphing volatile, fast-moving counters. Use `rate` for alerts and slow-moving counters, as brief changes in the rate can reset the FOR clause and graphs consisting entirely of rare spikes are hard to read.

## rate()

`rate(v range-vector)` calculates the per-second average rate of increase of the time series in the range vector

```r
rate(http_requests_total{job="api-server"}[5m])
```

rate should only be used with counters

It is best suited for alerting, and for graphing of slow-moving counters

