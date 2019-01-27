/* view info
*/

import React from 'react';
import { Card } from '../../components/Cards/Cards';
import { Modal } from '../../components/Modal/Modal';
import { Gallery } from '../../components/Gallery/Gallery';
import './Home.css';

const PUBLIC = process.env.PUBLIC_URL;

class Home extends React.Component {
  render() {
    return (
      <div id='card-container'>
        {/* card component */}
        <Card 
          classes='text-center full-page img-top'
          imgSrc={PUBLIC + '/img/puppy.jpg'} 
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
      <Modal 
        id='gallery-modal'
        classes=''
        modalTitle='Puppies and Kittens!'
        modalContent={
          <Gallery
            classes='column col-xs-12 col-12 col-mx-auto' 
            imgs={
              [PUBLIC + '/img/p-01.jpg', PUBLIC + '/img/p-02.jpg',
              PUBLIC + '/img/p-03.jpg', PUBLIC + '/img/p-04.jpg',
              PUBLIC + '/img/p-05.jpg', PUBLIC + '/img/k-01.jpg',
              PUBLIC + '/img/k-02.jpg', PUBLIC + '/img/k-03.jpg',
              PUBLIC + '/img/k-04.jpg', PUBLIC + '/img/k-05.jpg']} 
          />
        }
      />
    </div>
    );
  }
}

export default Home;
