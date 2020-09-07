import React from 'react';
import './errorMessage.css';
import img from './error.png';

const ErrorMessage =() => {
    return (
        <>
            {/* <img src={process.env.PUBLIC_URL + '/img/error.png'} alt='error'></img> - from public*/}
            <img src={img} alt='error'></img>
            <span className='alert'>Something goes wrong</span>
        </>    
    )
}

export default ErrorMessage;