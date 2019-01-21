import React from 'react';
import './Cards.css';

const Card = (e) => {
	let getHeader = () => {
		return(
			<div className='card-header' key='card-header'>
				<h1>{e.cardHeader}</h1>
			</div>
		);
	}
	let getImg = () => {
		return(
			<div className='card-img' key='card-img'>
				<img src={e.imgSrc} alt={e.altTxt} width='100%' />
			</div>
		)
	}
	let getBody = () => {
		return(
			<div className='card-body' key='card-body'>
				{e.cardBody}
			</div>
		)
	}
	let getFooter = () => {
		return(
			<div className='card-footer' key='card-footer'>
				{e.cardFooter}
			</div>
		)
	}
	const getClasses = () => {
		let output = ''
		e.classes ? output=e.classes + ' ' : output='';
		return output;
	}

	let content = [];
	if(e.cardHeader)content.push(getHeader());
	if(e.imgSrc)content.push(getImg());
	if(e.cardBody)content.push(getBody());
	if(e.cardFooter)content.push(getFooter());

	return (
		/* CARD */
		<div className={getClasses() + 'card'}>
			{content}
		</div>
	);
}

export { Card };