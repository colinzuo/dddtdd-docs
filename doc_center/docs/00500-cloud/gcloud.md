---
title: GKE
---

## Pricing
[https://cloud.google.com/compute/all-pricing](https://cloud.google.com/compute/all-pricing)

## Install gcloud sdk on Ubuntu
[https://cloud.google.com/sdk/docs#deb](https://cloud.google.com/sdk/docs#deb)

[https://cloud.google.com/sdk/docs/quickstart-debian-ubuntu](https://cloud.google.com/sdk/docs/quickstart-debian-ubuntu)

## Setup GCE

### Setup VM (such as GCE Instance)

Machine type

n1-highmem-2 (2 vCPUs, 13 GB memory)

100GB

### Enable Connect SSH Using Password
GCE be default is configured to only allow public key
```
# edit /etc/ssh/sshd_config
PasswordAuthentication yes

# restart sshd
sudo service sshd restart

# generate and copy ssh key
# for ssh to local
cat id_rsa.pub >> authorized_keys
# for ssh to remote
ssh-copy-id user@address
```