import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';


function RenderDish({dish}) {
	return (
		<div className="col-12 col-md-5 m-1">
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
		<div className="col-12 col-md-5 m-1">
           	<h4>Comments</h4>
			<ol className="list-unstyled">
				{comments}
			</ol>
		</div>
	);
}

const DishDetail = (props) => {
	const dish = props.dish;
	if(dish==null){
		return(<div></div>);
	}
	else{
		return (
			<div className="container">
				<div className='row'>
					<RenderDish dish={dish} />
					<RenderComments commentsArray={dish.comments} />
				</div> 
			</div>
		);
	}
}


export default DishDetail;
