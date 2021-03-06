import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: '',
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({ values: values.data });
    }

    async fetchIndexes() {
        const seenIndexes = await axios.get('/api/values/all');
        this.setState({
            seenIndexes: seenIndexes.data
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.state.index) {
            await axios.post('/api/values', {
                index: this.state.index
            });
        }
        this.setState({ index: '' });
        this.fetchValues();
        this.fetchIndexes();
    };

    renderSeenIndexes() {
        return this.state.seenIndexes.map(({ number }) => number).join(', ');
    }

    renderValues() {
        const entries = [];

        for (let key in this.state.values) {
            entries.push(
                <div key={key}>
                    For index <strong>{key}</strong>, I calculated: <strong>{this.state.values[key]}</strong>
                </div>
            );
        }

        return entries;
    }

    render() {
        return (
            <div>
              <h1>Fibonacci Calculator</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your index (0 - 1000000): </label>
                    <input
                        value={this.state.index}
                        onChange={(event) => {
                            if (event.target.value >= 0 && event.target.value <= 1000000) {
                                this.setState({ index: event.target.value });
                            } else {
                                alert('Enter a value between 1 and 1000000.');
                            }
                        }}
                    />
                    <button>Submit</button>
                </form>

                <h3>Indexes I have seen:</h3>
                {this.renderSeenIndexes()}

                <h3>Calculated Fibonacci Numbers:</h3>
                {this.renderValues()}
            </div>
        );
    }
}

export default Fib;
