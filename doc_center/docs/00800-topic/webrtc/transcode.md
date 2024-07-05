---
title: 转码
---

必须要设设置"dump_extra=freq=keyframe"，否则chrome那里用
janus streaming test测试时候看不到视频。

使用老版本janus时必须设置-x264opts threads=1，否则浏览器观看会有马赛克

```bash
in_file=$1
out_file=$2

# https://github.com/FFmpeg/FFmpeg/blob/3fbc74582f9c3bb941fd63f59fdf25dd16a98a6c/libavcodec/options_table.h
options="-y -tune zerolatency -g 60 -bf 0 -flags:v +global_header -bsf:v "dump_extra=freq=keyframe" -profile:v high -level:v 3.1 -crf 23 -minrate
 50k -maxrate 210K -bufsize 210K -an -c:v libx264 -x264opts threads=1 -r 15 -s 640x480"

echo "ffmpeg -i ${in_file} ${options} ${out_file}"

ffmpeg -i ${in_file} ${options} ${out_file}
```