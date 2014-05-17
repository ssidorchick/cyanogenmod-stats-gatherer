var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var versionSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  statistics: [{ name: String, downloads: Number, _id: false }]
});

var Version = mongoose.model('Version', versionSchema);

exports.Version = Version;
