import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router("./data/cities.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get("/", (req, res) => {
	res.json(router.db.get("cities"));
});

server.use(router);

const port = process.env.PORT || 8050;
server.listen(port, () => {
	console.log(`JSON Server is running on port ${port}`);
});
