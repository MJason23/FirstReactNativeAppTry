'use strict';

var React = require('react');
var ReactNative = require('react-native');
var SearchPage = require('./components/SearchPage');

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

class HelloWorld extends Component {
    render() {
        return (
            <Text style={styles.text}>Hello Shuai~ </Text>
        );
    }
}

class PropertyFinderApp extends Component {
    render() {
        return (
            <NavigatorIOS style={styles.container} initialRoute={{title: "Property Finder", component: SearchPage}}/>
        );
    }
}

AppRegistry.registerComponent('PropertyFinder', () => PropertyFinderApp );