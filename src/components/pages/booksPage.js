import React, { Component } from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import {withRouter} from 'react-router-dom';


class BooksPage extends Component {
    gotService =new gotService();

    state = {
        error: false
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedBook: id
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <ItemList
            onItemSelected={(itemId) => {
                this.props.history.push(itemId)
            }}
            getData={this.gotService.getAllBooks}
            renderItem={(item) => item.name}/>
        )  
    }
}

export default withRouter(BooksPage);