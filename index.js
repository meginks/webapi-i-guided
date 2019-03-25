const express = require('express'); 
const db = require('./data/db'); 
const server = express(); 
server.use(express.json());

// req what you're getting from the body 
// res the response 
server.get('/', (req, res) => {
    res.send('Hello World!') 
})

server.get('/now', (req, res) => {
   const rightnow = new Date(Date.now()).toString(); 
   res.send(rightnow);
})

server.get('/hubs', (req, res) => {
    const hubs = db.hubs 
    .find() 
    .then(hubs => {
        res.status(200).json(hubs)
    })
    .catch( ({code, message }) => {
        res.status(code).json({success: false, 
        message})
    }) 
}) 


server.post('/hubs', (req, res) => {
    const hubInfo = req.body; 
    
    db.hubs
        .add(hubInfo)
        .then(hub => {
            res
                .status(201).json({ success: true, hub })
        })
        .catch(({ code, message}) => {
            res
            .status(code) 
            .json({
                success: false, 
                message
            })
        })
}) 

server.delete('/hubs/:id', (req, res) => {
    const id = req.params.id; 
    db.hubs 
    .remove(id)
    .then(deleted => {
        res.status(204);
    })
    .catch(({code, message}) => {
        res
        .status(code)
        .json({
            success: false,
            message
        })
    })
})

server.put('/hubs/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db.hubs 
        .update(id, changes)
        .then(updated => {
            if (updated) {
                res.status(200)
                .json({
                    success: true,
                    updated
                })
            } else {
                res.status(404) 
                .json({
                    success: false,
                    message: "We couldn't find that hub! TOO BAD. SO SAD."
                })
            }
        })
        .catch(({ code, message }) => {
            res 
            .status(code)
            .json({
                success: false,
                message
            })
        })
})

server.get('/hubs/:id', (req, res) => {
    const id = req.params.id; 
    db.hubs 
    .findById(id)
    .then( id =>  { if (id) {
        res.status(200)
        .json({
    success: true, id
})} else {
    res.status(404)
    .json({
        success: false, 
        message: 'too bad, so sad. 404 error'
    })
} 
    })
    .catch(({code, message }) => {
        res 
        .status(code)
        .json({ success: false,
        message})
    })


})



server.listen(4000, () => {
    console.log( "\n *** Server running on http://localhost:4000 ***\n");
}); 
 


