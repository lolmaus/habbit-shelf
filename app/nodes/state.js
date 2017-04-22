// ----- Ember modules -----
import computed from 'ember-macro-helpers/computed'

// ----- Own modules -----
import Node from 'ember-shelf/node'



export default Node.extend({
  session : computed(function () {
    return this.get('shelf').createNode('session', {parent : this})
  })
})
