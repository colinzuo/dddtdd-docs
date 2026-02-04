
[https://huggingface.co/docs/datasets/audio_load](https://huggingface.co/docs/datasets/audio_load)

## Local files

```py
audio_dataset = Dataset.from_dict({"audio": ["path/to/audio_1", "path/to/audio_2", ..., "path/to/audio_n"]}).cast_column("audio", Audio())
audio_dataset[0]["audio"]
```

## AudioFolder with metadata

```py
folder/train/metadata.csv
folder/train/first_audio_file.mp3
folder/train/second_audio_file.mp3
folder/train/third_audio_file.mp3
```

```csv
file_name,transcription
first_audio_file.mp3,znowu się duch z ciałem zrośnie w młodocianej wstaniesz wiosnie i możesz skutkiem tych leków umierać wstawać wiek wieków dalej tam były przestrogi jak siekać głowę jak nogi
second_audio_file.mp3,już u źwierzyńca podwojów król zasiada przy nim książęta i panowie rada a gdzie wzniosły krążył ganek rycerze obok kochanek król skinął palcem zaczęto igrzysko
third_audio_file.mp3,pewnie kędyś w obłędzie ubite minęły szlaki zaczekajmy dzień jaki poślemy szukać wszędzie dziś jutro pewnie będzie posłali wszędzie sługi czekali dzień i drugi gdy nic nie doczekali z płaczem chcą jechać dali
```

```py
dataset = load_dataset("audiofolder", data_dir="/path/to/folder")
```

Metadata can also be specified as JSON Lines, in which case use `metadata.jsonl` as the name of the metadata file.

## Audio decoding

By default, audio files are decoded **sequentially** as torchcodec `AudioDecoder` objects when you iterate on a dataset. However it is possible to speed up the dataset significantly using **multithreaded** decoding

```py
import os
num_threads = num_threads = min(32, (os.cpu_count() or 1) + 4)
dataset = dataset.decode(num_threads=num_threads)
for example in dataset:  # up to 20 times faster !
    ...
```

You can enable multithreading using num_threads. This is especially useful to speed up remote data streaming. However **it can be slower than num_threads=0 for local data on fast disks.**


