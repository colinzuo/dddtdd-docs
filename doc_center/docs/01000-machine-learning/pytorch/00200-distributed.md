
## TORCH.DISTRIBUTED

[https://pytorch.org/docs/1.13/distributed.html](https://pytorch.org/docs/1.13/distributed.html)

### Which backend to use

- Use the NCCL backend for distributed **GPU training**
- Use the Gloo backend for distributed CPU training

### Initialization

The package needs to be initialized using the torch.distributed.init_process_group() function before calling any other methods. This **blocks until all processes have joined**

- MASTER_PORT - required; has to be a free port on machine with rank 0

- MASTER_ADDR - required (except for rank 0); address of rank 0 node

- WORLD_SIZE - required; can be set either here, or in a call to init function

- RANK - required; can be set either here, or in a call to init function

The machine with rank 0 will be used to set up all connections

### Distributed Key-Value Store

The distributed package comes with a distributed key-value store, which can be used to share information between processes in the group as well as to initialize the distributed package in `torch.distributed.init_process_group()`

```python
import torch.distributed as dist
from datetime import timedelta
# Run on process 1 (server)
server_store = dist.TCPStore("127.0.0.1", 1234, 2, True, timedelta(seconds=30))
# Run on process 2 (client)
client_store = dist.TCPStore("127.0.0.1", 1234, 2, False)
# Use any of the store methods from either the client or server after initialization
server_store.set("first_key", "first_value")
client_store.get("first_key")
```

### Launch utility

The torch.distributed package also provides a launch utility in `torch.distributed.launch`
This helper utility can be used to launch **multiple processes per node** for distributed training.

This module is going to be deprecated in favor of `torchrun`

```bash
python -m torch.distributed.launch --nproc-per-node=NUM_GPUS_YOU_HAVE
           --nnodes=2 --node-rank=0 --master-addr="192.168.1.1"
           --master-port=1234 YOUR_TRAINING_SCRIPT.py (--arg1 --arg2 --arg3
           and all other arguments of your training script)
```           

## PYTORCH DISTRIBUTED OVERVIEW

在[https://pytorch.org/tutorials/index.html](https://pytorch.org/tutorials/index.html)这个页面选**Parallel and Distributed Training**

[https://pytorch.org/tutorials/beginner/dist_overview.html](https://pytorch.org/tutorials/beginner/dist_overview.html)

- Distributed Data-Parallel Training (DDP): With DDP, the model is replicated on every process, and every model replica will be fed with a different set of input data samples
- RPC-Based Distributed Training (RPC): supports general training structures that **cannot fit** into data-parallel training such as **distributed pipeline parallelism**, parameter server paradigm, and combinations of DDP with other training paradigms
- Collective Communication (c10d) library: It offers both **collective communication APIs** (e.g., all_reduce and all_gather) and **P2P communication APIs** (e.g., send and isend)

PyTorch provides several options for data-parallel training. For applications that gradually grow **from simple to complex and from prototype to production**, the common development trajectory would be

### WRITING DISTRIBUTED APPLICATIONS WITH PYTORCH

[https://pytorch.org/tutorials/intermediate/dist_tuto.html](https://pytorch.org/tutorials/intermediate/dist_tuto.html)

## DataParallel

[https://pytorch.org/docs/stable/generated/torch.nn.DataParallel.html](https://pytorch.org/docs/stable/generated/torch.nn.DataParallel.html)

This container parallelizes the application of the given module by splitting the input across the specified devices by chunking in the batch dimension (other objects will be copied once per device). In the forward pass, the module is replicated on each device, and each replica handles a portion of the input. During the backwards pass, gradients from each replica are summed into the original module.

It is recommended to use DistributedDataParallel, instead of this class, to do multi-GPU training, even if there is only a single node

### DATA PARALLELISM

[https://pytorch.org/tutorials/beginner/blitz/data_parallel_tutorial.html](https://pytorch.org/tutorials/beginner/blitz/data_parallel_tutorial.html)

```python
model = Model(input_size, output_size)
if torch.cuda.device_count() > 1:
  print("Let's use", torch.cuda.device_count(), "GPUs!")
  # dim = 0 [30, xxx] -> [10, ...], [10, ...], [10, ...] on 3 GPUs
  model = nn.DataParallel(model)

model.to(device)
```

## DistributedDataParallel

[https://pytorch.org/docs/1.13/generated/torch.nn.parallel.DistributedDataParallel.html](https://pytorch.org/docs/1.13/generated/torch.nn.parallel.DistributedDataParallel.html)
[https://pytorch.org/docs/stable/notes/ddp.html](https://pytorch.org/docs/stable/notes/ddp.html)

This container parallelizes the application of the given module by splitting the input across the specified devices by chunking in the batch dimension. The module is replicated on each machine and each device, and each such replica handles a portion of the input. During the backwards pass, gradients from each node are averaged.

### ddp_tutorial

[https://pytorch.org/tutorials/intermediate/ddp_tutorial.html](https://pytorch.org/tutorials/intermediate/ddp_tutorial.html)

Applications using DDP should spawn multiple processes and create a single DDP instance per process.

## torchrun

[https://pytorch.org/docs/stable/elastic/run.html](https://pytorch.org/docs/stable/elastic/run.html)

### Train script

[https://pytorch.org/docs/stable/elastic/train_script.html](https://pytorch.org/docs/stable/elastic/train_script.html)

Make sure you have a `load_checkpoint(path)` and `save_checkpoint(path)` logic in your script. When any number of workers fail we restart all the workers with the same program arguments so you will lose progress up to the most recent checkpoint
