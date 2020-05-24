import React, { Component } from 'react';
import MenuComponent from './MenuComponent';
import DishdetailComponent from './DishdetailComponent';
import Home from  './HomeComponent';
import { View } from 'react-native';
import { createStackNavigator, createDrawerNavigator} from 'react-navigation';

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

const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff"  
    })
});

const MainNavigator = createDrawerNavigator({
    Home: 
      { screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home'
        }
      },
    Menu: 
      { screen: MenuNavigator,
        navigationOptions: {
          title: 'Menu',
          drawerLabel: 'Menu'
        }, 
      }
}, {
  drawerBackgroundColor: '#D1C4E9'
});


class MainComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
            <MainNavigator />
        </View>

        );
    }
}

export default MainComponent;