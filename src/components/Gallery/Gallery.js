import React from 'react';
import propTypes from 'prop-types';
import './Gallery.css';

class Gallery extends React.Component{
	constructor(props){
		super(props); 

		this.state = {
			imgs: this.shuffle(props.imgs),
			activeImg: 0
		}
	}
  shuffle = (input) => {
  	let currentIndex = input.length, temporaryValue, randomIndex;
	  while (0 !== currentIndex) {
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;
	    temporaryValue = input[currentIndex];
	    input[currentIndex] = input[randomIndex];
	    input[randomIndex] = temporaryValue;
	  }
	  return input;
  }
  zoomImg = (e) => {
  	document.getElementById('gallery-img').src = e.target.src;
  }
	render(){
		let classes = this.props.classes;
		return(
			<div className={classes} id='gallery-container'>
				<img src={this.state.imgs[0]} alt='Alternate text' className='img-responsive' id='gallery-img' />
				<div className='columns' id='gallery-nav'>
					{this.state.imgs.map(img=>
						<div className='column col-3 gallery-button'>
							<img src={img} alt='Alternate text' onClick={ event => this.zoomImg(event) } />
						</div>
					)}
				</div>
      </div>
		)
	}
}

export { Gallery };