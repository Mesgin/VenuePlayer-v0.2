import axios from 'axios'

const functions = {
  add: (a, b) => a + b,
  fetchUser: () =>
    axios
      .get('https://jsonplaceholder.typicode.com/users/2')
      .then(res => res.data)
      .catch(err => 'Error'),
  
}

module.exports = functions