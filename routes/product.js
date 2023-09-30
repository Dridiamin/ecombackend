const { createProduct, getProduct, getOneProduct, updateOneProduct, deleteOneProduct } = require("../controllers/productcont")
const { isAdmin } = require("../middelwares/isAdmin")
const { isAuth } = require("../middelwares/isAuth")

const router = require("express").Router()

// create new product 
router.post('/new', isAuth, isAdmin,createProduct)

// update a product 
router.put('/:id', isAuth, isAdmin, updateOneProduct)

// delete product 
router.delete('/:id', isAuth, isAdmin, deleteOneProduct)

// get all product
router.get('/all',getProduct)

// get a product 
router.get('/:id', getOneProduct)



module.exports = router
