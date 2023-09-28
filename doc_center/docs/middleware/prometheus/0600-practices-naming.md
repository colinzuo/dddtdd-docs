---
title: Metric and label naming
---

## Metric names

- should have a (single-word) application prefix relevant to the domain the metric belongs to. The prefix is sometimes referred to as `namespace` by client libraries
    + `prometheus`_notifications_total (specific to the Prometheus server)
    + `process`_cpu_seconds_total (exported by many client libraries)
    + `http`_request_duration_seconds (for all HTTP requests)
- must have a single unit (i.e. do not mix seconds with milliseconds, or seconds with bytes)
- should use base units (e.g. seconds, bytes, meters - not milliseconds, megabytes, kilometers)
- should have a suffix describing the unit, in plural form. Note that an accumulating count has total as a suffix, in addition to the unit if applicable
    + http_request_duration_`seconds`
    + node_memory_usage_`bytes`
    + http_requests_`total` (for a unit-less accumulating count)
    + process_cpu_seconds_`total` (for an accumulating count with unit)
    + foobar_build_`info` (for a pseudo-metric that provides metadata about the running binary)
    + data_pipeline_last_record_processed_timestamp_`seconds` (for a timestamp that tracks the time of the latest record processed in a data processing pipeline)

As a rule of thumb, either the `sum()` or the `avg()` over all dimensions of a given metric should be **meaningful** (though not necessarily useful). If it is not meaningful, split the data up into multiple metrics

## Base units

- Time	seconds
- Bytes	bytes
- Percent	ratio	Values are 0–1 (rather than 0–100). ratio is only used as a suffix for names like disk_usage_ratio. The usual metric name follows the pattern A_per_B
