import React, { Component } from 'react'
import { Header } from '../component/Shared';
import { HomeNav } from '../component/Shared/Nav';
export default class index extends Component {


    render() {
        return (
            <>
                <Header />
                <HomeNav/>
            </>
        )
    }
}
