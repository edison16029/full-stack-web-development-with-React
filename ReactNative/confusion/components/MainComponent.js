import React, { Component } from 'react';
import MenuComponent from './MenuComponent';
import DishdetailComponent from './DishdetailComponent';
import ContactComponent from './ContactComponent';
import HomeComponent from  './HomeComponent';
import AboutComponent from './AboutComponent';
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

const HomeNavigator = createStackNavigator({ //Created To obtain the Title Bar
    Home: { screen: HomeComponent }
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

const ContactNavigator = createStackNavigator({ //Created To obtain the Title Bar
    Contact : { screen: ContactComponent }
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

const AboutNavigator = createStackNavigator({ //Created To obtain the Title Bar
    Contact : { screen: AboutComponent }
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
      },
      Contact: 
      { screen: ContactNavigator,
        navigationOptions: {
          title: 'Contact Us',
          drawerLabel: 'Contact Us'
        }, 
      },
      About: 
      { screen: AboutNavigator,
        navigationOptions: {
          title: 'About Us',
          drawerLabel: 'About Us'
        }, 
      },
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