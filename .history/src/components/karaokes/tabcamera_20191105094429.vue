<template>
<div id="page-cameara">
    <f7-block>
        <f7-row>
            <f7-col width="33" class="upload-camera">
            <input class="file" type="file" multiple accept="image/*">
            <f7-icon class="icon-upload"  ios="material:cloud_upload" aurora="material:cloud_upload" md="material:cloud_upload"></f7-icon>
        </f7-col>
        <f7-col width="33" class="media-cameara"></f7-col>
        <f7-col width="33" class="media-cameara"></f7-col>
        <f7-col width="33" class="media-cameara"></f7-col>
        </f7-row>
    </f7-block>
</div>
</template>

<style scoped>
.file {opacity: 0;}
.icon-upload {position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);}
.upload-camera,.media-cameara{height: 160px;background: #f65e39;margin: 10px 0; }
</style>