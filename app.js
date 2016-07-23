import express from "express";
import bodyParser from "body-parser";
import {Router as RouterApi} from "./controller/api";
import {Router as RouterStatic} from "./controller/static";
import {ServerConfig} from "./config/config";
const port = process.env.PORT || ServerConfig.port,
	app = express(),
	router = express.Router();
app.use(bodyParser.urlencoded({
	extended : 1
}));
app.set("views", `${__dirname}/view`);
app.set("view engine", "pug");
app.use(express.static(`${__dirname}/resource`, {
	index : 0,
	maxAge : 600000
}));
app.use(RouterApi(router));
app.use(RouterStatic(router));
app.listen(port);
console.log(`Server started on port ${port}`);