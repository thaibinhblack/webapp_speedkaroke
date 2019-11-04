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
import {mapActions} from 'vuex'
import { loadModules } from 'esri-loader'

export default {
    methods: {
        ...mapActions(["commitInitMap"]),
        initMap()
        {
            loadModules([
                 "esri/Map",
                "esri/views/MapView",
                "esri/layers/FeatureLayer",
                "esri/widgets/Track",
            ],{
                url: "https://js.arcgis.com/4.11/",
            })
        }
    },
    mounted()
    {
        console.log('mounted map')
        const self = this
        self.commitInitMap()
    }
}
</script>