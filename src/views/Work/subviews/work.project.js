/* view info
*/

import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../../components/Cards/Cards';
import '../Work.css';

const PUBLIC = process.env.PUBLIC_URL;
const workController = require('../../../controllers/Work/Work');

class WorkProject extends React.Component {
  componentDidMount(){
    //console.log(this.props.match.params.folder)
  }
  findPost = () => {
    let postData = this.props.posts.filter(post => {
      return(post.folder === this.props.match.params.folder)
    });
    if(postData.length){
      postData = postData[0].data.body;
    }
    console.log(postData);
    return(this.formatPost(postData));
  }
  formatPost = (postData) => {
    //showdown is the markdown viewer
    let Showdown = require('showdown');
    let converter = new Showdown.Converter({strikethrough: true});
    let currentPost = [];
    postData.map(line => {
      currentPost.push(converter.makeHtml(line));
    });
    //join the post array to remove commas from output
    currentPost = currentPost.join(' ');
    return(
      <Card
        classes='column col-sm-12 col-md-10 col-8 col-mx-auto'
        cardBody={
          <div className='container'>
            <div className='columns'>
              <div className='column col-xs-12 col-md-10 col-lg-10 col-xl-10 col-10 col-mx-auto' dangerouslySetInnerHTML={{ __html: currentPost }}>
                {/* the post body will print here */}
              </div>
            </div>
          </div>
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
