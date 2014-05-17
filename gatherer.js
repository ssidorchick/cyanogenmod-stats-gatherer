var request = require('request'),
    CronJob = require('cron').CronJob,
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    _ = require('underscore'),
    url = 'http://stats.cyanogenmod.org/api?method=get_counts';

mongoose.connect('mongodb://localhost/cyanogenmod');

var versionSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  statistics: [{ name: String, downloads: Number, _id: false }]
});

var Version = mongoose.model('Version', versionSchema);

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
