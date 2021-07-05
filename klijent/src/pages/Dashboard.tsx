import React, { useEffect, useRef, useState } from 'react'
import { Button, Dropdown, Form, Grid, List, Ref } from 'semantic-ui-react'
import BooksTable from '../components/BooksTable'
import { Author, Book, Topic } from '../tipovi'
import { onTableRowClick, SERVER, setFormState } from '../util'
import axios from 'axios';

interface Props {
    books: Book[],
    authors: Author[],
    topics: Topic[],

}
export default function Dashboard(props: Props) {
    const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [pages, setPages] = useState(0);
    const [releaseYear, setReleaseYear] = useState('');
    const [selAuthor, setSelAuthor] = useState(0);
    const [selTopics, setSelTopics] = useState<Topic[]>([]);
    const imageRef = useRef<HTMLDivElement>(null);
    const fileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTitle(selectedBook?.title || '');
        setDescription(selectedBook?.descrpition || '');
        setPages(selectedBook?.pages || 0);
        setReleaseYear(selectedBook?.releaseYear ? selectedBook?.releaseYear + '' : '');
        setSelAuthor(props.authors.find(element => element.id === selectedBook?.author.id)?.id || 0);
        setSelTopics(selectedBook?.topics || []);
    }, [selectedBook, props.authors])
    const onSubmit = async () => {
        const formData = new FormData();

        const file = fileRef.current?.lastChild?.lastChild as HTMLInputElement;
        if (!file.files) {
            return;
        }

        const img = imageRef.current?.lastChild?.lastChild as HTMLInputElement;
        if (!img.files) {
            return;
        }
        formData.append('title', title);
        formData.append('description', description);
        formData.append('releaseYear', releaseYear);
        formData.append('file', file.files[0]);
        formData.append('img', img.files[0]);
        formData.append('pages', pages + '');
        formData.append('author', selAuthor + '');
        formData.append('topics', selTopics.reduce((prev, curr) => {
            return prev + curr.id + ';';
        }, ''))
        await axios.post(SERVER + '/book', formData);

    }
    return (

        <Grid padded columns='16'>
            <Grid.Row>
                <Grid.Column width='6'>
                    <BooksTable books={props.books} selected={selectedBook} onChange={(val) => {
                        onTableRowClick(val, setSelectedBook);
                    }} />
                </Grid.Column>
                <Grid.Column textAlign='center' width='6'>
                    <h3>{selectedBook ? 'Update' : 'Create'} book</h3>
                    <Form onSubmit={onSubmit} >
                        <Form.Input label='Title' required value={title} onChange={setFormState(setTitle)} />
                        <Form.Input label='Release year' required value={releaseYear} onChange={setFormState(setReleaseYear)} />
                        <Form.Input label='No. pages' required value={pages} onChange={setFormState(setPages)} />

                        <Ref innerRef={imageRef}>
                            <Form.Input type='file' label='Image' />
                        </Ref>
                        <Ref innerRef={fileRef}>
                            <Form.Input type='file' label='File' />
                        </Ref>
                        <Form.Dropdown label='Author' value={selAuthor} selection options={props.authors.map(element => {
                            return {
                                key: element.id,
                                value: element.id,
                                onClick: () => { setSelAuthor(element.id || 0) },
                                text: element.firstName + ' ' + element.lastName
                            }
                        })} />
                        <Form.TextArea value={description} label='Description' onChange={setFormState(setDescription)} />
                        <Form.Button fluid primary >Save</Form.Button>
                    </Form>
                </Grid.Column>
                <Grid.Column className='padding-top' width='4'>
                    <Dropdown className='padding-top' fluid selection header=' Add topic' options={props.topics.map(element => {
                        return {
                            key: element.id,
                            value: element.name,
                            text: element.name,
                            onClick: () => {
                                setSelTopics(prev => {
                                    if (prev.includes(element)) {
                                        return prev;
                                    }
                                    return [...prev, element];
                                })
                            }
                        }
                    })} />
                    <h5>Selected topics</h5>
                    <List divided verticalAlign='middle'>
                        {
                            selTopics.map(element => {
                                return (
                                    <List.Item key={element.id}>
                                        <List.Content floated='right'>
                                            <Button onClick={() => {
                                                setSelTopics(prev => {
                                                    return prev.filter(val => val.id !== element.id)
                                                })
                                            }} negative>X</Button>
                                        </List.Content>
                                        <List.Content>{element.name}</List.Content>
                                    </List.Item>
                                )
                            })
                        }
                    </List>
                </Grid.Column>
            </Grid.Row>
        </Grid>

    )
}
