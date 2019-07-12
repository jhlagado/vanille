var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.flash('success', 'Item has been created');
  console.log('****', req.flash());
  const sidemenu = [
    {
      id: 'm1',
      title: 'Category 1',
      children: [
        {
          id: 'm1.1',
          title: 'Sub Category 1.1'
        },
        {
          id: 'm1.2',
          title: 'Sub Category 1.2'
        },
        {
          id: 'm1.3',
          title: 'Sub Category 1.3'
        },
      ]
    },
    {
      id: 'm2',
      title: 'Category 2',
      children: [
        {
          id: 'm2.1',
          title: 'Sub Category 2.1'
        },
        {
          id: 'm2.1',
          title: 'Sub Category 2.2'
        },
      ]
    },
    {
      id: 'm3',
      title: 'Category 3',
      children: [
        {
          id: 'm3.1',
          title: 'Sub Category 3.1'
        },
        {
          id: 'm3.2',
          title: 'Sub Category 3.2'
        },
        {
          id: 'm3.3',
          title: 'Sub Category 3.3'
        },
        {
          id: 'm3.4',
          title: 'Sub Category 3.4'
        },
      ]
    },
  ];
  res.render('index', { title: 'Express', sidemenu });
});

module.exports = router;
