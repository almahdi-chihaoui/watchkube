#!/bin/bash

# -rmdir: remove folder
# -rdir: remote path
# -s: selector 
# -c: container name
# -n: namespace

LOCAL_DIR=""
REMOTE_DIR=""
SELECTOR=""
CONTAINER_NAME=""
NAMESPACE=""

RMDIR=false

# Get values from options
while [ -n "$1" ]; do 
 
    case "$1" in

    -rdir)
        param="$2"
        REMOTE_DIR=$param
 
        shift
        ;;
 
    -s)
        param="$2"
        SELECTOR=$param
 
        shift
        ;;

    -c)
        param="$2"
        CONTAINER_NAME=$param
 
        shift
        ;;

    -n)
        param="$2"
        NAMESPACE=$param
 
        shift
        ;;

    -rmdir)
        RMDIR=true
        ;;
 
    *) echo "Option $1 not recognized" ;;
 
    esac
 
    shift
 
done


# Get the pod's name from the selector $SELECTOR and the namespace $NAMESPACE
if [ -z $NAMESPACE ]; then
  POD_NAME="$(kubectl describe po -l $SELECTOR | grep ^Name: | head -1 | awk '{print $2}')"
else
  POD_NAME="$(kubectl describe po -l $SELECTOR -n $NAMESPACE | grep ^Name: | head -1 | awk '{print $2}')"
fi

# We test if container name ($CONTAINER_NAME) and namespace ($NAMESPACE) were given, and we execute the kubectl with otions -n
# and -c accordingly

# If the target is a folder, we use rm -r to remove the folder and its content, if it is a file we use rm
if [ $RMDIR = true ]; then
  if [ -z $CONTAINER_NAME ] && [ -z $NAMESPACE ]; then
    kubectl exec $POD_NAME -it -- rm -r $REMOTE_DIR || exit 1
  elif [ -n $CONTAINER_NAME ] && [ -z $NAMESPACE ]; then
    kubectl exec $POD_NAME -it -c $CONTAINER_NAME -- rm -r $REMOTE_DIR || exit 1
  elif [ -z $CONTAINER_NAME ] && [ -n $NAMESPACE ]; then
    kubectl exec $POD_NAME -it -n $NAMESPACE -- rm -r $REMOTE_DIR || exit 1
  elif [ -n $CONTAINER_NAME ] && [ -n $NAMESPACE ]; then
    kubectl exec $POD_NAME -it -c $CONTAINER_NAME -n $NAMESPACE -- rm -r $REMOTE_DIR || exit 1
  fi
else
  if [ -z $CONTAINER_NAME ] && [ -z $NAMESPACE ]; then
    kubectl exec $POD_NAME -it -- rm $REMOTE_DIR || exit 1
  elif [ -n $CONTAINER_NAME ] && [ -z $NAMESPACE ]; then
    kubectl exec $POD_NAME -it -c $CONTAINER_NAME -- rm $REMOTE_DIR || exit 1
  elif [ -z $CONTAINER_NAME ] && [ -n $NAMESPACE ]; then
    kubectl exec $POD_NAME -it -n $NAMESPACE -- rm $REMOTE_DIR || exit 1
  elif [ -n $CONTAINER_NAME ] && [ -n $NAMESPACE ]; then
    kubectl exec $POD_NAME -it -c $CONTAINER_NAME -n $NAMESPACE -- rm $REMOTE_DIR || exit 1
  fi
fi
