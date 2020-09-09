import React, { Component } from 'react';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import gotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';



export default class BookPage extends Component {
    gotService =new gotService();

    state = {
        selectedBook: 1,
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

    render () {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllBooks}
                renderItem={(item) => item.name}/>
        )

        const bookDetails = (
            <ItemDetails 
                itemId={this.state.selectedBook}
                errorText='Please select a book'
                getData={this.gotService.getBook}> 
                    <Field field='publisher' label='Publisher'/>
                    <Field field='numberOfPages' label='Pages'/>
                    <Field field='released' label='Released'/>
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={bookDetails}/>
        )    
    }
}