import { Component, OnInit } from '@angular/core';
import * as products from '../../../assets/donation_per_campaign_types.json';
import DataFrame , { Row } from 'dataframe-js';
import * as campaign_da1 from '../../../assets/Campaign_data_firestore.json';
@Component({
  selector: 'app-donationpercamp',
  templateUrl: './donationpercamp.component.html',
  styleUrls: ['./donationpercamp.component.css']
})
export class DonationpercampComponent implements OnInit {

 
camp_data = [];
camp_data1 = [];
// data = products;

Donation_cmapign_types: Object;
new_campaign_plot: Object;

campaignTypesData = [];
campaignsData = [];
i;
j;
r;
dataLen;
drillDataLen;
brightness;
campaigns = [];
sub_campaigns = [];
sponsor = [];
sub_sponsor = [];
amount = [];
in_Series_data = [];
Series_data = [];
drilldown_data = [];


data1 = {
   data: []
};

// variables of Campaign Types chart ends here



  constructor() {

    // new campaign chart starts here

let p = 0;
let q = 0 ;
            for (p = 0; p < Object.keys(campaign_da1).length; p++ ) {
                this.campaigns.push(campaign_da1[p]['Campaigns']);
                this.sub_campaigns.push(campaign_da1[p]['Sub_Campaigns']);
                this.sponsor.push(campaign_da1[p]['Sponsorship']);
                this.sub_sponsor.push(campaign_da1[p]['Sub_Sponsorship']);
                this.amount.push(campaign_da1[p]['amount']);
            }

const up_df = new DataFrame({'Campaign': this.campaigns , 'Sub_Campaign': this.sub_campaigns
                , 'Sponsorship' : this.sponsor, 'Sub_sponsorship' : this.sub_sponsor,
            'Amount' : this.amount, },
                ['Campaign', 'Sub_Campaign', 'Sponsorship', 'Sub_sponsorship', 'Amount'
                ]);
// up_df.show();

const up_df2 = up_df.groupBy('Campaign').aggregate((group => group.stat.sum('Amount'))
            ).rename('aggregation', 'Total_donation_per_campaign');

// const up_df12 = up_df.innerJoin(up_df2, 'Campaign');
// up_df2.show();
const up_df3 = up_df.groupBy('Campaign', 'Sub_Campaign').aggregate((group => group.stat.sum('Amount'))
            ).rename('aggregation', 'Total_donation_per_sub_campaign');

// const up_df13 = up_df12.innerJoin(up_df3, 'Sub_Campaign');
// up_df3.show();
const up_df4 = up_df.groupBy('Campaign', 'Sub_Campaign', 'Sponsorship').aggregate((group => group.stat.sum('Amount'))
).rename('aggregation', 'Total_donation_per_sponsorship');
// up_df4.show();
const up_df5 = up_df.groupBy('Campaign', 'Sub_Campaign', 'Sponsorship', 'Sub_sponsorship').aggregate((group => group.stat.sum('Amount'))
).rename('aggregation', 'Total_donation_per_sub_sponsorship');
// up_df5.show();
// const up_df14 = up_df.innerJoin(up_df4, 'Sponsorship');

const d1 = up_df2.toDict();
const d2 = up_df3.toDict();
const d3 = up_df4.toDict();
const d4 = up_df5.toDict();

// console.log(d1);
// console.log(d2);
// console.log(d3);
// console.log(d4);

const k1 = Object.keys(d1);
const k2 = Object.keys(d2);
const k3 = Object.keys(d3);
const k4 = Object.keys(d4);

const naew = {};
naew['name'] = 'Campaigns';
// naew['type'] = 'column',
naew['innerSize'] = '30%';
naew['colorByPoint'] = true;
naew['size'] = '100%',
naew['showInLegend'] = true,
naew['dataLabels'] =  {
                    formatter: function () {
                        // display only if larger than 1
                        return this.y > 1 ? '<b>' + this.point.name + ':</b> £ ' +
                            this.y  : null;
                    }
                };
for ( q = 0 ; q < ((d1[k1[0]]).length); q++ ) {
    const s_dict = {};
    s_dict['name'] = d1['Campaign'][q];
    s_dict['y'] = d1['Total_donation_per_campaign'][q];
    s_dict['drilldown'] = d1['Campaign'][q];
    this.in_Series_data.push(s_dict);
}
naew['data'] = this.in_Series_data;
this.Series_data.push(naew);
console.log(this.Series_data);


for ( q = 0 ; q < ((d1[k1[0]]).length); q++ ) {
    const s_dict = {};
    s_dict['name'] = d1['Campaign'][q];
    s_dict['id'] = d1['Campaign'][q];
    s_dict['size'] = '100%',
    s_dict['showInLegend'] = true,
    s_dict['dataLabels'] =  {
                    formatter: function () {
                        // display only if larger than 1
                        return this.y > 1 ? '<b>' + this.point.name + ':</b> £ ' +
                            this.y  : null;
                    }
                };
    const l_data = [];
    for ( p = 0 ; p < ((d2[k2[0]]).length); p++ ) {
        const data_dict = {};
    if (d2['Campaign'][p] === d1['Campaign'][q])    {
        data_dict['name'] = d2['Sub_Campaign'][p];
        data_dict['drilldown'] = d2['Sub_Campaign'][p];
        data_dict['y'] = d2['Total_donation_per_sub_campaign'][p];
        l_data.push(data_dict);
    }
    s_dict['data'] = l_data;
    }
    this.drilldown_data.push(s_dict);
}
// console.log(this.drilldown_data);
for ( q = 0 ; q < ((d2[k2[0]]).length); q++ ) {
    const s_dict = {};
    s_dict['name'] = d2['Sub_Campaign'][q];
    s_dict['id'] = d2['Sub_Campaign'][q];
    s_dict['size'] = '100%';
    s_dict['showInLegend'] = true;
    s_dict['dataLabels'] =  {
                    formatter: function () {
                        // display only if larger than 1
                        return this.y > 1 ? '<b>' + this.point.name + ':</b> £ ' +
                            this.y  : null;
                    }
                };
    const l_data = [];
    for ( p = 0 ; p < ((d3[k3[0]]).length); p++ ) {
        const data_dict = {};
    if (d3['Sub_Campaign'][p] === d2['Sub_Campaign'][q])    {
        data_dict['name'] = d3['Sponsorship'][p];
        data_dict['drilldown'] = d3['Sponsorship'][p] + 'of' + d3['Sub_Campaign'][p];
        data_dict['y'] = d3['Total_donation_per_sponsorship'][p];
        l_data.push(data_dict);
    }
    s_dict['data'] = l_data;
    }
    this.drilldown_data.push(s_dict);
}
// console.log(this.drilldown_data);

for ( q = 0 ; q < ((d3[k3[0]]).length); q++ ) {
    const s_dict = {};
    s_dict['name'] = d3['Sponsorship'][q];
    s_dict['id'] = d3['Sponsorship'][q]  + 'of' + d3['Sub_Campaign'][q];
    s_dict['size'] = '100%';
    s_dict['showInLegend'] = false;
    s_dict['dataLabels'] =  {
                    formatter: function () {
                        // display only if larger than 1
                        return this.y > 1 ? '<b>' + this.point.name + ':</b> £ ' +
                            this.y  : null;
                    }
                };
    const l_data = [];
    for ( p = 0 ; p < ((d4[k4[0]]).length); p++ ) {
        const data_dict = {};
    if (d4['Sponsorship'][p]  + 'of' + d4['Sub_Campaign'][p] === d3['Sponsorship'][q]  + 'of' + d3['Sub_Campaign'][q])    {
        data_dict['name'] = d4['Sub_sponsorship'][p];
        data_dict['y'] = d4['Total_donation_per_sub_sponsorship'][p];
        l_data.push(data_dict);
    }
    s_dict['data'] = l_data;
    }
    this.drilldown_data.push(s_dict);
}
console.log(this.drilldown_data);

this.new_campaign_plot = {
    // Highcharts.chart(this.container.nativeElement, {
    chart: {
        type: 'pie',
        height: 700,
        width: 1000

    },
    title: {
        text: 'Donation Per Campaigns',
            align: 'center',
    },

    legend: {
        backgroundColor : '#FFFFFF',
        floating : true,
        x: 20,
        y: -200,
        labelFormatter : function () {
                return this.name + ':</b> £ ' + this.y;
        }
    },
    exporting: {
        enabled : true,
        filename : 'Donation chart'
        },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
            }
        },
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            startAngle: -90,
            innerSize: '30%',
            endAngle : 90,
            shadow : false,
            center : ['50%', '50%']
        }
    },
    tooltip: {
        valuePrefix: ' £ '
    },
    series: this.Series_data,
    drilldown: {
        innersize : '30%',
        activeAxisLabelStyle: {
            textDecoration: 'none',
            fontsize: "",
            fontStyle: 'bold'
        },
        activeDataLabelStyle: {
            textDecoration: 'none',
            fontStyle: 'bold'
        },
        drillUpButton: {
            position: {
            align : 'right' ,
            verticalAlign: 'top',
            x: -115,
            y: -50
          },
        relativeTo : 'plotBox',
       },

        series: this.drilldown_data
    },

    };

// new campaign Chart ends here

  }

  ngOnInit() {
  }

}
