import React, {Component} from 'react';
import { View, Text, Modal ,StyleSheet,Button,Alert,PanResponder,Share } from 'react-native';
import { Card, Rating, Icon, Input } from 'react-native-elements';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavourite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';



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

    const handleViewRef = (ref) => this.view = ref;

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return true;
        else
            return false;
    }
    const recognizeComment = ({ moveX, moveY, dx, dy }) => {
        if ( dx > 200 )
            return true;
        else
            return false;
    }


    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            this.view.rubberBand(1000)
            .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPressFav()}},
                    ],
                    { cancelable: false }
                );

            if (recognizeComment(gestureState))
                    props.onPressComment();
                
            return true;
        }
    })

    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        },{
            dialogTitle: 'Share ' + title
        })
    }

    if(dish!=null){
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
            ref={handleViewRef}
            {...panResponder.panHandlers}>
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
                            <Icon
                                raised
                                reverse
                                name='share'
                                type='font-awesome'
                                color='#51D2A8'
                                style={styles.cardItem}
                                onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)} />
                        </View>
                </Card>
            </Animatable.View>
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
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>        
            <Card title="Comments">
                <FlatList 
                    data = {comments}
                    keyExtractor = {item => item.id.toString()}
                    renderItem = {renderCommentItem} />
            </Card>
        </Animatable.View>
        
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