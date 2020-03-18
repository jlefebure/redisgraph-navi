<script>
    import {onMount} from 'svelte';
    import {fade} from "svelte/transition"
    import {host, port, connectionSuccessful} from "../stores/redis-connection"
    import {graph} from "../stores/graph"

    let graphs = [];

    onMount(async () => {
        const res = await fetch(`%NAVI_EXTERNAL_URL%%NAVI_API_BASE_URL%/graphs?host=${$host}&port=${$port}`);
        graphs = await res.json();
        $graph = graphs[0]
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