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

import { addComment} from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    leaders: state.leaders,
    promotions: state.promotions,
    comments: state.comments
  }
}

const mapDispatchToProps = dispatch => ({
    addComment : (dishId, rating, author, comment) => dispatch(addComment(dishId,rating,author,comment))
});



class Main extends Component {

  constructor(props){
    super(props);
  }

  render(){
    const HomePage = () => {
      return(
          <Home 
            dish = {this.props.dishes.filter((dish) => dish.featured)[0]}
            promotion = {this.props.promotions.filter((promotion) => promotion.featured)[0]}
            leader = {this.props.leaders.filter((leader) => leader.featured)[0]}

          />
      );
    }

    const DishWithId = ({match}) => {
      return (
        <Dishdetail 
        dish = {this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
        comments = {this.props.comments.filter((dishComments) => dishComments.dishId === parseInt(match.params.dishId,10))} 
        addComment = {this.props.addComment}
        />
      );
      

    
    }
    return (

      <div>
        <Header />
        <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
              <Route path='/menu/:dishId' component={DishWithId} />
              <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
              <Route exact path='/contactus' component={Contact} />
              <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
