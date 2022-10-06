const backendPort = 9292
const baseURL = `http://localhost:${backendPort}`

const messagesRoute = `${baseURL}/messages`

const getAConversationURL = `${messagesRoute}/conversation`
const getConnectionsURL = number => `${baseURL}/users/random/${number}`
const createUserURL = `${baseURL}/user/create`
const getAUserURL = id => `${baseURL}/users/${id}`

export { 
    getAConversationURL, 
    getConnectionsURL,
    createUserURL,
    getAUserURL
}