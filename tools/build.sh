#!/usr/bin/env bash

rm -rf ./dist/**

#执行打包命令
webpack --config webpack.config.online.js
