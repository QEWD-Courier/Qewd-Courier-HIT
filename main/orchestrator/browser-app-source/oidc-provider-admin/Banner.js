/*

 ----------------------------------------------------------------------------
 | qewd-oidc-admin: Administration Interface for QEWD OpenId Connect Server |
 |                                                                          |
 | Copyright (c) 2018 M/Gateway Developments Ltd,                           |
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

 02 October 2018

*/

"use strict"

var React = require('react');
var createReactClass = require('create-react-class');
var ReactBootstrap = require('react-bootstrap');
var {
  Nav,
  Navbar,
  NavItem
} = ReactBootstrap;

var Banner = createReactClass({

  componentWillMount: function() {
    this.controller = require('./controller-Banner').call(this, this.props.controller);
  },

  render: function() {
    //console.log('render Banner');
    //this.props.controller.updateComponentPath(this);

    var _this = this;
    var navItems = [];
    var navItem;
    var count = 0;
    this.navs.forEach(function(nav) {
      if (nav.default) _this.activeKey = nav.eventKey;

      navItem = (
        <NavItem
          eventKey = {nav.eventKey}
          key = {count}
        >
          {nav.text}
        </NavItem>
      );
      navItems.push(navItem);
      count++;
    });

   if (this.navs.activeKey) this.activeKey = this.navs.activeKey;


    return (
      <div>
        <Navbar inverse >
          <Navbar.Brand>
            {this.props.controller.app.title}
          </Navbar.Brand>
          <Nav 
            activeKey = {this.activeKey}
            onSelect = {this.props.controller.navOptionSelected}
          >
            {navItems}
          </Nav>
          <Nav
            pullRight
            onSelect = {this.props.controller.navOptionSelected}
          >
            <NavItem
              eventKey = "logout"
            >
              Logout
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
});

module.exports = Banner;


