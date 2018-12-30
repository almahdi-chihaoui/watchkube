#!/bin/bash

POD_NAME="$(kubectl describe po -l $1 | grep ^Name: | head -1 | awk '{print $2}')"
kubectl exec $POD_NAME -it -- rm -r $2 || exit 1