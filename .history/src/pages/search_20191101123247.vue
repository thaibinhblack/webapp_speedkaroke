<template>
<f7-page>
    <f7-navbar  back-link="Back">
        Tìm kiếm địa điểm karaoke...
       <f7-subnavbar :inner="false">
            <f7-searchbar
                search-container=".search-list"
                search-in=".item-title"
                placeholder="Nhập địa điểm kraoke"
                :disable-button="!$theme.aurora"
            ></f7-searchbar>
        </f7-subnavbar>
    </f7-navbar>
    <f7-list class="searchbar-not-found">
    <f7-list-item title="Nothing found"></f7-list-item>
  </f7-list>
</f7-page>
</template>