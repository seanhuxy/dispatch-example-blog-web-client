
SHELL = /bin/sh
BUILD = $(shell date +%s)

DOCKER_REGISTRY = vmware
PACKAGE = dispatch-example-blog-web-client
TAG = 0.0.1

IMAGE = $(DOCKER_REGISTRY)/$(PACKAGE):$(TAG)

.PHONY: all
all: dep-install image

.PHONY: dep-install
dep-install:
	npm install

.PHONY: build
build:
	ng build

.PHONY: docker
docker:
	docker build -t $(IMAGE) -f Dockerfile .

.PHONY: image
image: build docker

.PHONY: local
local: build
	cp config.js dist/
	ng serve

.PHONY: run
run:
	-docker rm -f blog-web-client # ignore errors
	docker run -d -p 4200:80 --name blog-web-client $(IMAGE)
