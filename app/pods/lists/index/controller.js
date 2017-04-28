// ----- Ember modules -----
import Controller from 'ember-controller'
import {reads} from 'ember-computed'
import service from 'ember-service/inject'



export default Controller.extend({

  // ----- Services -----
  github : service(),



  // ----- Computed properties -----
  state : reads('shelf.state.routes.lists_index'),




  // ----- Actions -----
  actions : {
    createGist () {
      const state = this.get('state')

      state.dispatch('startedCreatingGist')

      this
        .get('github')
        .createGist({files : {'foo.txt' : {content : 'lol!'}}})
        .catch(result => {
          console.log('catch', result)
        })
        .finally(() => {
          state.dispatch('finishedCreatingGist')
        })
    },

    createList () {
      const state  = this.get('state')
      const slug   = state.get('userInputListSlug')

      state.dispatch('startedCreatingList')

      this
        .get('github')
        .createList(slug)
        .catch(result => {
          console.log('catch', result)
        })
        .finally(() => {
          state.dispatch('finishedCreatingList')
        })
    },
  }
})
