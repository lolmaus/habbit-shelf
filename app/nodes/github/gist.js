// ----- Ember modules -----
// import computed from 'ember-macro-helpers/computed'

// ----- Own modules -----
import Node from 'ember-shelf/node'



export default Node.extend({
  attrNames : [
    "url",
    "forks_url",
    "commits_url",
    "id",
    "description",
    "public",
    "owner",
    "user",
    "truncated",
    "comments",
    "comments_url",
    "html_url",
    "git_pull_url",
    "git_push_url",
    "created_at",
    "updated_at",
    "forks",
    "history",
  ],

  gist : null,
})
