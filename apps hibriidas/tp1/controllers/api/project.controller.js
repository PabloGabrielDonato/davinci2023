import * as projectService from '../../services/project.service.js'
import * as clientService from '../../services/client.service.js'
import * as projectShema from '../../schemas/Project.schema.js'
import * as sectionsConstants from '../../constants/sections.js'

async function getAllProjects(req, res) {
    const section = req.query.section
    const technologies = req.query.technologies

    let filter = {}
    if(section){
        filter.section = section
    }
    if(technologies){
        filter.technologies = technologies
    }
    console.table(filter)

    try{
        const projects = await projectService.getAllProjects(filter)
        res.status(200).json({
            message:'ok',
            code: 200,
            data: projects,
        })
    }catch(error) {
        res.status(400).json({
            message:'error' + error.message,
            code: 400
        })
    }
}

async function getAllProjectsBySection(req, res) {
    const section = req.params.section
    if(!Object.values(sectionsConstants).includes(section)){
        return res.status(400).json({
            message:'seccion no valida',
            code: 400
        })
    }
    
    const filter = {section}
    try{
        const projects = await projectService.getAllProjects(filter)
        res.status(200).json({
            message:'ok',
            code: 200,
            data: projects,
        })
    }catch(error) {
        res.status(400).json({
            message:'error' + error.message,
            code: 400
        })
    }
}

async function storeProject(req, res) {
    const technologies = req.body.technologies.split(',')
    req.body.technologies = technologies

    try {
        const projectFormValidated = await projectShema.ProjectCreateForm.validate(req.body)

        const client = await clientService.getClientById(projectFormValidated.clientId)       
        
        const clientToSave = {...client}
        delete clientToSave.projects;
        client.projects.push(projectFormValidated)
        await clientService.updateClient(client._id, client)

        const project = {
            name: req.body.name,
            description:req.body.description,      
            link: req.body.link,
            img: req.body.img,
            technologies,
            section: req.body.section,
            client : clientToSave
        }

        const projectValidated = await projectShema.Project.validate(project)
        const result = await projectService.storeProject(projectValidated)

        res.status(201).json({
            message:'creado',
            code: 201,
            data: result,
        })    
    }catch(error) {
        res.status(400).json({
            message:'error' + error.message,
            code: 400
        })
    }

    
}

async function removeProject(req, res) {
    const id = req.params.id
    try{
        const project = await projectService.getProjectById(id)
        await projectService.deleteProject(id)
        res.status(200).json({
            message:'eliminado',
            code: 200,
            data: project,
        })
    }catch(error){
        res.status(400).json({
            message:'error' + error.message,
            code: 400
        })
    }
}

async function modifyProject(req, res){
    const id = req.params.id
    const technologies = req.body.technologies.split(',')
    
    const clientId = req.body.client


    let client = undefined
    if(clientId !== ''){
        client = await clientService.getClientById(clientId)       
    }
    
    const project = {
        name: req.body.name,
        description:req.body.description,      
        link: req.body.link,
        img: req.body.img,
        technologies,
        section: req.body.section,
        client
    }

    try{
        await projectShema.Project.validate(project)
        
        await projectService.modifyProject(id, project)
        res.status(200).json({
            message:'modificado',
            code: 200,
            data: project,
        })
    }catch(error) {
        res.status(400).json({
            message:'error' + error.message,
            code: 400
        })
    }
    
}

async function detailProject(req, res){
    const id = req.params.id

    try{
        const project = await projectService.getProjectById(id)
        if(project === null){
            return res.status(404).json({
                message:'no encontrado',
                code: 404,
            })
        }
        res.status(200).json({
            message:'ok',
            code: 200,
            data: project,
        })
    }catch(error){
        res.status(400).json({
            message:'error' + error.message,
            code: 400
        })
    }
}

export {
    getAllProjectsBySection,
    getAllProjects,
    storeProject,
    detailProject,
    modifyProject,
    removeProject,
}   