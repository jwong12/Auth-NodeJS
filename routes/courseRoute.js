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
  Courses.find({}, (err, Courses) => {
    //Check for error and send an error json, otherwise
    console.log(Courses);
    res.json(Courses);
  });
});

router.post('/', apiAuthenticationMiddleware, (req, res) => {
  console.log('/api/courses post')

  const course = req.body;
  console.log(course)

  if (!course.courseNo || !course.title) {
    return res.status(400).json({ error: 'Requires body Course no and title' });
  }

  console.log('before findOne()')
  console.log('username: ')
  console.log(req.user.username);
  //Valid Courses. Save it to the mongodb
  const query = Courses.where({ username: req.user.username });
  query.findOne((err, result) => {
    console.log('result');
    console.log(result);

    if (err) return handleError(err);

    if (result) {
      console.log('true')
      const updatedCourses = [...result.courses];
      updatedCourses.push(course);

      console.log('updatedCourses');
      console.log(updatedCourses);
      
      const coursesInstance = new Courses({ username: result.username, courses: updatedCourses });
      console.log('coursesInstance')
      console.log(coursesInstance)

      coursesInstance.updateOne({ username: result.username }, (err) => {
        if (err) {
          console.log('Failed to save the Courses in Mongodb', err);
          res.status(500).json({ status: 'Failed to save the Courses' });
          return;
        }
    
        res.json({ status: 'Successfully added the Courses' });
      }); 

    } else {
      console.log('false')
      const newCourses = [course];
      const coursesInstance = new Courses({ username: req.user.username, courses: newCourses });
      console.log('coursesInstance')
      console.log(coursesInstance)
      
      coursesInstance.save((err) => {
        if (err) {
          console.log('Failed to save the Courses in Mongodb', err);
          res.status(500).json({ status: 'Failed to save the Courses' });
          return;
        }
    
        res.json({ status: 'Successfully added the Courses' });
      }); 
    }  
  })

  console.log('outside of findOne()')
});

module.exports = router;
