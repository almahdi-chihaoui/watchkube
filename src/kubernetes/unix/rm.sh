#!/bin/bash

# $1: remove folder/file option (fldr/file)
# $2: selector
# $3: remote path
# $4: container name
# $5: namespace

# Get the pod's name from the selector $2
POD_NAME="$(kubectl describe po -l $2 | grep ^Name: | head -1 | awk '{print $2}')"

# We test if container name ($4) and namespace ($5) were given, and we execute the kubectl with otions -n
# and -c accordingly

# If the target is a folder, we use rm -r to remove the folder and its content, if it is a file we use rm
if [ $1 = 'fldr' ]; then
  if [ -z $4 ] && [ -z $5 ]; then
    kubectl exec $POD_NAME -it -- rm -r $3 || exit 1
  elif [ -n $4 ] && [ -z $5 ]; then
    kubectl exec $POD_NAME -it -c $4 -- rm -r $3 || exit 1
  elif [ -z $4 ] && [ -n $5 ]; then
    kubectl exec $POD_NAME -it -n $5 -- rm -r $3 || exit 1
  elif [ -n $4 ] && [ -n $5 ]; then
    kubectl exec $POD_NAME -it -c $4 -n $5 -- rm -r $3 || exit 1
  fi
elif [ $1 = 'file' ]; then
  if [ -z $4 ] && [ -z $5 ]; then
    kubectl exec $POD_NAME -it -- rm $3 || exit 1
  elif [ -n $4 ] && [ -z $5 ]; then
    kubectl exec $POD_NAME -it -c $4 -- rm $3 || exit 1
  elif [ -z $4 ] && [ -n $5 ]; then
    kubectl exec $POD_NAME -it -n $5 -- rm $3 || exit 1
  elif [ -n $4 ] && [ -n $5 ]; then
    kubectl exec $POD_NAME -it -c $4 -n $5 -- rm $3 || exit 1
  fi
fi