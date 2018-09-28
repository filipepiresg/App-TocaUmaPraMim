import React  from 'react';

export default LoadingContext = React.createContext({
    loading: false,
    showLoading: () => {},
    hideLoading: () => {}
  });
  

