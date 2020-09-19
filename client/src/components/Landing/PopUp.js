import React, { Component } from "react";
import axios from 'axios';
import styles from './PopUp.module.css';

export default class PopUp extends Component {
    state = {
        number: '',
    }
    handleClick = () => {
        this.props.toggle();
    };

    handleInput(property) {
        return e => {
            this.setState({
                [property]: e.target.value
            });
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let fa = this.props.selectedItem;
        let clearNum = this.state.number.replace(/[^\w\s]/gi, '');
        axios.post('/text', {
            lat: fa.FacilityLatitude,
            long: fa.FacilityLongitude,
            to: `+1${clearNum}`,
        })
            .then(res => {
                this.props.handleTextSubmit();
            })
    }
    render() {
        return (
            <div>
                <span className="" onClick={this.handleClick}>&times;    </span>
                <form className={styles.popUp} onSubmit={this.handleSubmit}>
                    <label>
                        Phone number:
                        <br />
                        <input type="tel" value={this.state.number} onChange={this.handleInput('number')} placeholder="(xxx)xxx-xxxx" />
                    </label>
                    <br />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}