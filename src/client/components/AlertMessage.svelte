<script>
    import {fly} from 'svelte/transition';

    /**
     * Color of the alert. Default is 'danger'
     * @type {string}
     */
    export let color = "danger"
</script>


<div class="alert alert-{color} mt-2" in:fly="{{ y: 50, duration: 1000 }}">
    <slot></slot>
</div>