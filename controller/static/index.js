import React, {createFactory} from "react";
import {renderToString} from "react-dom/server";
import {match, RouterContext} from "react-router";
import {Page as home} from "../../dev_resource/pack/home";
import {routes as article} from "../../dev_resource/pack/article";
import lost from "../../dev_resource/component/lost";
const Corp = "-砖雕艺术馆管理系统",
	ViewModel = "./index",
	Enum = [
		{
			route : "/",
			signType : [0, 1, 2],
			callback(req, res){
				res.render(ViewModel , {
					style : [
						"/css/home.css"
					],
					script : [
						"/js/home.js"
					],
					title : `首页${Corp}`,
					page : renderToString(createFactory(home)())
				});
			}
		},
		{
			route : "/article",
			signType : [0, 1, 2],
			callback(req, res){
				match({
					routes : article,
					location : req.url
				}, (error, redirectLocation, renderProps) => {
					res.render(ViewModel, {
						style : [
							"/css/draft.css",
							"/css/article.css"
						],
						script : [
							"/js/article.js"
						],
						title : `文章${Corp}`,
						page : renderToString(<RouterContext {...renderProps} />)
					});
				});
			}
		},
		{
			route : "*",
			signType : [0, 1, 2],
			callback(req, res){
				res.render(ViewModel , {
					style : [
						// "/css/column.css"
					],
					script : [
						// "/js/column.js"
					],
					title : `努力建设中...${Corp}`,
					page : renderToString(createFactory(lost)())
				});
			}
		}
	],
	Router = router => {
		Enum.map(list => {
			router.route(list.route).get((req, res) => {
				list.callback(req, res);
			});
		});
		return router;
	};
let Route = [];
Enum.map(list => {
	Route.push({
		route : list.route,
		signType : list.signType
	});
});
export {
	Route,
	Router 
};