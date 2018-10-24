import React, { Component } from 'react';
import HeaderContainer from './components/Header/HeaderContainer';
import FooterContainer from './components/Footer/FooterContainer';

class App extends Component {
    constructor() {
        super();
        console.log(this);
    }

    render() {
        return (
            <React.Fragment>
                <HeaderContainer />
                <h1>Hello React!</h1>
                <h3>evoa aksd</h3>
                <p>nest</p>
                <FooterContainer />
            </React.Fragment>
        );
    }
}

export default App;
