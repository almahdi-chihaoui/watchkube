#!/bin/bash

POD_NAME="$(kubectl describe po -l $2 | grep ^Name: | head -1 | awk '{print $2}')"
kubectl cp $1 $POD_NAME:$3 || exit 1