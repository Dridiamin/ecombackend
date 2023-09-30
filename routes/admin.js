const { deleteUser, getAllUsers, updateUser } = require("../controllers/admincont")
const { isAdmin } = require("../middelwares/isAdmin")
const { isAuth } = require("../middelwares/isAuth")


const router = require("express").Router()
//delete user 
router.delete('/:id', isAuth, isAdmin, deleteUser)
//get all users
router.get('/all-users', isAuth, isAdmin, getAllUsers)
//update user
router.put('/up-date-role/:id', isAuth, isAdmin, updateUser)

module.exports = router