<template>
<div id="page-cameara">
    <f7-block>
        <f7-row>
            <f7-col width="33" class="upload-camera">
            <input class="file" type="file" multiple accept="image/*">
            <f7-icon class="icon-upload"  ios="material:upload" aurora="material:upload" md="material:upload"></f7-icon>
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
.icon-upload {position: absolute;;}
.upload-camera,.media-cameara{height: 160px;background: #f65e39;margin: 10px 0; }
</style>