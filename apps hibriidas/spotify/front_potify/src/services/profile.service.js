import API from './api.service'

async function getCurrent() {
    return API.call({ uri: 'profile' })
}

async function createProfile(avatar, name, email) {
    const formData = new FormData()
    formData.append('avatar', avatar)
    formData.append('name', name)
    formData.append('email', email)

    const response = await fetch('http://localhost:3000/api/profile', {
        method: 'POST',
        headers: {
            'auth-token': localStorage.getItem('token')
        },
        body: formData
    })
    return await response.json()
}


export default {
    createProfile,
    getCurrent
}
