const gs = require('gstore-node')();

const userSchema = new gs.Schema({
  email: {
    type: String,
    required: true,
    sanitize: 'trim',
    validate: 'isEmail'
  }
});
userSchema.queries('list', {readAll: true});

var User = gs.model('User', userSchema);

module.exports = {User};
