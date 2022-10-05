const backendPort = 9292
const baseURL = `http://localhost:${backendPort}`

const messagesRoute = `${baseURL}/messages`

const getAConversationURL = `${messagesRoute}/conversation`
const getConnectionsURL = number => `${baseURL}/users/random/${number}`

export { getAConversationURL, getConnectionsURL }