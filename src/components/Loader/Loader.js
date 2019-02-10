import React from 'react';
import propTypes from 'prop-types';
import './Loader.css';

const Loader = (props) => {
	const getClasses = () => {
		let classes = 'loading';
		if (props.classes) classes = classes + ' ' + props.classes;
		return classes;
	}
	return (
		/* CARD */
		<div className={getClasses()}></div>
	);
}

/* prop info
*/
Loader.propTypes = {
	id: propTypes.string,
	classes: propTypes.string,
}

export { Loader };