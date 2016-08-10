#!/usr/bin/env bash
echo "-={[Shake & Bake]}=-"

echo "pulling git repo ..."
GIT_PULL_RESULT="$(git pull)"
echo "repo pull result: ${GIT_PULL_RESULT}"

GIT_CHANGED=$(echo "$GIT_PULL_RESULT" | grep "changed")
GIT_UP_TO_DATE=$(echo "$GIT_PULL_RESULT" | grep "Already")

if [[ "$GIT_CHANGED" || "$GIT_UP_TO_DATE" ]]
    then
        echo "your repo is up to date"
        cd other/tools
        gulper 
        cd ../..
fi