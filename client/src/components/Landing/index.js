import React, { Component } from 'react';
import styles from './Landing.module.css';

class Landing extends Component {
    render() {
        return (
            <div className={styles.landing}>
                <h2>Find the best outdoors near you!</h2>
                <form>
                    <input
                        type="text"
                        defaultValue="Enable your location or type it here"
                    />
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default Landing;