<template>
<f7-tab id="tab-camera" class="page-content page-tab">
    <f7-row>
        <f7-col width="25" style="padding: 7px">
           <div class="upload-camera ">
                <f7-icon class="icon-plus" ios="material:cloud_upload" aurora="material:cloud_upload" md="material:cloud_upload"> </f7-icon>
                <input type="file" ref="uploadFile" @change="uploadFile()">
           </div>
       
        </f7-col>
    </f7-row>
</f7-tab>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.upload-camera {height: 110px;background: #aad3df;position: relative;}
.icon-plus {position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);z-index: 999;}
</style>