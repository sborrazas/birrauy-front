var path = require("path")
  , Express = require("express")
  , app = Express()
  , PATH_STYLES = path.resolve(__dirname, "../client/styles")
  , PATH_IMAGES = path.resolve(__dirname, "../client/images")
  , PATH_SCRIPTS = path.resolve(__dirname, "../client/scripts")
  , PATH_FONTS = path.resolve(__dirname, "../client/fonts")
  , server = null;

app.use("/styles", Express.static(PATH_STYLES));
app.use("/images", Express.static(PATH_IMAGES));
app.use("/scripts", Express.static(PATH_SCRIPTS));
app.use("/fonts", Express.static(PATH_FONTS));

app.get("/404", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../client/404.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../client/index.html"));
});

server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;

  console.log("Server is listening at %s", port);
});
