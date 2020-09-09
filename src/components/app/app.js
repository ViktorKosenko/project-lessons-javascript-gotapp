import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from '../header';
import RandomChar from '../randomChar';
import {CharacterPage, BooksPage, HousesPage, BooksItem} from '../pages';
import ErrorMessage from '../errorMessage';

import './app.css';

export default class App extends Component {
    state = {
        showRandomChar: true,
        selectedChar: null,
        error: false
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const {showRandomChar} = this.state;
        const randomChar = showRandomChar ? <RandomChar/> : null;

        return (
            <Router>
                <div className="app"> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {randomChar}
                                <button 
                                    className="toggle-btn"
                                    onClick={this.toggleRandomChar}>Toggle random character</button>
                            </Col>
                        </Row>
                        <Route exact pach='/' component={() => <h1>Welcome to GOT DB</h1>}/>
                        <Route pach='/characters' component={CharacterPage}/>
                        <Route pach='/houses' component={HousesPage}/>
                        <Route exact pach='/books' component={BooksPage}/>
                        <Route exact pach='/books/:id' render={
                            ({match}) => {
                                const {id} = match.params;
                                return <BooksItem bookId={id}/>
                            }                            
                        }/>
                    </Container>
                </div>
            </Router>
        )
    }
}