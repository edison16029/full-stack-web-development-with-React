import React,{Component} from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Dishdetail from './DishdetailComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { postComment, fetchDishes, fetchComments, fetchPromotions, fetchLeaders} from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    leaders: state.leaders,
    promotions: state.promotions,
    comments: state.comments
  }
}

const mapDispatchToProps = dispatch => ({
    postComment : (dishId, rating, author, comment) => dispatch(postComment(dishId,rating,author,comment)),
    fetchDishes: () => {dispatch(fetchDishes())},
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
    fetchPromotions: () => {dispatch(fetchPromotions())},
    fetchComments: () => {dispatch(fetchComments())},
    fetchLeaders: () => {dispatch(fetchLeaders())}
});



class Main extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount() { //Lifecycle Method, will be called as soon as Component is mounted to view.
    console.log("Fetching ");
    this.props.fetchDishes();
    this.props.fetchPromotions();
    this.props.fetchComments();
    this.props.fetchLeaders();
    console.log("Fetched ");
  }

  render(){
    const HomePage = () => {
      return(
          <Home 
            dish = {this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
            dishesLoading = {this.props.dishes.isLoading}
            dishesErrMess = {this.props.dishes.errMess}
            promotion = {this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
            promotionsLoading = {this.props.promotions.isLoading}
            promotionsErrMess = {this.props.promotions.errMess}
            leader = {this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
            leadersLoading = {this.props.leaders.isLoading}
            leadersErrMess = {this.props.leaders.errMess}

          />
      );
    }

    const DishWithId = ({match}) => {
      return (
        <Dishdetail 
        dish = {this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
        isLoading = {this.props.dishes.isLoading}
        errMess = {this.props.dishes.errMess}        
        comments = {this.props.comments.comments.filter((dishComments) => dishComments.dishId === parseInt(match.params.dishId,10))} 
        commentsErrMess = {this.props.comments.errMess}
        postComment = {this.props.postComment}
        />
      );
      

    
    }
    return (

      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
                  <Route path='/home' component={HomePage} />
                  <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                  <Route path='/menu/:dishId' component={DishWithId} />
                  <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
                  <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>} /> 
                  <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
