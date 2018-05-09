import { AppRegistry } from 'react-native';
import App from './App';
import ChangeCity from './app/screens/ChangeCity';

import {StackNavigator} from "react-navigation";

const Navigator = StackNavigator({
    Home: {screen: App},
    ChangeCity: {screen: ChangeCity},
}, {headerMode: 'none'});

AppRegistry.registerComponent('clima', () => Navigator);
