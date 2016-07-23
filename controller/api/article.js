const data = [
	{
		id : 1,
		title : "分析前端工程师的JD（招聘信息）",
		description : "",
		content : "",
		image : ["http://static.ikindness.cn/image/article/3.png"]
	},
	{
		id : 2,
		title : "文章",
		description : "",
		content : "",
		image : []
	},
	{
		id : 3,
		title : "文章",
		description : "",
		content : "",
		image : []
	}
];
export default [
	{
		from : "fetch",
		method : "get",
		signType : [1, 2],
		callback(req, res){
			let length = req.query.length;
			res.json({
				code : 0,
				data : length ? data.filter((list, index) => index < req.query.length) : data,
				message : "success"
			});
		}
	}
];