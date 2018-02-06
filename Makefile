
SHELL = /bin/sh
BUILD = $(shell date +%s)

DOCKER_REGISTRY = seanhu93
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
run: NAME = blog-web-client
run:
	-docker rm -f $(NAME) # ignore errors
	docker create --name $(NAME) -p 4200:80 $(IMAGE)
	docker cp config.js $(NAME):/usr/share/nginx/html
	docker start $(NAME)

