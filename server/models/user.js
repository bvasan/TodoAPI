const gs = require('gstore-node')();
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const userSchema = new gs.Schema({
  email: {
    type: String,
    required: true,
    sanitize: 'trim',
    validate: 'isEmail'
  },
  password: {
    type: String,
    required: true,
    excludedFromIndexes: true
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

function hashPassword() {
  const user = this;
  const password = this.password;

  if (!password) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    var hash = jwt.sign({id: user.password.toString()}, 'abc123').toString();
    user.password = hash
    return resolve();
  });
};
userSchema.pre('save', hashPassword);
userSchema.queries('list', {readAll: false});

userSchema.methods.toJSON = function () {
  var user = this;
  return _.pick(user, ['entityKey.id', 'email']);
};

userSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({id: user.entityKey.id.toString(), access}, 'abc123').toString();
  user.tokens = [];
  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

var User = gs.model('User', userSchema);

module.exports = {User};
