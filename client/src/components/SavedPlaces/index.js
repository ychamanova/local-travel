import React, { Component } from 'react';
import axios from 'axios';
import styles from './Landing.module.css';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SavedPlaces extends Component {
    //saving IDs = less efficient ,but more up to date, saves space in the database
    //saving the whole place = information could be outdated, but it is faster

    //whenever this component mounts, it creates an API call to fetch updated information based on databases' user saved places
    state = {
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //this.props.fetchUser();
        axios.get('/savedPlaces')
            .then((response) => {
                console.log(response);
                this.setState({ savedPlaces: response.data.savedPlaces });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const places = this.state.savedPlaces;
        // return (
        //     <div>
        //         {places.map(p => {

        //         })}
        //     </div>
        // )

    }
}


function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(SavedPlaces);