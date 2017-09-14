//CREATE route
var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db){

    app.get('/', (req, res) => {
        res.render('index.ejs');
    });

    app.get('/invoices', (req, res) => {
        db.collection('invoice').find({}).toArray((err, docs)=>{
            if(err) throw err;
           
                res.render('invoices.ejs', {
                    invoices: docs 
                });
           
        });
    })
    app.get('/invoices/:id', (req, res) =>{
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('invoice').findOne(details, (err, item) => {
            
            if (err) throw err;
            res.render('invoice.ejs', {
                invoice: item
            });
          });
    });

    app.get('/newInvoice', (req, res) => {
        res.render('newInvoice.ejs');
    });

    app.get('/updateInvoice/:id', (req, res) =>{
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('invoice').findOne(details, (err, item) => {
            
            if (err) throw err;
            res.render('updateInvoice.ejs', {
                invoice: item
            }); 
          });
    });

    app.post('/createNewInvoice', (req, res) => {
        const invoice = { 
            date: req.body.date, 
            status: req.body.status, 
            scopeOfWork: req.body.scopeOfWork, 
            price: req.body.price
        };
        db.collection('invoice').insert(invoice, (err, result) => {
            if(err) throw err;
            res.redirect(`/invoices/${result.ops[0]._id}`);
        });   
    });

    app.put('/endpoint', function(req, res){
        const id = req.body._id;
        const details = { '_id': new ObjectID(id) };

        const invoice = { 
            date: req.body.date, 
            status: req.body.status, 
            scopeOfWork: req.body.scopeOfWork, 
            price: req.body.price
        };
        db.collection('invoice').update(details, invoice, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(result);
            } 
          });
    });
};