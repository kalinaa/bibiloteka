

import React from 'react'
import { Container, Grid } from 'semantic-ui-react'
import { Author, Book, Topic } from '../tipovi'

interface Props {
    books: Book[],
    authors: Author[],
    topics: Topic[]
}

export default function BooksPage(props: Props) {




    return (
        <Container >

            <Grid>

            </Grid>
        </Container>
    )
}
