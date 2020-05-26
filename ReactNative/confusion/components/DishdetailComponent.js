import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavourite } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favourites : state.favourites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavourite : (dishId) => dispatch(postFavourite(dishId))
})


function RenderDish(props){
    const dish = props.dish;
    if(dish!=null){
        return(
            <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}>
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
    console.log("Comments : ",comments);
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

    markFavourite(dishId){
        this.props.postFavourite(dishId);
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        console.log("Comments in DDC : ",this.props.comments);
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                    isFavourite = {this.props.favourites.some( (element) => element===dishId)}
                    onPress = {() => this.markFavourite(dishId)}/>
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DishdetailComponent);