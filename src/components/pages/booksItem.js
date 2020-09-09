import React, { Component } from 'react';
import gotService from '../../services/gotService';
import ItemDetails, {Field} from '../itemDetails';

export default class BooksItem extends Component {
    gotService = new gotService();

    render() {
        return (
            <ItemDetails 
                itemId={this.props.bookId}
                errorText='Please select a book'
                getData={this.gotService.getBook}> 
                    <Field field='publisher' label='Publisher'/>
                    <Field field='numberOfPages' label='Pages'/>
                    <Field field='released' label='Released'/>
            </ItemDetails>
        )
    }
}