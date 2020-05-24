import React, { Component } from 'react';
import MenuComponent from './MenuComponent';
import DishdetailComponent from './DishdetailComponent';
import { View } from 'react-native';
import { createStackNavigator} from 'react-navigation';

const MenuNavigator = createStackNavigator({
        Menu: { screen: MenuComponent },
        Dishdetail: { screen: DishdetailComponent }
    },
    {
        initialRouteName: 'Menu',
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"            
            }
        }
    }
);


class MainComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
            <MenuNavigator />
        </View>

        );
    }
}

export default MainComponent;