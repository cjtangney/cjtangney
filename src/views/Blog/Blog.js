/* view info
  
  state : {
    loads all blog posts from: public/blog_posts/*.json;
    keeps track of blog posts and loading state;
    stores the formatted posts as html (currently parsed from markdown);
  }
*/

import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/Cards/Cards';
import { ScrollToTop } from '../../components/ScrollToTop/ScrollToTop';
import './Blog.css';

const PUBLIC = process.env.PUBLIC_URL;

class Blog extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loading: true,
      posts: [],
      formattedPosts: [],
    }
  }
  componentDidMount(){
    let blogController = require('../../controllers/Blog/Blog');
    blogController.getFiles('/blog_posts/')
      .then(res => {
        res.data.forEach(file => {
          blogController.getPost('/blog_posts/' + file)
            .then(res => {
              let data = this.state.posts;
              data.push(res.data);
              this.setState({
                posts: data
              });
              this.formatPosts();
            })
        });
      })
  }
  formatPosts = () => {
    //showdown is the markdown viewer
    let Showdown = require('showdown');
    let converter = new Showdown.Converter({strikethrough: true});
    let formattedPosts = [];
    let currentPost;
    this.state.posts.map((post, i) => {
      currentPost = [];
      currentPost = [converter.makeHtml(post.title)];
      post.body.map(line => {
        currentPost.push(converter.makeHtml(line));
      });
      //join the post array to remove commas from output
      currentPost = currentPost.join(' ');
      formattedPosts.push(
        <Card
          classes='column col-xs-12 col-md-10 col-lg-10 col-xl-10 col-10 col-mx-auto'
          cardBody={
            <div className='container' id={'post-thumb-'+i} dangerouslySetInnerHTML={{ __html: currentPost }}>
              {/* the post body will print here */}
            </div>
          }
          key={'post-thumb-'+i}
        />
      )
    })
    //formattedPosts = formattedPosts.join(' ');
    this.setState({
      loading: false,
      formattedPosts: formattedPosts,
    });
  }
  render() {
    return (
      <div id='card-container'>
        <div className='columns'>
          <div id='blog-container'>
            {this.state.formattedPosts}
          </div>
          <div className='column col-xs-12 col-sm-11 col-md-11 col-lg-10 col-xl-9 col-9 col-mx-auto text-center'>
            <Link to='/' className='btn k-go-home'><i className="material-icons">home</i></Link>
          </div>
        </div>
        <ScrollToTop />
      </div>
    );
  }
}

export default Blog;
