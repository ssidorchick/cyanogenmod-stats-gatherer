var request = require('request'),
    CronJob = require('cron').CronJob,
    mongoose = require('mongoose'),
    VersionConverter = require('./converters/version'),
    Version = require('./models/version'),
    url = 'http://stats.cyanogenmod.org/api?method=get_counts';

mongoose.connect('mongodb://localhost/cyanogenmod');

var job = new CronJob('00 00 * * * *', function() {
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var version = new Version({ statistics: VersionConverter.convert(body) });
      version.save(function(err) {
        if (err) {
          console.log(err);
        }
      });
    }
  });
}, null, true, null);
