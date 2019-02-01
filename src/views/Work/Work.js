/* view info
*/

import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/Cards/Cards';
import { ScrollToTop } from '../../components/ScrollToTop/ScrollToTop';
import './Work.css';

const PUBLIC = process.env.PUBLIC_URL;

class Work extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loading: true,
      posts: [],
      formattedPosts: [],
    }
  }
  componentDidMount(){
    let workController = require('../../controllers/Work/Work');
    workController.getFolders('/work/')
      .then(res => {
        res.data.forEach(folder => {
          workController.getFiles('/work/' + folder)
            .then(res => {
              res.data.forEach(file => {
                workController.getPost('/work/' + folder + '/' + file)
                  .then(res =>{
                    let data = this.state.posts;
                    data.push({
                      data: res.data,
                      folder: folder
                    });
                    this.setState({
                      posts: data
                    });
                    this.formatPosts();
                  })
              })
            })
        })
      }); 
  }
  formatPosts = () => {
    //showdown is the markdown viewer
    let Showdown = require('showdown');
    let converter = new Showdown.Converter({strikethrough: true});
    let formattedPosts = [];
    let currentPost;
    //initial image direction should be set to the opposite side you'd like the image to display on
    let imgDir = 'right';
    this.state.posts.map((post, i) => {
      currentPost = [];
      currentPost.push(converter.makeHtml(post.data.description));
      //join the post array to remove commas from output
      currentPost = currentPost.join(' ');
      //determine which side the image should display on
      imgDir === 'right' ? imgDir = 'left' : imgDir = 'right';
      formattedPosts.push(
        <Card
          classes={'col-sm-12 col-md-10 col-10 img-' + imgDir + ' col-mx-auto work-card'}
          imgSrc={PUBLIC + '/img/work/' + post.folder + '/thumbnail.jpg'}
          altTxt='An image'
          cardHeader={post.data.name}
          cardBody={
            <div className='columns' id={'work-card-'+i} dangerouslySetInnerHTML={{ __html: currentPost }}>
              {/* the post body will print here */}
            </div>
          }
          cardFooter={
            <Link to='#' className='btn'>Learn more!</Link>
          }
          key={'work-card-'+i}
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
        <Card 
          id='work-header'
          classes='text-center'
          cardHeader='Welcome!' 
          cardBody={
            <div className='container'>
              <p className='text-large'>During my time, I've worked on a fair number of projects -- both personally and professionally. Every once in awhile, I'll work on something that resonates with me so much that I can't help but come here to write about it. For some reason, I have it in my head that people actually want to read about these projects!</p>
              <p className='text-large'>If you happen to find anything in these projects that inspires you, if you have any questions about what I did this or that, or if you have a suggestion on how you think I could improve something, send me a message at connor@cjtangney.me!</p>
            </div>
          }
          cardFooter={
            <Link to='/' className='btn'>Take me home!</Link>
          }
        />
        <div id='work-container'>
          <div className='columns'>
            {this.state.formattedPosts}
          </div>
          <ScrollToTop />
        </div>
      </div>
    );
  }
}

export default Work;
