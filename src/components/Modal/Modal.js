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

const Modal = (props) => {
	const closeModal = (e) => {
    e.preventDefault();
    document.getElementById(props.id).classList.remove('active');
  }
  let classes = '';
  if(props.classes){classes = 'modal ' + props.classes}
  else{classes = 'modal'}
	return(
		<div className={classes} id={props.id}>
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