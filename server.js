const express = require('express'); 
const helmet = require('helmet');
const server = express();

const cohortsRouter = require('./routes/cohorts/cohorts-router.js');
const studentsRouter = require('./routes/students/students-router.js');

server.use(express.json());
server.use(helmet());

server.use('/api/cohorts', cohortsRouter);
server.use('/api/students', studentsRouter);

module.exports = server;