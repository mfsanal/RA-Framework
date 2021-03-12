#!/usr/bin/env node
'use strict'
const cm = require('commander');
const fs = require('fs');

cm.version('1.0.0')
    .description('Command line Weather Application');

const getItemModel = (Class,Name) =>{
    return "var mongoose = require('mongoose');\n\nvar "+Class+" = module.exports = mongoose.model('"+Name+"', mongoose.Schema({\n\tname: {\n\t\ttype: String,\n\t\trequired: true\n\t},\n\tcreate_date: {\n\t\ttype: Date,\n\t\tdefault: Date.now\n\t}\n}));\n\nmodule.exports.get = function (callback, limit) {\n\t"+Class+".find(callback).limit(limit);\n}";
}

const getItemRouter = (Class,Name) =>{
    return "\n\n// "+Name+"Controller\nvar "+Name+"Controller = require('../Controller/"+Class+"Controller');\nrouter.route('/"+Name+"').get("+Name+"Controller.GetAll);\nrouter.route('/"+Name+"').post("+Name+"Controller.New);\nrouter.route('/"+Name+"/:id').get("+Name+"Controller.GetOne);\nrouter.route('/"+Name+"/:id').patch("+Name+"Controller.Update);\nrouter.route('/"+Name+"/:id').put("+Name+"Controller.Update);\nrouter.route('/"+Name+"/:id').delete("+Name+"Controller.Delete);\n\n";
}

const getItemController = (Class,Name) => {
    return ""+Class+" = require('../Model/"+Class+"Model');\n\n// GetAll\nexports.GetAll = (req, res) => {\n\t"+Class+".get((err, resData) => {\n\t\tif (err)\n\t\t\tres.json({ status: 'error', message: err });\n\t\telse \n\t\t\tres.json({ status: 'success', data: resData });\n\t});\n};\n\n// GetOne\nexports.GetOne = (req, res) => {\n\t"+Class+".findById(req.params.id, (err, resData) => {\n\t\tif (err)\n\t\t\tres.json({ status: 'error', message: err });\n\t\telse \n\t\t\tres.json({ status: 'success', data: resData });\n\t});\n};\n\n// New \nexports.New = (req, res) => {\n\tvar "+Name+" = new "+Class+"();\n\t"+Name+".name = req.body.name;\n\n\t"+Name+".save((err) => {\n\t\tif (err)\n\t\t\tres.json({ status: 'error', message: err });\n\t\telse \n\t\t\tres.json({ status: 'success', data: "+Name+" });\n\t});\n};\n\n// Update\nexports.Update = (req, res) => {\n\t"+Class+".findById(req.params.id, (err, "+Name+") => {\n\t\tif (err){\n\t\t\tres.json({ status: 'error', message: err });\n\t\t}else{\n\t\t\t"+Name+".name = req.body.name;\n\n\t\t\t"+Name+".save((err) => {\n\t\t\t\tif (err)\n\t\t\t\t\tres.json({ status: 'error', message: err });\n\t\t\t\telse \n\t\t\t\t\tres.json({ status: 'success', data: "+Name+" });\n\t\t\t});\n\t\t}\n\t});\n};\n\n// Delete\nexports.Delete = (req, res) => {\n\t"+Class+".remove({\n\t\t_id: req.params.id \n\t}, (err, "+Name+") => {\n\t\tif (err)\n\t\t\tres.json({ status: 'error', message: err });\n\t\telse \n\t\t\tres.json({ status: 'success', data: "+Name+" });\n\t});\n};";
}

const newRouter = (RouterRaw, Class, Name) =>{
    let lines = RouterRaw.split(/\r?\n/);
    lines[lines.length - 3] = getItemRouter(Class,Name);
    return lines.join("\r\n");
}

cm.command('entity <name>')
  .alias('e')
  .description('Add new Model and Controller')
  .action(name =>{
        const Class= name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        const Name =  name.toLowerCase();

        console.log('İşlem Başlıyor...');

        fs.writeFile('./src/Model/' + Class + 'Model.js', getItemModel(Class,Name), (err) =>{
            if (err) throw err;
            console.log('Entity ve Model Oluşturuldu...');
        });

        fs.writeFile('./src/Controller/' + Class + 'Controller.js', getItemController(Class,Name), (err) =>{
            if (err) throw err;
            console.log('Controller Oluşturuldu...');
        });

        fs.writeFile('./src/Utils/Router.js', newRouter(fs.readFileSync('./src/Utils/Router.js', 'UTF-8'), Class, Name), (err) =>{
            if (err) throw err;
            console.log('Router Eklendi...');
        });

        console.log('İşlem Tamamlandı...');
  });

  cm.parse(process.argv);