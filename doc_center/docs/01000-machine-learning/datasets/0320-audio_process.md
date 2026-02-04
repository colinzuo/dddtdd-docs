
[https://huggingface.co/docs/datasets/audio_process](https://huggingface.co/docs/datasets/audio_process)

## Cast

```py
from datasets import load_dataset, Audio

dataset = load_dataset("PolyAI/minds14", "en-US", split="train")
dataset = dataset.cast_column("audio", Audio(sampling_rate=16000))
```

```py
audio = dataset[0]["audio"]
audio = audio_dataset[0]["audio"]
samples = audio.get_all_samples()
samples.data
samples.sample_rate
```

## Map

```py
from transformers import AutoTokenizer, AutoFeatureExtractor, AutoProcessor

model_checkpoint = "facebook/wav2vec2-large-xlsr-53"
tokenizer = AutoTokenizer("./vocab.json", unk_token="[UNK]", pad_token="[PAD]", word_delimiter_token="|")
feature_extractor = AutoFeatureExtractor.from_pretrained(model_checkpoint)
processor = AutoProcessor.from_pretrained(feature_extractor=feature_extractor, tokenizer=tokenizer)
```


