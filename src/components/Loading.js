import React from 'react'
import { Modal } from 'react-native'
import { Spinner } from 'native-base'
import withLoading from './hocs/withLoading'

const Loading = ({ isLoading }) => {
  if (isLoading) return null

  return (
    <Modal transparent={true}>
      <Spinner
        color="white"
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.8)',
        }}
      />
    </Modal>
  )
}

export default withLoading(Loading)
