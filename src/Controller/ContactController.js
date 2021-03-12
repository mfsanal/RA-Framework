Contact = require('../Model/ContactModel');

// GetAll
exports.GetAll = (req, res) => {
    Contact.get((err, resData) => {
        if (err)
            res.json({ status: "error", message: err });
        else 
            res.json({ status: "success", data: resData });
    });
};

// GetOne
exports.GetOne = (req, res) => {
    Contact.findById(req.params.id, (err, resData) => {
        if (err)
            res.json({ status: "error", message: err });
        else 
            res.json({ status: "success", data: resData });
    });
};

// New 
exports.New = (req, res) => {
    var contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    
    contact.save((err) => {
        if (err)
            res.json({ status: "error", message: err });
        else 
            res.json({ status: "success", data: contact });
    });
};

// Update
exports.Update = (req, res) => {
    Contact.findById(req.params.id, (err, contact) => {
        if (err){
            res.json({ status: "error", message: err });
        }else{
            contact.name = req.body.name ? req.body.name : contact.name;
            contact.gender = req.body.gender;
            contact.email = req.body.email;
            contact.phone = req.body.phone;
            
            contact.save((err) => {
                if (err)
                    res.json({ status: "error", message: err });
                else 
                    res.json({ status: "success", data: contact });
            });
        }
    });
};

// Delete
exports.Delete = (req, res) => {
    Contact.remove({
        _id: req.params.id
    }, (err, contact) => {
        if (err)
            res.json({ status: "error", message: err });
        else 
            res.json({ status: "success", data: contact });
    });
};