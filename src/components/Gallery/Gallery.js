/* component info

	gallery: {
		a gallery component;
		information stored in component state;
	}

	usage: {
		state: {
			imgs: an array of URLs to image resources for use with the gallery;
			activeImg: img array index of the current resource being displayed;
		}
		an img array must be passed into the component;
		the component accepts additional classes via the class prop;
		pass additional props through classes to modify the layout: {
			* slideshow: {
				enables slideshow functionality;
				when slideshow is enabled, a slideDelay prop must be provided
			}
			* nav-left: {
				move nav to the left of the viewer;
			}
			* nav-right: {
				move nave to the right of the viewer;
			}
		}
	}
*/

import React from 'react';
import propTypes from 'prop-types';
import './Gallery.css';

class Gallery extends React.Component{
	constructor(props){
		super(props); 

		//shuffle the gallery images when initialized
		this.state = {
			imgs: this.shuffle(props.imgs),
			activeImg: 0
		}
	}
	//shuffle and return an the array 'input'
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
  //replaces the src of the active gallery image with the target src
  zoomImg = (e) => {
  	document.getElementById('gallery-img').src = e.target.src;
  	this.setState({
  		activeImg: parseInt(e.target.parentNode.id.match(/\d+/g)),
  	});
  }
	render(){
		let classes = this.props.classes;
		return(
			<div className={classes} id='gallery-container'>
				<img src={this.state.imgs[0]} alt='Alternate text' className='img-responsive' id='gallery-img' />
				<div className='columns' id='gallery-nav'>
					{this.state.imgs.map((img, i) => {
							if(i===this.state.activeImg){
								return(
									<div className='column col-3 gallery-button' key={'gallery-button-' + i} id={'gallery-button-' + i}>
										<img src={img} className='active-img' alt='Alternate text' onClick={ event => this.zoomImg(event) } />
									</div>
								)
							}else{
								return(
									<div className='column col-3 gallery-button' key={'gallery-button-' + i} id={'gallery-button-' + i}>
										<img src={img} alt='Alternate text' onClick={ event => this.zoomImg(event) } />
									</div>
								)
							}
						})
					}
				</div>
      </div>
		)
	}
}

/* prop info
*/
Gallery.propTypes = {
	classes: propTypes.string,
	imgs: propTypes.arrayOf(propTypes.string).isRequired,
	slideDelay: propTypes.number,
}

export { Gallery };