/* view info
*/

import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/Cards/Cards';
//import { Modal } from '../../components/Modal/Modal';
//import { Gallery } from '../../components/Gallery/Gallery';
import './Resume.css';

//const PUBLIC = process.env.PUBLIC_URL;

class Resume extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      data: this.parseData()
    }
  }
  componentDidMount(){
    this.detectWrap();
    window.addEventListener('resize', this.detectWrap);
  }
  parseData = () => {
    return(JSON.parse(JSON.stringify(require('./data.json'))));
  }
  detectWrap = (event) => {  
    let containers = document.getElementsByClassName('skills-container');
    let wrappedItems = [];
    let currItem = {};
    Array.from(containers).forEach(container => {
      let prevItem;
      Array.from(container.children).forEach(child => {
        child.classList.remove('break');
        currItem = child.getBoundingClientRect();
        if(prevItem && (prevItem.getBoundingClientRect()).top < currItem.top){ wrappedItems.push(prevItem) }
        prevItem = child;
      })
    })
    return(
      wrappedItems.forEach(item => {
        item.classList.add('break');
      })
    );
  }
  render() {
    return (
      <div className='card-container'>
        <Card 
          id='resume-header'
          classes='text-center'
          cardHeader='Hey again!' 
          cardBody={
            <div className='container'>
              <p className='text-large'>If you've landed on this page, you're probably interested in learning a little more about my professional history. If you have any questions, don't hesitate to reach out to me at {this.state.data.basics.email}!</p>
            </div>
          }
          cardFooter={
            <Link to='/'>
              <button className='btn'>Take me home!</button>
            </Link>
          }
        />
        <div className='container text-center'>
          <div className='columns'>
            {/* core competencies */}
            <Card
              classes='column col-sm-12 col-md-10 col-10 col-mx-auto resume-card'
              cardHeader='Core Competencies'
              cardBody={
                <div className='columns' id='compentencies'>
                  {this.state.data.competencies.map((compentency, i) => 
                    <div className='panel column col-xs-12 col-md-10 col-lg-9 col-xl-8 col-4 text-left competency-panel' key={'compentency-'+i}>
                      <h5>{compentency.name}</h5>
                      <p>{compentency.summary}</p>
                    </div>
                  )}
                </div>
              }
            />
            {/* skills */}
            <Card
              classes='column col-sm-12 col-md-10 col-10 col-mx-auto resume-card'
              cardHeader='Additional Skills'
              cardBody={
                <div className='columns'>
                  <div className='column col-sm-11 col-md-3 col-3 col-mx-auto text-left skills-container' id='skills'>
                  {this.state.data.skills.map((skill, i) => 
                    <h5 key={'skill-'+i}>{skill}</h5>
                  )}
                  </div>
                </div>
              }
            />
            {/* computer languages & technology */}
            <Card
              classes='column col-sm-12 col-md-10 col-10 col-mx-auto resume-card'
              cardHeader='Computer Languages &amp; Technologies'
              cardBody={
                <div className='columns'>
                  <div className='column col-sm-11 col-md-3 col-3 col-mx-auto text-left skills-container' id='languages'>
                  {this.state.data.languages.map((language, i) => 
                    <h5 key={'language-'+i}>{language}</h5>
                  )}
                  </div>
                </div>
              }
            />
            {/* work experience */}
            <Card
              classes='column col-sm-12 col-md-10 col-10 col-mx-auto resume-card'
              cardHeader='Employment History'
              cardBody={
                <div className='columns'>
                  {this.state.data.work.map((job, i) => 
                    <div className='panel column col-sm-11 col-11 col-mx-auto text-left job-panel' key={'job-'+i}>
                      <h5>{job.company}</h5>
                      <p className='text-large'>{job.position}</p>
                      <p>{job.summary}</p>
                      <ul className='job-duties'>
                        {job.highlights.map((highlight, i) => 
                          <li key={job.position+'-'+i}>{highlight}</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              }
            />
          {/* education */}
            <Card
              classes='column col-sm-12 col-md-10 col-10 col-mx-auto resume-card'
              cardHeader='Education'
              cardBody={
                <div className='columns'>
                  {this.state.data.education.map((school, i) => 
                    <div className='panel column col-sm-11 col-11 col-mx-auto text-left job-panel' key={'school-'+i}>
                      <h5>{school.institution}</h5>
                      <p className='text-large'>{school.studyType}, {school.area}</p>
                      <p>{school.summary}</p>                      
                    </div>
                  )}
                </div>
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Resume;
