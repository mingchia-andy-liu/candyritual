#/bin/bash

if [[ $# -eq 0 ]] ; then
  echo 'make sure /deployCandyDance repo is in the same parent directory as this'
  echo 'usage: ./cheatDeploy.sh <commit message>'
  exit 0
fi

grunt build;
cp -rf dist/ ../deployCandyDance/dist/
ls -la ../deployCandyDance/dist/
git --git-dir=../deployCandyDance/.git add .
git --git-dir=../deployCandyDance/.git commit -m "$1"
git --git-dir=../deployCandyDance/.git push heroku master
