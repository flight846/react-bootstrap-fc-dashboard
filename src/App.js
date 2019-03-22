import React, { Component } from 'react';
import './App.css';
import config from './config/config';

const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

class App extends Component {
    state = {
        items: []
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
            <div className="App">
                <h1>Hello React!</h1>
            </div>
        );
    }
}

export default App;
