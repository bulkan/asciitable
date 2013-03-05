var asciitable = module.exports = function asciitable(options, data) {
  var pad = function pad(text, length) {
    if (typeof text === "undefined") { text = ""; }
    return ("" + text) + (new Array((length - ("" + text).length) + 1)).join(" ");
  };

  if (typeof options === "object" && Array.isArray(options)) {
    var tmp = data;
    data = options;
    options = tmp;
  }

  if (!options) {
    options = {};
  }

  var columns;
  if (options.columns) {
    columns = options.columns;
  } else {
    columns = [];
    data.forEach(function(e) {
      Object.keys(e).filter(function(k) { return columns.indexOf(k) === -1; }).forEach(function(k) { columns.push(k); });
    });
  }

  columns = columns.map(function(e) {
    return {
      field: e,
      width: 0,
    };
  });

  data.forEach(function(e) {
    columns.forEach(function(column) {
      if (typeof e[column.field] === "undefined") {
        return;
      }

      column.width = Math.max(column.width, ("" + e[column.field]).length);
    });
  });

  var total_width = columns.reduce(function(i, v) {
    return i + v.width + 3;
  }, 4);

  var output = [];

  output.push((new Array(total_width)).join("-"));
  output.push([""].concat(columns.map(function(e) { return pad(e.field, e.width); })).concat([""]).join(" | "));
  output.push((new Array(total_width)).join("-"));
  data.forEach(function(row) {
    output.push([""].concat(columns.map(function(column) { return pad(row[column.field], column.width); })).concat([""]).join(" | "));
  });
  output.push((new Array(total_width)).join("-"));

  return output.join("\n");
};