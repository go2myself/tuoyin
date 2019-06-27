const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
mongoose.connection.on('error', () => {
  console.log('mongodb connect error');
});
const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Project = mongoose.model('Project', projectSchema);

const project = new Project({});
project.save((err) => {
  if (err) {
    console.log('err');
  } else {
    console.log('success');
  }
  mongoose.connection.close();
});
