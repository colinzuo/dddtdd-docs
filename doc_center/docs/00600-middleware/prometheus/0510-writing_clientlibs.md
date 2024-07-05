---
title: Writing Client Libraries
---

## Conventions

The common use cases are (in order):

- `Counters` without labels spread liberally around libraries/applications.
- Timing functions/blocks of code in `Summaries/Histograms`.
- `Gauges` to track current states of things (and their limits).
- Monitoring of batch jobs

## Overall structure

Clients MUST be written to be **callback based** internally

The key class is the `Collector`. This has a method (typically called `collect`) that **returns zero or more metrics and their samples**. Collectors get registered with a `CollectorRegistry`. Data is exposed by passing a CollectorRegistry to a class/method/function "bridge", which returns the metrics in a format Prometheus supports. Every time the CollectorRegistry is scraped it must callback to each of the Collectors’ collect method

The interface **most users** interact with are the Counter, Gauge, Summary, and Histogram `Collectors`. These represent a **single metric**, and should cover the vast majority of use cases where a user is instrumenting their own code

`CollectorRegistry` SHOULD offer `register()/unregister()` functions, and a Collector SHOULD be allowed to be registered to multiple CollectorRegistrys.

Client libraries MUST be **thread safe**

## Metrics

The `Counter`, `Gauge`, Summary and `Histogram` metric types are the primary interface by users.

These should be **primarily used as file-static variables**, that is, global variables defined in the same file as the code they’re instrumenting

There MUST be a **default CollectorRegistry**, the standard metrics MUST by **default implicitly register into it** with no special work required by the user. There **MUST be a way** to have metrics not register to the default CollectorRegistry, for use in batch jobs and unittests

### Counter

`Counter` is a monotonically increasing counter. It MUST NOT allow the value to decrease, however it MAY be reset to `0` (such as by server restart)

A counter MUST have the following methods:

- `inc()`: Increment the counter by 1
- `inc(double v)`: Increment the counter by the given amount. MUST check that v >= 0

Counters MUST start at 0

### Gauge

Gauge represents a value that can go up and down

A gauge MUST have the following methods:

- `inc()`: Increment the gauge by 1
- `inc(double v)`: Increment the gauge by the given amount
- `dec()`: Decrement the gauge by 1
- `dec(double v)`: Decrement the gauge by the given amount
- `set(double v)`: Set the gauge to the given value

### Histogram

Histograms allow aggregatable distributions of events, such as **request latencies**. This is at its core a **counter per bucket**

A histogram MUST offer a way to manually choose the buckets. Ways to set buckets in a `linear(start, width, count)` and `exponential(start, factor, count)` fashion SHOULD be offered. Count MUST include the `+Inf` bucket

A histogram MUST have the following methods:

- `observe(double v)`: Observe the given amoun

### Labels

Client libraries **MUST NOT** allow users to have different label names for the same metric for Gauge/Counter/Summary/Histogram or any other Collector offered by the library

While labels are powerful, the majority of metrics will not have labels

A client library MUST allow for optionally specifying a list of label names at Gauge/Counter/Summary/Histogram **creation time**

The Child returned by `labels()` SHOULD be cacheable by the user, to avoid having to look it up again - this matters in latency-critical code

## Performance considerations

In our experience the least performant is `mutexes`.

Processor `atomic` instructions tend to be in the middle, and generally acceptable
