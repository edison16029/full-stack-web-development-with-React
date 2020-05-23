import React, { Component } from 'react';
import Menu from './MenuComponent';
import {DISHES} from '../shared/dishes';
import MenuComponent from './MenuComponent';
import DishdetailComponent from './DishdetailComponent';
import { View } from 'react-native';

class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dishes : DISHES,
            selectedDishId : null
         };
    }

    onDishSelect(dishId) {
        this.setState({selectedDishId : dishId});
    }
    render() {
        return (
            <View>
                <MenuComponent dishes={this.state.dishes} 
                    onPress= {(dishId) => this.onDishSelect(dishId)}
                />
                <DishdetailComponent dish = {this.state.dishes.filter((dish) => dish.id === this.state.selectedDishId)[0]} />
            </View>

        );
    }
}

export default MainComponent;