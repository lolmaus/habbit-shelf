// ----- Ember modules -----
// import computed from 'ember-macro-helpers/computed'

// ----- Own modules -----
import {Node, createNodeCP} from 'ember-shelf'



export default Node.extend({
  attrNames : [
    'github',
    'routes',
    'session',
  ],

  github  : createNodeCP('github'),
  routes  : createNodeCP('routes'),
  session : createNodeCP('session'),
})
