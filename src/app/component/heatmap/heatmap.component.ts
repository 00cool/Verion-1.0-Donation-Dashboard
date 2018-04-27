import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import * as heatmap_data from '../../../assets/heatmap_data.json';
import * as markerdata from '../../../assets/heatmap_data.json';
import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import * as mapboxgl from 'mapbox-gl';
import { Map } from 'mapbox-gl';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet.heat';
import 'leaflet.markercluster';
import DataFrame, { Row } from 'dataframe-js';

import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/angular2-leaflet-draw';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster/dist/leaflet-markercluster/leaflet-markercluster.module';
import { docChanges } from 'angularfire2/firestore';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operator/map';



declare var require: any;
export function highchartsFactory() {
    return require('highcharts');
}







// declare var L;
// console.log(products);
// console.log(time_data);
declare var HeatmapOverlay;
console.log(heatmap_data);
console.log(markerdata);

@Component({
    selector: 'app-heatmap',
    templateUrl: './heatmap.component.html',
    styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit {

    // mapbox heatmap child

    @ViewChild('map1') map1: Map;

    // variables of Campaign Types chart

    // camp_data = [];
    // // data = products;

    // Donation_cmapign_types: Object;
    // colors = ['#9bd1ff', '#45444a', '#66ff75', '#fca252'];
    // colors1 = ['#94c6ff', '#57565c', '#75ff83', '#ffaa59'];
    // campaignTypesData = [];
    // campaignsData = [];
    // i;
    // j;
    r;
    // dataLen;
    // drillDataLen;
    // brightness;
    data1 = {
        data: []
    };

    // variables of Campaign Types chart ends here


    // variables of marker cluster
    LAYER_OSM = {
        id: 'openstreetmap',
        name: 'Open Street Map',
        enabled: false,
        layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Open Street Map'
        })
    };

    markericon;
    //layersControlOptions = { position: 'bottomright' };
    baseLayers = {
        'Open Street Map': this.LAYER_OSM.layer
    };
    options = {
        zoom: 6,
        center: L.latLng([54., -2.4360])
    };

    markerClusterGroup: L.MarkerClusterGroup;
    markerClusterData: any[] = [];
    markerClusterOptions: L.MarkerClusterGroupOptions;

    // marker cluster's options end


    // variable of time series chart
    time_series: Object;

    // variables of heatmap
    heatmap_options: object;

    heatmapLayer = new HeatmapOverlay({
        radius: 20,
        maxOpacity: 0.65,
        minOpacity: 0,
        // blur: 15,
        scaleRadius: false,
        useLocalExtrema: false,
        latField: 'lat',
        lngField: 'lng',
        valueField: 'count',
        gradient: { .4: 'blue', .6: 'cyan', .7: 'lime', .8: 'yellow', 1: 'red' }
    });

    // tslint:disable-next-line:no-shadowed-variable
    onMapReady(map: L.Map) {
        for (this.r = 0; this.r < Object.keys(heatmap_data).length; this.r++) {
            this.data1.data.push({
                lat: heatmap_data[this.r][0],
                lng: heatmap_data[this.r][1],
                count: heatmap_data[this.r][2]
            });
        }
        console.log(this.data1);
        this.heatmapLayer.setData(this.data1);
    }

    // heatmap's main part ends here

    // marker cluster main part

    generateData() {
        const markers: any[] = [];

        for (let i = 0; i < Object.keys(markerdata).length; i++) {
            const message = 'Donation Made From Here : £ ' + markerdata[i][2];
            this.markericon = L.icon({
                iconUrl: '../../../assets/img/marker-icon.png',
                shadowUrl: '../../../assets/img/marker-shadow.png'
            });
            markers.push(L.marker([markerdata[i][0] , markerdata[i][1]], { icon: this.markericon, title: message }).bindPopup(message));
            // markers.push(L.marker([markerdata[i][0], markerdata[i][1]], { icon: this.markericon }));
        }

        this.markerClusterData = markers;
    }
    markerClusterReady(group: L.MarkerClusterGroup) {

        this.markerClusterGroup = group;

    }

    // marker cluster main part's end is here

    // just to generate random data for campaing donations

    // generate_random_data(max) {
    //     let i = 0;
    //     const data = [];
    //     for (i = 0; i < this.list_of_campaigns.length; i++) {
    //         data[i] = Math.floor(Math.random() * Math.floor(max)) + 10;
    //     }
    //     return data;
    // }




    ngOnInit() {
        Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken')
            .set('pk.eyJ1IjoiZGFuZ2FyIiwiYSI6ImNqZHN2dTVmajF6bGIycW1rM3NoM254N3QifQ.wj09f7ZqdbteAaHAcARpOw');
        //  mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuZ2FyIiwiYSI6ImNqZHN2dTVmajF6bGIycW1rM3NoM254N3QifQ.wj09f7ZqdbteAaHAcARpOw';

        this.map1 = new Map({
            container: 'map1',
            style: 'mapbox://styles/mapbox/light-v9',
            zoom: 5,
            center: [-2.4360, 54.]
        });

        this.map1.on('style.load', this.onLoad.bind(this));
        const id = this.ar.snapshot.params['id'];
        console.log(id);
       // (document.getElementById(id) as HTMLInputElement).style.display = 'block';
    }
    // mapbox heatmap onLoad

    onLoad() {
        console.log('map is loaded, can I still talk to it?');
        this.map1.addSource('donations', {
            'type': 'geojson',
            'data': '/../../assets/donation_data.geojson'
        });
        this.map1.resize();

        this.map1.addLayer({
            'id': 'donations-heat',
            'type': 'heatmap',
            'source': 'donations',
            'maxzoom': 9,
            'paint': {
                // Increase the heatmap weight based on frequency and property magnitude
                'heatmap-weight': [
                    'interpolate',
                    ['linear'],
                    ['get', 'donation'],
                    0, 0,
                    100, 3,
                    200, 5,
                    400, 12,
                    500, 16
                ],
                // Increase the heatmap color weight weight by zoom level
                // heatmap-intensity is a multiplier on top of heatmap-weight
                'heatmap-intensity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    11, 1,
                    15, 4,
                ],
                // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                // Begin color ramp at 0-stop with a 0-transparancy color
                // to create a blur-like effect.
                'heatmap-color': [
                    'interpolate',
                    ['linear'],
                    ['heatmap-density'],
                    0, 'rgba(33,102,172,0)',
                    0.2, 'rgb(103,169,207)',
                    0.4, 'rgb(209,229,240)',
                    0.6, 'rgb(253,219,199)',
                    0.8, 'rgb(239,138,98)',
                    1, 'rgb(178,24,43)'
                ],
                // Adjust the heatmap radius by zoom level
                'heatmap-radius': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    0, 2,
                    9, 20,
                    11, 25,

                ],
                // Transition from heatmap to circle layer by zoom level
                'heatmap-opacity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    6, 1,
                    14, 0
                ],
            }
        }, 'waterway-label');

        this.map1.addLayer({
            'id': 'donations-point',
            'type': 'circle',
            'source': 'donations',
            'minzoom': 7,
            'paint': {
                // Size circle radius by earthquake magnitude and zoom level
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    7, [
                        'interpolate',
                        ['linear'],
                        ['get', 'donation'],
                        50, 1,
                        100, 2,
                        250, 4,
                        400, 7,
                        500, 9,
                    ],
                    16, [
                        'interpolate',
                        ['linear'],
                        ['get', 'donation'],
                        1, 5,
                        6, 20,
                    ]
                ],
                // Color circle by earthquake magnitude
                'circle-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'donation'],
                    0, 'rgba(236,222,239,0)',
                    100, 'rgb(236,222,239)',
                    200, 'rgb(208,209,230)',
                    300, 'rgb(166,189,219)',
                    400, 'rgb(103,169,207)',
                    500, 'rgb(28,144,153)',

                ],
                'circle-stroke-color': 'white',
                'circle-stroke-width': 1,
                // Transition from heatmap to circle layer by zoom level
                'circle-opacity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    9, 0,
                    15, 1
                ]
            }
        }, 'waterway-label');
        this.map1.on('click', 'donations-point', (e) => {
            new mapboxgl.Popup()
                .setLngLat(e.features[0].geometry.coordinates)
                .setHTML('<b>Donation Made From Here is :</b> ' + e.features[0].properties.donation)
                .addTo(this.map1);
        });

    }
    // ends here

    // all Charts are here in constructor

    constructor(private ar: ActivatedRoute) {

        // // campaign Chart is here
        // let i = 0;
        // const df = new DataFrame({
        //     'Campaigns': this.list_of_campaigns, 'Campaign_Types': this.list_of_campaign_type
        //     , 'Quarter1': this.generate_random_data(500), 'Quarter2': this.generate_random_data(600),
        //     'Quarter3': this.generate_random_data(300), 'Quarter4': this.generate_random_data(400),
        // },
        //     ['Campaigns', 'Campaign_Types', 'Quarter1', 'Quarter2', 'Quarter3', 'Quarter4', 'Total_donation_per_campaign'
        //     ]);

        // const df2 = df.map(row => row.set('Total_donation_per_campaign', row.get('Quarter1') + row.get('Quarter2')
        //     + row.get('Quarter3') + row.get('Quarter4')));

        // const df5 = df2.groupBy('Campaign_Types').aggregate((group => group.stat.sum('Total_donation_per_campaign'))
        // ).rename('aggregation', 'Total_donation_per_campaign_Type');
        // const df6 = df2.innerJoin(df5, 'Campaign_Types');
        // // console.log(df6.select('Total_donation_per_campaign').show());
        // const list = df5.toArray();

        // for (i = 0; i < list.length; i++) {
        //     const data_dict = {};
        //     const campaign_data = {};
        //     data_dict['y'] = list[i][1];
        //     data_dict['color'] = this.colors[i];
        //     data_dict['name'] = list[i][0];
        //     campaign_data['categories'] = df6.filter(row => row.get('Campaign_Types') === list[i][0]).
        //         select('Campaigns').toDict()['Campaigns'];
        //     campaign_data['data'] = df6.filter(row => row.get('Campaign_Types') === list[i][0]).
        //         select('Total_donation_per_campaign').toDict()['Total_donation_per_campaign'];
        //     campaign_data['color'] = this.colors1[i];
        //     data_dict['drilldown'] = campaign_data;
        //     this.camp_data.push(data_dict);
        // }
        // console.log(this.camp_data);
        // // creating Donut chart of donation per Campaign Types
        // this.dataLen = Object.keys(this.camp_data).length;
        // for (this.i = 0; this.i < this.dataLen; this.i += 1) {

        //     // add browser data
        //     this.campaignTypesData.push({
        //         name: this.camp_data[this.i].name,
        //         y: this.camp_data[this.i].y,
        //         color: this.camp_data[this.i].color
        //     });

        //     // add version data
        //     this.drillDataLen = this.camp_data[this.i].drilldown.data.length;
        //     for (this.j = 0; this.j < this.drillDataLen; this.j += 1) {
        //         this.brightness = 0.2 - (this.j / this.drillDataLen) / 5;
        //         this.campaignsData.push({
        //             name: this.camp_data[this.i].drilldown.categories[this.j],
        //             y: this.camp_data[this.i].drilldown.data[this.j],
        //             color: this.camp_data[this.i].drilldown.color
        //         });
        //     }
        // }
        // console.log(this.campaignTypesData);
        // console.log(this.campaignsData);
        // this.Donation_cmapign_types = {
        //     chart: {
        //         type: 'pie',
        //         plotBackgroundColor: null,
        //         plotBorderWidth: null,
        //         plotShadow: false,
        //         spacingRight: 5,
        //         height: 600,
        //         width: 1300
        //     },
        //     title: {
        //         text: 'Donation<br>Per Campaign<br>Types',
        //         align: 'center',
        //         verticalAlign: 'middle',
        //         widthAdjust: -44,
        //         y: -40
        //     },
        //     yAxis: {
        //         title: {
        //             text: 'Total Donation'
        //         }
        //     },
        //     plotOptions: {
        //         pie: {
        //             allowPointSelect: true,
        //             cursor: 'pointer',
        //             startAngle: -90,
        //             endAngle: 90,
        //             shadow: false,
        //             center: ['50%', '50%']
        //         }
        //     },
        //     tooltip: {
        //         valuePrefix: ' £'
        //     },
        //     exporting: {
        //         enabled: true,
        //         filename: 'Donation Per Campaign Types'
        //     },
        //     'legend': {
        //         backgroundColor: '#FFFFFF',
        //         floating: true,
        //         x: 20,
        //         y: -220,
        //         labelFormatter: function () {
        //             return this.name + ':</b> '+ '£ ' + this.y ;
        //         }
        //     },
        //     series: [{
        //         name: 'Campaign Type',
        //         data: this.campaignTypesData,
        //         size: '60%',
        //         innerSize: '40%',
        //         showInLegend: true,
        //         dataLabels: {
        //             'enabled': false
        //         }
        //     }, {
        //         name: 'Campaigns',
        //         data: this.campaignsData,
        //         size: '80%',
        //         innerSize: '60%',
        //         dataLabels: {
        //             formatter: function () {
        //                 // display only if larger than 1
        //                 return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + '£ '+
        //                     this.y  : null;
        //             }
        //         },
        //         id: 'versions'
        //     }],
        //     responsive: {
        //         rules: [{
        //             condition: {
        //                 maxWidth: 400
        //             },
        //             chartOptions: {
        //                 series: [{
        //                     id: 'versions',
        //                     dataLabels: {
        //                         enabled: false
        //                     }
        //                 }]
        //             }
        //         }]
        //     }

        // };
        // // campaign chart's end is here


        // // Creating Time Series chart
        // this.time_series = {
        //     rangeSelector: {
        //         selected: 1
        //     },
        //     title: { text: 'Donation Time Series' },
        //     series: [{
        //         name: 'Donation Data',
        //         type: 'area',
        //         data: time_data,
        //         tooltip: {
        //             valueDecimals: 2
        //         }
        //     }],
        //     responsive: {
        //         rules: [{
        //             condition: {
        //                 maxWidth: 600
        //             },
        //             chartOptions: {
        //                 chart: {
        //                     width: 1300,
        //                     height: 500
        //                 },
        //                 subtitle: {
        //                     text: null
        //                 },
        //                 navigator: {
        //                     enabled: false
        //                 }
        //             }
        //         }]
        //     },
        //     exporting: {
        //         enabled: true,
        //         filename: 'Donation Time Series'
        //     },
        // };
        // // Time Series's end is here


        // Creating leaflet Heat map
        this.heatmap_options = {
            layers: [
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                    maxZoom: 20,
                }),
                this.heatmapLayer
            ],
            zoom: 6,
            center: L.latLng([54., -2.4360]),
        };

        // leaflet Heat map's end is here


        // marker cluster data

        this.generateData();

        // marker cluster's end is here
    }

}
