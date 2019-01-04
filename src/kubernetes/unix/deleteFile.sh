#!/bin/bash

# $1: remove folder option
# $2: selector
# $3: remote path
# $4: container name
# $5: namespace

# Get the pod's name from the selector $1
POD_NAME="$(kubectl describe po -l $2 | grep ^Name: | head -1 | awk '{print $2}')"

# We test if container name ($4) and namespace ($5) were given, and we execute the kubectl with otions -n
# and -c accordingly
if [-z $4] && [-z $5]; then
  kubectl exec $POD_NAME -it -- rm $1 $3 || exit 1
elif [-n $4] && [-z $5]; then
  kubectl exec $POD_NAME -it -c $4 -- rm $1 $3 || exit 1
elif [-z $4] && [-n $5]; then
  kubectl exec $POD_NAME -it -n $5 -- rm $1 $3 || exit 1
elif [-n $4] && [-n $5]; then
  kubectl exec $POD_NAME -it -c $4 -n $5 -- rm $1 $3 || exit 1
fi