// @flow

import React from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images } from '../Themes'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'
import LoginActions, { isLoggedIn } from '../Redux/LoginRedux'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/PresentationScreenStyle'

class PresentationScreen extends React.Component {
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
    return (
      <View style={styles.container}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <View style={styles.centered}>
          <Text style={styles.sectionText}>{I18n.t('welcome')} {user.email}</Text>
        </View>
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
