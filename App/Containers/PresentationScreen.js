// @flow

import React from 'react'
import { ScrollView, Text, Image, View, Animated, Slider } from 'react-native'
import Animation from 'lottie-react-native';
import { Images } from '../Themes'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'
import LoginActions, { isLoggedIn } from '../Redux/LoginRedux'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/PresentationScreenStyle'

class PresentationScreen extends React.Component {
  constructor(props) {
    super(props);
    const sliderVal = new Animated.Value(0)
    const scrollToBgColor = sliderVal.interpolate({
      inputRange: [0, 500],
      outputRange: ['rgb(229, 214, 48)', 'rgb(153, 47, 21)'],
      extrapolate: 'clamp'
    })
    const scrollToProgress = sliderVal.interpolate({
      inputRange: [0, 500],
      outputRange: [0, 0.1],
      extrapolate: 'clamp'
    })

    this.state = {
      scrollToBgColor,
      scrollToProgress,
      sliderVal,
    };
  }

  componentWillReceiveProps (nextProps) {
    const { loggedIn } = nextProps
  }

  renderLoginIntro () {
    return (
      <View style={styles.container}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.spyLogo} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Text style={styles.sectionText} >{I18n.t('intro')}</Text>
          </View>

          <RoundedButton onPress={NavigationActions.login}>
            {I18n.t('signIn')}
          </RoundedButton>

          <View style={styles.centered}>
            <Text style={styles.subtitle}>{I18n.t('subtitle')}</Text>
          </View>

        </ScrollView>
      </View>
    )
  }

  renderGame () {
    const { user } = this.props
    const { scrollToBgColor, scrollToProgress, sliderVal } = this.state

    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.backgroundImage, {backgroundColor: scrollToBgColor}]}
          resizeMode='stretch'
        >
          <Animation
            style={{
              alignSelf: 'stretch',
              height: 610,
            }}
            source={require('../Animations/lottie.json')}
            progress={scrollToProgress}
          />
        </Animated.View>
        <View style={styles.centered}>
          <Text style={styles.sectionText}>{I18n.t('welcome')}</Text>
          <Text style={styles.sectionText}>Indicate how much you trust Pablo</Text>
          <RoundedButton
            onPress={() => {
              Animated.timing(
                sliderVal,
                {toValue: 500}
              ).start()
            }}          >
            I never trust Pablo!
          </RoundedButton>
        </View>
        <Slider
        style={{transform: [{translateY: 200}, {rotate:'90deg'}]}}
          maximumValue={500}
          step={1}
          onValueChange={Animated.event(
            [sliderVal],
            {listener: (e) => console.log("New Value", e)}
          )}
        />
      </View>
    )
  }

  render () {
    const { loggedIn } = this.props

    return (
      <View style={styles.mainContainer}>
        {!this.props.loggedIn ? this.renderGame() : this.renderLoginIntro()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: isLoggedIn(state.login),
    user: state.login.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(LoginActions.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationScreen)
