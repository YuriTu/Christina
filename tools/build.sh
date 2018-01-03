#!/usr/bin/env bash

rm -rf ./dist/**

#执行打包命令

NODE_ENV='demopro'
webpack --config webpack.config.online.js
