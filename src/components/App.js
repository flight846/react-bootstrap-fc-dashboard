import React, { Component } from 'react';
import config from '../config/config';
import { Container, Nav } from '../helpers/styled-components';
import Dropdown from "react-dropdown";
import formatNum from '../helpers/format-number';

import UserImg from "../assets/images/user-img-placeholder.jpeg";

const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

class App extends Component {
    state = {
        items: [],
        dropdownOptions: [],
        selectedValue: null,
    }

    componentDidMount() {
        fetch(url).then(response => response.json()).then(data => {
            let batchRowValues = data.valueRanges[0].values;

            const rows = [];
            for (let i = 1; i < batchRowValues.length; i++) {
                let rowObject = {};
                for (let j = 0; j < batchRowValues[i].length; j++) {
                    rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
                }
                rows.push(rowObject);
            }

            this.setState({ items: rows });
        });
    }

    render() {
        return (
            <Container>
                <Nav className="navbar navbar-expand-lg fixed-top is-white is-dark-text">
                    <Container className="navbar-brand h1 mb-0 text-large font-medium">
                        Online Retail Dashboard
                    </Container>
                    <Container className="navbar-nav ml-auto">
                        <Container className="user-detail-section">
                            <span className="pr-2">Hi, Sean</span>
                            <span className="img-container">
                                <img src={UserImg} className="rounded-circle" alt="user" />
                            </span>
                        </Container>
                    </Container>
                </Nav>
                <Nav className="navbar fixed-top nav-secondary is-dark is-light-text">
                    <Container className="text-medium">Summary</Container>
                    <Container className="navbar-nav ml-auto">
                        <Dropdown
                            className="pr-2 custom-dropdown"
                            options={this.state.dropdownOptions}
                            onChange={this.updateDashboard}
                            value={this.state.selectedValue}
                            placeholder="Select an option"
                        />
                    </Container>
                </Nav>
            </Container>
        );
    }
}

export default App;
