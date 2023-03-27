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


// create room
router.post("/:hotelid", verifyAdmin, createRoom);

// update room
router.put("/update/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability);

// delete room
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

// single room
router.get("/find/:id", getRoom);

// all rooms
router.get("/", getRooms);


module.exports = router;