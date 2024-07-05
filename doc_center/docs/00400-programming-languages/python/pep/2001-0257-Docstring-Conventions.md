
[https://peps.python.org/pep-0257/](https://peps.python.org/pep-0257/)
[https://docs.python.org/3/tutorial/controlflow.html#documentation-strings](https://docs.python.org/3/tutorial/controlflow.html#documentation-strings)

## Handling Docstring Indentation

Docstring processing tools will **strip a uniform amount of indentation from the second and further lines of the docstring, equal to the minimum indentation of all non-blank lines after the first line**. Any indentation in the first line of the docstring (i.e., up to the first newline) is insignificant and removed. Relative indentation of later lines in the docstring is retained. **Blank lines should be removed from the beginning and end of the docstring.**

