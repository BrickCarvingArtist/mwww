const WebpackDevServerConfig = {
		host : "127.0.0.1",
		port : 61000
	},
	ServerConfig = {
		port : 15000
	},
	HostConfig = {
		//Tip : domain
		hostName : "dev.ikindness.com",
		//Tip : 后端nginx服务IP
		host : "10.1.1.62",
		//Tip : 后端nginx服务端口
		port : 80
	},
	MongoConfig = {
		//Tip : redis server
		host : "127.0.0.1",
		//Tip : redis port
		port : 27017
	},
	UploadConfig = {
		//Tip : 文件上传路径
		path : `${process.cwd()}/src/upload/`
	},
	LogConfig = {
		path : `${process.cwd()}/log/`
	};
export {
	WebpackDevServerConfig,
	ServerConfig,
	HostConfig,
	MongoConfig,
	UploadConfig,
	LogConfig
};