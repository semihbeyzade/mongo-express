const express = require('express')
const router = express.Router()

const { createNewUser, deleteAllUsers, getUser, deleteUser, updateUser  } = require('../controllers/nutzer-controller')

router
  .route('/')
    .post(createNewUser)
    .delete(deleteAllUsers)

router
  .route('/:id')
    .get(getUser)
    .delete(deleteUser)
    .put(updateUser)

module.exports = router