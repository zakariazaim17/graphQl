import https from "https";
import fs from "fs";
import http from "http";

const sslkey = fs.readFileSync("../ssl-key.pem");
const sslcert = fs.readFileSync("../ssl-cert.pem");

const options = {
  key: sslkey,
  cert: sslcert,
};

const httpsRedirect = (req, res) => {
  res.writeHead(301, { Location: "https://localhost:8000" + req.url });
  res.end();
};

const localhost = (app, httpsPort, httpPort) => {
  https.createServer(options, app).listen(httpsPort);
  http.createServer(httpsRedirect).listen(httpPort);
};

export default localhost;
