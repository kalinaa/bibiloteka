import React from 'react'
import { Container, Header, Segment } from 'semantic-ui-react'
import TopicItem from '../components/TopicItem'
import { Book, Topic } from '../tipovi'

interface Props {
    books: Book[],
    topics: Topic[]
}

export default function Home(props: Props) {
    return (
        <Container>
            <Segment>
                <Header textAlign='center'>
                    New york public library
                </Header>
                <Header textAlign='center'>
                    <h2>Check out some of our books</h2>
                </Header>
            </Segment>
            <Segment >

                {
                    props.topics.map(element => {
                        return <TopicItem key={element.id} topic={element} books={props.books.filter(book => { return book.topics.find(t => t.id === element.id) })} />

                    })
                }

            </Segment>
        </Container>
    )
}
