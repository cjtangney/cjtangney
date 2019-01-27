/* view info
*/

import React from 'react';
import { Card } from '../../components/Cards/Cards';
//import { Modal } from '../../components/Modal/Modal';
//import { Gallery } from '../../components/Gallery/Gallery';
import './Home.css';

const PUBLIC = process.env.PUBLIC_URL;

class Home extends React.Component {
  render() {
    return (
      <div id='card-container'>
        {/* card component */}
        <Card 
          classes='text-center img-left'
          imgSrc={PUBLIC + '/img/headshot.jpg'} 
          altTxt='My Headshot'  
          cardBody={
            <div className='container'>
              <h1>Hey there!</h1>
              <p className='text-large'>I'm Connor, and it seems like you've stumbled upon my little corner of the Internet. Welcome! When I set out to create this site, I initially intended for it to be a resource that I could provide when someone asked to learn a little bit about me. After all, carrying around business cards in this day and age is a little... gauche.</p>
            </div>
          }
      	/>
    </div>
    );
  }
}

export default Home;
