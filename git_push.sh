#!/usr/bin/env bash
git status
git add .
git commit -m "Dev"
git push

git push origin master --force
