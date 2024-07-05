
## CUDA

[https://developer.nvidia.com/cuda-downloads](https://developer.nvidia.com/cuda-downloads)

[https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html)
[https://docs.nvidia.com/cuda/archive/11.7.1/cuda-installation-guide-linux/index.html](https://docs.nvidia.com/cuda/archive/11.7.1/cuda-installation-guide-linux/index.html)
[https://docs.nvidia.com/cuda/cuda-quick-start-guide/index.html](https://docs.nvidia.com/cuda/cuda-quick-start-guide/index.html)

### cuda-compatibility

[https://docs.nvidia.com/deploy/cuda-compatibility/index.html](https://docs.nvidia.com/deploy/cuda-compatibility/index.html)

Every CUDA toolkit also ships with an NVIDIA display driver package for convenience

### 安装指定版本CUDA

(From chatgpt)

要安装旧版本的CUDA，您可以按照以下步骤操作：

1. 访问NVIDIA CUDA Toolkit存档页面（https://developer.nvidia.com/cuda-toolkit-archive），在这里您可以找到以前版本的CUDA Toolkit。

2. 选择您想要安装的CUDA版本，然后点击相应的链接进入该版本的下载页面。

3. 在下载页面上，选择您的操作系统、版本等信息，然后下载相应的CUDA Toolkit安装程序。

4. 安装CUDA Toolkit。对于Windows用户，双击下载的安装程序文件并按照安装向导的提示进行操作。对于Linux用户，请参阅NVIDIA提供的安装指南（https://docs.nvidia.com/cuda/archive/）并选择相应版本的安装指南。

5. 在安装过程中，您可能需要配置环境变量，以便系统能够找到CUDA相关的库和工具。对于Windows用户，通常在安装过程中会自动配置环境变量。对于Linux用户，请按照安装指南中的说明配置环境变量。

6. 安装完成后，您可以使用NVIDIA提供的示例代码和工具来验证CUDA安装是否成功。对于Windows用户，可以在开始菜单中找到CUDA Samples并运行相应的示例程序。对于Linux用户，请参阅安装指南中的验证部分。

7. 现在，您已经成功安装了旧版本的CUDA，可以开始使用CUDA进行GPU编程了。

请注意，旧版本的CUDA可能不支持最新的显卡和驱动程序。在安装旧版本的CUDA之前，请确保您的显卡和驱动程序与所选版本的CUDA兼容。您可以在NVIDIA的CUDA GPU支持列表（https://developer.nvidia.com/cuda-gpus）和CUDA Toolkit存档页面上找到相关信息。

### remove cuda

[https://docs.nvidia.com/cuda/archive/11.7.1/cuda-installation-guide-linux/index.html#removing-cuda-tk-and-driver](https://docs.nvidia.com/cuda/archive/11.7.1/cuda-installation-guide-linux/index.html#removing-cuda-tk-and-driver)

### release notes

[https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html](https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html)
[https://docs.nvidia.com/cuda/archive/11.7.1/cuda-toolkit-release-notes/index.html](https://docs.nvidia.com/cuda/archive/11.7.1/cuda-toolkit-release-notes/index.html)

Starting with CUDA 11, the various components in the toolkit are versioned independently

#### 11.7.1

```
NVIDIA Linux Driver	515.65.01	x86_64, POWER, AArch64
```

### pre-installation-actions

[https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html#pre-installation-actions](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html#pre-installation-actions)

- Verify You Have a CUDA-Capable GPU
- Verify You Have a Supported Version of Linux
- Verify the System Has gcc Installed
- Verify the System has the Correct Kernel Headers and Development Packages Installed

### ubuntu 20.04 cuda 11.7.1 installation

[https://developer.nvidia.com/cuda-11-7-1-download-archive?target_os=Linux&target_arch=x86_64&Distribution=Ubuntu&target_version=20.04&target_type=deb_local](https://developer.nvidia.com/cuda-11-7-1-download-archive?target_os=Linux&target_arch=x86_64&Distribution=Ubuntu&target_version=20.04&target_type=deb_local)

Installation using RPM or Debian packages interfaces with your system's package management system. When using RPM or Debian local repo installers, the downloaded package contains a repository snapshot stored on the local filesystem in `/var/`. Such a package only informs the package manager where to find the actual installation packages, but will not install them

```bash
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2004/x86_64/cuda-ubuntu2004.pin
sudo mv cuda-ubuntu2004.pin /etc/apt/preferences.d/cuda-repository-pin-600
wget https://developer.download.nvidia.com/compute/cuda/11.7.1/local_installers/cuda-repo-ubuntu2004-11-7-local_11.7.1-515.65.01-1_amd64.deb
sudo dpkg -i cuda-repo-ubuntu2004-11-7-local_11.7.1-515.65.01-1_amd64.deb
sudo cp /var/cuda-repo-ubuntu2004-11-7-local/cuda-*-keyring.gpg /usr/share/keyrings/
sudo apt-get update
sudo apt-get -y install cuda
```

## GPU Compute Capability

[https://docs.nvidia.com/cuda/cuda-c-programming-guide/index.html#compute-capabilities](https://docs.nvidia.com/cuda/cuda-c-programming-guide/index.html#compute-capabilities)

There are potentially two sets of compute features for a given compute capability:

- Compute Capability #.#: The predominant set of compute features that are introduced with the intent to be available for subsequent compute architectures. These features and their availability are summarized in Table 14.

- Compute Capability #.#a: A small and highly specialized set of features that are introduced to accelerate specialized operations, which are not guaranteed to be available or might change significantly on subsequent compute architecture. These features are summarized in the respective “Compute Capability #.#”” subsection

### RTX 3090

[https://developer.nvidia.com/cuda-gpus#compute](https://developer.nvidia.com/cuda-gpus#compute)

GPU	Compute Capability

RTX 3000	7.5

## Nvidia Driver

[https://www.nvidia.com/download/index.aspx?lang=en-us](https://www.nvidia.com/download/index.aspx?lang=en-us)

### 安装指定版本

From chatgpt:

要安装指定版本的NVIDIA驱动程序，请按照以下步骤操作：

1. 访问NVIDIA驱动程序高级搜索页面（https://www.nvidia.com/Download/Find.aspx）。

2. 在搜索表单中，选择您的显卡类型、产品系列、产品、操作系统等信息。在“驱动程序类型”下拉菜单中，选择“所有”。

3. 点击“搜索”按钮，系统会显示与您的搜索条件匹配的驱动程序列表。

4. 在结果列表中找到您想要安装的指定版本的驱动程序，然后点击“下载”按钮。请注意，较旧版本的驱动程序可能不支持最新的显卡和功能。确保您选择的驱动程序版本与您的显卡和系统兼容。

5. 安装NVIDIA驱动程序。对于Windows用户，双击下载的驱动程序文件并按照安装向导的提示进行操作。对于Linux用户，请参阅NVIDIA提供的安装指南（https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html）。

6. 重启计算机以使驱动程序生效。

### RTX 3090

- Product Type: GeForce

```bash
sudo apt-get install pkg-config libglvnd-dev

sudo ./NVIDIA-Linux-x86_64-535.54.03.run
```
