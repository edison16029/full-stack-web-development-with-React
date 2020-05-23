import React, { Component } from 'react';
import { View,FlatList,Text } from 'react-native';
import { ListItem} from 'react-native-elements';

function MenuComponent(props){
    
    const renderMenuItem = ({item,index}) => {
        return (
            <ListItem 
            key = {index}
            title = {item.name}
            subtitle = {item.description}
            hideChevron = {true}
            leftAvatar={{ source: require('./images/uthappizza.png')}}
            />
        );


    }
    return (
        <FlatList
            data = {props.dishes}
            keyExtractor = {item => item.id.toString()}
            renderItem = {renderMenuItem} /> 
    )
}

export default MenuComponent;