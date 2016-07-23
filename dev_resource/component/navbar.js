import React, {Component} from "react";
import {Link} from "react-router";
export class TopNav extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className="topNav">
				<div className="right"></div>
			</div>
		);
	}
}
class Sup extends Component{
	constructor(props){
		super(props);
		this.state = props;
		let status;
		this.handleClick = () => {
			status = this.state.status;
			this.setState({
				status : !status
			});
		};
	}
	componentDidMount(){
		let set = this.state.option.set,
			index = set ? set.findIndex(list => list.href === location.pathname) : 0;
		this.setState({
			status : index,
			index
		});
	}
	render(){
		let state = this.state,
			option = state.option,
			status = state.status,
			currentIndex = state.index;
		return (
			<div className={`sup${status ? " expand" : " contract"}`}>
				<strong onClick={this.handleClick}>{option.name}</strong>
				{
					option.set ? (
						<div className="sub" style={
							{
								height : `${40 * option.set.length}px`
							}
						}>
							{
								option.set.map((list, index) => (
									<a href={list.href} key={index} className={index === currentIndex ? "current" : null}>
										{list.name}
									</a>
								))
							}
						</div>
					) : null
				}
			</div>
		);
	}
}
export class LeftNav extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className="leftNav">
				{
					this.props.option.map((list, index) => (
						<Sup option={list} key={index} />
					))
				}
			</div>
		);
	}
}
LeftNav.defaultProps = {
	option : [
		{
			name : "用户信息"
		},
		{
			name : "新闻资讯",
			set : [
				{
					name : "新闻",
					href : "/news"
				},
				{
					name : "文章",
					href : "/article"
				},
				{
					name : "资料",
					href : "/library"
				}
			]
		},
		{
			name : "设置"
		}
	]
};
export class SideNav extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className="sideNav">
				<strong>
					{this.props.name}
				</strong>
				{
					this.props.option.map((list, index) => (
						<Link key={index} to={list.href} activeClassName="current">
							{list.name}
						</Link>
					))
				}
			</div>
		);
	}
};