---
sidebar_position: 2
---

The Oodle suite of cross-platform **data compression** solutions are now fully integrated with Unreal Engine. With Oodle, you can make games **smaller to download**, make levels load faster, and compress network packets for improved player experience.

## Oodle Data

Oodle Data provides a **compression format for .pak** files and IOStore files.

### Key Concepts for Oodle Data

Oodle Data exposes two controls for managing the output: The **compression method** and the **compression level**.

### Enabling Oodle Data

The baseline method for enabling it is using the **Packaging settings** in the **Project Settings window**.

## Oodle Network

Oodle Network exposes a compression system for network streams. Integrating this into your project is a bit more hands-on compared with other Oodle solutions, requiring packet captures, familiarity with BaseEngine.ini, and offline ‘training' of the compressor. It **uses the offline training step to dramatically speed up the compression time**.

需要training，如果应用模式变了需要重新抓包，重新training。

## Oodle Texture

Oodle Texture provides fast, high quality **compression of textures** to the various BCn/DXTn formats.


