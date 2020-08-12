import React, { Component } from 'react';
import axios from 'axios';
import styles from './Landing.module.css';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Landing extends Component {
    state = {
        latitude: null,
        longitude: null,
        facilities: [],
        search: '',
    };

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchUser();
        this.props.getPlaces();
        window.navigator.geolocation.getCurrentPosition(
            geo => {
                this.setState({ longitude: geo.coords.longitude, latitude: geo.coords.latitude })
                axios.get(`/city?long=${geo.coords.longitude}&lat=${geo.coords.latitude}`)
                    .then(responseData => {
                        const cities = responseData.data.data;
                        this.setState({ search: cities[0].city, longitude: geo.coords.longitude, latitude: geo.coords.latitude })
                    })
            }
        );
    }

    handleInput(property) {
        return e => {
            this.setState({
                [property]: e.target.value
            });
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.latitude, this.state.longitude);
        axios.get(`/facilities?lat=${this.state.latitude}&long=${this.state.longitude}`)
            .then(responseData => {
                console.log(responseData);
                this.setState({ facilities: responseData.data });
            })
    }



    render() {
        return (
            <div className={styles.landing}>


                {/* <h2 className={styles.subtitle}>Find the best outdoors near you!</h2> */}

                <div className={styles.footer}>Due to Covid-19 it is very important we don't venture too far from home. Our travel search will gather the best outdoor destinations close to your home. Information is based on National and State Parks Data and Landmarks.</div>
                {this.state.facilities.length === 0
                    ? <form onSubmit={this.handleSubmit}>
                        <div className={styles.searchWrapper}>
                            <input
                                type="text"
                                value={this.state.search}
                                onChange={this.handleInput('search')}
                                className={styles.text}
                                placeholder="Please enable geolocation services..."
                            />
                            <input className={styles.go} type="submit" />
                        </div>
                    </form>
                    : <div className={styles.facility}>
                        {this.state.facilities.map(facility =>
                            (<div className={styles.facilityCard}>
                                <div className={styles.facilityTitle}>{facility.FacilityName}</div><div className={styles.facilityTitle}>Save</div>
                                <div dangerouslySetInnerHTML={{ __html: facility.FacilityDescription }} />
                            </div>))
                        }
                    </div>
                }

            </div>

        )

    }
}

export default connect(null, actions)(Landing);