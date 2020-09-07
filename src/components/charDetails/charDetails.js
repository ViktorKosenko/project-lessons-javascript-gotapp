import React, {Component} from 'react';
import './charDetails.css';
import GotService from '../../services/GotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

export default class CharDetails extends Component {

    gotService =new GotService();

    state = {
        char: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateCharacrer();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateCharacrer();
        }
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    };

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateCharacrer() {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.gotService.getCharacters(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
        // this.foo.bar = 0;
    }

    render() {
        if (!this.state.char) {
            return <span className='select-error'>Please select a character</span>
        }
        const {char, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;        

        return (
            <div className="char-details rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );

    }
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;

    return (
        <>
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender</span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born</span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died</span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture</span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    );
}