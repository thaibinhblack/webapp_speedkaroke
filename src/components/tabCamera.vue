<template>
<f7-tab id="tab-camera" class="page-content page-tab">
    <f7-row>
        <f7-col width="50">
           <div class="upload-camera ">
                <f7-icon class="icon-plus" ios="material:cloud_upload" aurora="material:cloud_upload" md="material:cloud_upload"> </f7-icon>
                <input class="input-file" type="file" ref="uploadFile" @change="uploadImage()">
           </div>
            
        </f7-col>
        <f7-col width="50" style="padding: 7px" v-for="(image, index) in images" :key="index">
                <img width="100%" height="160px" :src="image.URL_IMAGE">
        </f7-col>
    </f7-row>
</f7-tab>
</template>

<script>
import * as firebase from 'firebase';
import { pathToFileURL } from 'url';

export default {
    data()
    {
        return {
            images: []
        }
    },
    methods: {
        uploadImage()
        {
            var storage = firebase.app().storage("gs://speedkaraoke-e2429.appspot.com/")
            var storageRef = storage.ref();
            this.$f7.dialog.preloader();
            const file = this.$refs.uploadFile.files[0]
            const folder = 'karaokes/'+file.name
            var imagesKaraoke = storageRef.child(folder);
            var UUID = this.$f7route.params.UUID
            var axios = this.axios
            var API_URL = this.$store.state.API_URL 
            var self = this
            imagesKaraoke.put(file).then(function(snapshot) {
                console.log(snapshot)
                storage.ref(snapshot.ref.fullPath).getDownloadURL().then(function(url) {
                    const data = new FormData()
                    data.append("UUID_BAR_KARAOKE",UUID)
                    data.append("URL_IMAGE",url)
                    axios.post(API_URL+ 'image/upload?firebase=1',data).then((response) => {
                        
                    })
                })
                
            });
            this.$nextTick(() => {
                setTimeout(() => {
                    this.$f7.dialog.close()
                },2000)
            })
        },
        ApiMedia()
        {
            this.axios.get(this.$store.state.API_URL + 'image/'+this.$f7route.params.UUID+'?type=UUID_BAR_KARAOKE').
            then((response) => {
                this.images = response.data
            })
        }
    },
    mounted()
    {
        this.ApiMedia()
    }
}
</script>

<style scoped>
.upload-camera {height: 160px;background: #aad3df;position: relative;}
.icon-plus,.input-file {position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);z-index: 998;}
.input-file {z-index: 999;width: 100%;height: 100%;opacity: 0;cursor: pointer;}
</style>