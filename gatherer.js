var request = require('request'),
    CronJob = require('cron').CronJob,
    mongoose = require('mongoose'),
    _ = require('underscore'),
    Version = require('./models/version'),
    url = 'http://stats.cyanogenmod.org/api?method=get_counts';

mongoose.connect('mongodb://localhost/cyanogenmod');

var getVersions = function(rawData) {
  var data = JSON.parse(rawData);
  return _.map(data.result.version, function(d) {
    return {
      name: d[1],
      downloads: d[0]
    };
  });
};

var job = new CronJob('00 00 * * * *', function() {
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var version = new Version({ statistics: getVersions(body) });
      version.save(function(err) {
        if (err) {
          console.log(err);
        }
      });
    }
  });
}, null, true, null);
