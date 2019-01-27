/* component info

	modal: {
		a basic modal component;
	}

	usage: {
		closure function is self-contained: closeModal();
		an id prop must be provided to enable closure;
	}
*/

import React from 'react';
import propTypes from 'prop-types';
import './Modal.css';

const Modal = (props) => {
	const closeModal = (e) => {
    e.preventDefault();
    document.getElementById(props.id).classList.remove('active');
    document.body.classList.remove('prevent-scroll');
  }
  const getTitle = () => {
  	return(
  		<div className='modal-header' key='modal-header'>
	      <a href='#close' className='btn btn-clear float-right' aria-label='Close' id='modal-close' onClick={ event => closeModal(event) }></a>
	      <div className='modal-title text-center h5'>{props.modalTitle}</div>
	    </div>
  	);
  }
  const getContent = () => {
  	return(
  		<div className='modal-body' key='modal-body'>
	      	{props.modalContent}
	    </div>
  	);
  }
  const getFooter = () => {
  	return(
  		<div className='modal-footer' key='modal-footer'>
		  	{props.modalFooter}
		  </div>
  	)
  }
  const getClasses = () => {
		let classes = '';
		if(props.classes){classes = 'modal ' + props.classes;}
		else{classes = 'modal';}
		return classes;
	}
  const getModal = () => {
  	let content = [];
  	let classes = getClasses();
  	if(props.classes){classes = 'modal ' + props.classes}
  	else{classes = 'modal'};

  	if(props.modalTitle)content.push(getTitle());
  	if(props.modalContent)content.push(getContent());
  	if(props.modalFooter)content.push(getFooter());

  	return(
  		<div className={classes} id={props.id}>
	  		<a href='#close' className='modal-overlay' aria-label='Close' id='modal-overlay' onClick={ event => closeModal(event) }></a>
			  <div className='modal-container'>
			  	{content}
			  </div>
		  </div>
		 );
  }
  
	return(
	  getModal()
	)
}

/* prop info
*/
Modal.propTypes = {
	classes: propTypes.string,
	id: propTypes.string.isRequired,
	modalTitle: propTypes.string,
	modalContent: propTypes.oneOfType([propTypes.string, propTypes.object]),
	modalFooter: propTypes.oneOfType([propTypes.string, propTypes.object])
}


export { Modal }