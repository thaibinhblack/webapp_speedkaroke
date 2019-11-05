<template>
<div id="page-cameara">
    <f7-block>
        <f7-row>
            <f7-col width="33" class="upload-camera">
            <input ref="camera" class="file" type="file" multiple accept="image/*" @change="uploadFile()">
            <f7-icon color="#ffffff" class="icon-upload"  ios="material:cloud_upload" aurora="material:cloud_upload" md="material:cloud_upload"></f7-icon>
        </f7-col>
        <f7-col width="33" class="media-cameara" v-for="(image,index) in images" :key="index"><img :src="image.URL_IMAGE" height="100%" width="100%"></f7-col>
        
        </f7-row>
    </f7-block>
</div>
</template>

<script>
import * as firebase from 'firebase'
export default {
    data()
    {
        return {
            images: []
        }
    },
    methods:{
        uploadFile()
        {
            var storageRef = firebase.storage();
            // Create a reference to 'mountains.jpg'
           const self = this;
            const files = this.$refs.camera.files
            console.log(files)
            for (let index = 0; index < files.length; index++) {
               storageRef.child(files[index].name).put(files[index]).then(function(snapshot) {
                  var storage = firebase.storage();
                  storageRef.child(files[index].name).getDownloadURL().then((url) => {
                      console.log(url)
                      const data = new FormData()
                      data.append("UUID_BAR_KARAOKE", self.$f7route.params.UUID)
                      data.append("URL_IMAGE",url)
                      self.axios.post(self.$store.state.API_URL + 'image/upload?firebase=1',data).then((response) => {
                         this.api_image()
                      })
                  });
                });
                
            }
        },
        api_image()
        {
            this.axios.get(this.$store.state.API_URL + 'image/'+this.$f7route.params.UUID+'?type=UUID_BAR_KARAOKE').then((response) => {
                this.images = response.data
                console.log(response.data)
            })
        }
    },
    mounted()
    {
        this.api_image()
    }
}
</script>

<style scoped>
.file {opacity: 0; cursor: pointer;position: absolute;width: 100%;height: 100%;z-index: 999;}
.icon-upload {position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);}
.upload-camera,.media-cameara{height: 160px;background: #f65e39;margin: 10px 0; position: relative;}
</style>