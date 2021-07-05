import React, { useState } from 'react'
import { Redirect, RouteComponentProps, withRouter } from 'react-router'
import { Button, Comment, Container, Form, Grid, Header, Image, Rating, Segment } from 'semantic-ui-react'
import RewiewComponent from '../components/Review'
import { Book, Review } from '../tipovi'
import { SERVER, setFormState } from '../util'
interface Props {
    getBook: (id: number) => Book | undefined,
    addReview: (comm: Review) => void
}

export default withRouter(function BookPage(props: Props & RouteComponentProps) {
    const id = (props.match.params as any).id;
    const book = props.getBook(parseInt(id));
    const [reviewText, setReviewText] = useState('');
    const [stars, setStars] = useState(0);



    if (!book) {
        return <Redirect to='/books' />
    }
    return (
        <Container style={{ paddingBottom: '50px' }} >
            <Header textAlign='center'>
                <h1>{book.title}</h1>
            </Header>
            <Image src={SERVER + '/uploads/' + book.image} fluid wrapped bordered />
            <Segment style={{ paddingBottom: '30px' }}>
                <Header textAlign='center'>Details</Header>

                <Grid centered columns='16'>
                    <Grid.Row>
                        <Grid.Column width='6'>
                            <b>Author</b>
                        </Grid.Column>
                        <Grid.Column textAlign='right' width='6'>
                            {book.author.firstName + ' ' + book.author.lastName}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='6'>
                            <b>Relase year</b>
                        </Grid.Column>
                        <Grid.Column textAlign='right' width='6'>
                            {book.releaseYear}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='6'>
                            <b>Number of pages</b>
                        </Grid.Column>
                        <Grid.Column textAlign='right' width='6'>
                            {book.pages}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='6'>
                            <b>Topics</b>
                        </Grid.Column>
                        <Grid.Column textAlign='right' width='6'>
                            {book.topics.reduce((prev, curr) => {
                                return prev + curr.name + ', ';
                            }, '').slice(0, -2)}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='6'>
                            <b>Preview</b>
                        </Grid.Column>
                        <Grid.Column textAlign='right' width='6'>
                            <a href={`${SERVER}/uploads/${book.file}`} target='_blank' rel="noreferrer">Preview</a>
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
            </Segment>
            <Segment>
                <Header textAlign='center'>Description</Header>
                {
                    book.descrpition.split('\n').map(element => {
                        return (
                            <p>
                                {element}
                            </p>
                        )
                    })
                }
            </Segment>
            <Segment>
                <Header>Reviews</Header>
                <Comment.Group>
                    {
                        book.reviews.map(element => {
                            return <RewiewComponent review={element} />
                        })
                    }
                    <Form reply onSubmit={() => {
                        props.addReview({
                            content: reviewText,
                            rating: stars,
                            book
                        })
                    }}>
                        <Rating maxRating={5} rating={stars} onRate={(e, data) => {
                            setStars(Number(data.rating));
                        }} />
                        <Form.TextArea required value={reviewText} onChange={setFormState(setReviewText)} />

                        <br />
                        <Button content='Add review' labelPosition='left' icon='edit' primary fluid />
                    </Form>
                </Comment.Group>
            </Segment>
        </Container>
    )
})
