# WatchKube

[![NPM](https://nodei.co/npm/watchkube.png)](https://www.npmjs.com/package/watchkube)

WatchKube is a tool built with JavaScript that can speed up development process of applications that are running inside containers in a Kubernetes cluster.

It watches your projects' local paths for changes, when you make some changes in one of your projects, it apply them to the container running inside a Kubernetes pod.

## Motivations
The microservice architecture is on fire, everyone is using it, either from scratch or decomposing their monolithic apps. Awesome tools and platforms like Docker and Kubernetes were built to handle and automate the operational side that such an architecture made it almost impossible to handle. 

Following DevOps pattern, the development environment needs to be similar to the production environment, thus, those tools and platforms need to be used in the development environment, which complicated the development process and made it harder, especially when working with multiple services at the same time.

This is where WatchKube comes in, it simply watch and kubectl. This way, we can use Docker and Kubernetes in a dev mode, we can use webpack HMR, nodemon ... and we don't have to rebuilt the docker file and redeploy to kubernetes in order to test a simple change in our code.

## Getting started
Install globally with npm:

    npm install watchkube -g

Check if it was installed properly:

    watchkube version

Configure watchkube by adding some configs:

    watchkube config add /path/to/frontend/project /remote/path -s app=frontend

Here we specified the local project's path (it needs to be asolute!), the remote path inside the container running in the targeted pod and the selector "app=frontend".

You can also change directory to your project's path and use the dot:

    watchkube config add . /remote/path -s app=frontend

List all configs:

    watchkube config list

Now we can use "ignore" to add paths of the files that we don't want watchkube to watch them, the path notation can be used here:

    watchkube ignore add /**/node_modules/*

Also, from your project's local path you can add some specific files to the ignored paths:

    watchkube ignore ./public/*

List all ignored paths:

    watchkube ignore list

Start watchkube:

    watchkube watch

And now, you can forget about Docker and Kubernetes and focus on your work :)

## Demo 

You can watch the full demo here: https://youtu.be/lqC22IdSFp8.

Clone the frontend and the backend services from these repos:

https://github.com/almahdi-chihaoui/watchkube-demo-be.git

https://github.com/almahdi-chihaoui/watchkube-demo-fe.git

Change the API adress in the frontend app in src/index.js  to the adress of your kubernetes cluster (minikube ip) if you are using minikube.

## Compatibility and prerequisites
- A stable Node environment should be installed.
- WatchKube is currently compatible with UNIX based systems, Windows support will be added soon.
- A Kubernetes cluster (exp: minikube) and a configured kubectl CLI are required.

## API

To get all the commands:

    watchkube help

*/ To start the watcher:
    
    watchkube watch

*/ To configure the watcher, You need to specify the resource to confgiure and the action:

      watchkube [resource] [action] [args]

  **/ Resources:
        
  - config: the config resource is used to configure the watcher by specifying pod selectors, local paths to watch as well as remote path inside the container of the targeted pod.
  
    Add a new config:
              
        watchkube config add [localDir] [remoteDir] -s [selector] -c [container] -n [namespace] 

    - [localDir] [remoteDir] -s [selector] are required.
    - if you don't specify a container, the first one will      be selected.
    - if you don't specify a namespace, the default             namespace will be selected.

    List all configs:

        watchkube config list

      Remove a config:

        watchkube config remove [id]

  - ignore: the ignored paths resource is used to configure the watcher by specifying local paths to be ignored by the watcher (exp: "/**/node_modules/*").

      Add a new ignored path:

        watchkube ignore add [path]
        
      List all ignored paths:

        watchkube ignore list

      Remove an ignored path:
        
        watchkube ignore remove [id]


## License

The MIT License (MIT)

Copyright (c) 2018 Mahdi Chihaoui (https://www.linkedin.com/in/al-mahdi-chihaoui/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
  