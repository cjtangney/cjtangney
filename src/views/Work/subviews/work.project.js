/* view info
*/

import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../../components/Cards/Cards';
import { Loader } from '../../../components/Loader/Loader';
import '../Work.css';

const PUBLIC = process.env.PUBLIC_URL;
const workController = require('../../../controllers/Work/Work');

class WorkProject extends React.Component {
  findPost = () => {
    let postName = '';
    let postData = this.props.posts.filter(post => {
      return(post.folder.name === this.props.match.params.folder)
    });
    if(postData.length){
      postName = postData[0].data.name;
      postData = postData[0].data.body;
    }
    return(this.formatPost(postName, postData));
  }
  formatPost = (postName, postData) => {
    //showdown is the markdown viewer
    let Showdown = require('showdown');
    let converter = new Showdown.Converter({strikethrough: true});
    let currentPost = [];
    postData.map(line => {
      currentPost.push(converter.makeHtml(line));
    });
    //join the post array to remove commas from output
    currentPost = currentPost.join(' ');
    return currentPost.length ? (
      <Card
        classes='col-xs-12 col-md-10 col-10 col-mx-auto work-card'
        cardHeader={postName}
        cardBody={
          <div className='container' dangerouslySetInnerHTML={{ __html: currentPost }}>
            {/* the post body will print here */}
          </div>
        }
        cardFooter={
          <Link to='/work' className='btn' onClick={event => window.scrollTo(0,0)}>Go back</Link>
        }
        key={'project-' + this.props.match.params.folder}
      />
    ) : (
      <Card
        classes='col-xs-12 col-md-10 col-10 col-mx-auto work-card'
        cardHeader={postName}
        cardBody={
          <div className='container'>
            <Loader classes='loading-lg blog-loader'/>
          </div>
        }
        cardFooter={
          <Link to='/work' className='btn' onClick={event => window.scrollTo(0,0)}>Go back</Link>
        }
        key={'project-' + this.props.match.params.folder}
      />
    )
  }
  render(){
    return (
      this.findPost()
    );
  }
}

export default WorkProject;
