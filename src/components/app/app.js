import React, {Component, useState, useEffect} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import {CharacterPage, BooksPage, HousesPage, BooksItem} from '../pages';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './app.css';

//6.104
// function App() {
//     const [count, setCount] = useState(0);
//     const [data, refreshData] = useState([{name: 'Ivan', sex: 'male'}]);

//     const updateChar = () => {

//     }

//     useEffect(() => {
//         updateChar();
//         let timerId = setInterval(updateChar, 15000);
//         return () => {
//             clearInterval(timerId);
//         }
//     });

//     return (
//         <div>
//             <p>Вы кликнули {count} раз</p>
//             <button
//                 onClick={() => setCount(count + 1)}>Кликни меня</button>
//             {data.map(item => {
//                 return (
//                     <div>Name: {item.name}, sex: {item.sex}</div>
//                 );
//             })}
//             <button onClick={() => refreshData(data => ([...data, {name: 'Alex', sex: 'male'}]))}>
//                 Добавить данные</button>
//         </div>        
//     );
// }

// export default App;

//before 6.104
export default class App extends Component {
    state = {
        showRandomChar: true,
        error: false
    };

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
    };


    render() {
        const char = this.state.showRandomChar ? <RandomChar interval={15000}/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Router> 
                <div className='app'>
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <button 
                                className="toggle-btn"
                                onClick={this.toggleRandomChar}>Toggle random character</button>
                            </Col>
                        </Row>
                        <Route path='/' component={() => <h1>Welcome to GOT DB</h1>} exact/>
                        <Route path='/characters' component={CharacterPage} />
                        <Route path='/books' component={BooksPage} exact/>
                        <Route path='/books/:id' render={({match}) => {
                            const {id} = match.params;
                        return <BooksItem bookId={id}/>}}/>
                        <Route path='/houses' component={HousesPage} />
                    </Container>
                </div>
            </Router>
        )
    }

};
