var express = require('express');
const Courses = require('../models/Courses');

var router = express.Router();

function apiAuthenticationMiddleware(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(401).json({error : 'Unauthenticated request'});
}

router.get('/', apiAuthenticationMiddleware, (req, res) => {
  Courses.find({ username: req.user.username }, (err, Courses) => {    
    res.json(Courses[0].courses);
  });
});

router.post('/', apiAuthenticationMiddleware, (req, res) => {
  const course = req.body;

  if (!course.courseNo || !course.title) {
    return res.status(400).json({ error: 'Requires body Course no and title' });
  }

  const query = Courses.where({ username: req.user.username });

  query.findOne((err, result) => {
    if (err) return handleError(err);

    if (result) {
      result.courses.push(course);

    } else {
        const newCourses = [course];
        result = new Courses({ username: req.user.username, courses: newCourses });
    }  

    result.save((err) => {
      if (err) {
        console.log('Failed to save the Courses in Mongodb', err);
        res.status(500).json({ status: 'Failed to save the Courses' });
        return;
      }
  
      res.json({ status: 'Successfully added the Courses' });
    });
  });

});

module.exports = router;
