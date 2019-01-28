/* view info
*/

import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/Cards/Cards';
//import { Modal } from '../../components/Modal/Modal';
//import { Gallery } from '../../components/Gallery/Gallery';
//import './Home.css';

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
        <div className='columns'>
          <div className='column col-xs-12 col-sm-10 col-md-8 col-lg-7 col-7 col-mx-auto'>
            <Card 
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
          </div>
        </div>
      </div>
    );
  }
}

export default Resume;
