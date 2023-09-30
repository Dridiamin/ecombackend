const { userRegister, userLogin, getProfile, updateProfile } = require("../controllers/usercont");
const { isAuth } = require("../middelwares/isAuth");
const { registerRules,validator, loginRules } = require("../middelwares/Validator");

const router = require("express").Router()
// register
router.post('/signup', registerRules(), validator ,  userRegister ) 
// login
router.post('/login', loginRules(), validator, userLogin)
router.get('/profile', isAuth ,getProfile)
// update

router.put('/update', isAuth, updateProfile)

module.exports = router ;