import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import _ from 'lodash'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'

import { addApplicant, chooseApplicant, updateApplicant } from 'redux/actions'
import { getCurrentApplicantId, getApplicantById } from 'redux/selectors'
import phoneCode from 'assets/json/country/phone.json'
import { validThaiID, validateMobilePhone } from 'utils/validator'

const RequireField = () => <RequireFieldContainer>*</RequireFieldContainer>

const handleAllowNumberOnly = (e) => {
  const isNumber = /[0-9]/.test(String.fromCharCode(e.which))
  if (!isNumber) {
    e.preventDefault()
  }
  return null
}
const handleAllowStringOnly = (e) => {
  const pattern = new RegExp('^[ก-์|A-z]+$')
  const isString = pattern.test(String.fromCharCode(e.which))
  if (!isString) {
    e.preventDefault()
  }
  return null
}

const ManageApplicantProfile = (props) => {
  const { id = 0 } = props
  const { register, handleSubmit, reset, errors, setValue } = useForm({
    reValidateMode: 'onChange',
  })
  useEffect(() => {
    resetField()
  }, [])

  const resetField = () => {
    reset()
    props.chooseApplicant(0)
  }
  const onSubmit = (data) => {
    if (id === 0) {
      props.addApplicant(data)
    } else {
      props.updateApplicant(id, data)
    }
    resetField()
  }

  useEffect(() => {
    _.forEach(props.data, (value, key) => {
      setValue(key, value)
    })
  }, [id, props.data, setValue])

  const checkValidate = (field) => (field ? `validate-error` : ``)

  const renderInputTitle = () => (
    <>
      <label htmlFor="title">
        Title:
        <RequireField />{' '}
      </label>
      <select
        name="title"
        ref={register({ required: true })}
        className={`${checkValidate(errors.title)}`}
      >
        <option value="">-- Please select --</option>
        <option value="mr">MR</option>
        <option value="mrs">Mrs.</option>
        <option value="other">Miss</option>
      </select>
    </>
  )
  const renderInputFirstName = () => (
    <>
      <label htmlFor="firstName">
        First name:
        <RequireField />{' '}
      </label>
      <input
        name="firstName"
        ref={register({ required: true })}
        onKeyPress={handleAllowStringOnly}
        className={`${checkValidate(errors.firstName)}`}
      />
    </>
  )

  const renderInputLastName = () => (
    <>
      <label htmlFor="lastName">
        Last name:
        <RequireField />{' '}
      </label>
      <input
        name="lastName"
        ref={register({ required: true })}
        onKeyPress={handleAllowStringOnly}
        className={`${checkValidate(errors.lastName)}`}
      />
    </>
  )
  const renderInputBirthday = () => (
    <>
      <label htmlFor="birthday">
        Birthday:
        <RequireField />{' '}
      </label>
      <input
        type="date"
        id="birthday"
        name="birthday"
        defaultValue=""
        ref={register({ required: true })}
        className={`${checkValidate(errors.birthday)}`}
      />
    </>
  )
  const renderInputNatinality = () => (
    <>
      <label htmlFor="nationality">Nationality: </label>
      <select name="nationality" ref={register}>
        <option value="">-- Please select --</option>
        <option value="thai">Thai</option>
        <option value="other">Other</option>
      </select>
    </>
  )
  const renderInputCitizenId = () => (
    <>
      <label htmlFor="citizenId">Citizen ID: </label>
      <input
        name="citizenId"
        ref={register({
          validate: (value) => !value || validThaiID(value),
        })}
        className={`${checkValidate(errors.citizenId)}`}
        onKeyPress={handleAllowNumberOnly}
      />
    </>
  )
  const renderInputGender = () => (
    <>
      <label htmlFor="gender">Gender: </label>
      <input
        type="radio"
        id="male"
        name="gender"
        defaultValue="male"
        ref={register}
      />
      <label htmlFor="male">Male</label>
      <input
        type="radio"
        id="female"
        name="gender"
        defaultValue="female"
        ref={register}
      />
      <label htmlFor="female">Female</label>
      <input
        type="radio"
        id="unisex"
        name="gender"
        defaultValue="unisex"
        ref={register}
      />
      <label htmlFor="unisex">Unisex</label>
    </>
  )
  const renderInputMobilePhone = () => (
    <>
      <label htmlFor="mobilePhone">
        Mobile Phone:
        <RequireField />{' '}
      </label>
      <select
        name="mobileCountryCode"
        ref={register({ required: true })}
        className={`${checkValidate(errors.mobileCountryCode)}`}
      >
        <option value="">-- Please select --</option>
        {_.map(phoneCode, (phoneNumber, countryCode) => (
          <option key={`mcc-${countryCode}`} value={phoneNumber}>
            {`${getUnicodeFlagIcon(countryCode)} +${phoneNumber}`}
          </option>
        ))}
      </select>
      -
      <input
        type="tel"
        name="mobilePhone"
        ref={register({
          required: true,
          validate: (value) => validateMobilePhone(value),
        })}
        className={`${checkValidate(errors.mobilePhone)}`}
      />
    </>
  )
  const renderInputPassport = () => (
    <>
      <label htmlFor="passport">Passport NO: </label>
      <input name="passport" ref={register} />
    </>
  )

  const renderInputSalary = () => (
    <>
      <label htmlFor="salary">
        Expected Salary:
        <RequireField />{' '}
      </label>
      <input
        name="salary"
        onKeyPress={handleAllowNumberOnly}
        ref={register({
          required: true,
          validate: (value) => value > 0,
        })}
        className={`${checkValidate(errors.salary)}`}
      />{' '}
      THB
    </>
  )

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {renderInputTitle()}
        {renderInputFirstName()}
        {renderInputLastName()}
      </div>
      <div>
        {renderInputBirthday()}
        {renderInputNatinality()}
      </div>
      <div>{renderInputCitizenId()}</div>
      <div>{renderInputGender()}</div>
      <div>{renderInputMobilePhone()}</div>
      <div>{renderInputPassport()}</div>
      <Row>
        <Column>{renderInputSalary()}</Column>
        <Column right>
          <input type="submit" defaultValue="submit" />
        </Column>
      </Row>
    </Form>
  )
}

const mapStateToProps = (state /* , ownProps */) => {
  const id = getCurrentApplicantId(state)
  return {
    id,
    data: getApplicantById(state, id),
  }
}

const mapDispatchToProps = {
  addApplicant,
  chooseApplicant,
  updateApplicant,
  // deleteApplicant,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageApplicantProfile)

ManageApplicantProfile.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  data: PropTypes.shape({}),
  addApplicant: PropTypes.func,
  chooseApplicant: PropTypes.func,
  updateApplicant: PropTypes.func,
}

const Form = styled.form`
  border: 2px solid black;
  margin: 15px;
  padding: 15px;
  .validate-error {
    border: 2px solid red;
  }
`

const RequireFieldContainer = styled.span`
  color: red;
`

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Column = styled.div`
  display: flex;
  flex: 1 0 50%;
  max-width: 50%;

  ${(props) =>
    props.right &&
    `
    justify-content: flex-end;
  `}
`
