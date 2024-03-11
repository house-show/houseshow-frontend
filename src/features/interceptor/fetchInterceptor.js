export const fetchInterceptor = (url, options = {}) => {
  const accessToken = localStorage.getItem('accessToken')
  const headers = { ...options.headers }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  return fetch(url, { ...options, headers })
}
