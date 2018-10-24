import React, { Component } from 'react';
import Footer from './Footer';

class FooterContainer extends Component {
    constructor() {
        super();
        this.state = {
            opcije: ['prvi', 'drugi', 'treci']
        };
    }

    render() {
        const { opcije } = this.state;
        return (
            <div>
                {opcije.map(opcija => (
                    <Footer key={opcija} naslov={opcija} />
                ))}
            </div>
        );
    }
}

export default FooterContainer;
