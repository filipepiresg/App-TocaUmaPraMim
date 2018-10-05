import React, { Component } from 'react'

const LoadingContext = React.createContext({
  isLoading: false,
  showLoading: () => {},
  hideLoading: () => {},
})

export const LoadingConsumer = LoadingContext.Consumer

export class LoadingProvider extends Component {
  showLoading = () => {
    this.setState({
      isLoading: true,
    })
  }

  hideLoading = () =>
    this.setState({
      isLoading: false,
    })

  state = {
    isLoading: false,
    showLoading: this.showLoading,
    hideLoading: this.hideLoading,
  }

  render() {
    return (
      <LoadingContext.Provider value={this.state}>
        {this.props.children}
      </LoadingContext.Provider>
    )
  }
}
