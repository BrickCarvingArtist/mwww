import React, {Component} from "react";
export const init = render => render(
	<Page />,
	document.querySelector(".main")
);
export class Page extends Component{
	render(){
		return (
			<div className="page"></div>
		);
	}
};