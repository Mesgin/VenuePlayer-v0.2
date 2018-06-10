import { AUTHENTICATE } from '../actions/types'

const initialState = {
  isAuthenticated: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: true,
      }
    default:
      return state
  }
}
