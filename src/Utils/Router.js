let router = require('express').Router();
let Settings = require('./Settings');

router.get('/', Settings.emptyPage);

// ContactController
var contactController = require('../Controller/ContactController');
router.route('/contacts').get(contactController.GetAll);
router.route('/contacts').post(contactController.New);
router.route('/contacts/:id').get(contactController.GetOne);
router.route('/contacts/:id').patch(contactController.Update);
router.route('/contacts/:id').put(contactController.Update);
router.route('/contacts/:id').delete(contactController.Delete);


// Export Router
module.exports = router;