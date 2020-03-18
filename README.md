# RedisGraph Navi

## Introduction
RedisGraph Navi is a webapp which allow you to visualize RedisGraph data in a browser. The main purpose is to try 
queries and to display all data in a graph.

Built with Svelte, vis-network and Express with NodeJS.

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

This will install and start the web client and the API.

By default, the app is running on http://0.0.0.0:3000. This behaviour can be configured with environment variables
 (see bellow).
 
## Configuration

Configuration is done by dotenv with an embedded `.env` file. You can either edit this file or override this 
configuration by setting an environment variable. 

| Variable             | Default value               | Description                                                                                         |
|----------------------|-----------------------------|-----------------------------------------------------------------------------------------------------|
| NAVI_PORT            | 3000                        | Port on which the app and the API is exposed.                                                       |
| NAVI_EXTERNAL_URL    | http://0.0.0.0:${NAVI_PORT} | URL on which the application is exposed.<br>This value is by the client to fetch data from the API. |
| NAVI_API_BASE_URL    | /api                        | Base URL on which the server API is exposed.<br>Trailing slash is deleted if present.               |
| NAVI_CLIENT_BASE_URL | /                           | Base URL on which the frontend client is exposed.<br>Trailing slash is deleted if present.          |

You can override this configuration by setting an environment variable. 
The following example set the default port to 5000.

```bash
export NAVI_PORT=5000
```

## Manual

### Connection
Once started, The homepage will display two fields for respectively Redis host and port. Default values correspond to a
local instance of Redis on the default port. 

If the connection is successful, two other fields are displayed

### Running queries
Left fields shows you a list of all keys that have 'graphdata' type on Redis. Other types are not displayed.
The right field purpose is where you type the Cypher query. 