import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag'

const JOBS_QUERY = gql`
  query {
    hello
  }
`

export default () => {
  const {loading, error, data} = useQuery(JOBS_QUERY)

  if (loading) return <div>loading...</div>
  return (
    <div>
      hahaddd
      { data.hello }
      <button />
    </div>
  )
}