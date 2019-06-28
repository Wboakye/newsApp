import React from 'react'
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';

export function Headline(props){
    return(
        <div className="col-4 mb-3">
            <Card>
                <CardImg top width="100%" src={props.articles.urlToImage} alt="Card image cap" />
                <CardBody>
                    <h5><b>{props.articles.title}</b></h5>
                    <h5>{props.articles.description}</h5>
                    <h6>{props.articles.content}</h6>
                    <Button href={props.articles.url}>Read More</Button>
                </CardBody>
            </Card>
        </div>
    )
}