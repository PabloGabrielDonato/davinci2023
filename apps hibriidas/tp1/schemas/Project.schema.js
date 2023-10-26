import yup from 'yup'
import * as sections from './../constants/sections.js'

const sectionList = Object.values(sections)
let Project
Project = yup.object({
    name: yup.string().required("Nombre del proyecto es requerido"),
    description: yup.string(),
    technologies: yup.array(yup.string()).default([]),
    link: yup.string().required("El link del repositorio de es requierido"),
    img: yup.string(),
    section:yup.string().required("La categoria del proyecto es requerida   "),
    client: yup.object({
        name: yup.string().required("nombre del cliente es requerido"),
        photo: yup.string().default(""),
        description: yup.string().default(""),
    }).required("El cliente es requerido"),
})

const ProjectCreateForm = yup.object({
    name: yup.string().required("Nombre del proyecto es requerido"),
    description: yup.string(),
    technologies: yup.array(yup.string()).default([]),
    link: yup.string().required("El link del repositorio de es requierido"),
    img: yup.string(),
    section:yup.string().required("La categoria del proyecto es requerida   "),
    clientId: yup.string().required("El cliente es requerido"),
})

export {
    Project,
    ProjectCreateForm,
}
