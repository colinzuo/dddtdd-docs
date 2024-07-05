---
title: Instrumentation
---

## How to instrument

Every library, subsystem and service should have **at least a few metrics to give you a rough idea of how it is performing**

### Online-serving systems

An online-serving system is one where a human or another system is **expecting an immediate response**

The key metrics in such a system are the number of performed queries, errors, and latency. The number of in-progress requests can also be useful

Be consistent in whether you count queries when they start or when they end. **When they end is suggested**, as it will line up with the error and latency stats, and tends to be easier to code

### Offline processing

For offline processing, no one is actively waiting for a response, and batching of work is common. There may also be multiple stages of processing.

For each stage, track the items `coming in`, how many are `in progress`, the last time you processed something, and how many items were `sent out`. If batching, you should also track batches going in and out

### Batch jobs

There is a fuzzy line between offline-processing and batch jobs, as offline processing may be done in batch jobs. Batch jobs are distinguished by the fact that they **do not run continuously**, which makes scraping them difficult

The key metric of a batch job is the `last time it succeeded`. It is also useful to track how long each major stage of the job took, the overall runtime and the last time the job completed (successful or failed). These are all gauges, and should be pushed to a PushGateway. There are generally also some overall job-specific statistics that would be useful to track, such as the total number of records processed

### Libraries

If it is a library used to access some resource outside of the process (for example, network, disk, or IPC), track the overall query `count`, `errors` (if errors are possible) and `latency` at a minimum

### Failures

Every time there is a failure, a counter should be incremented. Unlike logging, the error may also bubble up to a more general error counter depending on how your code is structured

When reporting failures, you should generally have some other metric representing the total number of attempts. This makes the failure ratio easy to calculate

### Threadpools

For any sort of threadpool, the key metrics are the `number of queued requests`, the `number of threads in use`, the `total number of threads`, the `number of tasks processed`, and `how long they took`. It is also useful to track how long things were waiting in the queue

## Things to watch out for

### Use labels

When you have multiple metrics that you want to add/average/sum, they should usually be one metric with labels rather than multiple metrics

For example, rather than http_responses_500_total and http_responses_403_total, create a single metric called http_responses_total with a code label for the HTTP response code. You can then process the entire metric as one in rules and graphs

### Do not overuse labels

Each labelset is an additional time series that has RAM, CPU, disk, and network costs

As a general guideline, try to keep the cardinality of your metrics below 10

The vast majority of your metrics should have no labels

### Timestamps, not time since

With the timestamp exported, you can use the expression `time() - my_timestamp_metric` to calculate the time since the event, removing the need for update logic


