import { loadModules } from 'esri-loader'
import { addFeatures,getFeature, queryFeatures   } from '@esri/arcgis-rest-feature-layer';

const state = {
    map: null,
    view: null,
    featureLayer: null,
    provinceLayer: null,
    objectid: null
}

const getters = {
    getView: (state) => {
        return state.view
    },
    getFeature: (state) => {
        return state.featureLayer
    },
    getObjectid: (state) => {
        return state.objectid
    }
}

const mutations = {
    goToProvince: (state,payload) =>
    {
        queryFeatures({
            url: 'https://services5.arcgis.com/enGxMiTMzjNoFai7/arcgis/rest/services/province/FeatureServer/0',
            where: "ID_PROVINCE = '" + payload + "'"
        }).then((response) => {
            
            loadModules(["esri/geometry/Point"],{
                url: "https://js.arcgis.com/4.11/",
              
            }).then(([Point]) => {
                const point = new Point({
                    x: response.features[0].geometry.x,
                    y: response.features[0].geometry.y,
                    spatialReference: { wkid: 4326 } 
                })
                state.view.goTo({
                    target: point,
                    zoom: 8
                })
            })
        })
    },
    getFeature: (state,payload) => {
        state.objectid = payload
        getFeature({
            url: "https://services5.arcgis.com/enGxMiTMzjNoFai7/arcgis/rest/services/karaoke/FeatureServer/0",
            id: payload
        }).then((feature) => {
            loadModules(["esri/geometry/Point"],{
                url: "https://js.arcgis.com/4.11/",
              
            }).then(([Point]) => {
                const point = new Point({
                    x: feature.geometry.x,
                    y: feature.geometry.y,
                    spatialReference: { wkid: 4326 } 
                })
                state.view.goTo({
                    target: point,
                    zoom: 8
                })
                state.view.popup.open({
                    location: {
                        x: feature.geometry.x,
                        y: feature.geometry.y,
                        spatialReference: { wkid: 4326 }
                    },
                    features: feature,
                    outFields: ["*"],
                    title: "Chi nhánh karaoke "+feature.attributes.name_bar_karaoke+"",
                    content:"<table class='esri-widget__table'> " +
                    "<tr><th>Chi nhánh </th><td>" + feature.attributes.name_bar_karaoke + "</td></tr> " +
                    "<tr><th>Tỉnh / Thành phố</th><td>" + feature.attributes.NAME_PROVINCE + "</td></tr> " +
                    "<tr><th>Quận / Huyện </th><td>" + (feature.attributes.NAME_DISTRICT != null ? parseFloat(feature.attributes.NAME_DISTRICT) : '(Rỗng)') + "</td></tr> " +
                    "<tr><th>Địa chỉ </th><td>" + (feature.attributes.ADDRESS != null ? parseFloat(feature.attributes.ADDRESS) : '(Rỗng)') + "</td></tr> " +
                    "<tr><th>Long </th><td>" + (feature.attributes.LONG != null ? parseFloat(feature.attributes.LONG) : '(Rỗng)') + "</td></tr> " +
                    "<tr><th>Lat </th><td>" + (feature.attributes.LAT != null ? parseFloat(feature.attributes.LAT) : '(Rỗng)') + "</td></tr> " +
                    "</table> ",
                })
            })
           
           
        })
    },
    addProvinceFeature: (state,payload) =>
    {
        addFeatures({
            url: "https://services5.arcgis.com/enGxMiTMzjNoFai7/arcgis/rest/services/province/FeatureServer/0",
            features: [{
              geometry: payload.geometry,
              attributes: payload.attributes
            }]
          })
        .then(() => {
            state.provinceLayer.refresh()
        })  
    },
    drawPoint: (state,payload) => {
        loadModules([
            "esri/Graphic"
        ],{
            url: "https://js.arcgis.com/4.11/",
          
        }).then(([Graphic]) => {
            var graphic = new Graphic({
                geometry: payload,
                symbol: {
                    type: "picture-marker",
                    url: "https://developers.arcgis.com/labs/images/bluepin.png",
                    width: "14px",
                    height: "26px"
                }
            });
            state.view.graphics.removeAll()
            state.view.graphics.add(graphic)
        })
        
    },
    initMap: (state) => 
    {
        loadModules([
            "esri/Map",
            "esri/views/MapView",
            "esri/layers/FeatureLayer",
            "esri/widgets/Track",
            "esri/Graphic"
        ],{
            url: "https://js.arcgis.com/4.11/",
          
        }).then(([Map,MapView,FeatureLayer,Track,Graphic]) => {

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
                        url: "http://127.0.0.1:8080/map.jpg",
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
            state.view = view
            state.map = Basemap
            state.featureLayer = featureLayer
            state.provinceLayer = provinceLayer

        })
    }
}

const actions = {
    commitInitMap:({commit}) => {
        commit("initMap")
    },
    commitaddProvinceFeautre: ({commit},payload) => {
        commit("addProvinceFeature",payload)
    },
    commitdrawPoint: ({commit},payload) => {
        commit("drawPoint",payload)
    },
    commitgetFeature: ({commit},payload) => {
        commit("getFeature",payload)
    },
    commitgoToProvince: ({commit},payload) => {
        commit("goToProvince",payload)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}