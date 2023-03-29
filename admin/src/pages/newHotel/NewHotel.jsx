import "./newHotel.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import {userRequest} from "../../utils/request";
import upload from "../../utils/upload";

const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);

  const { data, loading, error } = useFetch("/rooms");
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

  // set rooms from selected rooms
  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  // console.log(files)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // get files url lists
      const lists = await Promise.all(
        Object.values(files).map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );

      const newHotel = {
        ...info,
        rooms,
        photos: lists,
      };

      const res = await userRequest.post("/hotels", newHotel);
      res && navigate("/hotels");
    } catch (err) { console.log(err) }
  };


  return (
    <div className='new'>
      <div className="top">
        <h1>Add New Product</h1>
      </div>
      <div className="bottom">
        <div className="left">
          <img
            src={
              files ? URL.createObjectURL(files[0]) :
                "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt=""
          />
        </div>
        <div className="right">
          <form>
            <div className="formInput">
              <label htmlFor='file'>
                Image: <DriveFolderUploadOutlinedIcon className='icon' />
              </label>
              <input
                type="file"
                name="file"
                id='file'
                multiple
                onChange={e => setFiles(e.target.files)}
                style={{ display: "none" }}
              />
            </div>
            {
              hotelInputs.map(input => (
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
              <label style={{ marginBottom: "5px" }}>Featured</label>
              <select id="featured" onChange={handleChange}>
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
            <div className="selectRooms">
              <label>Rooms</label>
              <select id="rooms" multiple onChange={handleSelect}>
                {
                  loading ? (
                    "Loading please wait..."
                  ) : error ? (
                    "Something went wrong!!"
                  ) : (
                    data && data.map((room) => (
                      <option key={room._id} value={room._id}>
                        {room.title}
                      </option>
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