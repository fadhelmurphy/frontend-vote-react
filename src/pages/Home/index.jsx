import React, { Component } from 'react'
import Aos from 'aos';
import './index.css';
import { Sugar } from 'react-preloaders';
import { Header } from '../../component/Shared';

export default class index extends Component {

    componentDidMount() {
        Aos.init({
            once: true,
            easing: 'slide',
        });
    }

    render() {
        return (
            <>
                <Sugar background="#1e2125" color="#0f4c75" time={1000} />
                <Header />
            </>
        )
    }
}
