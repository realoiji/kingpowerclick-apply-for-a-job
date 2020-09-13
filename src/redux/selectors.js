export const getApplicantState = (store) => store.applicant
export const getCurrentApplicantId = (store) =>
  getApplicantState(store) ? getApplicantState(store).currentId : 0

export const getApplicantList = (store) =>
  getApplicantState(store) ? getApplicantState(store).allIds : []

export const getApplicantObjList = (store) =>
  getApplicantState(store) ? getApplicantState(store).byIds : {}
export const getApplicantById = (store, id) =>
  getApplicantState(store) ? { ...getApplicantState(store).byIds[id], id } : {}
