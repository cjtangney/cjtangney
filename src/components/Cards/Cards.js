/*

	card: {
		a basic, material design card component;
		default card component will display from the top down: header -> image -> body -> footer;
		check usage for variable layouts;
	}

	props: {
		cardHeader: {
			optional prop;
			display a card-header row when prop is not undefined;
		}
		imgSrc: {
			optional prop;
			display an image card when not undefined;
		}
		altTxt: {
			required when imgSrc prop is not undefined;
		}
		cardBody: {
			optional prop;
			display a card-body row when prop is not undefined;
		}
		cardFooter: {
			optional prop;
			display a card-footer row when prop is not undefined;
		}
		classes: {
			optional prop;
			any additional classes that should be applied to the card component;
		}
	}

	usage: {
		default card component will display from the top down: header -> image -> body -> footer;
		pass additional class through the classes prop to modify the layout: {
			1-column layout: {
				no-header: image -> body -> footer;
				no-img: header -> body -> footer;
				no-footer: header -> image -> body;

				img-top-header: image -> header -> body -> footer;
				img-top-no-header: image -> body -> footer;
				img-top-no-footer: image -> header -> body;
			}
			2-column layouts: {
				img-left: {
					left: 100% height image;
					right: header -> body -> footer;
				}
				img-left-no-footer: {
					left: 100% height image;
					right: header -> body;
				}

				img-right: {
					left: header -> body -> footer;
					right: 100% height image;
				}
				img-right-no-footer: {
					left: header -> body;
					right: 100% height image;
				}
			}
		}
	}

*/

import React from 'react';
import './Cards.css';

const Card = (e) => {
	const getHeader = () => {
		return(
			<div className='card-header' key='card-header'>
				<h1>{e.cardHeader}</h1>
			</div>
		);
	}
	const getImg = () => {
		return(
			<div className='card-img' key='card-img'>
				<img src={e.imgSrc} alt={e.altTxt} width='100%' />
			</div>
		)
	}
	const getBody = () => {
		return(
			<div className='card-body' key='card-body'>
				{e.cardBody}
			</div>
		)
	}
	const getFooter = () => {
		return(
			<div className='card-footer' key='card-footer'>
				{e.cardFooter}
			</div>
		)
	}
	const getClasses = () => {
		let output = ''
		e.classes ? output=' ' + e.classes : output='';
		return output;
	}

	let content = [];
	if(e.cardHeader)content.push(getHeader());
	if(e.imgSrc)content.push(getImg());
	if(e.cardBody)content.push(getBody());
	if(e.cardFooter)content.push(getFooter());

	return (
		/* CARD */
		<div className={'card' + getClasses()}>
			{content}
		</div>
	);
}

export { Card };