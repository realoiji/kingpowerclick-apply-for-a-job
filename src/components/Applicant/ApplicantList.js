import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { chooseApplicant, deleteApplicant } from 'redux/actions'
import { getApplicantList, getApplicantObjList } from 'redux/selectors'

const LinkTo = (props) => (
  <LinkBtn type="button" {...props}>
    {props.children}
  </LinkBtn>
)
const Button = (props) => (
  <StyledBtn type="button" {...props}>
    {props.children}
  </StyledBtn>
)

const ApplicantList = (props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(2)
  const [selectedApplicantIds, setSelectedApplicantIds] = useState([])
  const { allIds, applicants } = props
  const pageTotal = Math.ceil(allIds.length / postPerPage)
  const splitPage = _.chunk(allIds, postPerPage)
  console.debug('allIds ::', allIds)
  console.debug('pageTotal ::', pageTotal)
  console.debug('splitPage ::', splitPage)
  const postsCurrentPage = _.get(splitPage, currentPage - 1, [])

  // reset pagination after delete post
  useEffect(() => {
    if (currentPage > pageTotal) {
      setCurrentPage(1)
    }
  }, [allIds])
  // clear selected post when allIds or currentPage has changed.
  useEffect(() => {
    setSelectedApplicantIds([])
  }, [currentPage, allIds])

  const handleEdit = (id) => {
    props.chooseApplicant(id)
  }

  const handleDelete = (id) => {
    props.deleteApplicant(id)
  }

  const handleSelectItem = (id, status) => {
    if (status) {
      const findIndex = selectedApplicantIds.indexOf(id)
      if (findIndex === -1) {
        setSelectedApplicantIds([...selectedApplicantIds, id])
      }
    } else {
      const newData = [...selectedApplicantIds]
      const index = newData.indexOf(id)
      if (index > -1) {
        newData.splice(index, 1)
      }
      setSelectedApplicantIds(newData)
    }
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedApplicantIds(postsCurrentPage)
    } else {
      setSelectedApplicantIds([])
    }
  }

  const handleDeleteAll = () => {
    console.debug('handleDeleteAll ::', selectedApplicantIds)
    _.forEach(selectedApplicantIds, (value) => {
      handleDelete(value)
    })
  }

  const renderPagination = () => {
    console.debug('pageTotal ::', pageTotal)
    const goToPrev = () => {
      if (currentPage > 1) {
        const prevPage = currentPage - 1
        setCurrentPage(prevPage)
      }
    }
    const goToNext = () => {
      if (currentPage < pageTotal) {
        const nextPage = currentPage + 1
        setCurrentPage(nextPage)
      }
    }
    const goToPage = (page) => {
      setCurrentPage(page)
    }
    return (
      <div>
        <LinkTo onClick={goToPrev} disabled={currentPage === 1} underline>
          Prev
        </LinkTo>
        {_.map(_.range(1, pageTotal + 1), (pageNumber) => {
          const isActive = pageNumber === currentPage
          return (
            <LinkTo
              key={`pagi-${pageNumber}`}
              onClick={() => goToPage(pageNumber)}
              isActive={isActive}
              underline
            >
              {pageNumber}
            </LinkTo>
          )
        })}
        <LinkTo
          onClick={goToNext}
          disabled={currentPage >= pageTotal}
          underline
        >
          Next
        </LinkTo>
      </div>
    )
  }
  const renderSectionPost = () => {
    console.debug('renderSectionPost ::', postsCurrentPage)
    const loopPosts = postsCurrentPage.map((id) => {
      const data = applicants[id] || {}
      const { firstName, lastName, gender, mobilePhone, nationality } = data
      return (
        <TableRow key={`applicant-${id}`}>
          <CheckBoxColumn>
            <input
              type="checkbox"
              checked={selectedApplicantIds.indexOf(id) > -1}
              onChange={(e) => handleSelectItem(id, e.target.checked)}
            />
          </CheckBoxColumn>
          <NameColumn>{`${id} ${firstName} ${lastName}`}</NameColumn>
          <GenderColumn>{gender}</GenderColumn>
          <MobilePhoneColumn>{mobilePhone}</MobilePhoneColumn>
          <NationColumn>{nationality}</NationColumn>
          <ActionColumn>
            <LinkTo onClick={() => handleEdit(id)}>EDIT</LinkTo>/
            <LinkTo onClick={() => handleDelete(id)}>DELETE</LinkTo>
          </ActionColumn>
        </TableRow>
      )
    })
    return loopPosts
  }
  const isCheckAll = selectedApplicantIds.length === postsCurrentPage.length
  return (
    <Styled>
      <Column>
        <input
          type="checkbox"
          checked={isCheckAll}
          onChange={handleSelectAll}
          id="selectAll"
        />
        <label htmlFor="selectAll">Select All</label>
        <Button marginLeft onClick={handleDeleteAll}>
          DELETE
        </Button>
      </Column>
      <Column right>{renderPagination()}</Column>
      <DataListContainer>
        <TableRow head>
          <CheckBoxColumn></CheckBoxColumn>
          <NameColumn>NAME</NameColumn>
          <GenderColumn>GENDER</GenderColumn>
          <MobilePhoneColumn>MOBILE PHONE</MobilePhoneColumn>
          <NationColumn>NATIONALITY</NationColumn>
          <ActionColumn></ActionColumn>
        </TableRow>
        {renderSectionPost()}
      </DataListContainer>
    </Styled>
  )
}

const mapStateToProps = (state /* , ownProps */) => ({
  allIds: getApplicantList(state),
  applicants: getApplicantObjList(state),
})

const mapDispatchToProps = { chooseApplicant, deleteApplicant }

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantList)

ApplicantList.propTypes = {
  allIds: PropTypes.array,
  applicants: PropTypes.shape({}),
  chooseApplicant: PropTypes.func,
  deleteApplicant: PropTypes.func,
}

const Styled = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 15px;
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

const DataListContainer = styled.div`
  margin-top: 10px;
  width: 100%;
  max-width: 100%;
`

const TableRow = styled.div`
  display: flex;
  padding: 10px;
  ${(props) =>
    props.head &&
    `
  background-color: skyblue;
  color: black;
  `}
`
const CheckBoxColumn = styled.div`
  flex: 0 0 30px;
  text-align: center;
`
const NameColumn = styled.div`
  flex: 1 1 20%;
`
const GenderColumn = styled.div`
  flex: 0 1 80px;
  text-align: center;
`
const MobilePhoneColumn = styled.div`
  flex: 0 1 160px;
  text-align: center;
`
const NationColumn = styled.div`
  flex: 0 1 120px;
  text-align: center;
`
const ActionColumn = styled.div`
  flex: 0 1 120px;
  text-align: center;
`

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

const StyledBtn = styled.button`
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
