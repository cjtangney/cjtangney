/* view info
*/

import React from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import { Link } from 'react-router-dom';
import { Card } from '../../components/Cards/Cards';
import { ScrollToTop } from '../../components/ScrollToTop/ScrollToTop';
import WorkHome from './subviews/work.home';
import WorkProject from './subviews/work.project';
import './Work.css';

const PUBLIC = process.env.PUBLIC_URL;
const workController = require('../../controllers/Work/Work');

class Work extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      posts: [],
    }
  }
  componentDidMount(){
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
                  })
              })
            })
        })
      }); 
  }
  render() {
    return (
      <div id='card-container'>
        <div id='work-container'>
          <div className='columns'>
            <Route exact path='/work' render={e=>(
              <div>
              <Card 
                id='work-header'
                classes='column col-xs-12 col-mx-auto'
                cardHeader='Welcome!' 
                cardBody={
                  <div className='container'>
                    <p>During my time, I've worked on a fair number of projects -- both personally and professionally. Every once in awhile, I'll work on something that resonates with me so much that I can't help but come here to write about it. For some reason, I have it in my head that people actually want to read about these projects!</p>
                    <p>If you happen to find anything in these projects that inspires you, if you have any questions about what I did this or that, or if you have a suggestion on how you think I could improve something, send me a message at connor@cjtangney.me!</p>
                  </div>
                }
                cardFooter={
                  <Link to='/' className='btn float-right' onClick={event => window.scrollTo(0,0)}><i class="material-icons">home</i></Link>
                }
              />
              <WorkHome {...e} posts={this.state.posts} />
              </div>
            )} />
            <Route path='/work/:folder' render={e=>(
              <WorkProject {...e} posts={this.state.posts}/>
            )} />
          </div>
          <ScrollToTop />
        </div>
      </div>
    );
  }
}

export default Work;
