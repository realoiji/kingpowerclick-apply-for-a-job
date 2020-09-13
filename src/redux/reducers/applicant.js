import {
  ADD_APPLICANT,
  CHOOSE_APPLICANT,
  UPDATE_APPLICANT,
  DELETE_APPLICANT,
} from '../actionTypes'

const initialState = {
  allIds: [],
  byIds: {},
  currentId: 0,
}

const applicant = (state = initialState, action) => {
  switch (action.type) {
    case ADD_APPLICANT: {
      const { id, content } = action.payload
      const allIds = [...state.allIds]
      allIds.unshift(id)
      return {
        ...state,
        allIds,
        byIds: {
          ...state.byIds,
          [id]: {
            ...content,
          },
        },
      }
    }
    case CHOOSE_APPLICANT: {
      const { id } = action.payload
      return {
        ...state,
        currentId: id,
      }
    }
    case UPDATE_APPLICANT: {
      const { id, content } = action.payload
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...content,
          },
        },
      }
    }
    case DELETE_APPLICANT: {
      const { id } = action.payload
      const byIds = { ...state.byIds }
      const allIds = [...state.allIds]
      const index = allIds.indexOf(id)
      if (index > -1) {
        allIds.splice(index, 1)
      }
      delete byIds[id]
      return {
        ...state,
        allIds,
        byIds,
      }
    }
    default:
      return state
  }
}

export default applicant
