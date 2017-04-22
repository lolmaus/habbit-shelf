import fetch from 'ember-network/fetch'



export function fetchGithub (url, params = {}) {
  const effectiveURL = `https://api.github.com/${url}`

  const headers = {
    ...(params.headers || {}),
    Accept : 'application/vnd.github.v3+json',
  }

  return fetch(effectiveURL, {
    ...params,
    headers
  })
}



export function fetchGithubAuth (url, token, params = {}) {
  const headers = {
    ...(params.headers || {}),
    ...(token ? {Authorization : `token ${token}`} : {}),
  }

  return fetchGithub(url, {
    headers
  })
}



export function fetchGithubJson (...args) {
  return fetchGithub(...args).then(result => result.json())
}

export function fetchGithubAuthJson (...args) {
  return fetchGithubAuth(...args).then(result => result.json())
}
