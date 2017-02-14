// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'darkred',
  },
  container: {
    flex: 1,
    paddingTop: 64,
  },
})
