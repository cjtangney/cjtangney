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
  parseData = () => {
    return(JSON.parse(JSON.stringify(require('./data.json'))));
  }
  render() {
    return (
      <div className='card-container'>
        {console.log(this.state.data)}
        <Card 
          classes='text-center resume-header'
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
            <Card
              classes='column col-sm-12 col-md-10 col-10 col-mx-auto'
              cardHeader='Core Competencies'
              cardBody={
                <div className='columns'>
                  {this.state.data.competencies.map(compentency => 
                    <div className='panel col-sm-11 col-md-3 col-3 col-mx-auto text-left resume-panel'>
                      <p className='text-large'>{compentency.name}</p>
                      <p>{compentency.summary}</p>
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
