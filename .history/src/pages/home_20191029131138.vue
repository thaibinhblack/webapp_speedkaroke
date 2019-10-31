<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar class="tool-bar">
        <p class="title-tool-bar">Speed Karaoke</p>
        <f7-subnavbar :inner="false">
          <f7-row class="top-header">
              <f7-col width="10">
                <f7-icon material="search" size="18"></f7-icon>  
                
              </f7-col> 
              <f7-col width="70">
                <f7-input
                    class="input-search"
                    type="text"
                    placeholder="Nhập từ khóa tìm kiếm"
                  ></f7-input>
              </f7-col>
              <f7-col width="20" class="title-gps">{{GPS}}</f7-col>
          </f7-row>
        </f7-subnavbar>
    </f7-navbar>
    <!-- Page content-->
    <f7-block>
      <f7-row>
        <f7-col class="text-new tab active">
          <span>Mới nhất</span>
        </f7-col>
        <f7-col class="text-gps">
          <span>Gần đây</span>
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-block>
      <f7-row>
        <f7-col>
          <f7-card>

          </f7-card>
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-toolbar bottom tabbar labels>
    <f7-link tab-link="#tab-1" tab-link-active>
      <f7-icon class="icon-fill" ios="f7:home" aurora="f7:home" md="material:home">
      </f7-icon>
      <span class="tabbar-label">Trang chính</span>
    </f7-link>
    <f7-link tab-link="#tab-2">
      <f7-icon ios="f7:today" aurora="f7:note" md="material:note">
      </f7-icon>
      <span class="tabbar-label">Lưu các địa điểm</span>
    </f7-link>
    <f7-link tab-link="#tab-3">
      <f7-icon ios="f7:verified_user" aurora="f7:verified_user" md="material:verified_user">
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
      GPS: null
    }
  },
  created()
  {
    this.$getLocation({
        enableHighAccuracy: true, //defaults to false
        timeout: Infinity, //defaults to Infinity
        maximumAge: 0 //defaults to 0
    })
    .then(coordinates => {
      this.$http.get('https://api.opencagedata.com/geocode/v1/json?q='+coordinates.lat+'+'+coordinates.lng+'&key=2d3fed69d9404855bf934ad52e5c1d65&pretty=1')
                .then((response) => {
                  const search = new FormData()
                  console.log(response.data.results[0])
                  this.GPS = response.data.results[0].components.county
                    
          })
      
    })
    navigator.geolocation.getCurrentPosition(function(location) {
  console.log(location.coords.latitude);
  console.log(location.coords.longitude);
  console.log(location.coords.accuracy);
});
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
.input-search {height: 30px;;}
.text-new {text-align: right}
.text-gps {text-align: left}
.tab.active {font-weight: bold}
</style>