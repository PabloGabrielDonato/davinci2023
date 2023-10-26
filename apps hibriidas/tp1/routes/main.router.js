import express from 'express'
import * as viewUtils from '../pages/utils.js'
import * as projectController from '../controllers/web/project.controller.js'


export const mainRouter = express.Router()
mainRouter.get('/', (req, res) => {
    res.send(viewUtils.createPage('home', 'home'))
})

mainRouter.get('/:section', projectController.getAllProjects)
