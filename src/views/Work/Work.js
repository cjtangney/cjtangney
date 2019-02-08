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
      loading: true
    }

    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
    /* this block of code will download the json files from github */
    workController.getFolders('https://api.github.com/repos/cjtangney/cjt2019/contents/public/work')
      .then(res => {
        for(let folder of res.data){
          workController.getFiles('https://api.github.com/repos/cjtangney/cjt2019/contents/' + folder.path)
            .then(res => {
              for(let file of res.data){
                workController.getPost(file.download_url)
                  .then(res => {
                    let data = this.state.posts;
                    data.push({
                      data: res.data,
                      folder: folder
                    });
                    this.setState({
                      posts: data
                    });
                  })
              }
            })
        }
        this.setState({
          loading: false
        })
      });
    /* this block of code will use local json files from the public dir //
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
        this.setState({
          loading: false
        })
      }); 
    */
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll = () => {
    if (this.props.match.path === '/work'){
      let headerCardFooter = document.getElementById('work-header').children[2];
      window.scrollY > 236 ? headerCardFooter.classList.add('sticky') : headerCardFooter.classList.remove('sticky');
    }
  }
  getBody = (props) => {
    if(this.state.loading){
      return(<h1 className='text-center'>I'm loading right now!<br /><br/>:]</h1>)
    }else{
      return(
        <WorkHome {...props} posts={this.state.posts} />
      )
    }
  }
  render() {
    return (
      <div id='card-container'>
        <div id='work-container'>
          <div className='columns'>
            <Route exact path='/work' render={e=>(
              <div>
                <div className='container' id='work-header-container'>
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
                      <Link to='/' className='btn float-right' onClick={event => window.scrollTo(0,0)}><i className="material-icons">home</i></Link>
                    }
                  />
                </div>
                {this.getBody(e)}
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
