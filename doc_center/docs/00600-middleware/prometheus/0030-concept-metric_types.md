---
title: METRIC TYPES
---

The Prometheus client libraries offer **four core metric types**. These are currently **only differentiated** in the client libraries (to enable APIs tailored to the usage of the specific types) and in the wire protocol. The Prometheus server does not yet make use of the type information and flattens all data into untyped time series

## Counter

A counter is a cumulative metric that represents a **single monotonically increasing counter** whose value can only increase or be reset to zero on restart

## Gauge

A gauge is a metric that represents a **single numerical value** that can arbitrarily go up and down

## Histogram

A histogram samples observations (usually things like request durations or response sizes) and counts them in **configurable buckets**

- cumulative counters for the observation buckets, exposed as `<basename>_bucket{le="<upper inclusive bound>"}`
- the total sum of all observed values, exposed as `<basename>_sum`
- the count of events that have been observed, exposed as `<basename>_count` (identical to `<basename>_bucket{le="+Inf"}` above)

## Summary

calculates configurable quantiles over a sliding time window

[Histograms and summaries](https://prometheus.io/docs/practices/histograms/)
