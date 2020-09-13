import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { useForm, Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import _ from 'lodash'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'

import { addApplicant, chooseApplicant, updateApplicant } from 'redux/actions'
import { getCurrentApplicantId, getApplicantById } from 'redux/selectors'

import phoneCode from 'assets/json/country/phone.json'

const RequireField = () => <RequireFieldContainer>*</RequireFieldContainer>

const CitizenIdInput = ({ onChange, value, ...rest }) => {
  console.debug('rest ::', rest)
  const [citizenValue, setCitizenValue] = React.useState('')
  return (
    <>
      <input
        name="citizenIdFirst"
        onChange={(newValue) => {
          setCitizenValue(newValue)
          onChange(citizenValue)
        }}
      />
      {/* <input name="citizenIdSecond" ref={register} onChange={} /> */}
      {/* <input name="citizenIdThird" ref={register} onChange={} />
      <input name="citizenIdFouth" ref={register} onChange={} />
      <input name="citizenIdFifht" ref={register} onChange={} /> */}
    </>
    // <NumberFormat
    //   {...rest}
    //   value={currency}
    //   thousandSeparator={true}
    //   decimalScale={2}
    //   onValueChange={(target) => {
    //     setCurrency(target.floatValue);
    //     onChange(target.floatValue * 100);
    //   }}
    //   isNumericString
    //   prefix="$ "
    // />
  )
}

const ManageApplicantProfile = (props) => {
  console.debug('ManageApplicantProfile props ::', props)
  const { id = 0 } = props
  const { register, handleSubmit, reset, errors, setValue, control } = useForm({
    reValidateMode: 'onChange',
  })
  useEffect(() => {
    resetField()
    // return () => {
    //   cleanup
    // }
  }, [])
  console.debug('errors ::', errors)

  const resetField = () => {
    reset()
    props.chooseApplicant(0)
  }
  const onSubmit = (data) => {
    console.debug('onSubmit :', id, data)
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
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {/* <input type="hidden" name="id" value={id} /> */}
        <label htmlFor="title">
          Title:
          <RequireField />{' '}
        </label>
        <select
          name="title"
          ref={register({ required: true })}
          errors={!!errors.title}
          // className={`${checkValidate(errors.title)}`}
        >
          <option value="">-- Please select --</option>
          <option value="mr">MR</option>
          <option value="mrs">Mrs.</option>
          <option value="other">Miss</option>
        </select>
        <label htmlFor="firstName">
          First name:
          <RequireField />{' '}
        </label>
        <input
          name="firstName"
          ref={register({ required: true })}
          errors={!!errors.firstName}
          // className={`${checkValidate(errors.firstName)}`}
        />
        <label htmlFor="lastName">
          Last name:
          <RequireField />{' '}
        </label>
        <input
          name="lastName"
          ref={register({ required: true })}
          className={`${checkValidate(errors.lastName)}`}
        />
      </div>
      <div>
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

        <label htmlFor="nationality">Nationality: </label>
        <select name="nationality" ref={register}>
          <option value="">-- Please select --</option>
          <option value="thai">thai</option>
          <option value="other">other</option>
        </select>
      </div>
      <div>
        <label htmlFor="citizenId">Citizen ID: </label>
        {/* <Controller
          name="citizenId"
          control={control}
          as={CitizenIdInput}
          rules={{ required: true }}
        /> */}
        {/* <input name="citizenId" ref={register} /> */}
      </div>
      <div>
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
      </div>
      <div>
        <label htmlFor="mobilePhone">
          Mobile Phone:
          <RequireField />{' '}
        </label>

        <select
          name="mobileCountryCode"
          ref={register}
          className={`${checkValidate(errors.mobileCountryCode)}`}
        >
          <option value="">-- Please select --</option>
          {_.map(phoneCode, (phoneNumber, countryCode) => (
            <option value={phoneNumber}>
              {`${getUnicodeFlagIcon(countryCode)} +${phoneNumber}`}
            </option>
          ))}
        </select>
        <input
          type="tel"
          name="mobilePhone"
          ref={register({ required: true })}
          className={`${checkValidate(errors.mobilePhone)}`}
        />
      </div>
      <div>
        <label htmlFor="passport">Passport NO: </label>
        <input name="passport" ref={register} />
      </div>
      <Row>
        <Column>
          <label htmlFor="salary">
            Expected Salary:
            <RequireField />{' '}
          </label>
          <input
            name="salary"
            type="number"
            ref={register({
              required: true,
              validate: (value) => value > 0,
            })}
            className={`${checkValidate(errors.salary)}`}
          />{' '}
          THB
        </Column>
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

  ${(props) => {
    if (props.right) {
      return `
      justify-content: flex-end;
      `
    }
  }}
`
