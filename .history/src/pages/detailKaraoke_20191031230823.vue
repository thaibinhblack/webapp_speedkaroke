<template>
<f7-page name="detail-karaoke">
    <f7-navbar  back-link="Back">{{karaoke.NAME_BAR_KARAOKE}}</f7-navbar>
    <f7-toolbar top tabbar labels>
      <f7-link tab-link="#tab-1">
        <f7-icon class="icon-fill" ios="material:camera" aurora="material:camera" md="material:camera">
        </f7-icon>
       <small>Tải hình</small>
      </f7-link>
      <f7-link tab-link="#tab-map">
        <f7-icon class="icon-fill" ios="material:near_me" aurora="material:near_me" md="material:near_me">
        </f7-icon>
        <small>Map</small>
      </f7-link>
      <f7-link tab-link="#tab-2">
        <f7-icon ios="material:beenhere" aurora="material:beenhere" md="material:beenhere">
        </f7-icon>
        <small>Lưu lại</small>
      </f7-link>
      <f7-link tab-link="#tab-3">
        <f7-icon ios="material:star" aurora="material:star" md="material:star">
        </f7-icon>
        <small>Đánh giá</small>
      </f7-link>
    </f7-toolbar>
    <div class="banner-karaoke">
        <img @click="$refs.popupDark.open()" width="100%" height="auto" :src="$store.state.PUBLIC_URL + karaoke.BANNER_BAR_KARAOKE" :alt="karaoke.NAME_BAR_KARAOKE">
        <f7-photo-browser
            :photos="photos"
            theme="dark"
            type="popup"
            ref="popupDark"
          ></f7-photo-browser>
    </div>
    </f7-page>
</template>
<script>
export default {
    data()
    {
        return {
            karaoke: {
                NAME_BAR_KARAOKE: 'Karaoke'
            },
            photos: [
            {
                url: 'img/beach.jpg',
                caption: 'Amazing beach in Goa, India',
            },
                {
                    test: 'https://placekitten.com/1024/1024',
                caption: 'img/lock.jpg',
                },
            {
                url: 'img/monkey.jpg',
                caption: 'I met this monkey in Chinese mountains',
            },
            {
                url: 'img/mountains.jpg',
                caption: 'Beautiful mountains in Zhangjiajie, China',
            },
        ],
        }
    },
    methods:{
        DetailKaraoke()
        {
            this.$f7.dialog.preloader();
            this.axios.get(this.$store.state.API_URL + 'karaoke/'+this.$f7route.params.UUID).then((response) =>{
                this.karaoke = response.data
            })
            this.$f7.dialog.close()
        }
    },
    mounted()
    {
        this.DetailKaraoke()
        console.log('mounted',this.$f7route)
    },
    create()
    {
        
        console.log('CREATED',this.$f7route)
    }
}
</script>