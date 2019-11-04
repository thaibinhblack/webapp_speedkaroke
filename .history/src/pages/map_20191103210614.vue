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
export default {
    methods: {
        ...mapActions(["commitInitMap"])
    },
    mounted()
    {
        console.log('mounted map')
        const self = this
        self.commitInitMap()
    }
}
</script>