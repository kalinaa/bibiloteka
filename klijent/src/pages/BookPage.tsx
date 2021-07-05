import React from 'react'
import { Redirect, RouteComponentProps, withRouter } from 'react-router'
import { Container, Divider, Grid, Header, Image, List, Segment } from 'semantic-ui-react'
import { Book } from '../tipovi'
import { SERVER } from '../util'

interface Props {
    getBook: (id: number) => Book | undefined
}

export default withRouter(function BookPage(props: Props & RouteComponentProps) {
    const id = (props.match.params as any).id;
    const book = props.getBook(parseInt(id));

    if (!book) {
        return <Redirect to='/books' />
    }
    return (
        <Container style={{ paddingBottom: '50px' }} >
            <Header textAlign='center'>{book.title}</Header>
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
                            }, '')}
                        </Grid.Column>
                    </Grid.Row>

                    <p>
                        {book.descrpition}
                    </p>
                </Grid>
            </Segment>
            <Segment>
                <Header>Reviews</Header>
                {

                }
            </Segment>
        </Container>
    )
})
