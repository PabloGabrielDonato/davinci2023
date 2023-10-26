import { createPage } from '../pages/utils.js'

function createProjectListPage(section, projects) {
    let html = `<h2>Lista de Proyectos de ${section}</h2>`

    if(projects.length === 0){
        html += "<p>No hay proyectos creados todavia</p>"
    }else {
    html += '<ul class="lista-proyectos">'

    for (let i = 0; i < projects.length; i++) {
        html += `
            <li>
                <div>
                    <h3>${projects[i].name}</h3>
                    <p>${projects[i].description}</p>
                    <p>${projects[i].technologies}</p>
                    <a href="${projects[i].link}">Repositorio</a>
                    <img src="${projects[i].img}" alt="${projects[i].name}">
                </div>
            </li>`
    }

        html += '</ul>'
    }
    return createPage('Proyectos', html)
}

export {
    createProjectListPage,createPage
}

