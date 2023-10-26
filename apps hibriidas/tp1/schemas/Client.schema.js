import yup from 'yup'
import * as projectShema from './Project.schema.js'

const Client = yup.object({
    _id: yup.string(),
    name: yup.string().required("nombre del cliente es requerido"),
    photo: yup.string().default(""),
    description: yup.string().default(""),
    projects: yup.array().of(projectShema.Project).default([])      
})

export {
    Client
}