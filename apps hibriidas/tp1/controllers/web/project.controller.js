import * as service from '../../services/project.service.js'
import * as view from '../../views/project.view.js'
import * as sectionsList from '../../constants/sections.js'
import * as projectShema from '../../schemas/Project.schema.js'
import * as clientService from '../../services/client.service.js'
import * as sectionsConstants from '../../constants/sections.js'

async function getAllProjects(req, res) {
    const section = req.params.section
    try{
        if(!Object.values(sectionsConstants).includes(section)){
            return res.send(view.createPage('error', 'error debe ingresar una seccion valida'))
        }
        const projects = await service.getAllProjects({section})
        res.send(view.createProjectListPage(section, projects))
    }catch(error) {
        res.send(error)
    }
}



export {getAllProjects}