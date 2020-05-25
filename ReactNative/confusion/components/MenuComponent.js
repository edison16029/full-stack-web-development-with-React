import React, { Component } from 'react';
import { View,FlatList,Text } from 'react-native';
import { ListItem} from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Tile } from 'react-native-elements';

const mapStateToProps = state => {
    return {
      dishes: state.dishes
    }
  }


class MenuComponent extends Component{


    static navigationOptions = {
        title: 'Menu'
    };

    render() {
        const renderMenuItem = ({item,index}) => {
            return (
                <Tile 
                key = {index}
                title = {item.name}
                caption = {item.description}
                featured
                onPress={() => navigate('Dishdetail', { dishId: item.id })}
                imageSrc={{ uri : baseUrl + item.image}}
                />
            );
        }

        const { navigate } = this.props.navigation;
        return (
            <FlatList
                data = {this.props.dishes.dishes}
                keyExtractor = {item => item.id.toString()}
                renderItem = {renderMenuItem} /> 
        )
    }

}

export default connect(mapStateToProps)(MenuComponent);