const gs = require('gstore-node')();

const todoSchema = new gs.Schema({
  text: {
    type: String,
    required: true,
    sanitizer: 'trim'
  },
  completed: {
    type: Boolean,
    default: false,
    required: true
  },
  completedAt: {
    type: Number,
    default: null
  }
});
var Todo = gs.model('Todo', todoSchema);

module.exports = {Todo};



// var minStringLength = (obj, validator, min) => {
//     return obj.length >= min;
// };
