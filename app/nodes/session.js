// ----- Ember modules -----
// import computed from 'ember-macro-helpers/computed'

// ----- Own modules -----
import Node from 'ember-shelf/node'



export default Node.extend({
  isAuthenticated  : false,
  isAuthenticating : false,

  actions : {
    startAuthentication () {
      this.setProperties({
        isAuthenticated  : false,
        isAuthenticating : true,
        data             : null,
      })
    },

    authenticate (data) {
      this.setProperties({
        isAuthenticated  : true,
        isAuthenticating : false,
        data
      })
    },

    invalidate () {
      this.setProperties({
        isAuthenticated  : false,
        isAuthenticating : false,
        data             : null
      })
    },
  }
})
