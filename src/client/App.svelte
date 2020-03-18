<script>
    import Home from "./Home.svelte";

    import {Router, Route} from "svelte-routing";
    import {Container, Navbar, NavbarBrand, NavbarToggler} from "sveltestrap";
    import "recto/dist/css/bootstrap.min.css";

    export let url = "";
    let isOpen = false;

    function handleUpdate(event) {
        isOpen = event.detail.isOpen;
    }
</script>



<Router url="{url}">
    <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">RedisGraph Navi</NavbarBrand>
        <NavbarToggler on:click={() => (isOpen = !isOpen)}/>
    </Navbar>
    <Container class="bg-light h-100" fluid>
        <Route path="/">
            <Home/>
        </Route>
    </Container>
</Router>

<style>
    :global(body, html) {
        height:100%;
    }
</style>