/* view info
*/

import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/Cards/Cards';
//import { Modal } from '../../components/Modal/Modal';
//import { Gallery } from '../../components/Gallery/Gallery';
//import './Blog.css';

const PUBLIC = process.env.PUBLIC_URL;

class Blog extends React.Component {
  render() {
    return (
      <div id='card-container'>
        <Card 
          classes='text-center full-page img-top'
          imgSrc={PUBLIC + '/img/blog.jpg'} 
          altTxt='My Headshot'  
          cardBody={
            <div className='container'>
              <div className='columns'>
                <div className='column col-xs-12 col-sm-10 col-md-8 col-8 col-mx-auto'>
                  <h1>Blog</h1>
                  <p className='text-large'>Welcome to my blog. I'll probably come here to write some stuff about some things. There's nothing here yet, but be sure to check back soon! I've got some blog posts in the works, but for now, here's a link back to my home page.</p>
                  <Link to='/'>
                    <button className='btn'>Take me home!</button>
                  </Link>
                </div>
              </div>
            </div>
          }
      	/>
    </div>
    );
  }
}

export default Blog;
