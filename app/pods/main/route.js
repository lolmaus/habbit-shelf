// ----- Ember modules -----
import Route from 'ember-route'

// ----- Ember addons -----
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'



export default Route.extend(AuthenticatedRouteMixin, {
})
