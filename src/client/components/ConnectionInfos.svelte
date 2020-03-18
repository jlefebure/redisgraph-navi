<script>
    import {fade} from "svelte/transition"
    import {Row, Col, Input, Button, FormGroup, Label} from "sveltestrap"
    import {writable} from 'svelte/store';
    import {host, port, connectionSuccessful} from "../stores/redis-connection"
    import AlertMessage from "./AlertMessage.svelte";
    import {connect} from "../services/redis";

    let error = undefined;

    /**
     * Try to connect to Redis.
     */
    let tryConnect = () => {
        connect($host, $port)
                .then(response => {
                    if (response.connected === true) {
                        error = undefined
                        $connectionSuccessful = true
                    } else {
                        error = response.message
                        $connectionSuccessful = false
                    }
                })
    };

    /**
     * Launch the connection try if the enter key is hit
     * @param event
     */
    let keyUpEnter = (event) => {
        if (event.keyCode === 13)
            tryConnect()
    };
</script>

{#if error}
    <AlertMessage>
        {error}
    </AlertMessage>
{:else if $connectionSuccessful}
    <AlertMessage color="success">
        Connection successful !
    </AlertMessage>
{/if}

<Row class="p-2">
    <Col md="2">
        <Label>Redis Host</Label>
        <Input
                class="m-1"
                on:keyup={keyUpEnter}
                bind:value={$host}
                type="text"
                name="host"
                id="host"
                placeholder="Redis host"/>
    </Col>
    <Col md="2">
        <Label>Redis port</Label>
        <Input
                class="m-1"
                on:keyup={keyUpEnter}
                bind:value={$port}
                type="number"
                name="port"
                id="port"
                placeholder="Redis Port"/>
    </Col>
    <Col md="3" class="d-md-flex align-items-end">
        <Button class="m-1" on:click={tryConnect} color="primary">Connect</Button>
    </Col>
</Row>