import "./config";
import express from "express";
import expressConfig from "./express-config";

const app = express();

app.use(expressConfig);

const port = process.env.EXPRESS_PORT || 5000;

app.listen(port, () =>
	console.log(`Aplicación corriendo en el puerto ${port}`)
);
