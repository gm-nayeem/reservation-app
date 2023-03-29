const router = require("express").Router();
const {
    updateUser,
    deleteUser,
    getUser,
    getUsers,
} = require("../controllers/userController");
const { verifyAdmin, verifyUser } = require("../middleware/verifyToken");


//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/find/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

module.exports = router;