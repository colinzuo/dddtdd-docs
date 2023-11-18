
<https://en.cppreference.com/w/cpp/language/string_literal>

```text
R"d-char-seq(optional)(r-char-seq(optional))d-char-seq(optional)"

d-char-seq	-	A sequence of one or more d-char s, at most 16 characters long
d-char	-	A character from the basic character set, except parentheses, backslash and spaces
r-char-seq	-	A sequence of one or more r-char s, except that it must not contain the closing sequence )d-char-seq"
r-char	-	A character from the translation character set
```
