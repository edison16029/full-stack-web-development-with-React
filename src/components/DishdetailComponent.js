import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link } from 'react-router-dom';


function RenderDish({dish}) {
	return (
		<div className="container">
			<Card>
           		<CardImg  width="100%" top src={dish.image} alt={dish.name} />
                <CardBody>
                  	<CardTitle>{dish.name}</CardTitle>
                  	<CardText>{dish.description}</CardText>
               	</CardBody>
           	</Card>
		</div>
	);
}

function RenderComments({commentsArray}){
	if(commentsArray==null){
		return (<div></div>);
	}
	const comments = commentsArray.map((comment) => {
		return (
			<div key={comment.id}>
				<li>
					<p>{comment.comment}</p>
					<p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
				</li>
			</div>
		);
	});
	return (
		<div className="container">
           	<h4>Comments</h4>
			<ol className="list-unstyled">
				{comments}
			</ol>
		</div>
	);
}

const DishDetail = (props) => {
	// console.log("Props Comments: ",props.comments);
	if(props.dish==null){
		return (<div></div>);
	}

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
                        <RenderComments commentsArray={props.comments} />
                    </div>
                </div>
                </div>
            );
}


export default DishDetail;
