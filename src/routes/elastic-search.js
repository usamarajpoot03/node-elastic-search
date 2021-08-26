const router = require("express").Router();
const esClient = require('../elastic-search');

router.get("/", async (req, res) => {
    res.status(200).send("elastic-search-api");
});

router.get("/es-health", async (req, res) => {

    try {
        esClient.ping({
            requestTimeout: 3000
        }, function (error) {
            if (error) {
            return res.status(200).send("elasticsearch cluster is down!");
            } else {
            return res.status(200).send("All is well");
            }
        }); 
    } catch(err) {
        return res.status(500).send("Something went wrong : " + err);

    }

    
});

router.post("/indexData/:index", async (req, res) => {

    const body = req.body;
    if(!Object.entries(body).length || !req.params.index)
        return res.status(500).send("invalid data");

    const { id } = body;

    try {
        const response = await esClient.create({
            index: req.params.index,
            type: '_doc',
            id,
            body        
        });
        return res.status(200).send(response);
    } catch(err) {
        return res.status(500).send("Something went wrong : " + err);
    }
});

router.post("/search/:index", async (req, res) => {

    console.log(req.query);
    const body = req.body;
    try {
        const response = await esClient.search({
            index: req.params.index,
            q: body.q,
          });
        return res.status(200).send(response);
    } catch(err) {
        return res.status(500).send("Something went wrong : " + err);
    }
   
});

module.exports = router;
