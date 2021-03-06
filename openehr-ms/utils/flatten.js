/*

 ----------------------------------------------------------------------------
 | openehr-ms: OpenEHR Interface QEWD-Up MicroService                       |
 |                                                                          |
 | Copyright (c) 2019 M/Gateway Developments Ltd,                           |
 | Redhill, Surrey UK.                                                      |
 | All rights reserved.                                                     |
 |                                                                          |
 | http://www.mgateway.com                                                  |
 | Email: rtweed@mgateway.com                                               |
 |                                                                          |
 |                                                                          |
 | Licensed under the Apache License, Version 2.0 (the "License");          |
 | you may not use this file except in compliance with the License.         |
 | You may obtain a copy of the License at                                  |
 |                                                                          |
 |     http://www.apache.org/licenses/LICENSE-2.0                           |
 |                                                                          |
 | Unless required by applicable law or agreed to in writing, software      |
 | distributed under the License is distributed on an "AS IS" BASIS,        |
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. |
 | See the License for the specific language governing permissions and      |
 |  limitations under the License.                                          |
 ----------------------------------------------------------------------------

  31 March 2019

*/

var traverse = require('traverse');

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = function(obj) {
  var flatObj = {};

  var outputObj = traverse(obj).map(function(node) {
    if (this.isLeaf) {
      var flatPath = '';
      var slash = '';
      var colon = '';
      var lastPathIndex = this.path.length - 1;
      var pathArr = this.path;
      pathArr.forEach(function(path, index) {
        if (isNumeric(path)) {
          flatPath = flatPath + colon + path;
        }
        else {
          if (index === lastPathIndex && path[0] === '|' && isNumeric(pathArr[index -1])) slash = '';
          flatPath = flatPath + slash + path;
        }
        slash = '/';
        colon = ':';
      });
      flatObj[flatPath] = node;
    }
  });

  // tidy up any DV_TEXT nodes without codes

  var rootPath;
  var value;
  var flatJson = {};
  for (var path in flatObj) {
    if (path.slice(-6) === '|value') {
      rootPath = path.slice(0, -6);
      if (!flatObj[rootPath + '|code'] && !flatObj[rootPath + '|terminology']) {
        value = flatObj[path];
        flatJson[rootPath] = flatObj[path];
      }
      else {
        flatJson[path] = flatObj[path];
      }
    }
    else {
      flatJson[path] = flatObj[path];
    }
  }

  return flatJson;
};
