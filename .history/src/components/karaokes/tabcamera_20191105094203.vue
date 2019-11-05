<template>
<div id="page-cameara">
    <f7-block>
        <f7-row>
            <f7-col width="33.33" class="upload-camera">
            <input type="file" multiple accept="image/*">
            <f7-icon class="icon-upload"  ios="material:upload" aurora="material:upload" md="material:upload"></f7-icon>
        </f7-col>
        <f7-col width="33.33" class="media-cameara"></f7-col>
        <f7-col width="33.33" class="media-cameara"></f7-col>
        <f7-col width="25" class="media-cameara"></f7-col>
        </f7-row>
    </f7-block>
</div>
</template>

<style scoped>
.upload-camera,.media-cameara{height: 160px;background: #f65e39 }
</style>