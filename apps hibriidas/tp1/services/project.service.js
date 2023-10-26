import {db, connect} from '../database/mongo.database.js'
import {PROJECT_COLLECTION} from '../constants/collections.js'
import {ObjectId} from 'mongodb'

const projectCollection = db.collection(PROJECT_COLLECTION)


async function getProjectById(id){
    console.log('id' + id);
    await connect()
    const mongoId = new ObjectId(id)
    const project = await projectCollection.findOne({_id: mongoId})
    console.log('encontrado ' + project);
    return project
}

async function getAllProjects(filter = undefined) {
    await connect() 
    let projects = []
    if(Object.keys(filter).length === 0) {
        projects = await projectCollection.find().toArray()
    }else{

        const objectQuery = {}
        if(filter.section !== undefined) {
            objectQuery.section = filter.section
        }
        if(filter.technologies !== undefined) {
            objectQuery.technologies = { $elemMatch: { $eq: filter.technologies }}
        }
        projects = await projectCollection.find(objectQuery).toArray()
    }
    return projects
}

async function storeProject(project) {
    await connect()
    await projectCollection.insertOne(project)
}

async function deleteProject(id) {
        await connect()
        const mongoId = new ObjectId(id)
        projectCollection.deleteOne({_id:mongoId})
}

async function modifyProject(id, project) {
    const mongoId = new ObjectId(id)

    await projectCollection.updateOne(
        {_id:mongoId}, // filtro de busqueda
        {$set:project} // datos a actualizar        
    )
}

export {
    getAllProjects,
    storeProject,
    getProjectById,
    deleteProject,
    modifyProject,
}
