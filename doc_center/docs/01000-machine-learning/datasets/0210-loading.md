
[https://huggingface.co/docs/datasets/loading](https://huggingface.co/docs/datasets/loading)

## Hugging Face Hub

```py
dataset = load_dataset(
  "lhoestq/custom_squad",
  revision="main"  # tag name, or branch name, or commit hash
)
```

```py
from datasets import load_dataset

c4_subset = load_dataset("allenai/c4", data_files="en/c4-train.0000*-of-01024.json.gz")

c4_subset = load_dataset("allenai/c4", data_dir="en")
```

```py
data_files = {"validation": "en/c4-validation.*.json.gz"}
c4_validation = load_dataset("allenai/c4", data_files=data_files, split="validation")
```

## Local and remote files

### JSON

```py
from datasets import load_dataset
dataset = load_dataset("json", data_files="my_file.json")
```

### Parquet

Parquet files are stored in a **columnar format**, unlike row-based files like a CSV. Large datasets may be stored in a Parquet file because it is **more efficient and faster** at returning your query.

```py
from datasets import load_dataset
dataset = load_dataset("parquet", data_files={'train': 'train.parquet', 'test': 'test.parquet'})
```

### Arrow

Arrow files are stored in an in-memory columnar format, unlike row-based formats like CSV and **uncompressed formats like Parquet.**

```py
from datasets import load_dataset
dataset = load_dataset("arrow", data_files={'train': 'train.arrow', 'test': 'test.arrow'})
```

Arrow is the file format used by 🤗 Datasets under the hood

### WebDataset

The WebDataset format is **based on TAR archives** and is suitable for big image datasets

## Troubleshooting

When you create a dataset from local files, the Features are **automatically inferred by Apache Arrow**. However, the dataset’s features may not always align with your expectations, or you may want to define the features yourself. The following example shows how you can add custom labels with the `ClassLabel` feature.

```py
class_names = ["sadness", "joy", "love", "anger", "fear", "surprise"]
emotion_features = Features({'text': Value('string'), 'label': ClassLabel(names=class_names)})

dataset = load_dataset('csv', data_files=file_dict, delimiter=';', column_names=['text', 'label'], features=emotion_features)

dataset['train'].features
```
