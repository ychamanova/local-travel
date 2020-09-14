import React, { Component } from 'react';
import axios from 'axios';
import styles from './Landing.module.css';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faSolideHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';

class Landing extends Component {
    state = {
        latitude: null,
        longitude: null,
        facilities: [],
        search: '',
        savedPlaces: [],
        loading: false,
    };

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        this.props.fetchUser();
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

    handleSave(id) {
        axios.post('/save', {
            facility: id,
        })
            .then((response) => {
                console.log(response);
                this.setState({ savedPlaces: response.data.savedPlaces });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.props.auth);
        this.setState({ loading: true })
        axios.get(`/facilities?lat=${this.state.latitude}&long=${this.state.longitude}`)
            .then(responseData => {
                console.log(responseData);
                this.setState({ facilities: responseData.data, loading: false });
            })
    }

    render() {
        return (
            <div className={styles.landing}>
                {
                    this.state.loading
                    && <div style={{
                        backgroundColor: "white",
                        minHeight: "100vh",
                        minWidth: "100vw",
                        opacity: "0.3"
                    }}>'Loading...'</div>
                }
                {this.state.facilities.length === 0
                    //if there are no facilities to display, show the search field
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
                    //if there are facilities around, show them
                    : <div className={styles.facility}>
                        {this.state.facilities.map(facility =>
                            (<div className={styles.facilityCard}>
                                <div className={styles.facilityTitle}>
                                    <div className={styles.facilityName}>
                                        {facility.FacilityName}
                                    </div>
                                    <a className={styles.saveButton} onClick={() => this.handleSave(facility.FacilityID)}>
                                        {
                                            this.state.savedPlaces.includes(facility.FacilityID)
                                                ? <FontAwesomeIcon icon={faSolideHeart} />
                                                : <FontAwesomeIcon icon={faRegularHeart} />
                                        }

                                    </a>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: facility.FacilityDescription }} />
                            </div>))
                        }
                    </div>
                }

                <div className={styles.footer}>Due to Covid-19 it is very important we don't venture too far from home. Our travel search will gather the best outdoor destinations close to your home. Information is based on National and State Parks Data and Landmarks.</div>
            </div >

        )

    }
}


function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(Landing);