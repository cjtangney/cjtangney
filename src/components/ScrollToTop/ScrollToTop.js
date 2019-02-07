/* component info

	scrolltotop: {
		a lil' button to put at the bottom of a page that brings you to the top.
	}

	usage: {
		import the component;
		drop the component on the view you want to use it with;
		right now, positioning is set up to drop it in the bottom right of a wrapper with relative position;
		i should add some additional suppport for location on the page;
		ezpz;
	}
*/

import React from 'react';
import './ScrollToTop.css';

const ScrollToTop = (props) => {
	//scroll the thang
	const toTheTop = (e) => {
    window.scrollTo({
    	top: 0,
    	bottom: 0,
    	behavior: 'smooth'
    });
  }  
	return(
	  <button className='btn tooltip toTheTop' data-tooltip='To the top!' onClick={ event => toTheTop(event) }><i className='icon icon-arrow-up'></i></button>
	)
}


export { ScrollToTop }