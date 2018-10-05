import React from 'react'
import { LoadingConsumer } from '../contexts/LoadingContext'

export default WrappedComponent => {
  const withLoading = props => {
    return (
      <LoadingConsumer>
        {({ isLoading, hideLoading, showLoading }) => (
          <WrappedComponent
            isLoading={isLoading}
            hideLoading={hideLoading}
            showLoading={showLoading}
            {...props}
          />
        )}
      </LoadingConsumer>
    )
  }
  return withLoading
}
