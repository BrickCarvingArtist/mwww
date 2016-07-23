import React, {Component} from "react";
import {Router, Route, hashHistory, Link} from "react-router";
import fetch from "isomorphic-fetch";
import {LeftNav, TopNav, SideNav} from "../component/navbar";
import Lost from "../component/lost";
import {Editor, EditorState, RichUtils} from "draft-js";
class List extends Component{
	constructor(props){
		super(props);
		this.state = props;
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
	}
	render(){
		let state = this.state,
			data = state.data,
			id = data ? data.id : null,
			title = data ? data.title : null;
		return (
			<p>
				<span>
					{id}
				</span>
				<strong>
					{title}
				</strong>
			</p>
		);
	}
}
class Data extends Component{
	constructor(props){
		super(props);
		this.state = props;
	}
	componentWillMount(){
		fetch("/api/article/fetch").then(res => res.status ? res.json() : {
			code : 400,
			data : null,
			message : "wrong"
		}).then(data => {
			this.setState({
				data : data.data
			});
		});
	}
	render(){
		let data = this.state.data || [];
		return (
			<div className="data">
				{
					data.map((list, index) => (
						<List data={list} key={index} />
					))
				}
			</div>
		);
	}
}
class Search extends Component{
	render(){
		return (
			<div className="search full">
				<h1>文章列表</h1>
				<Data />
			</div>
		);
	}
}
class DEditor extends Component{
	constructor(props) {
		super(props);
		this.state = {editorState: EditorState.createEmpty()};
		this.onChange = (editorState) => this.setState({editorState});
		this.handleKeyCommand = this.handleKeyCommand.bind(this);
	}
	handleKeyCommand(command) {
		const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
		if (newState) {
			this.onChange(newState);
			return true;
		}
		return false;
	}
	render() {
		return (
			<Editor editorState={this.state.editorState} handleKeyCommand={this.handleKeyCommand} onChange={this.onChange} />
		);
	}
}
class Page extends Component{
	render(){
		return (
			<div className="page">
				<TopNav />
				<LeftNav />
				<SideNav name="文章" option={
					[
						{
							name : "查询",
							href : "/"
						},
						{
							name : "修改",
							href : "/edit"
						}
					]
				} />
				{this.props.children}
			</div>
		);
	}
}
export const routes = (
	<Route component={Page}>
		<Route path="/" component={Search} />
		<Route path="/edit" component={DEditor} />
		<Route path="*" component={Lost} />
	</Route>
);
export const init = render => render(
	<Router routes={routes} history={hashHistory} />,
	document.querySelector(".main")
);