/* view info
*/

import React from 'react';
//import { Link } from 'react-router-dom';
import { Card } from '../../components/Cards/Cards';
//import { Modal } from '../../components/Modal/Modal';
//import { Gallery } from '../../components/Gallery/Gallery';
import './Home.css';

const PUBLIC = process.env.PUBLIC_URL;

class Home extends React.Component {
  render() {
    return (
      <div id='card-container'>
        <Card 
          classes='text-center img-left'
          imgSrc={PUBLIC + '/img/headshot.jpg'} 
          altTxt='My Headshot'  
          cardBody={
            <div className='container'>
              <h1>Hey there!</h1>
              <p className='text-large'>I'm Connor, and it seems like you've stumbled upon my little corner of the Internet. Welcome! When I set out to create this site, I initially intended for it to be a resource that I could provide when someone asked to learn a little bit about me. After all, carrying around business cards in this day and age is a little... gauche.</p>
              <p className='text-large'>Once I set to work, I realized that I wanted something much more than what I initially set out to create. The result of that revelation is what you see before you. I often come here to hoot or holler about whatever happens to be on my mind at the time.</p>
              <p className='text-large'>If you're here looking for my credentials, check out one of the links below. Otherwise, feel free to check out my blog or look at some of my current and past work.</p>
              <div className='btn-group'>
              	<button className='btn'>Resume</button>
              	<button className='btn'>My Work</button>
                <button className='btn'>About this site</button>
            		<button className='btn'>About Me</button>
              </div>
            </div>
          }
      	/>
    </div>
    );
  }
}

export default Home;
