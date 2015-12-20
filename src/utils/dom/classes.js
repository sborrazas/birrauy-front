export default {
  set: function () {
    var classes = "";

    Array.prototype.forEach.call(arguments, function (arg) {
      var argtype = typeof arg;

      if (arg) {
        if ("string" === argtype || "number" === argtype) {
          classes += " " + arg;
        }
        else if (Array.isArray(arg)) {
          classes += " " + classes.set(arg);
        }
        else if (argtype === "object") {
          Object.keys(arg).forEach(function (key) {
            if (arg[key]) {
              classes += " " + key;
            }
          });
        }
      }
    });

    return classes.substr(1);
  }
};
