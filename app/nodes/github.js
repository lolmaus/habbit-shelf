// ----- Ember modules -----
// import computed from 'ember-macro-helpers/computed'
import {getProperties} from 'ember-metal/get'

// ----- Own modules -----
import Node from 'ember-shelf/node'

// ----- Third-party modules -----



export default Node.extend({
  // ----- Attributes -----
  attrNames : [
    'gist',
    'lists',
  ],

  gist  : null,
  lists : null,



  // ----- Private properties -----
  _fileTypeRegex : /^([\w-]+)-[\w-]+\.[\w-]+$/,



  // ----- Methods -----
  _groupFiles (files) {
    return _.groupBy(files, file => this._typeForFile(file))
  },

  _typeForFile ({name}) {
    const match = name.match(this._fileTypeRegex)
    return match ? match[1] : 'other'
  },

  // ----- Relationships -----
  actions : {
    writeGist (response) {
      this.createAndSetChildNode('gist', 'github/gist', response)
      const lists = this.createAndSetChildNode('lists', 'github/lists')

      const groupedFiles = this._groupFiles(response.files)

      if (groupedFiles.list && groupedFiles.list.length) {
        lists.createAndSetChildNodes('github/lists/list', groupedFiles.list)
      }
    }
  }
})
