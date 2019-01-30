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
  constructor(props){
    super(props);

    this.state = {
      post: this.parseData(),
    }
  }
  componentDidMount(){
    this.formatPost(this.state.post);
  }
  parseData = () => {
    return(JSON.parse(JSON.stringify(require('./post.json'))));
  }
  formatPost = (post) => {
    //showdown is the markdown viewer
    let Showdown = require('showdown');
    let converter = new Showdown.Converter();
    let formattedPost = [converter.makeHtml(post.title)];
    post.body.map(line => {
      formattedPost.push(converter.makeHtml(line))
    });
    this.displayPost(formattedPost)
  }
  displayPost = (formattedPost) => {
    let container = document.getElementById('post-container');
    container.innerHTML = formattedPost.join(' ');
  }
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
        <div className='columns'>
          <div className='column col-xs-12 col-sm-10 col-md-9 col-lg-8 col-xl-7 col-7 col-mx-auto' id='post-container'>
            {/* the post body will print here */}
          </div>  
        </div>
      </div>
    );
  }
}

export default Blog;
