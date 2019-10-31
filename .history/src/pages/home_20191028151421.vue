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
    <f7-block strong>
      <p>Here is your blank Framework7 app. Let's see what we have here.</p>
    </f7-block>

    <f7-block-title>Navigation</f7-block-title>
    <f7-list>
      <f7-list-item link="/about/" title="About"></f7-list-item>
      <f7-list-item link="/form/" title="Form"></f7-list-item>
    </f7-list>

    <f7-block-title>Modals</f7-block-title>
    <f7-block strong>
      <f7-row>
        <f7-col width="50">
          <f7-button fill raised popup-open="#my-popup">Popup</f7-button>
        </f7-col>
        <f7-col width="50">
          <f7-button fill raised login-screen-open="#my-login-screen">Login Screen</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-block-title>Panels</f7-block-title>
    <f7-block strong>
      <f7-row>
        <f7-col width="50">
          <f7-button fill raised panel-open="left">Left Panel</f7-button>
        </f7-col>
        <f7-col width="50">
          <f7-button fill raised panel-open="right">Right Panel</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-list>
      <f7-list-item
        title="Dynamic (Component) Route"
        link="/dynamic-route/blog/45/post/125/?foo=bar#about"
      ></f7-list-item>
      <f7-list-item
        title="Default Route (404)"
        link="/load-something-that-doesnt-exist/"
      ></f7-list-item>
      <f7-list-item
        title="Request Data & Load"
        link="/request-and-load/user/123456/"
      ></f7-list-item>
    </f7-list>

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
  }
}
</script>

<style scoped>
.tool-bar .navbar-bg, .tool-bar .subnavbar, .tool-bar .navbar-inner.sliding {background: #ee350f !important}
.title-tool-bar {font-weight: bold;text-align: center;margin: auto;text-transform: uppercase;color: #fff;}
.top-header {width: 100%;}
.GPS {line-height: 44px}
.title-gps {font-size: 14px;line-height: 30px}
.top-header {margin: 7px;padding: 7px;border:1px solid #e2e2e2;border-radius: 5px;background: #fff;}
.input-search {height: 30px;;}

</style>