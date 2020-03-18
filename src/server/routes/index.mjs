import express from 'express';
import RedisGraph from "redisgraph.js"
import redis from "redis";

const router = express.Router();
const redisGraphClient = RedisGraph.Graph;

router.post('/execute', async function (req, res) {
    let body = req.body;
    if (!body || !body.query) {
        res.status(400).send({error: 'No query found'});
    }
    if (!body.graph) {
        res.status(400).send({error: 'No Graph found'});
    }
    if (!body.host || !body.port) {
        res.status(400).send({error: 'Redis host and port must be provided'});
    }
    try {
        let graph = new redisGraphClient(body.graph, body.host, body.port);
        let response = await graph.query(body.query);
        res.send(response)
    } catch (e) {
        console.error(e);
        res.status(400).send({
            error: e.message
        })
    }
});

router.post('/connect', async function (req, res) {
    let body = req.body;
    if (!body || !body.host) {
        res.status(400).send({error: 'Host not provided'});
    }
    if (!body.port) {
        res.status(400).send({error: 'Port not provided'});
    }

    const client = redis.createClient({
        host: body.host,
        port: body.port
    });

    client.on("ready", function (error) {
        try {
            res.status(200).send({
                connected: true
            })
        } catch (error) {
            //dismiss, no error
        }
    });

    client.on("error", function (error) {
        console.log(error)
        try {
            res.status(400).send({
                connected: false,
                message: error.message
            })
        } catch (e) {
            //dismiss, already handling error
        }
    });
});

router.get('/graphs', async function (req, res) {
    let query = req.query;
    if (!query || !query.host) {
        res.status(400).send({error: 'Host not provided'});
    }
    if (!query.port) {
        res.status(400).send({error: 'Port not provided'});
    }

    const client = redis.createClient({
        host: query.host,
        port: query.port
    });

    client.on("ready", function (error) {
        try {
            client.multi().keys("*")
                .exec(function (error, results) {
                    const keys = results[0];

                    const typeCommand = client.multi();
                    for (let i = 0; i < keys.length; i++) {
                        typeCommand.type(keys[i])
                    }

                    typeCommand.exec(function (error, keysType) {
                        let graphs = [];
                        for (let j = 0; j < keysType.length; j++) {
                            if (keysType[j] === 'graphdata') {
                                graphs.push(keys[j])
                            }
                        }
                        res.send(graphs);
                    })
                })
        } catch (error) {
            //dismiss, no error
        }
    });

    client.on("error", function (error) {
        console.log(error)
        try {
            res.status(400).send({
                connected: false,
                message: error.message
            })
        } catch (e) {
            //dismiss, already handling error
        }
    });
});



export default router;