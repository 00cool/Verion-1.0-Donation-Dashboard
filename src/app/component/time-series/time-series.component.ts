import { Component, OnInit } from '@angular/core';
import * as time_data from '../../../assets/time_series_data.json';

@Component({
    selector: 'app-time-series',
    templateUrl: './time-series.component.html',
    styleUrls: ['./time-series.component.css']
})
export class TimeSeriesComponent implements OnInit {

    time_series: Object;




    constructor() {

        // Creating Time Series chart
        this.time_series = {
            rangeSelector: {
                selected: 1
            },
            title: { text: 'Donation Time Series' },
            series: [{
                name: 'Donation Data',
                type: 'area',
                data: time_data,
                tooltip: {
                    valueDecimals: 2
                }
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 600
                    },
                    chartOptions: {
                        chart: {
                            width: 950,
                            height: 450
                        },
                        subtitle: {
                            text: null
                        },
                        navigator: {
                            enabled: false
                        }
                    }
                }]
            },
            exporting: {
                enabled: true,
                filename: 'Donation Time Series'
            },
        };
        // Time Series's end is here
    }

    ngOnInit() {
    }

}
