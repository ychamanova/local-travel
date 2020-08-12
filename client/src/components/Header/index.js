import React, { Component } from 'react';
import styles from './Header.module.css';
import { connect } from 'react-redux';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <a href="/auth/google"><img alt="Google sign-in" src="signin.png" /></a>
                );
            default:
                return (
                    <a className={styles.yellowBtn} href="/api/logout">Log Out</a>
                );

        }
    }

    render() {
        console.log(this.props);
        return (
            <div className={styles.header}>
                <a className={styles.yellowBtn}>Donate to National Parks</a>
                <h1>Local Travel</h1>
                {this.renderContent()}
            </div>
        )
    }
}

// function mapStateToProps(state) {
//     return { auth: state.auth }
// } ----> equivalent of refactor below

function mapStateToProps({ auth, places }) {
    return { auth, places };
}

export default connect(mapStateToProps)(Header);