import React from 'react'
import { Review as ReviewType } from '../tipovi'
import { Comment, Icon, Rating, Segment } from 'semantic-ui-react'
interface Props {
    review: ReviewType
}

export default function Review(props: Props) {
    return (
        <Segment>
            <Comment >
                <Comment.Content>
                    <Comment.Author >
                        {(props.review.user) ? (props.review.user?.firstName + ' ' + props.review.user?.lastName) : 'NA'}
                    </Comment.Author>
                    <Comment.Metadata >
                        <Rating disabled maxRating={5} rating={props.review.rating} />
                    </Comment.Metadata>
                    <Comment.Text>
                        {props.review.content}
                    </Comment.Text>

                </Comment.Content>
            </Comment>
        </Segment>
    )
}
