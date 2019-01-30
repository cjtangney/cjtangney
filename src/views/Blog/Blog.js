/* view info
*/

import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/Cards/Cards';
import { ScrollToTop } from '../../components/ScrollToTop/ScrollToTop';
//import './Blog.css';

const PUBLIC = process.env.PUBLIC_URL;

class Blog extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      files: '',
      post: '',
      formattedPosts: [],
    }
  }
  async componentDidMount(){
    this.getFiles().then(res => {
      this.parseData(res);
    });
  }
  getFiles = async () => {    
    let blogController = require('../../controllers/Blog/Blog');
    let files = await blogController.getBlogPosts();
    return(files);
  }
  parseData = (files) => {
    //console.log(files);
  }
  formatPost = (post) => {
    //showdown is the markdown viewer
    let Showdown = require('showdown');
    let converter = new Showdown.Converter({strikethrough: true});
    let formattedPost = [converter.makeHtml(post.title)];
    post.body.map(line => {
      formattedPost.push(converter.makeHtml(line))
    });
    this.setState({
      formattedPosts: formattedPost,
    });
    console.log(formattedPost);
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
          <Card
            classes='column col-sm-12 col-md-10 col-10 col-mx-auto'
            cardBody={
              <div className='container'>
                <div className='columns'>
                  <div className='column col-xs-12 col-md-10 col-lg-9 col-xl-8 col-7 col-mx-auto' id='post-container'>
                    {/* the post body will print here */}
                  </div>
                </div>
              </div>
            }
          />
        </div>
        <ScrollToTop />
      </div>
    );
  }
}

export default Blog;
