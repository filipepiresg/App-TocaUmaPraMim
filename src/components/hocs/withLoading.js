import React from 'react';
import { LoadingContext } from '../contexts'

export default WrappedComponent => {
    const withLoading = (props) => {
        return(
            <LoadingContext.Consumer>
              {
                ({ loading, hideLoading, showLoading }) => (
                  <WrappedComponent
                    loading = {loading}
                    hideLoading = {hideLoading}
                    showLoading = {showLoading}
                    {...props}
                  />
                )
              }
            </LoadingContext.Consumer>
        );
    }
    return withLoading;
}