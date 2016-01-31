#!/bin/bash

function cdYO() {
  cd $HOME/git/deployCandyDance/
}


grunt build;
cp -rf dist/ ../deployCandyDance/dist/
ls ../deployCandyDance/dist/
git add .
git commit -m "$1"
git push heroku master;
