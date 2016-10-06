'use strict';

var React = require('react');
var ReactNative = require('react-native');
var SearchPage = require('./SearchPage');

var {
    Component,
} = React;

var {
    AppRegistry,
    NavigatorIOS,
    StyleSheet,
    Text,
} = ReactNative;

var styles = StyleSheet.create({
    text: {
        color: 'black',
        backgroundColor: 'white',
        fontSize: 30,
        margin: 80
    },
    container: {
        flex: 1,
    }
});

class DoctorListHomePage extends Component {
    render() {
        return (
            <NavigatorIOS style={styles.container} initialRoute={{title: "Doctor list", component: SearchPage}}/>
        );
    }
}

module.exports = DoctorListHomePage;