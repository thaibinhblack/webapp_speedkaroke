<template>
<f7-tab id="tab-camera" class="page-content page-tab">
    <f7-row>
        <f7-col width="25" style="padding: 7px">
           <div class="upload-camera ">
                <f7-icon class="icon-plus" ios="material:cloud_upload" aurora="material:cloud_upload" md="material:cloud_upload"> </f7-icon>
                <input class="input-file" type="file" ref="uploadFile" @change="uploadFile()">
           </div>
       
        </f7-col>
    </f7-row>
</f7-tab>
</template>

<script>
import * as firebase from 'firebase'
export default {
    methods: {
         uploadImage()
        {
            this.$f7.dialog.preloader();
            const files = []
            for (let index = 0; index < this.$refs.uploadImage.files.length; index++) {
                const data = new FormData()
                data.append("IMAGES",this.$refs.uploadImage.files[index])
                data.append("UUID_BAR_KARAOKE",this.$f7route.params.UUID)
                this.axios.post(this.$store.state.API_URL + 'image/upload',data).then((response) => {
                   
                })
            }
            this.DetailKaraoke()
            this.$nextTick(() => {
                setTimeout(() => {
                    this.$f7.dialog.close()
                },2000)
            })
        },
    }
}
</script>

<style scoped>
.upload-camera {height: 110px;background: #aad3df;position: relative;}
.icon-plus,.input-file {position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);z-index: 998;}
.input-file {z-index: 999;width: 100%;height: 100%;opacity: 0;cursor: pointer;}
</style>