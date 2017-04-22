// ----- Ember modules -----
import computed from 'ember-macro-helpers/computed'
import on from 'ember-evented/on'
import {next} from 'ember-runloop'

// ----- Ember addon -----
import ShelfService from 'ember-shelf/service'

// ----- Own modules -----



export default ShelfService.extend({

  // ----- Custom properties -----
  state : computed(function () {
    return this.createNode('state')
  }),



  // ----- Events and observers -----
  logInitial : on('init', function () {
    next(this, this.logStateChangeOnNode, '@@INIT', 'state')
  })
})
