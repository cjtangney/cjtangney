/*

	home{
		home page view;
	}

*/

import React from 'react';

import { Card } from '../../components/Cards/Cards';

import './Home.css';

class Home extends React.Component {
  render() {
    return (
    	<div className='columns' id='card-container'>
    		<div className='column col-xs-12 col-sm-10 col-md-8 col-lg-6 col-6 col-mx-auto'>
    			{/* A CARD COMPONENT */}
    			<Card 
    				classes='text-center'
		      	cardHeader={'Hey there!'}
		      	cardBody={
		      		<div>
		      			<p className='text-large'>My name is Connor!</p>
		      			<p className='text-large'>Welcome to my little corner of the Internet. I'm in the middle of some construction here, so check back soon!</p>
		      		</div>
		      	} 
		    	/>
    		</div>
    	</div>
    );
  }
}

export default Home;
