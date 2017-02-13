// @flow

import React from 'react'
import { ScrollView, Text, Image, View, Animated } from 'react-native'
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
    const scrollY = new Animated.Value(0)
    const scrollToBgColor = scrollY.interpolate({
      inputRange: [0, 650],
      outputRange: ['rgb(229, 214, 48)', 'rgb(153, 47, 21)'],
      extrapolate: 'clamp'
    })
    const scrollToProgress = scrollY.interpolate({
      inputRange: [0, 650],
      outputRange: [0, 0.1],
      extrapolate: 'clamp'
    })

    this.state = {
      scrollY,
      scrollToBgColor,
      scrollToProgress,
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
    const { scrollY, scrollToBgColor, scrollToProgress } = this.state

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
          <Text style={styles.sectionText}>{I18n.t('welcome')} {user.email}</Text>
          <Text style={styles.sectionText}>Indicate how much you trust Pablo</Text>
        </View>
        <ScrollView
          scrollEventThrottle={5}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}]
          )}
        >
          <Text style={styles.scrollViewText}>With my life</Text>
          <Text style={styles.scrollViewText}>2</Text>
          <Text style={styles.scrollViewText}>3</Text>
          <Text style={styles.scrollViewText}>4</Text>
          <Text style={styles.scrollViewText}>5</Text>
          <Text style={styles.scrollViewText}>6</Text>
          <Text style={styles.scrollViewText}>7</Text>
          <Text style={styles.scrollViewText}>8</Text>
          <Text style={styles.scrollViewText}>9</Text>
          <Text style={styles.scrollViewText}>As far as I can throw him</Text>
          <Text style={styles.scrollViewText}>11</Text>
          <Text style={styles.scrollViewText}>12</Text>
          <Text style={styles.scrollViewText}>13</Text>
          <Text style={styles.scrollViewText}>14</Text>
          <Text style={styles.scrollViewText}>15</Text>
          <Text style={styles.scrollViewText}>16</Text>
          <Text style={styles.scrollViewText}>17</Text>
          <Text style={styles.scrollViewText}>18</Text>
          <Text style={styles.scrollViewText}>19</Text>
          <Text style={styles.scrollViewText}>Are you kidding me? Not for a dime!</Text>
        </ScrollView>
      </View>
    )
  }

  render () {
    const { loggedIn } = this.props

    return (
      <View style={styles.mainContainer}>
        {this.props.loggedIn ? this.renderGame() : this.renderLoginIntro()}
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
