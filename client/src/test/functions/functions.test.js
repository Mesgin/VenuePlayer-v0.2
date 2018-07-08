const functions = require('./functions')

test('Add', ()=> {
  expect(functions.add(2,2)).toBe(4)
})