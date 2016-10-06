'use strict';

var React = require('react');
var ReactNative = require('react-native');
var DoctorListHomePage = require('./components/iOSComponents/HomePage');

var {AppRegistry} = ReactNative;

AppRegistry.registerComponent('PropertyFinder', () => DoctorListHomePage );