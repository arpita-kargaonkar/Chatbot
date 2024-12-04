import React from 'react';
import Typed from 'typed.js';

export default class Typewriter extends React.Component {
	componentDidMount(){
		const options = {
			strings: this.props.strings,
			typeSpeed: this.props.typeSpeed,
			backSpeed: this.props.backSpeed,
			startDelay: this.props.startDelay,
			backDelay: this.props.backDelay,
			cursorChar: '_',
			loop: true,
			loopCount: Infinity,
			smartBackspace: false,
			preStringTyped: (pos, self) => {
				self.el.style.color = this.props.colors[pos];
			}
		};
		this.typed = new Typed(this.el, options);
	}

	componentWillUnmount(){
		this.typed.destroy();
	}

	render(){
		return(
			<span className="text-2xl font-semibold text-center tracking-wide md:text-xl "  ref={(el) => { this.el = el; }}></span>
		);
	}
}