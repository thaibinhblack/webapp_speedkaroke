<template>
<f7-tab id="tab-camera" class="page-content page-tab">
    <f7-row>
        <f7-col width="25" style="padding: 7px">
           <div class="upload-camera ">
                <f7-icon class="icon-plus" ios="material:cloud_upload" aurora="material:cloud_upload" md="material:cloud_upload"> </f7-icon>
                <input class="input-file" type="file" ref="uploadFile" @change="uploadImage()">
           </div>
       
        </f7-col>
    </f7-row>
</f7-tab>
</template>

<script>
import * as firebase from 'firebase';

export default {
    methods: {
         uploadImage()
        {
            var storage = firebase.app().storage("gs://speedkaraoke-e2429.appspot.com/")
            var storageRef = storage.ref();
            this.$f7.dialog.preloader();
            const file = this.$refs.uploadFile.files[0]
            const folder = 'karaokes/'+file.name
            var imagesKaraoke = storageRef.child(folder);
            imagesKaraoke.put(file).then(function() {
               this.$nextTick(() => {
                    setTimeout(() => {
                        this.$f7.dialog.close()
                    },2000)
                })
            });
            
        },
    }
}
</script>

<style scoped>
.upload-camera {height: 110px;background: #aad3df;position: relative;}
.icon-plus,.input-file {position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);z-index: 998;}
.input-file {z-index: 999;width: 100%;height: 100%;opacity: 0;cursor: pointer;}
</style>