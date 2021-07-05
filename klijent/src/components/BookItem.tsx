import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { Card, Image } from 'semantic-ui-react'
import { Book } from '../tipovi'
import { SERVER } from '../util'

interface Props {
    book: Book
}

export default withRouter(function BookItem(props: Props & RouteComponentProps) {
    return (
        <Card centered fluid link onClick={() => {
            props.history.push('/books/' + props.book.id)
        }}>
            <Image className='short' src={`${SERVER}/uploads/${props.book.image}`} wrapped ui={false} />
            <Card.Content  >
                <Card.Header textAlign='center'>{props.book.title}</Card.Header>

            </Card.Content>

        </Card>
    )
})
