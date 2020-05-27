import React, {Component} from 'react';
import { View, Text, Modal ,StyleSheet,Button } from 'react-native';
import { Card, Rating, Icon, Input } from 'react-native-elements';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavourite, postComment } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favourites : state.favourites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavourite : (dishId) => dispatch(postFavourite(dishId)),
    postComment : (dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment))
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
                    <View style={{alignItems:'center',justifyContent: 'center',flexDirection:'row'}}>

                        <Icon raised reverse
                            name= {props.isFavourite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress = { () => props.isFavourite ? console.log("Already Fav") : props.onPressFav()} />
                        <Icon raised reverse
                            name= 'pencil'
                            type='font-awesome'
                            color='#512DA8'
                            onPress = { () => props.onPressComment()} />
                    </View>
                    
                
            </Card>
        );
    }
    else{
        return(<View><Text>Undefined</Text></View>)
    }
}

function RenderComments(props){

    const comments = props.comments;
    // console.log("Comments : ",comments);
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

    constructor(props){
        super(props);
        this.state = {
            showModal : false,
            rating : 4,
            author:'',
            comment:''
        }
    }

    toggleModal(){
        this.setState({showModal : !this.state.showModal})
    }
    markFavourite(dishId){
        this.props.postFavourite(dishId);
    }

    onSubmit(dishId){
        // console.log(this.state);
        this.toggleModal();
        this.props.postComment(dishId,this.state.rating.toString(),this.state.author,this.state.comment);
    }
    onCancel(){
        this.toggleModal();
        this.setState({rating:4,author:'',comment:''})
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        // console.log("Comments in DDC : ",this.props.comments);
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                    isFavourite = {this.props.favourites.some( (element) => element===dishId)}
                    onPressFav = {() => this.markFavourite(dishId)}
                    onPressComment = {() => this.toggleModal()}
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View style={styles.modal} >
                        <Text style = {styles.modalTitle}>Enter Comment</Text>
                        <Rating showRating 
                            startingValue={this.state.rating}
                            onFinishRating={(val) => {this.setState({rating :val})}}/>
                        <Input
                            placeholder="Author"
                            leftIcon={{ type: 'font-awesome', name: 'user', style :{padding:10} }}
                            style={styles}
                            onChangeText={value => this.setState({ author: value })}
                            />
                         <Input
                            placeholder="Comment"
                            leftIcon={{ type: 'font-awesome', name: 'comment-o', style :{padding:8} }}
                            style={styles}
                            onChangeText={value => this.setState({ comment: value })}
                            />

                        <Button title="Submit"
                            color="#512DA8"
                            onPress={() => this.onSubmit(dishId)}
                            />
                        <View style={{margin:10}}></View>
                        <Button title="Cancel"
                            color="#777777"
                            onPress={() => this.onCancel()}
                            />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
});

export default connect(mapStateToProps,mapDispatchToProps)(DishdetailComponent);