var request = require('request'),
    url = 'http://stats.cyanogenmod.org/api?method=get_counts';

request(url, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);
  }
});
