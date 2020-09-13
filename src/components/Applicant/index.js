import React from 'react'
import { connect } from 'react-redux'

// import { addApplicant, updateApplicant, deleteApplicant } from '../redux/action';
import { getApplicantList } from 'redux/selectors'

import ManageApplicantProfile from './ManageApplicantProfile'
import ApplicantList from './ApplicantList'

const Applicant = () => (
  <div>
    <ManageApplicantProfile />
    <ApplicantList />
  </div>
)

// export default Applicant;

const mapStateToProps = (state /* , ownProps */) => ({
  applicants: getApplicantList(state),
})

// const mapDispatchToProps = { addApplicant, updateApplicant, deleteApplicant };

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Applicant)
