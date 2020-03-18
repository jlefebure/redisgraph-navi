<script>
    import {fade} from "svelte/transition"
    import * as vis from "vis-network/standalone";
    import "vis-network/styles/vis-network.min.css"
    import {onMount} from "svelte";
    import {Button} from 'sveltestrap'

    /**
     * RedisGraph results for the query
     */
    export let results;

    /**
     * Colors of the nodes. Each node label has a different color.
     * @type {string[]}
     */
    let colors = ["#a772ff", "#0083dd", "#ffc857", "#e85a5a"];
    /**
     * List of all nodes that are contained in the results of the query
     */
    let nodes = [];
    /**
     * List of all unique labels that are contained in the result of the query
     */
    let labels = [];
    /**
     * List of all labels that can be filtered on the query results
     */
    let filterableLabels = [];
    /**
     * List of all labels that are active and are displayed on the graph result
     */
    let activeLabels = [];
    /**
     * List of all label names that are active and are displayed on the graph result
     */
    let activeLabelsNames = [];
    /**
     * List of all values, which can be either edge or node.
     */
    let values = [];

    onMount(async () => {
        values = results._results.flatMap(e => e._values);
        nodes = values.filter(e => e.label !== undefined);
        labels = getUniqueLabels(nodes);
        filterableLabels = Object
                .keys(labels)
                .map(e => ({
                    name: e,
                    color: labels[e],
                    active: true
                }));
        activeLabels = filterableLabels
        activeLabelsNames = Object.keys(labels)
        buildGraph()
    });

    /**
     * Return all unique labels that are contained in the node list.
     * @param nodes All nodes in the results
     * @returns {{}} All labels and corresponding color
     */
    let getUniqueLabels = (nodes) => {
        const uniqueLabels = nodes
                .map(e => e.label)
                .filter((v, i, a) => a.indexOf(v) === i)
                .map((e, i) => {
                    return {
                        label: e,
                        color: colors[i % colors.length]
                    }
                })

        var output = {};
        for (let i = 0; i < uniqueLabels.length; i++) {
            let obj = uniqueLabels[i];
            output[obj.label] = obj.color
        }
        return output;
    };


    /**
     * Build a graph on vis-network
     * @returns {(Object|{scaling: {label: {enabled: boolean}}, color: {background: *}, shape: string, widthConstraint: number, label, labelName: *, font: {color: string}})[]}
     */
    let buildGraph = () => {
        values = results._results.flatMap(e => e._values);
        nodes = values.filter(e => e.label !== undefined);
        nodes = nodes
                .filter(e => activeLabelsNames.includes(e.label))
                .map(e => {
                    return {
                        color: {
                            background: labels[e.label]
                        },
                        shape: "circle",
                        font: {
                            color: "#FFF",
                        },
                        ...e,
                        labelName: e.label,
                        scaling: {
                            label: {
                                enabled: false
                            }
                        },
                        widthConstraint: 50,
                        label: e.properties[Object.keys(e.properties)[0]],
                    }
                });

        const relations = values
                .filter(e => e.relation !== undefined)
                .map(e => {
                    return {
                        from: e.srcNode,
                        to: e.destNode,
                        label: e.relation
                    }
                });

        // create a network
        var container = document.getElementById('graphDiv');
        var data = {
            nodes: new vis.DataSet(nodes),
            edges: new vis.DataSet(relations)
        };
        var options = {};
        var network = new vis.Network(container, data, options);
        return nodes;
    };

    /**
     * Filter the provided node.
     * @param label Label to enable or disable
     */
    let filterNodes = (label, event) => {
        const iToFilter = filterableLabels.indexOf(label);
        if (iToFilter >= 0) {
            if (label.active) {
                activeLabelsNames[iToFilter] = undefined
            } else {
                activeLabelsNames[iToFilter] = label.name
            }

            label.active = !label.active
            filterableLabels[iToFilter] = label
            buildGraph()
        }
    }

</script>

<div class="m-auto">
    {#each filterableLabels as label}
        <Button active={label.active} on:click={filterNodes.bind(this, label)} class="m-2 btn-pill"
                style="background:{label.color}; border:0">{label.name}</Button>
    {/each}
</div>

<div style="height: 500px; width: 100%" in:fade id="graphDiv"></div>

