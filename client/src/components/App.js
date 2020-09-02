import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './App.module.css'


import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';


class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Landing />
                        {/* <Route exact path="/" component={Landing} /> */}
                        {/* <Route exact path="/search" component={Dashboard} /> */}
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default connect(null, actions)(App);