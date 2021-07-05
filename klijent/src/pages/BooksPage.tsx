

import React from 'react'
import { useState } from 'react'
import { Container, Dropdown, Grid, Input, Select } from 'semantic-ui-react'
import BookItem from '../components/BookItem'
import { Author, Book, Topic } from '../tipovi'
import { chunks, setFormState } from '../util'

interface Props {
    books: Book[],
    authors: Author[],
    topics: Topic[]
}

export default function BooksPage(props: Props) {

    const [selectedTopics, setSelectedTopics] = useState<number[]>([]);
    const [sort, setSort] = useState(1);
    const [name, setName] = useState('');



    return (
        <Container >

            <Grid>
                <Grid.Row>
                    <Grid.Column width='4'>

                        <Select value={sort} options={[{
                            value: 1,
                            text: 'Ascending',
                            onClick: () => { setSort(1) }
                        }, {
                            value: -1,
                            text: 'Descending',
                            onClick: () => { setSort(-1) }
                        }]} />
                    </Grid.Column>
                    <Grid.Column width='5'>
                        <Input fluid label='Name' value={name} onChange={setFormState(setName)} />
                    </Grid.Column>
                    <Grid.Column width='7'>
                        <Dropdown fluid header='Select topics' multiple onChange={(e, data) => {

                            //@ts-ignore
                            setSelectedTopics(data.value);
                        }} selection options={props.topics.map(element => {
                            return {
                                key: element.id,
                                value: element.id,
                                text: element.name,


                            }
                        })} />
                    </Grid.Column>
                </Grid.Row>
                {
                    chunks(props.books.filter(element => {
                        return element.title.includes(name) && (selectedTopics.length === 0 || element.topics.reduce((prev, curr) => {
                            return prev || selectedTopics.includes(curr.id);
                        }, false as boolean));
                    }).sort((a, b) => {
                        return sort * ((a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1);
                    }), 4).map(row => {
                        return (
                            <Grid.Row>
                                {
                                    row.map(book => {
                                        return (
                                            <Grid.Column width='4'>
                                                <BookItem book={book} />
                                            </Grid.Column>
                                        )
                                    })
                                }
                            </Grid.Row>
                        )
                    })
                }
            </Grid>
        </Container>
    )
}
