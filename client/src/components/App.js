import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.module.css';
import axios from 'axios';

import Header from './Header';
import Landing from './Landing';


class App extends Component {
    state = {
        auth: null
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        axios.get('/api/current_user')
            .then((res) => {
                this.setState({ auth: res.data })
            });
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Header auth={this.state.auth} />
                        <Landing />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default App;