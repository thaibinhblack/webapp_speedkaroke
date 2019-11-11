<template>
<f7-page>
    <f7-navbar  back-link="Back">Bản đồ</f7-navbar>
    <f7-block id="app">
        <div class="MapView">

        </div>
    </f7-block>
</f7-page>
</template>

<script>
import {mapActions} from 'vuex'
import { loadModules } from 'esri-loader'

export default {
    methods: {
        ...mapActions(["commitInitMap"]),
        initMap()
        {
            loadModules([
                 "esri/Map",
                "esri/views/MapView",
                "esri/layers/FeatureLayer",
                "esri/widgets/Track",
            ],{
                url: "https://js.arcgis.com/4.11/",
            }).then(([Map,MapView,FeatureLayer,Track]) => {
                const Basemap = new Map({
                    basemap: "osm",
                })

                const view = new MapView({
                    container: "MapView",
                    map: Basemap,
                    center:   [106.366362, 10.360622],
                    zoom: 6,
                    highlightOptions: {
                        color: [255, 241, 58],
                        fillOpacity: 0.4
                    }
                })
                var trailheadsRenderer = {
                type: "simple",
                symbol: {
                        type: "picture-marker",
                        url: "https://cdn0.iconfinder.com/data/icons/party-celebration-1/32/party-50-512.png",
                        width: "18px",
                        height: "18px"
                    }
                }
                const featureLayer = new FeatureLayer({
                    url: "https://services5.arcgis.com/enGxMiTMzjNoFai7/arcgis/rest/services/karaoke/FeatureServer/0",
                    title: "Karaoke",
                    renderer: trailheadsRenderer,
                    outFields: ["*"],
                    popupTemplate: {
                        title: "Thông tin chi nhánh karaoke {NAME_BAR_KARAOKE}",
                        content:  [
                            {
                                type: "fields",
                                fieldInfos: [
                                    {
                                    fieldName: "NAME_BAR_KARAOKE",
                                    label: "Tên chi nhánh"
                                    },
                                    {
                                    fieldName: "NAME_PROVINCE",
                                    label: "Tỉnh / Thành phố"
                                    },
                                        {
                                    fieldName: "NAME_DISTRICT",
                                    label: "Quận / Huyện"
                                    },
                                    {
                                    fieldName: "ADDRESS",
                                    label: "Địa chỉ"
                                    },
                                    {
                                    fieldName: "LONG",
                                    label: "Kinh độ"
                                    },
                                    {
                                    fieldName: "LAT",
                                    label: "Vĩ độ"
                                    },
                                ]
                            }
                        ],
                        actions: [{
                            id: "showImg",
                            title: "Xem hình ảnh",
                            className: "esri-icon-media"
                        }, {
                            id: "update-infor-tree",
                            title: "Cập nhật thông tin cây xanh",
                            className: "esri-icon-edit"
                        }, {
                            id: "edit",
                            title: "Tới trang chỉnh sửa",
                            className: "esri-icon-home"
                        }]
                    }
                
                });
                var trailheadsRendererProvince = {
                    type: "simple",
                    symbol: {
                            type: "picture-marker",
                            
                            width: "18px",
                            height: "18px"
                        }
                    }
                const provinceLayer = new FeatureLayer({
                    url: 'https://services5.arcgis.com/enGxMiTMzjNoFai7/arcgis/rest/services/province/FeatureServer/0',
                    title: "Tỉnh / Thành phố",
                    renderer: trailheadsRendererProvince,
                })
                var track = new Track({
                    view: view
                    });
                view.ui.add(track, "top-left");
                view.on("click", (event) => {
                    console.log(event)
                })
                Basemap.add(featureLayer)
                Basemap.add(provinceLayer)
                })
        }
    },
    mounted()
    {
        console.log('mounted map')
        const self = this
        self.initMap()
    }
}
</script>