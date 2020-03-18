<script>
    import {Button, Col, Input, ButtonGroup, Row} from 'sveltestrap';
    import {fade} from "svelte/transition"
    import GraphResult from "./components/GraphResult.svelte";
    import AlertMessage from "./components/AlertMessage.svelte";
    import ConnectionInfos from "./components/ConnectionInfos.svelte";
    import {host, port, connectionSuccessful} from "./stores/redis-connection"
    import {graph} from "./stores/graph"
    import GraphList from "./components/GraphList.svelte";
    import {executeQuery} from "./services/redis"

    let query, results;

    /**
     * Launch the query to the redis instance.
     */
    let launchQuery = () => {
        results = executeQuery(query, $graph, $host, $port)
    };

    /**
     * Launch the connection try if the enter key is hit
     * @param event
     */
    let keyUpEnter = (event) => {
        if (event.keyCode === 13)
            launchQuery()
    };

    /**
     * Reset all fields of the form
     */
    let resetFields = () => {
        query = "";
        results = undefined
    }


</script>


<ConnectionInfos/>

{#if $connectionSuccessful}
    <div transition:fade="{{delay: 250, duration: 300}}">
        <Row class="p-2">
            <Col md="2">
                <GraphList/>
            </Col>
            <Col>
                <Input
                        class="m-1"
                        on:keyup={keyUpEnter}
                        bind:value={query}
                        type="text"
                        name="query"
                        id="query"
                        placeholder="Cypher query"/>
            </Col>
            <Col md="3">
                <ButtonGroup class="w-100 m-1">
                    <Button on:click={launchQuery} color="primary">Execute</Button>
                    <Button on:click={resetFields} color="secondary">Reset</Button>
                </ButtonGroup>
            </Col>
        </Row>

        {#if results}
            {#await results}
                <p>...Loading</p>
            {:then result}
                {#if result._statistics}
                    {result._statistics._raw}
                {/if}
                <Row>
                    <GraphResult results={result}/>
                </Row>
            {:catch error}
                <AlertMessage>{error.error}</AlertMessage>
            {/await}
        {/if}
    </div>
{/if}