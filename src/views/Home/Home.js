/* view info
*/

import React from 'react';
import { Link } from 'react-router-dom';
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
          classes='img-left'
          imgSrc={PUBLIC + '/img/headshot.jpg'} 
          altTxt='My Headshot'  
          cardBody={
            <div className='container'>
              <h1 className='text-center'>Hey there!</h1>
              <p className='text-large'>I'm Connor, and it seems like you've stumbled upon my little corner of the Internet. Welcome! When I set out to create this site, I initially intended for it to be a resource that I could provide when someone asked to learn a little bit about me. After all, carrying around business cards in this day and age is a little... gauche.</p>
              <p className='text-large'>If you're here looking for my credentials, check out one of the links below. Otherwise, feel free to check out my blog or look at some of my current and past work.</p>
              <div className='btn-group'>
              	<Link to='/resume' className='btn' onClick={event => window.scrollTo(0,0)}>Resume</Link>
                <Link to='#' className='btn'>My Work</Link>
                <Link to='#' className='btn'>About This Site</Link>
                <Link to='#' className='btn'>About Me</Link>
              </div>
            </div>
          }
      	/>
    </div>
    );
  }
}

export default Home;
