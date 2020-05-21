import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,
    Row,Col,Label } from 'reactstrap';
import {Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

	constructor(props){
		super(props);

		this.state = {
			isModalOpen : false
		}
		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleModal(){
		this.setState({
			isModalOpen : !this.state.isModalOpen
		});
	}

	handleSubmit(values){
        console.log('Form Value is: ' + JSON.stringify(values));
        // alert('Form Value is: ' + JSON.stringify(values));
        this.props.postComment(this.props.dishId,values.rating,values.yourname,values.comment);		
	}


	render() {
		return (
			<div>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}> 
					<ModalHeader>Submit Comment</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
							<Row className="form-group">
								<Label htmlFor="rating" md={12}>Rating</Label>
								<Col md={12}>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="yourname" md={12}>Your Name</Label>
								<Col md={12}>
									<Control.text model=".yourname" id="yourname" name="yourname"
										className="form-control" 
										placeholder="Your Name"
										validators = {
											{
												minLength: minLength(3) , maxLength: maxLength(15)
											}
										}/>
											
								
									<Errors
										className="text-danger"
										model=".yourname"
										show="touched"
										messages={{
											minLength : "Your name must be minimum 3 characters",
											maxLength : "Your name must contain maximum 15 characters"
										}}
										/>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="comment" md={12}>Comment</Label>
								<Col md={12}>
									<Control.textarea model=".comment" id="comment" name="comment"
									className="form-control"
									rows="6"
									/>
								</Col>
							</Row>
							<Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" value="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>								
							</Row>
						</LocalForm>

					</ModalBody>
				</Modal>
				<Button outline onClick={this.toggleModal}>
			        <span className="fa fa-pencil"> Submit Comment</span>
				</Button>

			</div>

		);
	}

}

function RenderDish({dish}) {
	return (
		<div className="container">
			<FadeTransform in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
				<Card>
	           		<CardImg  width="100%" top src={baseUrl + dish.image} alt={dish.name} />
	                <CardBody>
	                  	<CardTitle>{dish.name}</CardTitle>
	                  	<CardText>{dish.description}</CardText>
	               	</CardBody>
	           	</Card>
			</FadeTransform>
		</div>

	);
}


function RenderComments({commentsArray,postComment, dishId}){
	if(commentsArray==null){
		return (<div></div>);
	}
	const comments = commentsArray.map((comment) => {
		return (
			<Fade in>
				<li key={comment.id}>
					<p>{comment.comment}</p>
					<p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
				</li>
			</Fade>
		);
	});
	return (
		<div className="container">
           	<h4>Comments</h4>
			<ol className="list-unstyled">
				<Stagger in>
					{comments}	
				</Stagger>
			</ol>
			<CommentForm postComment={postComment} dishId={dishId}/>
		</div>
	);
}

const DishDetail = (props) => {
	// console.log("Props Comments: ",props.comments);

	if(props.isLoading){
		return (
			<div className="container">
				<div className="row">
					<Loading />
				</div>
			</div>
		);
	}
	else if(props.errMess) {
		return (
			<div className="container">
				<div className="row">
					<h4>{props.errMess}</h4>
				</div>
			</div>
		);
	}
	else if(props.dish != null){
		return (
	        <div className="container">
	            <div className="row">
	                <Breadcrumb>
	                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
	                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
	                </Breadcrumb>
	                <div className="col-12">
	                    <h3>{props.dish.name}</h3>
	                    <hr />
	                </div>                
	            </div>
	            <div className="row">
	                <div className="col-12 col-md-5 m-1">
	                    <RenderDish dish={props.dish} />
	                </div>
	                <div className="col-12 col-md-5 m-1">
	                    <RenderComments commentsArray={props.comments} 
	                    postComment={props.postComment}
	                    dishId={props.dish.id}
	                    />
	                </div>
	            </div>
	        </div>
	    );

	}

	
}


export default DishDetail;
