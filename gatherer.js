var request = require('request'),
    CronJob = require('cron').CronJob,
    url = 'http://stats.cyanogenmod.org/api?method=get_counts';

var job = new CronJob('00 00 * * * *', function() {
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  });
}, null, true, null);
