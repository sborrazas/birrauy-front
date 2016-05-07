var path = require("path")
  , Express = require("express")
  , graph = require("fbgraph")
  , app = Express()
  , PATH_STYLES = path.resolve(__dirname, "../client/styles")
  , PATH_IMAGES = path.resolve(__dirname, "../client/images")
  , PATH_SCRIPTS = path.resolve(__dirname, "../client/scripts")
  , PATH_FONTS = path.resolve(__dirname, "../client/fonts")
  , server = null;

const fbAccessToken = process.env.FB_ACCESS_TOKEN;

if (!fbAccessToken) {
  console.log("`FB_ACCESS_TOKEN` ENV variable not provided.");
  process.exit(1);
}

graph.setAccessToken(fbAccessToken);

app.use("/styles", Express.static(PATH_STYLES));
app.use("/images", Express.static(PATH_IMAGES));
app.use("/scripts", Express.static(PATH_SCRIPTS));
app.use("/fonts", Express.static(PATH_FONTS));

app.get("/404", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../client/404.html"));
});

app.get("/api/events", function (req, res) {
  graph.get(
    "/CervezaArtesanalUY/events",
    function (err, response) {
      if (response && !response.error) {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(response.data));
      }
      else {
        res.statusCode = 500;
        res.end("Internal server error.");
      }
    }
  );
});

app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../client/index.html"));
});

server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;

  console.log("Server is listening at %s", port);
});
