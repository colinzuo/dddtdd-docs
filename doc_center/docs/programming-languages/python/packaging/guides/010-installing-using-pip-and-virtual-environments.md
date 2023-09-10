---
title: Installing packages using pip and virtual environments
---

<https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/>

It is always recommended to use a virtual environment while developing Python applications.

```bash
python3 -m venv env

.\env\Scripts\activate

which python

python3 -m pip install requests

python3 -m pip install requests[security]

python3 -m pip install --editable .

python3 -m pip install requests-2.18.4.tar.gz

python3 -m pip install --no-index --find-links=/local/dir/ requests

python3 -m pip install --index-url http://index.example.com/simple/ SomeProject

python3 -m pip install --extra-index-url http://index.example.com/simple/ SomeProject

python3 -m pip install --upgrade requests

python3 -m pip install -r requirements.txt

python3 -m pip freeze

deactivate
```
