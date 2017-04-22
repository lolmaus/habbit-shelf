// ----- Ember modules -----
import service from 'ember-service/inject'

// ----- Ember addons -----
import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii'
import fetch              from 'ember-network/fetch'

// ----- Third-party modules -----
import RSVP from 'rsvp'

// ----- Own modules -----
import {fetchGithubAuthJson} from 'habbit-shelf/utils/fetch-github'



export default ToriiAuthenticator.extend({

  // ----- Services -----
  config : service(),
  shelf  : service(),
  torii  : service(),



  // ----- Overridden methods -----
  authenticate (provider, options) {
    this._assertToriiIsPresent()

    const gatekeeperUrl = this.get('config.gatekeeperUrl')
    const shelf         = this.get('shelf')

    shelf.dispatch('state.session', 'startAuthentication')

    return this
      .get('torii')

      .open(provider, options || {})

      .then(response => {
        const url = `${gatekeeperUrl}/authenticate/${response.authorizationCode}`
        return fetch(url).then(result => result.json())
      })

      .then(data => {
        return data.error
          ? RSVP.reject(data)
          : data
      })

      .then(data => this._fetchUser(data))

      .then(data => {
        this._authenticateWithProvider(provider, data)
        shelf.dispatch('state.session', 'authenticate', data)
        return data
      })

      .catch(data => this._reportErrorAndInvalidate(data))
  },



  invalidate (...args) {
    return this
      ._super(...args)

      .then(data => {
        this.get('shelf').dispatch('state.session', 'invalidate')
        return data
      })
  },



  restore (...args) {
    return this
      ._super(...args)

      .then(data => this._fetchUser(data))

      .then(data => {
        this.get('shelf').dispatch('state.session', 'authenticate', data)
        return data
      })

      .catch(() => {
        this.get('shelf').dispatch('state.session', 'invalidate')
        return RSVP.reject()
      })
  },



  // ----- Custom methods -----
  _fetchUser (data) {
    return fetchGithubAuthJson('user', data.token)
        .then(user => ({
          ...data,
          user
        }))
  },

  _reportErrorAndInvalidate (data) {
    console.error('GitHub authentication failed:', data)
    this.get('shelf').dispatch('state.session', 'invalidate', data)
  }
})
