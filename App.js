import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
    Image,
    ImageBackground
} from 'react-native';
import APP_ID from './keys';
const remote = require('./assets/images/city_background.jpeg');
const newActivity = require('./assets/images/change_city_symbol_small.png');
//const condition = require('./assets/images/city_background.jpeg');

export default class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            newCity: 'Fetching location',
            latitude: null,
            longitude: null,
            error: null,
            temp: null,
            image: 'dunno'
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
            });

            this.getWeather(position);
            
          },
          (error) => this.setState({ error: error.message }),
          { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
        );
        if(this.state.error){
            alert(this.state.error);
        }
    }

    getWeather(position){
        const WEATHER_URL = `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${APP_ID}`;
        
        
        fetch(WEATHER_URL, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                this.setState({
                    newCity: json['name'],
                    temp: parseFloat(json['main']['temp']) - 273.15,
                    image: json['weather'][0]['id']
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    updateWeatherIcon(condition) {

        if (condition >= 0 && condition < 300) {
            return require('./assets/images/tstorm1.png');
        } else if (condition >= 300 && condition < 500) {
            return require('./assets/images/light_rain.png');
        } else if (condition >= 500 && condition < 600) {
            return require('./assets/images/shower3.png');
        } else if (condition >= 600 && condition <= 700) {
            return require('./assets/images/snow4.png');
        } else if (condition >= 701 && condition <= 771) {
            return require('./assets/images/fog.png');
        } else if (condition >= 772 && condition < 800) {
            return require('./assets/images/tstorm3.png');
        } else if (condition == 800) {
            return require('./assets/images/sunny.png');
        } else if (condition >= 801 && condition <= 804) {
            return require('./assets/images/cloudy2.png');
        } else if (condition >= 900 && condition <= 902) {
            return require('./assets/images/tstorm3.png');
        } else if (condition == 903) {
            return require('./assets/images/snow5.png');
        } else if (condition == 904) {
            return require('./assets/images/sunny.png');
        } else if (condition >= 905 && condition <= 1000) {
            return require('./assets/images/tstorm3.png');
        }

        return require('./assets/images/dunno.png');
    }

    returnData(city) {
        this.setState({newCity: city});
        const WEATHER_URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_ID}`;
        
        
        fetch(WEATHER_URL, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                this.setState({
                    newCity: json['name'],
                    temp: parseFloat(json['main']['temp']) - 273.15,
                    image: json['weather'][0]['id']
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <ImageBackground source={remote} style={styles.backgroundImage}>
                <TouchableOpacity style={styles.button} onPress={() => navigate('ChangeCity', {returnData: this.returnData.bind(this)})}>
                    <Image source={newActivity} style={styles.buttonImage}/>
                </TouchableOpacity>
                <Text style={styles.ChangeTempText}>
                    {this.state.temp ? this.state.temp+"℃" : 'NA'}
                </Text>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image source={this.updateWeatherIcon(this.state.image)}/>
                </View>
                <Text style={styles.ChangeCityText}>{this.state.newCity}</Text>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    condition: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    ChangeCityText: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        bottom: -10,
        marginTop: 150,
        color: 'white',
    },
    ChangeTempText: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        bottom: -10,
        marginLeft: 200,
        color: 'white',
    },
    button: {
        alignSelf: 'flex-end',
    },
    buttonImage: {
        width: 100,
        height: 100
    },
    backgroundImage: {
        width: '100%',
        height: '100%'
    }
});
