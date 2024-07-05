
`https://helm.sh/docs/topics/architecture/`

## The Purpose of Helm

- Create new charts from scratch
- Package charts into chart archive (tgz) files
- Interact with chart repositories where charts are stored
- Install and uninstall charts into an existing Kubernetes cluster
- Manage the release cycle of charts that have been installed with Helm

For Helm, there are three important concepts

- The chart is a bundle of information necessary to create an instance of a Kubernetes application.
- The config contains configuration information that can be merged into a packaged chart to create a releasable object.
- A release is a running instance of a chart, combined with a specific config

## Components

Helm is an executable which is implemented into **two distinct parts**

### Helm Client

The Helm Client is a command-line client for end users. The client is responsible for the following:

- Local chart development
- Managing repositories
- Managing releases
- Interfacing with the Helm library
    + Sending charts to be installed
    + Requesting upgrading or uninstalling of existing releases

### Helm Library

The Helm Library provides the logic for executing all Helm operations. It interfaces with the Kubernetes API server and provides the following capability:

- Combining a chart and configuration to build a release
- Installing charts into Kubernetes, and providing the subsequent release object
- Upgrading and uninstalling charts by interacting with Kubernetes

## Implementation

The library uses the **Kubernetes client library** to communicate with Kubernetes. Currently, that library uses REST+JSON. It **stores information in Secrets** located inside of Kubernetes. It does not need its own database
