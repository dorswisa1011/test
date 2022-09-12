const express = require('express');
const controllers = require('./controllers');

const router = express.Router();

router.get('/repoTree', async function (req, res) {
    let queryParams = JSON.stringify(req.query);
    queryParams = JSON.parse(queryParams);
    res.send (await controllers.getFullRepoTree(queryParams));
});

module.exports = router;