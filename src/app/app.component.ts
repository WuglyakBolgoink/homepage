import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  plugins: any = {};

  autoScale = true;
  single: any;
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Day';
  showYAxisLabel = true;
  yAxisLabel = 'Downloads';
  tooltipDisabled = false;

  colorSchemeBar = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  interpolationTypes = [
    'Bundle', 'Cardinal', 'Catmull Rom', 'Linear', 'Monotone X',
    'Monotone Y', 'Natural', 'Step', 'Step After', 'Step Before'
  ];

  orientation = 'TB'; // LR, RL, TB, BT
  curve: any = shape.curveLinear;
  curveType: string = this.interpolationTypes[2];
  colorSets: any = [
    {
      name: 'vivid',
      selectable: true,
      group: 'Ordinal',
      domain: [
        '#647c8a', '#3f51b5', '#2196f3', '#00b862', '#afdf0a', '#a7b61a', '#f3e562', '#ff9800', '#ff5722', '#ff4514'
      ]
    },
    {
      name: 'natural',
      selectable: true,
      group: 'Continuous',
      domain: [
        '#bf9d76', '#e99450', '#d89f59', '#f2dfa7', '#a5d7c6', '#7794b1', '#afafaf', '#707160', '#ba9383', '#d9d5c3'
      ]
    },
    {
      name: 'cool',
      selectable: true,
      group: 'Ordinal',
      domain: [
        '#a8385d', '#7aa3e5', '#a27ea8', '#aae3f5', '#adcded', '#a95963', '#8796c0', '#7ed3ed', '#50abcc', '#ad6886'
      ]
    },
    {
      name: 'fire',
      selectable: true,
      group: 'Ordinal',
      domain: [
        '#ff3d00', '#bf360c', '#ff8f00', '#ff6f00', '#ff5722', '#e65100', '#ffca28', '#ffab00'
      ]
    },
    {
      name: 'solar',
      selectable: true,
      group: 'Continuous',
      domain: [
        '#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00'
      ]
    },
    {
      name: 'air',
      selectable: true,
      group: 'Continuous',
      domain: [
        '#e1f5fe', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b'
      ]
    },
    {
      name: 'aqua',
      selectable: true,
      group: 'Continuous',
      domain: [
        '#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064'
      ]
    },
    {
      name: 'flame',
      selectable: false,
      group: 'Ordinal',
      domain: [
        '#A10A28', '#D3342D', '#EF6D49', '#FAAD67', '#FDDE90', '#DBED91', '#A9D770', '#6CBA67', '#2C9653', '#146738'
      ]
    },
    {
      name: 'ocean',
      selectable: false,
      group: 'Ordinal',
      domain: [
        '#1D68FB', '#33C0FC', '#4AFFFE', '#AFFFFF', '#FFFC63', '#FDBD2D', '#FC8A25', '#FA4F1E', '#FA141B', '#BA38D1'
      ]
    },
    {
      name: 'forest',
      selectable: false,
      group: 'Ordinal',
      domain: [
        '#55C22D', '#C1F33D', '#3CC099', '#AFFFFF', '#8CFC9D', '#76CFFA', '#BA60FB', '#EE6490', '#C42A1C', '#FC9F32'
      ]
    },
    {
      name: 'horizon',
      selectable: false,
      group: 'Ordinal',
      domain: [
        '#2597FB', '#65EBFD', '#99FDD0', '#FCEE4B', '#FEFCFA', '#FDD6E3', '#FCB1A8', '#EF6F7B', '#CB96E8', '#EFDEE0'
      ]
    },
    {
      name: 'neons',
      selectable: false,
      group: 'Ordinal',
      domain: [
        '#FF3333', '#FF33FF', '#CC33FF', '#0000FF', '#33CCFF', '#33FFFF', '#33FF66', '#CCFF33', '#FFCC00', '#FF6600'
      ]
    },
    {
      name: 'picnic',
      selectable: false,
      group: 'Ordinal',
      domain: [
        '#FAC51D', '#66BD6D', '#FAA026', '#29BB9C', '#E96B56', '#55ACD2', '#B7332F', '#2C83C9', '#9166B8', '#92E7E8'
      ]
    },
    {
      name: 'night',
      selectable: false,
      group: 'Ordinal',
      domain: [
        '#2B1B5A', '#501356', '#183356', '#28203F', '#391B3C', '#1E2B3C', '#120634',
        '#2D0432', '#051932', '#453080', '#75267D', '#2C507D', '#4B3880', '#752F7D', '#35547D'
      ]
    },
    {
      name: 'nightLights',
      selectable: false,
      group: 'Ordinal',
      domain: [
        '#4e31a5', '#9c25a7', '#3065ab', '#57468b', '#904497', '#46648b',
        '#32118d', '#a00fb3', '#1052a2', '#6e51bd', '#b63cc3', '#6c97cb', '#8671c1', '#b455be', '#7496c3'
      ]
    }
  ];
  colorSchemeGraph: any = this.colorSets[1];
  autoZoom = false;
  zoomLevel = 1;

  hierarchialGraph = {
    nodes: [
      {
        id: 'start',
        label: 'I am a Web-Developer',
        color: '#a31993'
      }, {
        id: '1',
        label: 'Front-End'
      }, {
        id: '2',
        label: 'Back-End'
      }, {
        id: '3',
        label: 'DevOps'
      }, {
        id: '4',
        label: 'Basic'
      }, {
        id: '5',
        label: 'HTML'
      }, {
        id: '6',
        label: 'CSS'
      }, {
        id: '7',
        label: 'JavaScript'
      }, {
        id: '8',
        label: 'ES6'
      }, {
        id: '9',
        label: 'TypeScript'
      }, {
        id: '10',
        label: 'Task Runners'
      }, {
        id: '11',
        label: 'npm scripts'
      }, {
        id: '12',
        label: 'gulp'
      }, {
        id: '13',
        label: 'SASS'
      }, {
        id: '14',
        label: 'Package manager'
      }, {
        id: '15',
        label: 'yarn'
      }, {
        id: '16',
        label: 'npm'
      }, {
        id: '17',
        label: 'JS Testing'
      }, {
        id: '18',
        label: 'Preprocessors'
      }, {
        id: '19',
        label: 'mocha'
      }, {
        id: '20',
        label: 'jasmine'
      }, {
        id: '21',
        label: 'CSS Frameworks'
      }, {
        id: '22',
        label: 'Responsive Web'
      }, {
        id: '23',
        label: 'protractor'
      }, {
        id: '24',
        label: 'karma'
      }, {
        id: '25',
        label: 'bootstrap'
      }, {
        id: '26',
        label: 'LESS'
      }, {
        id: '27',
        label: 'Clarity',
        url: 'https://vmware.github.io/clarity'
      }, {
        id: '28',
        label: 'Angular Material',
        url: 'https://material.angular.io'
      }, {
        id: '29',
        label: 'Angular v1'
      }, {
        id: '31',
        label: 'Angular v5+',
        url: 'https://angular.io'
      }, {
        id: '30',
        label: 'JS Frameworks'
      }, {
        id: '32',
        label: 'ng-bootstrap',
        url: 'https://ng-bootstrap.github.io'
      }, {
        id: '33',
        label: 'RxJs'
      }, {
        id: '34',
        label: 'NG Frameworks'
      }, {
        id: '35',
        label: 'E2E'
      }, {
        id: '36',
        label: 'Unit'
      }, {
        id: '37',
        label: 'SVG'
      }, {
        id: '38',
        label: 'D3.js'
      }, {
        id: '39',
        label: 'NodeJS'
      }, {
        id: '40',
        label: 'NodeJS Frameworks'
      }, {
        id: '41',
        label: 'expressJS'
      }, {
        id: '42',
        label: 'Web Servers'
      }, {
        id: '43',
        label: 'Apache'
      }, {
        id: '44',
        label: 'Nginx'
      }, {
        id: '45',
        label: 'Tomcat'
      }, {
        id: '46',
        label: 'RESTful API'
      }, {
        id: '47',
        label: 'Regular expressions'
      }, {
        id: '48',
        label: 'Docker'
      },

      {
        id: '49',
        label: 'OS'
      }, {
        id: '50',
        label: 'Debian'
      }, {
        id: '51',
        label: 'Linux'
      },

      {
        id: '52',
        label: 'Automation'
      }, {
        id: '53',
        label: 'Ansible'
      },

      {
        id: '54',
        label: 'CI/CD'
      }, {
        id: '55',
        label: 'Jenkins'
      }, {
        id: '56',
        label: 'Travis'
      },

      {
        id: '57',
        label: 'Containers -> Docker'
      }

    ],
    links: [
      {
        source: 'start',
        target: '1'
      }, {
        source: 'start',
        target: '2'
      }, {
        source: '1',
        target: '4',
        label: 'Learn the basic'
      }, {
        source: 'start',
        target: '3'
      }, {
        source: '4',
        target: '5'
      }, {
        source: '4',
        target: '6'
      }, {
        source: '4',
        target: '7'
      }, {
        source: '7',
        target: '8'
      }, {
        source: '7',
        target: '9'
      }, {
        source: '7',
        target: '10'
      }, {
        source: '7',
        target: '17'
      }, {
        source: '7',
        target: '14'
      }, {
        source: '10',
        target: '11'
      }, {
        source: '10',
        target: '12'
      }, {
        source: '14',
        target: '15'
      }, {
        source: '14',
        target: '16'
      }, {
        source: '6',
        target: '18'
      }, {
        source: '36',
        target: '19'
      }, {
        source: '36',
        target: '20'
      }, {
        source: '6',
        target: '21'
      }, {
        source: '35',
        target: '23'
      }, {
        source: '6',
        target: '22'
      }, {
        source: '36',
        target: '24'
      }, {
        source: '18',
        target: '13'
      }, {
        source: '21',
        target: '25'
      }, {
        source: '18',
        target: '26'
      }, {
        source: '34',
        target: '28'
      }, {
        source: '30',
        target: '29'
      }, {
        source: '30',
        target: '31'
      }, {
        source: '34',
        target: '27'
      }, {
        source: '7',
        target: '30'
      }, {
        source: '34',
        target: '32'
      }, {
        source: '31',
        target: '33'
      }, {
        source: '9',
        target: '31'
      }, {
        source: '31',
        target: '34'
      }, {
        source: '17',
        target: '35'
      }, {
        source: '17',
        target: '36'
      }, {
        source: '5',
        target: '37'
      }, {
        source: '37',
        target: '38'
      }, {
        source: '38',
        target: '7'
      }, {
        source: '2',
        target: '39'
      }, {
        source: '39',
        target: '7'
      }, {
        source: '39',
        target: '17'
      }, {
        source: '39',
        target: '14'
      }, {
        source: '39',
        target: '40'
      }, {
        source: '40',
        target: '41'
      }, {
        source: '2',
        target: '42'
      }, {
        source: '42',
        target: '43'
      }, {
        source: '42',
        target: '44'
      }, {
        source: '42',
        target: '45'
      }, {
        source: '2',
        target: '46'
      }, {
        source: '2',
        target: '47'
      }, {
        source: '2',
        target: '48'
      },

      {
        source: '3',
        target: '49'
      },
      {
        source: '3',
        target: '52'
      },
      {
        source: '3',
        target: '54'
      },
      {
        source: '3',
        target: '57'
      },
      {
        source: '3',
        target: '42'
      },

      {
        source: '57',
        target: '48'
      },

      {
        source: '49',
        target: '50'
      },
      {
        source: '49',
        target: '51'
      },

      {
        source: '52',
        target: '53'
      },

      {
        source: '54',
        target: '55'
      },
      {
        source: '54',
        target: '56'
      }

    ]
  };

  view: any[] = undefined;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.preparePluginStats('cordova-plugin-ckopenimage');
    this.preparePluginStats('cordova-plugin-iroot');
  }

  preparePluginStats(pluginName) {
    let cache = localStorage.getItem(pluginName);

    if (!cache) {
      this.http.get('https://api.npmjs.org/downloads/range/last-month/' + pluginName)
        .subscribe(data => {
          this.plugins[pluginName] = this.prepareCache(data);
          localStorage.setItem(pluginName, JSON.stringify(data, null, 2));
        });
    } else {
      cache = JSON.parse(cache);
      this.plugins[pluginName] = this.prepareCache(cache);
    }
  }

  json2string(json) {
    return JSON.stringify(json);
  }

  prepareCache(data) {
    console.log(data);

    const result = {
      name: data.package,
      series: []
    };

    data.downloads.forEach((el) => {
      result.series.push({
        name: moment(el.day).format('DD-MM-YY'),
        value: el.downloads
      });
    });

    console.log('[app.component][prepareCache] result:', JSON.stringify(result, null, 2));

    return result;
  }

  select($event) {
    console.log($event);

    if ($event.url) {
      window.open($event.url, '_blank');
    }
  }

  onLegendLabelClick($event) {
    console.log($event);
  }

}
