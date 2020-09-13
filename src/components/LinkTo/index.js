import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const LinkTo = (props) => (
  <LinkBtn type="button" {...props}>
    {props.children}
  </LinkBtn>
)

export default LinkTo

LinkTo.propTypes = {
  children: PropTypes.element.isRequired,
}

const LinkBtn = styled.button`
  border: 1px solid transparent;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  &:hover {
    color: skyblue;
  }
  transition: all 0.2s ease;
  ${(props) =>
    props.isActive &&
    `
    color: skyblue;
  `}
  ${(props) =>
    props.disabled &&
    `
    cursor: not-allowed;
    color: grey;
  `}
  ${(props) =>
    props.underline &&
    `
    text-decoration: underline;
  `}
`
