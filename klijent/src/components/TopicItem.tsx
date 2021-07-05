
import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import { Book, Topic } from '../tipovi'
import BookItem from './BookItem'
interface Props {
    topic: Topic,
    books: Book[]
}
export default function TopicItem(props: Props) {
    if (props.books.length === 0) {
        return null;
    }
    return (
        <>
            <Header >
                {props.topic.name}
            </Header>
            <Grid padded columns='16'>
                <Grid.Row columns='16'>
                    {
                        props.books.slice(0, 4).map(element => {
                            return (
                                <Grid.Column width='4'>
                                    <BookItem book={element} />
                                </Grid.Column>
                            )
                        })
                    }
                </Grid.Row>
            </Grid>
        </>
    )
}
