const router = require("express").Router();

const {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} = require("../controllers/roomController");
const { verifyAdmin } = require("../middleware/verifyToken");


//CREATE
router.post("/:hotelid", verifyAdmin, createRoom);

//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);

//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//GET
router.get("/:id", getRoom);

//GET ALL
router.get("/", getRooms);


module.exports = router;