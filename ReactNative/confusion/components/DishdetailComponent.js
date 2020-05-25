import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import { DISHES} from '../shared/dishes';
import { COMMENTS} from '../shared/comments';
import { ScrollView, FlatList } from 'react-native-gesture-handler';

function RenderDish(props){
    const dish = props.dish;
    if(dish!=null){
        return(
            <Card
                featuredTitle={dish.name}
                image={require('./images/uthappizza.png')}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <Icon raised reverse
                        name= {props.isFavourite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress = { () => props.isFavourite ? console.log("Already Fav") : props.onPress()} />
                
            </Card>
        );
    }
    else{
        return(<View><Text>Undefined</Text></View>)
    }
}

function RenderComments(props){
    const comments = props.comments;
    const renderCommentItem = ({item,index}) => (
        <View key={index} style={{margin: 10}}>
            <Text style={{fontSize: 14}}>{item.comment}</Text>
            <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
            <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
        </View>
    )
    return (
        <Card title="Comments">
            <FlatList 
                data = {comments}
                keyExtractor = {item => item.id.toString()}
                renderItem = {renderCommentItem} />
        </Card>
        
    );
}
class DishdetailComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments : COMMENTS,
            favourites : []
        };
    }

    markFavourite(dishId){
        this.setState({ favourites : this.state.favourites.concat(dishId)});
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        return(
            <ScrollView>
                <RenderDish dish={this.state.dishes[+dishId]} 
                    isFavourite = {this.state.favourites.some( (element) => element===dishId)}
                    onPress = {() => this.markFavourite(dishId)}/>
                <RenderComments comments={this.state.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        );
    }
}

export default DishdetailComponent;