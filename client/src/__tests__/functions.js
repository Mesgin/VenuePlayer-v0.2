import functions from '../functions/functions'
import mockAxios from 'axios'

test('Add 2 + 2', () => {
  expect(functions.add(2, 2)).toBe(4)
})

test('Username should be Ervin Howell', () => {
  mockAxios.get.mockImplementationOnce(() =>
  Promise.resolve({
    data: { user: 'Ervin Howell' }
  })
)
  expect.assertions(1)
  return functions.fetchUser().then(data => {   
    expect(data.user).toEqual('Ervin Howell')
  })
})

it('Calls axios and returns Ervin Howell', async () => {
  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: { user: 'Ervin Howell' }
    })
  )
  const { user } = await functions.fetchUser()

  expect(user).toEqual('Ervin Howell')
})

