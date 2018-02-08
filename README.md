# A Simple Blog Web App Client

An example of the [dispatch](https://github.com/vmware/dispatch) framework

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.0.

## Connect to Blog backend server

The nodejs backend should deployment at a dispatch cluster.
Please go to the project [dispatch-example-blog-web-server](https://github.com/vmware/dispatch/tree/master/examples/blog) for detail information on how to deploy it.

You need to complete the Milestone II before continue with this instruction.

Now, You should have your dispatch api-gateway ``hostname`` and ``port`` in hand.

### Quick Start (w/o the source code)

If you want to have a quick view of your blog from a web browser without getting your hand wet in UI stuff, this quick start help you deploy a pre-built Blog UI image into your local docker.

First, configure your dispatch api-gateway IP and port into a ``config.json`` file
```
cat << EOF > config.js
APP_CONFIG = {
    host: "https://dispatch.local",
    port: 31841,
}
EOF
```

Then, pull and run a pre-built docker image
```
docker create --name blog-web-client -p 4200:80 seanhu93/dispatch-example-blog-web-client:0.0.1
docker cp config.js blog-web-client:/usr/share/nginx/html
docker start blog-web-client
```

Now, open your browser and visit ``http://${docker-ip}:4200``, where ``docker-ip`` is your local docker ip.

### Build Source Code and Run

clone the project and get into the root folder

```
git clone https://github.com/seanhuxy/dispatch-example-blog-web-client
cd dispatch-example-blog-web-client
```

#### Build Angular2 App

``make build`` to build the source code into ``/dist`` folder


#### Build Docker Image

Replace the ``DOCKER_REGISTRY`` in Makefile with your own docker register

``make docker`` to build a docker image

#### Config.json

configure your dispatch api-gateway IP and port into a ``config.json`` file
```
cat << EOF > config.js
APP_CONFIG = {
    host: "https://dispatch.local",
    port: 31841,
}
EOF
```
#### Run

``make run`` to create a docker container and run

The server will listen on ``http://${docker-ip}:4200``, where ``docker-ip`` is your local docker ip.

