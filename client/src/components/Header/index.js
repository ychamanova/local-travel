import React, { Component } from 'react';
import styles from './Header.module.css';

class Header extends Component {
    renderContent() {
        if (this.props.auth === "") {
            return (
                <a href="/auth/google"><img alt="Google sign-in" src="signin.png" /></a>
            );
        } else {
            return (
                <div>
                    <a className={styles.yellowBtn} href="/api/logout">Log Out</a>
                    <a className={styles.yellowBtn} >Saved Places</a>
                </div>
            );
        }
    }

    render() {
        return (
            <div className={styles.header}>
                <a className={styles.yellowBtn}>Donate to National Parks</a>
                <h1>Local Travel</h1>
                {this.renderContent()}
            </div>
        )
    }
}

export default Header;