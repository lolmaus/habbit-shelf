// ----- Ember modules -----
// import computed from 'ember-macro-helpers/computed'

// ----- Own modules -----
import {Node, createNodeCP} from 'ember-shelf'



export default Node.extend({
  attrNames : [
    'gist',
  ],

  lists_index : createNodeCP('lists/index'),
  lists_list  : createNodeCP('lists/list'),
})
