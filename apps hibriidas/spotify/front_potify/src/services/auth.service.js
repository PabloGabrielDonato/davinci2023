import API from './api.service'

async function login({ userName, password }) {
    return API.call({ uri: 'session', method: 'POST', body: { userName, password } })
}

async function register({userName, password}) {
    return API.call({uri: 'account', method: 'POST', body: {userName, password}})
}

async function recuperarPassword({userName, newPassword}) {
    return API.call({uri: 'recuperar/password', method: 'POST', body: {userName, newPassword}})
}
export {
    login,
    register,
    recuperarPassword
}