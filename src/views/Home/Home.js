/* view info
*/

import React from 'react';

import { Card } from '../../components/Cards/Cards';

import './Home.css';

class Home extends React.Component {
  render() {
    return (
      <div className='columns'>
        <div className='column col-xs-12 col-sm-10 col-md-8 col-lg-7 col-7 col-mx-auto' id='card-container'>
          {/* card component */}
          <Card 
            classes='text-center img-top'
            imgSrc='/img/puppy.jpg' 
            altTxt='A puppy'  
            cardBody={
              <div>
                <h1>Hey there!</h1>
                <p className='text-large'>My name is Connor.</p>
                <p className='text-large'>Welcome to my little corner of the Internet. I'm in the middle of some construction here, so check back soon.</p>
                <p className='text-large'>In the mean time, why not check out these puppies and kittens? Who doesn't love puppies and kittens?!</p>
              </div>
            } 
            cardFooter={
              <button className='btn puppies-and-kittens'>Heck yea baby animals!</button>
            }
          />
        </div>
      </div>
    );
  }
}

export default Home;
