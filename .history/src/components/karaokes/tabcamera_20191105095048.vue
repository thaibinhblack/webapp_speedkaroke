<template>
<div id="page-cameara">
    <f7-block>
        <f7-row>
            <f7-col width="33" class="upload-camera">
            <input ref="camera" class="file" type="file" multiple accept="image/*" @change="uploadFile()">
            <f7-icon color="#ffffff" class="icon-upload"  ios="material:cloud_upload" aurora="material:cloud_upload" md="material:cloud_upload"></f7-icon>
        </f7-col>
        <f7-col width="33" class="media-cameara"></f7-col>
        <f7-col width="33" class="media-cameara"></f7-col>
        <f7-col width="33" class="media-cameara"></f7-col>
        </f7-row>
    </f7-block>
</div>
</template>

<script>
import * as firebase from 'firebase'
export default {
    methods:{
        uploadFile ()
        {
            var storageRef = firebase.storage().ref();
            // Create a reference to 'mountains.jpg'
            var mountainsRef = storageRef.child('camera/');
            const files = this.$refs.camera.files
            mountainsRef.put(files).then(function(snapshot) {
                console.log('Uploaded a blob or file!');
            });
        }
    }
}
</script>

<style scoped>
.file {opacity: 0; cursor: pointer;position: absolute;width: 100%;height: 100%;z-index: 999;}
.icon-upload {position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);}
.upload-camera,.media-cameara{height: 160px;background: #f65e39;margin: 10px 0; position: relative;}
</style>