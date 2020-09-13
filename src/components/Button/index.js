import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Button = (props) => (
  <Styled type="button" {...props}>
    {props.children}
  </Styled>
)

export default Button

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

const Styled = styled.button`
  ${(props) =>
    props.marginLeft &&
    `
  margin-left: 10px;
`}
  ${(props) =>
    props.marginRight &&
    `
  margin-right: 10px;
`}
`
