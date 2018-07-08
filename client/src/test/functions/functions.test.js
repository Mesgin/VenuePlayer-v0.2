const functions = require('./functions')
const axios = require('axios')

test('Add', ()=> {
  expect(functions.add(2,2)).toBe(4)
})

test('Username should be Ervin Howell', ()=> {
  expect.assertions(1)
  return functions.fetchUser().then(data => {
    expect(data.name).toEqual('Ervin Howell')
  })
})