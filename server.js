/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: ___Taniya Gangar_____ Student ID: _101583235____ Date: _22-10-2024____
*
*  Published URL: ___________________________________________________________
*
********************************************************************************/


const express = require('express');
const projectData = require('./modules/projects'); 
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8000; 

app.use(express.static(path.join(__dirname, 'public')));

// Initialize your project data
projectData.initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("Unable to start server: " + err);
    });

// Home Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// About Route
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Projects Route with optional sector filtering
app.get('/solutions/projects', (req, res) => {
    const sector = req.query.sector;
    if (sector) {
        projectData.getProjectsBySector(sector)
            .then((projects) => res.json(projects))
            .catch((err) => res.status(404).send(err));
    } else {
        projectData.getAllProjects()
            .then((projects) => res.json(projects))
            .catch((err) => res.status(404).send(err));
    }
});

// Project by ID Route
app.get('/solutions/projects/:id', (req, res) => {
    const projectId = parseInt(req.params.id, 10);
    projectData.getProjectById(projectId)
        .then((project) => res.json(project))
        .catch((err) => res.status(404).send(err));
});

// Custom 404 Route
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});
