import "./newRoom.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import { userRequest } from "../../utils/request";

const NewHotel = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);

  const { data, loading, error } = useFetch("/hotels");
  const navigate = useNavigate();

  // set info
  const handleChange = (e) => {
    setInfo((prev) => (
      {
        ...prev,
        [e.target.id]: e.target.value
      }
    ));
  };

  // submit info
  const handleSubmit = async (e) => {
    e.preventDefault();

    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    const newRoom = {
      ...info,
      roomNumbers
    }

    try {
      const res = await userRequest.post(`/rooms/${hotelId}`, newRoom);
      res && navigate("/rooms");
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className='new'>
      <div className="top">
        <h1>Add New Room</h1>
      </div>
      <div className="bottom">
        <div className="right">
          <form>
            {
              roomInputs.map(input => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    id={input.id}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))
            }
            <div className="formInput">
              <label>Rooms</label>
              <textarea
                onChange={(e) => setRooms(e.target.value)}
                placeholder="give comma between room numbers."
              />
            </div>
            <div className="formInput">
              <label>Choose a hotel</label>
              <select
                id="hotelId"
                onChange={(e) => setHotelId(e.target.value)}
              >
                {
                  loading ? (
                    "Loading please wait..."
                  ) : error ? (
                    "Something went wrong!!"
                  ) : (
                    data && data.map((hotel) => (
                      <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                    ))
                  )
                }
              </select>
            </div>
            <button onClick={handleSubmit}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;