---
title: Operators
---

## Binary operators

## Vector matching

### One-to-one vector matches

```r
method_code:http_errors:rate5m{code="500"} / ignoring(code) method:http_requests:rate5m
```

### Many-to-one and one-to-many vector matches

```r
method_code:http_errors:rate5m / ignoring(code) group_left method:http_requests:rate5m
```

## Aggregation operators

Prometheus supports the following built-in aggregation operators that can be used to aggregate the elements of a single instant vector, resulting in a new vector of fewer elements with aggregated values:

- sum (calculate sum over dimensions)
- min (select minimum over dimensions)
- max (select maximum over dimensions)
- avg (calculate the average over dimensions)
- group (all values in the resulting vector are 1)
- stddev (calculate population standard deviation over dimensions)
- stdvar (calculate population standard variance over dimensions)
- count (count number of elements in the vector)
- count_values (count number of elements with the same value)
- bottomk (smallest k elements by sample value)
- topk (largest k elements by sample value)
- quantile (calculate φ-quantile (0 ≤ φ ≤ 1) over dimensions)

These operators can either be used to aggregate over all label dimensions or preserve distinct dimensions by including a `without` or `by` clause

```r
<aggr-op> [without|by (<label list>)] ([parameter,] <vector expression>)

<aggr-op>([parameter,] <vector expression>) [without|by (<label list>)]
```

```r
sum without (instance) (http_requests_total)

sum by (application, group) (http_requests_total)

count_values("version", build_version)

topk(5, http_requests_total)
```
