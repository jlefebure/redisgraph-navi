<script>
    import {onMount} from 'svelte';
    import {fade} from "svelte/transition"
    import {host, port} from "../stores/redis-connection"
    import {graph} from "../stores/graph"
    import {getGraphs} from "../services/redis"
    let graphs = [];

    onMount(async () => {
        const res = await getGraphs($host, $port);
        $graph = res[0]
        graphs = res
    });

</script>

<select
        bind:value={$graph}
        id="graph"
        name="graph"
        class="form-control m-1">
    {#each graphs as element}
        <option value={element}>{element}</option>
    {/each}
</select>