var express = require('express');
const Course = require('../models/Course');

var router = express.Router();


function apiAuthenticationMiddleware(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(401).json({error : 'Unauthenticated request'});
}



router.get('/', apiAuthenticationMiddleware, (req, res) => {
  Course.find({}, (err, courses) => {
    //Check for error and send an error json, otherwise
    console.log(courses);
    res.json(courses);
  });
});

router.post('/', apiAuthenticationMiddleware, (req, res) => {

  let courseBody = req.body;
  if (!courseBody.courseNo || !courseBody.title) {
    return res.status(400).json({ error: 'Requires body course no and title' });
  }

  //Valid course. Save it to the mongodb
  let course = new Course(req.body);

  course.save((err) => {
    if (err) {
      console.log('Failed to save the course in Mongodb', err);
      res.status(500).json({ status: 'Failed to save the course' });
      return;
    }

    res.json({ status: 'Successfully added the course' });
  });

});

module.exports = router;
