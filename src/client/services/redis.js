/**
 * Execute the query provided on the provided Redis instance. All parameters are mandatory
 * In case of error, the promise if rejected with the error provided by the API.
 * @param query The Cypher query to execute on the Redis instance
 * @param graph The graph name on which the query is executed
 * @param host The host of the Redis instance
 * @param port The port of the Redis instance
 *
 * @returns {Promise<any>} A promise with the query results. Results contains all data provided by the RedisGraph.js
 * library
 */
export function executeQuery(query, graph, host, port) {
    return fetch(`%NAVI_EXTERNAL_URL%%NAVI_API_BASE_URL%/execute`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            query: query,
            graph: graph,
            host: host,
            port: port
        })
    })
        .then(response => response.json())
        .then(element => {
            if (element.error) {
                return Promise.reject(element)
            } else {
                return element
            }
        })
}

/**
 * Return all key names on Redis which have the 'graphdata' type.
 * @param host The host of the Redis instance
 * @param port The port of the Redis instance
 * @returns {Promise<string[]>} An array of all graphs names
 */
export function getGraphs(host, port) {
    return fetch(`%NAVI_EXTERNAL_URL%%NAVI_API_BASE_URL%/graphs?host=${host}&port=${port}`)
        .then(e => e.json());
}

/**
 * Try to connect to the Redis instance. This method must be used to check if the Redis Instance exists and is accessible.
 * @param host The host of the Redis instance
 * @param port The port of the Redis instance
 * @returns {Promise<object>} Response object that contains 'connected' boolean to tell if the connection is successful
 * and a optional 'message' field in case of error.
 */
export function connect(host, port) {
    return fetch(`%NAVI_EXTERNAL_URL%%NAVI_API_BASE_URL%/connect`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            host: host,
            port: port
        })
    })
        .then(response => response.json())
}