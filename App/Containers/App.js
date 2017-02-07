// @flow

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import '../I18n/I18n' // keep before root container
import RootContainer from './RootContainer'
import createStore from '../Redux'
import applyConfigSettings from '../Config'
import firebase from 'firebase'

// Apply config overrides
applyConfigSettings()
// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyA0IANOxInvmujcTeJyaYZziWVG1cUURHo',
      authDomain: 'resistance-601e9.firebaseapp.com',
      databaseURL: 'https://resistance-601e9.firebaseio.com',
      storageBucket: 'resistance-601e9.appspot.com',
      messagingSenderId: '498233811095'
    }

    firebase.initializeApp(config)
  }

  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

export default App
