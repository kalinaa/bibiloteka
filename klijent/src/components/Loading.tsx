import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'

export default function Loading() {
    return (
        <Grid padded textAlign='center' centered>
            <Grid.Row stretched className='margin-big' >
                <Grid.Column width='16'>
                    <Segment basic loading />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
