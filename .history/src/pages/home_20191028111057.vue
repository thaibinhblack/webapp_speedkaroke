<template>
  <f7-page name="home">
    <!-- Top Navbar -->
     <f7-navbar>
        <f7-navbar-title class="title-tool-bar">Speed Karaoke</f7-navbar-title>
        <f7-subnavbar :inner="false">
          <f7-row class="top-header">
            <f7-col width="70">
               <f7-searchbar
                  search-container=".search-list"
                  search-in=".item-title"
                  :disable-button="!$theme.aurora"
                ></f7-searchbar>
            </f7-col>
            <f7-col width="30" class="GPS">
                Hậu Giang
            </f7-col>
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

<style scoped>
.title-tool-bar {font-weight: bold;text-align: center;margin: auto;text-transform: uppercase}
.top-header {width: 100%;}
.GPS {line-height: 48px}
</style>