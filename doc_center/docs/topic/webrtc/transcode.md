---
title: 转码
---

必须要设设置"dump_extra=freq=keyframe"，否则chrome那里用
janus streaming test测试时候看不到视频。

```bash
in_file=$1
out_file=$2

# https://github.com/FFmpeg/FFmpeg/blob/3fbc74582f9c3bb941fd63f59fdf25dd16a98a6c/libavcodec/options_table.h
options="-y -tune zerolatency -g 60 -bf 0 -flags:v +global_header -bsf:v "dump_extra=freq=keyframe" -profile:v high -level:v 2.0 -crf 23 -b:v 200K -maxrate 210K -bufsize 210K -an -c:v libx264 -r 15 -s 320x240"

echo "ffmpeg -i ${in_file} ${options} ${out_file}"

ffmpeg -i ${in_file} ${options} ${out_file}
```