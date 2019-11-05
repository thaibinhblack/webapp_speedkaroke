<template>
<div id="page-cameara">
    <f7-block>
        <f-col width="50" class="upload-camera">
            <input type="file" multiple accept="image/*">
            <f7-icon class="icon-upload"  ios="material:upload" aurora="material:upload" md="material:upload"></f7-icon>
        </f-col>
    </f7-block>
</div>
</template>

<style scoped>
.upload-camera {height: 160px;}
</style>