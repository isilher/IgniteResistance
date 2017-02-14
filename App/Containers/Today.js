// @flow

import React from 'react'
import { Text, View, PanResponder, Animated } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/TodayStyle'

// I18n
import I18n from 'react-native-i18n'

class Today extends React.Component {
  constructor(props) {
    super(props);

    const pan = new Animated.ValueXY()

    const panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        console.log('panresponder granted')
        pan.setOffset({x: pan.x._value, y: pan.y._value})
        pan.setValue({x: 0, y: 0})
      },

      onPanResponderMove: Animated.event([
        null, {dx: pan.x, dy: pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        console.log('panresponder released')
        pan.flattenOffset()
      }
    })

    this.state = {
      pan,
      panResponder,
    }
  }

  render() {
    let { pan, panResponder } = this.state
    let [translateX, translateY] = [pan.x, pan.y]

    let panStyle = {transform: [{translateX}, {translateY}]}

    return (
      <View style={styles.container}>
        <Animated.View
          {...panResponder.panHandlers}
          style={panStyle}
        >
          <View style={styles.circle} />
        </Animated.View>
      </View>
    );
  }

}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Today)
