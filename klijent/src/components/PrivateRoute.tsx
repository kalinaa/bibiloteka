

import React from 'react'
import { Redirect, Route } from 'react-router'
interface Props {
    active: boolean,
    path: string,
    redirect?: string,
    children: React.ReactNode,
}
export default function PrivateRoute(props: Props) {

    return (
        <Route path={props.path}>

            {
                props.active ?
                    props.children :
                    <Redirect to={props.redirect || '/'} />
            }
        </Route>
    )
}
