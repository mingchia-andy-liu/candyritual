#!/bin/bash


grunt build
cp -rf dist/ ../deployCandyDance/dist/
'cd ~/git/deployCandyDance/'
git add .
git commit -m "$1"
git push heroku master
