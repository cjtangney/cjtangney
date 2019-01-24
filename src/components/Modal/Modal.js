import React from 'react';
import propTypes from 'prop-types';
//import './Modal.css';

const Modal = (props) => {
	const closeModal = (e) => {
    e.preventDefault();
    document.getElementById(props.id).classList.remove('active');
  }
	return(
		<div className='modal' id={props.id}>
		  <a href='#close' className='modal-overlay' aria-label='Close' id='modal-overlay' onClick={ event => closeModal(event) }></a>
		  <div className='modal-container'>
		    <div className='modal-header'>
		      <a href='#close' className='btn btn-clear float-right' aria-label='Close' id='modal-close' onClick={ event => closeModal(event) }></a>
		      <div className='modal-title text-center h5'>{props.modalTitle}</div>
		    </div>
		    <div className='modal-body'>
		      <div className='content'>
		      	{props.modalContent}
		      </div>
		    </div>
		    <div className='modal-footer'>
		    	{props.modalFooter}
		    </div>
		  </div>
		</div>
	)
}

export { Modal }