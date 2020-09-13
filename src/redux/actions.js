import { v4 as uuidv4 } from 'uuid'
import {
  ADD_APPLICANT,
  CHOOSE_APPLICANT,
  UPDATE_APPLICANT,
  DELETE_APPLICANT,
} from './actionTypes'

export const addApplicant = (content) => ({
  type: ADD_APPLICANT,
  payload: {
    id: uuidv4(),
    content,
  },
})
export const chooseApplicant = (id) => ({
  type: CHOOSE_APPLICANT,
  payload: { id },
})

export const updateApplicant = (id, content) => ({
  type: UPDATE_APPLICANT,
  payload: { id, content },
})

export const deleteApplicant = (id) => ({
  type: DELETE_APPLICANT,
  payload: { id },
})
