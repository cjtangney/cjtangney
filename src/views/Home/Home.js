/* view info
*/

import React from 'react';
import { Card } from '../../components/Cards/Cards';
import { Modal } from '../../components/Modal/Modal';
import { Gallery } from '../../components/Gallery/Gallery';

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
                <p className='text-large'>Welcome to my little corner of the Internet. I'm in the middle of some construction here, so check back soon. In the mean time, why not check out these puppies and kittens? Who doesn't love puppies and kittens?!</p>
              </div>
            } 
            cardFooter={
              <button className='btn puppies-and-kittens' onClick={ event => {
              	document.getElementById('gallery-modal').classList.add('active');
              	document.body.classList.add('prevent-scroll');
              }}>Heck yea, baby animals!</button>
            }
          />
        </div>
        <Modal 
          id='gallery-modal'
          classes=''
          modalTitle='Puppies and Kittens!'
          modalContent={
            <Gallery
              classes='column col-xs-12 col-12 col-mx-auto' 
              imgs={
                ['/img/p-01.jpg', '/img/p-02.jpg',
                '/img/p-03.jpg', '/img/p-04.jpg',
                '/img/p-05.jpg', '/img/k-01.jpg',
                '/img/k-02.jpg', '/img/k-03.jpg',
                '/img/k-04.jpg', '/img/k-05.jpg']} 
            />
          }
        />
      </div>
    );
  }
}

export default Home;
