
<https://peps.python.org/pep-0621/>

## Motivation

The key motivators of this PEP are:

- Encourage users to specify core metadata statically for speed, ease of specification, unambiguity, and deterministic consumption by build back-ends
- Provide a tool-agnostic way of specifying metadata for ease of learning and transitioning between build back-ends
- Allow for more code sharing between build back-ends for the “boring parts” of a project’s metadata

## Specification

The lack of a `[project]` table implicitly means the build back-end will dynamically provide all fields
