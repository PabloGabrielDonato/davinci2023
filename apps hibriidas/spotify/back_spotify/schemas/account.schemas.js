import yup from 'yup'

const account = yup.object({
    userName: yup.string().required().trim().min(3),
    password: yup.string().required().min(3)
})

const profile = yup.object({
    avatar: yup.string().required().trim(),
    name: yup.string().trim().required().min(3),
    email: yup.string().email().required()
})

export {
    account,
    profile
}


