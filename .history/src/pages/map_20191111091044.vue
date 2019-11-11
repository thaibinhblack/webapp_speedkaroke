<template>
<f7-page>
    <f7-navbar  back-link="Back">Bản đồ</f7-navbar>
    <f7-block id="app">
        <div id="MapView" class="MapView">

        </div>
    </f7-block>
</f7-page>
</template>

<script>
import {mapActions} from 'vuex'
import { loadModules } from 'esri-loader'

export default {
    methods: {
        ...mapActions(["commitInitMap","commitgetFeature"]),
    },
    mounted()
    {
        console.log('mounted map')
        const self = this
        this.commitInitMap()
        console.log(this.$f7route.params)
        this.commitgetFeature(this.$f7route.params.objectid)
    },
    created()
    {
    }
}
</script>

<style scoped>
 html, body, #map,#MapView, #app, .app {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
      }
</style>