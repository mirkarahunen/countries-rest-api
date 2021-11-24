const express = require('express');
const ReactDOMServer = require("react-dom/server");
const StaticRouter = require("react-router-dom/server");
const path = require('path');
const app = express();

app.get("*", (req, res) => {
    let html = ReactDOMServer.renderToString(
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    );
    res.send("<!DOCTYPE html>" + html);
  });
  
  app.listen(3000);