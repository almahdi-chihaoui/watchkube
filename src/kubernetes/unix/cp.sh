#!/bin/bash

# -ldir: local path
# -rdir: remote path
# -s: selector 
# -c: container name
# -n: namespace

LOCAL_DIR=""
REMOTE_DIR=""
SELECTOR=""
CONTAINER_NAME=""
NAMESPACE=""

# Get values from options
while [ -n "$1" ]; do 
 
    case "$1" in
 
    -ldir)
        param="$2"
        LOCAL_DIR=$param
 
        shift
        ;;

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
if [ -z $CONTAINER_NAME ] && [ -z $NAMESPACE ]; then
  kubectl cp $LOCAL_DIR $POD_NAME:$REMOTE_DIR || exit 1
elif [ -n $CONTAINER_NAME ] && [ -z $NAMESPACE ]; then
  kubectl cp $LOCAL_DIR $POD_NAME:$REMOTE_DIR -c $CONTAINER_NAME || exit 1
elif [ -z $CONTAINER_NAME ] && [ -n $NAMESPACE ]; then
  kubectl cp $LOCAL_DIR $POD_NAME:$REMOTE_DIR -n $NAMESPACE || exit 1
elif [ -n $CONTAINER_NAME ] && [ -n $NAMESPACE ]; then
  kubectl cp $LOCAL_DIR $POD_NAME:$REMOTE_DIR -c $CONTAINER_NAME -n $NAMESPACE || exit 1
fi
