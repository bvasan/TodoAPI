const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
      console.log(hash);
  });
});

var hashedPassword = '$2a$10$y5e7J9IhguzzMJ8CCrYtiOeyzH2/s.VaYTO0gXIHZxYZ3QtvSC/LW'

bcrypt.compare(password, hashedPassword, (err, result) => {
  if (result) {
    console.log('password matched');
  } else {
    console.log('password did not match');
  };
});



// var data = {
//   id: 10
// };
// var token = jwt.sign(data, '123abc');
// console.log(token);
//
// var decoded = jwt.verify(token, '123abc');
// console.log('decoded ', decoded);

//jtw.sign
// var message = 'I am user 3';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data: data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
//
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed. Do not trust!');
// };
