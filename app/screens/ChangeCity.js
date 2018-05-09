import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    ImageBackground
} from 'react-native';

const remote = require('../../assets/images/weather_background.jpg');
const newActivity = require('../../assets/images/left.png');

export default class ChangeCity extends Component {
    constructor(props){
        super(props);

        this.state = {
            city: ''
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        return(
            <ImageBackground source={remote} style={styles.backgroundImage}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    this.props.navigation.state.params.returnData(this.state.city);
                    this.props.navigation.goBack();
                }}>
                    <Image source={newActivity} style={styles.buttonImage}/>
                </TouchableOpacity>
                <Text style={styles.ChangeCityText}>Change City Name</Text>
                <TextInput
                    onChangeText={(city) => this.setState({city})}
                    underlineColorAndroid = "transparent" 
                    style={styles.ChangeInput}/>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    ChangeCityText: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 150,
        color: 'white',
    },
    ChangeInput: {
        margin: 15,
        height: 60,
        fontSize: 30,
        borderColor: '#7a42f4',
        borderWidth: 2,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        width:320,
        height:480,
    },
    button: {
        alignSelf: 'flex-start',
    },
    buttonImage: {
        width: 70,
        height: 60
    },
    backgroundImage: {
        width: '100%',
        height: '100%'
    }
});
