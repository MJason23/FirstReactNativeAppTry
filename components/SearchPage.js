'use strict'

var React = require('react');
var ReactNative = require('react-native');
var SearchResults = require('./SearchResults');

var {Component} = React;
var {StyleSheet, Text, TextInput, View, TouchableHighlight, ActivityIndicator, Image} = ReactNative;

var styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize:18,
        textAlign: 'center',
        color: '#656565',
    },
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center',
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
    },
    button: {
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center',
    },
    houseImage: {
        width: 217,
        height: 138,
    },
});

function urlForQueryAndPage(key, value, pageNumber) {
    var data = {
        country: 'uk',
        pretty: '1',
        encoding: 'json',
        listing_type: 'buy',
        action: 'search_listings',
        page: pageNumber
    };
    data[key] = value;

    var queryString = Object.keys(data)
        .map(key => key + '=' + encodeURIComponent(data[key]))
        .join('&');

    return 'http://api.nestoria.co.uk/api?' + queryString;
}

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: "London",
            isLoading: false,
            message: '',
        };
    }

    onSearchTextChanged(event) {
        this.setState({searchString: event.nativeEvent.text});
    }

    _handleReponse(response) {
        this.setState({isLoading: false, message: ''});
        if(response.application_response_code.substr(0,1) === '1'){
            //console.log('Properties found ' + response.listings.length);
            this.props.navigator.push({
                title: 'Results',
                component: SearchResults,
                passProps: {listings: response.listings},
            });
        } else {
            this.setState({message: 'Location not recognized, please try again.'});
        }
    }

    _executeQuery(query) {
        //console.log(query);
        this.setState({isLoading: true});

        fetch(query)
            .then(response => response.json())
            .then(json => this._handleReponse(json.response))
            .catch( error =>
                this.setState({
                    isLoading: false,
                    message: 'Something bad happened ' + error
                })
            );
    }

    onLocationPressed() {
        navigator.geolocation.getCurrentPosition(
            location => {
                var search = location.coords.latitude + ',' + location.coords.longitude;
                this.setState({searchString: search});
                var query = urlForQueryAndPage('centre_point', search, 1);
                this._executeQuery(query);
            },
            error => {
                this.setState({message: 'There was a problem with obtaining your location: ' + error});
            }
        );
    }

    onSearchPressed() {
        var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
        this._executeQuery(query);
    }

    render() {
        var spinner = this.state.isLoading ? (<ActivityIndicator size="large"/>) : (<View/>)

        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    Search for houses to buy!
                </Text>
                <Text style={styles.description}>
                    Search by place name, postcode or saerch near your location.
                </Text>

                <View style={styles.flowRight}>
                    <TextInput style={styles.searchInput}
                    placeholder="Search via name or postcode"
                    value={this.state.searchString}
                    onChange={this.onSearchTextChanged.bind(this)}/>
                    <TouchableHighlight style={styles.button}
                                        underlayColor="#99d9f4"
                                        onPress={this.onSearchPressed.bind(this)}>
                        <Text style={styles.buttonText}> Go </Text>
                    </TouchableHighlight>
                </View>
                <TouchableHighlight style={styles.button} onPress={this.onLocationPressed.bind(this)} underlayColor="#99d9f4">
                    <Text style={styles.buttonText}>Location</Text>
                </TouchableHighlight>
                <Image style={styles.houseImage} source={require('../Resources/house.png')}/>
                {spinner}
                <Text style={styles.description}>{this.state.message}</Text>
            </View>
        );
    }
}

module.exports = SearchPage;