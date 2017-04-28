// ----- Ember modules -----
import Route from 'ember-route'
import service from 'ember-service/inject'

// ----- Ember addons -----
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'



export default Route.extend(AuthenticatedRouteMixin, {

  // ----- Services -----
  github : service(),

  // ----- Overridden properties -----
  model () {
    const github = this.get('github')
    const gistId = github.readGistIdFromLS()
    const gist  = this.get('shelf.state.github.gist')

    if (gistId && !gist) return github.loadGist(gistId)

    return null
  },
})
