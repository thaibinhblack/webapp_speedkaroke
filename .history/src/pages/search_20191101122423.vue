<template>
<f7-page>
    <f7-navbar  back-link="Back">
       <f7-subnavbar :inner="false">
            <f7-searchbar
                search-container=".search-list"
                search-in=".item-title"
                :disable-button="!$theme.aurora"
            ></f7-searchbar>
        </f7-subnavbar>
    </f7-navbar>
</f7-page>
</template>