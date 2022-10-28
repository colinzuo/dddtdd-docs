
## Infinite iterators

- count:  `count(10)`
- cycle:  `cycle('ABCD')`
- repeat:  `repeat(10, 3)`

## Iterators terminating on the shortest input sequence

- accumulate: `accumulate([1,2,3,4,5])`
- chain: `chain('ABC', 'DEF')`
- chain.from_iterable: `chain.from_iterable(['ABC', 'DEF'])`
- dropwhile: `dropwhile(lambda x: x<5, [1,4,6,4,1])`
- filterfalse: `filterfalse(lambda x: x%2, range(10))`
- islice: `islice('ABCDEFG', 2, None)`
- starmap: `starmap(pow, [(2,5), (3,2), (10,3)])`
- takewhile: `takewhile(lambda x: x<5, [1,4,6,4,1])`
- zip_longest: `zip_longest('ABCD', 'xy', fillvalue='-')`

## Combinatoric iterators

- product
- permutations
- combinations
- combinations_with_replacement
