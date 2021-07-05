import React, { useState } from 'react'
import { Pagination, Table } from 'semantic-ui-react'
import { Book } from '../tipovi'
import { SERVER } from '../util'

interface Props {
    books: Book[],
    selected: Book | undefined,
    onChange: (val: Book) => void
}

export default function BooksTable(props: Props) {
    const [activePage, setActivePage] = useState(1)
    const totalPages = Math.ceil(props.books.length / 5);
    return (
        <Table selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>No. pages</Table.HeaderCell>
                    <Table.HeaderCell>Release year</Table.HeaderCell>
                    <Table.HeaderCell>Author</Table.HeaderCell>
                    <Table.HeaderCell>Link</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    props.books.slice((activePage - 1) * 5, activePage * 5).map(element => {
                        return (
                            <Table.Row key={element.id} active={element === props.selected} onClick={() => {
                                props.onChange(element)
                            }}>
                                <Table.Cell>{element.id}</Table.Cell>
                                <Table.Cell>{element.title}</Table.Cell>
                                <Table.Cell>{element.pages}</Table.Cell>
                                <Table.Cell>{element.releaseYear}</Table.Cell>
                                <Table.Cell>{element.author.firstName + ' ' + element.author.lastName}</Table.Cell>
                                <Table.Cell>
                                    <a rel="noreferrer" href={SERVER + '/uploads/' + element.file} target='_blank'>Show</a>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })
                }
            </Table.Body>
            <Table.Footer fullWidth  >
                <Table.Row>
                    <Table.HeaderCell colSpan='6'>
                        <Pagination

                            totalPages={totalPages} activePage={activePage}
                            onPageChange={(event, data) => {
                                console.log(data);
                                if (typeof data.activePage === 'string') {

                                    setActivePage(parseInt(data.activePage))
                                } else {
                                    setActivePage(data.activePage || 1);
                                }
                            }} />
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    )
}
