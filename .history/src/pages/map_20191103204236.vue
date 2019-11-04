<template>
<f7-page>
    <f7-navbar  back-link="Back">Bản đồ</f7-navbar>
    <f7-block id="app">
        <div class="MapView">

        </div>
    </f7-block>
</f7-page>
</template>

<script>
export default {
    methods: {
        ...mapActions(["initMap"])
    },
    mounted()
    {
        this.initMap()
    }
}
</script>