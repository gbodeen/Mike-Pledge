// const mongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pledges', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', () => console.log('Error connecting to the MongoDB'));
db.once('open', () => console.log('Successfully connected to the pledges database.'));

const Schema = mongoose.Schema;
const pledgeSchema = new Schema({
  pledge_id: Number,
  username: String,
  pledge_amount: { type: Schema.Types.Decimal128, default: 0 },
  date_created: { type: Date, default: Date.now }
});
const projectSchema = new Schema({
  project_id: Number,
  project_name: String,
  backer_count: Number,
  total_pledged: Schema.Types.Decimal128,
  funding_goal: Schema.Types.Decimal128,
  deadline: Date,
  date_created: { type: Date, default: Date.now },
  pledges: [pledgeSchema]
});
const Project = db.model('Project', projectSchema);
const Pledge = db.model('Pledge', pledgeSchema);

module.exports = {
  Project,
  Pledge
}
