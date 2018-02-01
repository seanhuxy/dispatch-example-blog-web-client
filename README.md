# A Simple Blog Web App Client

An example of the [dispatch](https://github.com/vmware/dispatch) framework

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.0.

## Connect to Blog backend server

The nodejs backend should deployment at a dispatch cluster.
Please go to the project [dispatch-example-blog-web-server](https://github.com/seanhuxy/dispatch-example-blog-web-server) for detail information on how to deploy it.

You need to complete the Milestone II before continue with this instruction.

You should now have your dispatch api-gateway hostname and port in hand.

### TODO: find a beter place for configuration variables
Please update ``host`` and ``port`` varibales in ``src/app/post.service.ts`` accordingly

## Development server

Run `ng serve --open` for a dev server, your browser should open and navigate to ```http://localhost:4200/`` in a second.

You should now see your blog!

## Host your blog at a object store (e.g. S3)

TODO: add instruction on how to upload this static angular 2.0 app into a object store

