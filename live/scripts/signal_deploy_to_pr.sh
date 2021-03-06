#!/bin/bash

[ -z $GITHUB_TOKEN ] && {
	echo 'FATAL: $GITHUB_TOKEN is absent'
	exit 1
}
[ -z $CIRCLE_BRANCH ] && {
	echo 'FATAL: $CIRCLE_BRANCH is absent'
	exit 1
}
[ -z $CI_PULL_REQUEST ] && {
	echo 'INFO: $CI_PULL_REQUEST is absent. I will not post a message to github. Bye !'
	exit 0
}

PR_NUMBER=`echo $CI_PULL_REQUEST | grep -Po '(?<=pix/pull/)(\d+)'`

curl -u mackwic:$GITHUB_TOKEN --verbose \
	-X POST "https://api.github.com/repos/1024pix/pix/issues/${PR_NUMBER}/comments" \
	--data "{\"body\":\"I've deployed this PR to http://${CIRCLE_BRANCH}.pix-dev.ovh . Please check it out\"}"


