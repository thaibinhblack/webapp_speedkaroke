<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar class="tool-bar">
        <p class="title-tool-bar">Speed Karaoke</p>
        <f7-subnavbar :inner="false">
          <f7-row class="top-header">
              <f7-col width="50">
                <f7-input
                    class="input-search"
                    type="text"
                    placeholder="Nhập từ khóa tìm kiếm"
                  ></f7-input>
              </f7-col>
              <f7-col width="50" class="title-gps">
                
                <f7-list class="list-province">
                  <f7-list-item title="Tinhr / TP" smart-select :smart-select-params="{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Tìm tỉnh / thành phố'}">
                    <select name="NAME_PROVINCE" v-model="province_selected">
                      <option value="null" selected>Chọn tỉnh / thành phố</option>
                      <option v-for="(province,index) in provinces" :key="index" :value="province.ID_PROVINCE">{{province.NAME_PROVINCE}}</option>
                    </select>
                  </f7-list-item>
                </f7-list>
              </f7-col>
          </f7-row>
        </f7-subnavbar>
    </f7-navbar>
    <!-- Page content-->
    <f7-block>
      <f7-row>
        <f7-col class="text-new tab active">
          <span class="tabs" >Mới nhất</span>
        </f7-col>
        <f7-col class="text-gps">
          <span class="tabs" @click="getGPS()">Gần đây</span>
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-block style="padding:0">
      <f7-row>
        <f7-col v-for="(karaoke,index) in karaoke_new" :key="index" width="50" style="padding:4px">
          <f7-card class="item-karaoke" style="margin:0">
              <img clas="image-karaoke" width="100%" height="100px" :src="'https://speedkaraoke.herokuapp.com/'+karaoke.BANNER_BAR_KARAOKE" :alt="karaoke.NAME_BAR_KARAOKE">
              <div class="content-item-karaoke" style="padding:5px"> 
                    <p><strong>{{karaoke.NAME_BAR_KARAOKE}}</strong></p>
                    <P><f7-icon ios="material:near_me" aurora="material:near_me" md="material:near_me"></f7-icon> {{karaoke.NAME_PROVINCE}}, {{karaoke.NAME_DISTRICT}}</P>
                    <P><f7-icon ios="material:near_me" aurora="material:near_me" md="material:near_me"></f7-icon> {{karaoke.ADDRESS_BAR_KARAOKE}}</P>
              </div>
          </f7-card>
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-toolbar bottom tabbar labels>
    <f7-link tab-link="#tab-1" tab-link-active>
      <f7-icon class="icon-fill" ios="material:home" aurora="material:home" md="material:home">
      </f7-icon>
      <span class="tabbar-label">Trang chính</span>
    </f7-link>
    <f7-link tab-link="#tab-2">
      <f7-icon ios="material:today" aurora="material:note" md="material:note">
      </f7-icon>
      <span class="tabbar-label">Lưu các địa điểm</span>
    </f7-link>
    <f7-link tab-link="#tab-3">
      <f7-icon ios="material:verified_user" aurora="material:verified_user" md="material:verified_user">
      </f7-icon>
      <span class="tabbar-label">Cá nhân</span>
    </f7-link>
  </f7-toolbar>
  </f7-page>
</template>

<script>
export default {
  data()
  {
    return {
      GPS: null,
      karaoke_new: [],
      karaoke_tmp: [],
      provinces: [],
      province_selected: null
    }
  },
  watch:
  {
    province_selected(newVal)
    {
        const self = this;
        self.$f7.dialog.preloader();
        this.karaoke_new = this.karaoke_tmp.filter((value,index,array) => {
            self.$f7.dialog.close();
        
          return array[index].ID_PROVINCE == newVal
        })
    }
  },
  methods: {
    getKaraokeNew()
    {
      this.axios.get("https://speedkaraoke.herokuapp.com/api/v1/karaoke?page=1").then((response) => {
        this.karaoke_new = response.data
        this.karaoke_tmp = response.data
      }).catch(() => {
        this.karaoke_new = []
      })
    },
    ApiGetProvince()
    {
      this.axios.get("https://speedkaraoke.herokuapp.com/api/v1/province").then((response) => {
        this.provinces = response.data
      }).catch(() => {
        this.provinces = []
      })
    },
    getGPS()
    {
      
      navigator.geolocation.getCurrentPosition(function(location) {
       this.axios.get('https://api.opencagedata.com/geocode/v1/json?q='+location.coords.latitude+'+'+location.coords.longitude+'&key=2d3fed69d9404855bf934ad52e5c1d65&pretty=1')
                .then((response) => {
                  const search = new FormData()
                  search.append("search",response.data.results[0].components.county)
                  this.axios.post("https://speedkaraoke.herokuapp.com/api/v1/province/search",search).then((response) => {
                    this.karaoke_new = response.data
                    this.karaoke_tmp = response.data
                    const self = this;
                    self.$f7.dialog.preloader();
                    setTimeout(() => {
                      self.$f7.dialog.close();
                    }, 2000);
                  }).catch(() => {
                    this.karaoke_new = []
                  })
                  this.GPS = response.data.results[0].components.county
                    
          })
    })
    }
  },
  created()
  {
    
    this.ApiGetProvince()
    this.getKaraokeNew()
    
  }
}
</script>

<style scoped>
.tool-bar .navbar-bg, .tool-bar .subnavbar, .tool-bar .navbar-inner.sliding {background: #ee350f !important}
.title-tool-bar {font-weight: bold;text-align: center;margin: auto;text-transform: uppercase;color: #fff;margin: 0;width: 100%;height: 100%;line-height: 56px;background: #ee350f}
.top-header {width: 100%;}
.GPS {line-height: 44px}
.title-gps {font-size: 14px;line-height: 30px}
.top-header {margin: 7px;padding: 7px;border:1px solid #e2e2e2;border-radius: 5px;background: #fff;}
.input-search {height: 44px;;}
.text-new {text-align: right}
.text-gps {text-align: left}
.tab.active {font-weight: bold}
img.image-karaoke {width: 100%;height: 100px;}
.item-karaoke>p {margin: 0}
.list-province {margin: 0 !important;}
</style>