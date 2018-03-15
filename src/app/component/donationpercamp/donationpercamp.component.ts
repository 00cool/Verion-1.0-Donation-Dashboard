import { Component, OnInit } from '@angular/core';
import * as products from '../../../assets/donation_per_campaign_types.json';
import DataFrame , { Row } from 'dataframe-js';

@Component({
  selector: 'app-donationpercamp',
  templateUrl: './donationpercamp.component.html',
  styleUrls: ['./donationpercamp.component.css']
})
export class DonationpercampComponent implements OnInit {

   // variables of Campaign Types chart
   list_of_campaigns = ['Mangala Arati',
   'Dhoopa Arati', 'Raj Bhoga Arati', 'Dhoopa Arati', 'Sandhya Arati',
   'Sayana Arati', 'Flower for Festival', 'Sri Londonisvara',
   'Srimati Radharani', 'Lord Jagannatha', 'Lord Balaram', 'Lady Subhadra'
   , 'Sri Gaura', 'Sri Nitai', 'Giriraj', 'Srila Prabhupada',
   'Special Maha Offerings', 'Abhisekh', 'Altar Decoration Flowers',
   'Srila Prabhupada \'s Vyasasana Decoration', 'Temple Decorations',
   'Temple Room Decorations', 'Jhulan', 'Feast', 'Varuni Drink'];

   list_of_campaign_type = ['Aratis', 'Aratis', 'Aratis', 'Aratis', 'Aratis', 'Aratis', 'Flowers & Garlands',
   'Flowers & Garlands', 'Flowers & Garlands', 'Flowers & Garlands', 'Flowers & Garlands'
   , 'Flowers & Garlands', 'Flowers & Garlands', 'Flowers & Garlands', 'Flowers & Garlands',
   'Flowers & Garlands', 'Other Offerings', 'Other Offerings', 'Other Offerings',
   'Other Offerings', 'Other Offerings', 'Other Offerings', 'Other Offerings', 'Feast & Prasadam', 'Feast & Prasadam'];

camp_data = [];
// data = products;

Donation_cmapign_types: Object;
colors = ['#9bd1ff', '#45444a', '#66ff75', '#fca252'];
colors1 = ['#94c6ff', '#57565c', '#75ff83', '#ffaa59'];
campaignTypesData = [];
campaignsData = [];
i;
j;
r;
dataLen;
drillDataLen;
brightness;
data1 = {
   data: []
};

// variables of Campaign Types chart ends here

// just to generate random data for campaing donations

generate_random_data(max) {
  let i = 0 ;
  const data = [];
   for ( i = 0 ; i < this.list_of_campaigns.length ; i++ ) {
   data[i] = Math.floor(Math.random() * Math.floor(max)) + 10;
   }
   return data;
}


  constructor() {

    let i = 0;
    const df = new DataFrame({'Campaigns': this.list_of_campaigns, 'Campaign_Types': this.list_of_campaign_type
        , 'Quarter1' : this.generate_random_data(500), 'Quarter2' : this.generate_random_data(600),
    'Quarter3' : this.generate_random_data(300), 'Quarter4' : this.generate_random_data(400), },
        ['Campaigns', 'Campaign_Types', 'Quarter1', 'Quarter2', 'Quarter3', 'Quarter4', 'Total_donation_per_campaign'
        ]);

    const df2 = df.map(row => row.set('Total_donation_per_campaign', row.get('Quarter1') + row.get('Quarter2')
        + row.get('Quarter3') + row.get('Quarter4')));

    const df5 = df2.groupBy('Campaign_Types').aggregate((group => group.stat.sum('Total_donation_per_campaign'))
    ).rename('aggregation', 'Total_donation_per_campaign_Type');
    const df6 = df2.innerJoin(df5, 'Campaign_Types');
    // console.log(df6.select('Total_donation_per_campaign').show());
    const list = df5.toArray();

    for (i = 0; i < list.length ; i++) {
            const data_dict = {};
            const campaign_data = {};
            data_dict['y'] = list[i][1];
            data_dict['color'] = this.colors[i];
            data_dict['name'] = list[i][0];
            campaign_data['categories'] = df6.filter(row => row.get('Campaign_Types') === list[i][0]).
                    select('Campaigns').toDict()['Campaigns'];
            campaign_data['data'] = df6.filter(row => row.get('Campaign_Types') === list[i][0]).
                    select('Total_donation_per_campaign').toDict()['Total_donation_per_campaign'];
            campaign_data['color'] = this.colors1[i];
            data_dict['drilldown'] = campaign_data;
            this.camp_data.push(data_dict);
    }
    console.log(this.camp_data);
        // creating Donut chart of donation per Campaign Types
    this.dataLen = Object.keys(this.camp_data).length;
    for (this.i = 0; this.i < this.dataLen; this.i += 1) {

    // add browser data
    this.campaignTypesData.push({
        name: this.camp_data[this.i].name,
        y: this.camp_data[this.i].y,
        color:  this.camp_data[this.i].color
    });

    // add version data
    this.drillDataLen = this.camp_data[this.i].drilldown.data.length;
    for (this.j = 0; this.j < this.drillDataLen; this.j += 1) {
        this.brightness = 0.2 - (this.j / this.drillDataLen) / 5;
        this.campaignsData.push({
            name: this.camp_data[this.i].drilldown.categories[this.j],
            y: this.camp_data[this.i].drilldown.data[this.j],
            color: this.camp_data[this.i].drilldown.color
        });
    }
    }
    console.log(this.campaignTypesData);
    console.log(this.campaignsData);
    this.Donation_cmapign_types = {
    chart: {
        type: 'pie',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            spacingRight: 5,
            height: 600,
            width: 900,
    },
    title: {
    text: 'Donation<br>Per Campaign<br>Types',
    align: 'center',
    verticalAlign: 'middle',
    widthAdjust: -44,
    y: -40
    },
    yAxis: {
        title: {
            text: 'Total Donation'
        }
    },
    plotOptions: {
    pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        startAngle: -90,
        endAngle : 90,
        shadow : false,
        center : ['50%', '50%']
    }
    },
    tooltip: {
        valuePrefix: '£ '
    },
    exporting: {
    enabled : true,
    filename : 'Donation Per Campaign Types'
    },
    'legend': {
    backgroundColor : '#FFFFFF',
    floating : true,
    x: 20,
    y: -240,
    labelFormatter : function () {
            return this.name + ':</b> '+ '£ ' + this.y ;
    }
    },
    series: [{
        name: 'Campaign Type',
        data: this.campaignTypesData,
        size: '60%',
        innerSize : '40%',
        showInLegend : true,
        dataLabels: {
        'enabled' : false
        }
    }, {
        name: 'Campaigns',
        data: this.campaignsData,
        size: '80%',
        innerSize: '60%',
        dataLabels: {
            formatter: function () {
                // display only if larger than 1
                return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + '£ '+
                    this.y  : null;
            }
        },
        id: 'versions'
    }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 400
            },
            chartOptions: {
                series: [{
                    id: 'versions',
                    dataLabels: {
                        enabled: false
                    }
                }]
            }
        }]
    }

    };
  }

  ngOnInit() {
  }

}
