/*

 ------------------------------------------------------------------------------------
 | qewd-monitor: React.js-based Monitor/Management Application for QEWD             |
 |                                                                                  |
 | Copyright (c) 2017-18 M/Gateway Developments Ltd,                                |
 | Redhill, Surrey UK.                                                              |
 | All rights reserved.                                                             |
 |                                                                                  |
 | http://www.mgateway.com                                                          |
 | Email: rtweed@mgateway.com                                                       |
 |                                                                                  |
 |                                                                                  |
 | Licensed under the Apache License, Version 2.0 (the "License");                  |
 | you may not use this file except in compliance with the License.                 |
 | You may obtain a copy of the License at                                          |
 |                                                                                  |
 |     http://www.apache.org/licenses/LICENSE-2.0                                   |
 |                                                                                  |
 | Unless required by applicable law or agreed to in writing, software              |
 | distributed under the License is distributed on an "AS IS" BASIS,                |
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.         |
 | See the License for the specific language governing permissions and              |
 |  limitations under the License.                                                  |
 ------------------------------------------------------------------------------------

  21 September 2018

*/

var reactLoader = require('qewd-react').loader;

var params = {
  applicationName: 'qewd-monitor-ms',
  MainPage: require('./MainPage'),
  log: true,
  jwt: true,
  config: {
    title: 'QEWD Monitor for MicroServices',
    loginModal: {
      oidc: true
    },
    shutdown: {
      buttonText: 'Restart'
    },
    navs: [
      {
        text: 'Overview',
        eventKey: 'overview',
        default: true,
        panel: {
          title: 'QEWD Overview',
          bsStyle: 'primary',
          contentComponent: require('./OverviewPanel')
        }
      },
      {
        text: 'Document Store',
        eventKey: 'docstore',
        disabled: 'dynamic',
        panel: {
          title: 'Persistent Documents',
          bsStyle: 'primary',
          contentComponent: require('./DocumentStorePanel')
        }
      },
      {
        text: 'Sessions',
        eventKey: 'sessions',
        disabled: 'dynamic',
        panel: {
          title: 'Sessions',
          bsStyle: 'primary',
          contentComponent: require('./SessionsPanel')
        }
      }
    ],
    local: false
  }
};

reactLoader(params);

