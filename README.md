# RedisGraph Navi

## Introduction
RedisGraph Navi is a webapp which allow you to visualize RedisGraph data in a browser. The main purpose is to try 
queries and to display all data in a graph.

## Quick start 

You must have a running instance of Redis with the graph module installed. Please refer to the
[Redis documentation](https://oss.redislabs.com/redisgraph/) for this.

Once you have a running instance of RedisGraph, clone this repository and start

```bash
npx degit jlefebure/redisgraph-navi redisgraph-navi 
cd redisgraph-navi
npm install
npm run serve
```

By default, the app is running on http://0.0.0.0:3000. This behaviour can be configured with environment variables
 (see bellow).
 
