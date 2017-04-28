// ----- Ember modules -----
import Service from 'ember-service'
import service from 'ember-service/inject'
import {reads} from 'ember-computed'

// ----- Ember addons -----
import computed from 'ember-macro-helpers/computed'

// ----- Third-party modules -----
import RSVP from 'rsvp'

// ----- Own modules -----
import {
  fetchGithubAuthJson,
  fetchGithubAuthText,
} from 'habbit-shelf/utils/fetch-github'



export default Service.extend({

  // ----- Services -----
  shelf : service(),



  // ----- Configurable properties -----


  // ----- Computed properties -----
  token    : reads('shelf.state.session.token'),
  username : reads('shelf.state.session.user.login'),



  // ----- Private properties -----
  gistIdLSKey : 'habbit-zen:gist-id',


  // ----- Public Methods -----
  fetchJson (url, params) {
    const token = this.get('token')
    return fetchGithubAuthJson(url, token, params)
  },

  fetchText (url, params) {
    const token = this.get('token')
    return fetchGithubAuthText(url, token, params)
  },

  postJson (url, body, params = {}) {
    params = {
      ...params,
      body,
      method : 'post',

      headers : {
        'Content-Type' : 'application/json',
      },
    }

    return this.fetchJson(url, params)
  },

  readGistIdFromLS () {
    const lsKey = this.get('gistIdLSKey')
    return window.localStorage.getItem(lsKey)
  },

  createGist (data) {
    const url = "gists"
    return this
      .postJson(url, data)
      .then(response => this._processGist(response))
  },

  loadGist (gistId) {
    const url = `gists/${gistId}`
    return this
      .fetchJson(url)
      .then(response => this._processGist(response))
  },

  createList (slug) {
    const gistId   = this.readGistIdFromLS()
    const url      = `gists/${gistId}`
    const fileName = `list-${slug}.txt`

    const data = {
      files : {
        [fileName] : {content : 'asdf'}
      }
    }

    return this
      .postJson(url, data)
      .then(response => this._processGist(response))
  },



  // ----- Private methods -----
  _buildSearchQuery (obj) {
    const params = {...obj, per_page : 100}

    return Object
      .keys(params)
      .map(key => `${key}:${params[key]}`)
      .join('+')
  },

  _writeGistIdToLS (gistId) {
    const lsKey = this.get('gistIdLSKey')
    return window.localStorage.setItem(lsKey, gistId)
  },

  _processGist (response) {
    return RSVP
      .hash({
        ...response,
        files : this._processFiles(response.files)
      })
      .then(gist => {
        this._writeGistIdToLS(gist.id)
        this.get('shelf.state.github').dispatch('writeGist', gist)
      })
  },

  _processFiles (files) {
    const filesAndPromises =
      Object
        .keys(files)
        .map(name => ({...files[name], name}))
        .map(file => file.truncated ? this._fetchTruncatedFile(file) : file)

    return RSVP.all(filesAndPromises)
  },

  _fetchTruncatedFile (file) {
    return this
      .fetchText(file.raw_url)
      .then(content => ({...file, content}))
  },
})