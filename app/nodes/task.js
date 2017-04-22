import Node from 'ember-shelf/node'



export default Node.extend({
  name : 'task',

  actions : {
    setFoo (newFoo) {
      console.log('setFoo', newFoo)
    }
  }
})
