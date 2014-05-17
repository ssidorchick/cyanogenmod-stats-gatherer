var  _ = require('underscore');

var Converter = function() {};
Converter.prototype.convert = function(rawData) {
  var data = JSON.parse(rawData);
  return _.map(data.result.version, function(d) {
    return {
      name: d[1],
      downloads: d[0]
    };
  });
};

module.exports = new Converter();
