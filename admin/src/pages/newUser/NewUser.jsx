import './newUser.scss';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { publicRequest } from '../../utils/request';
import upload from '../../utils/upload';

const NewUser = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setUser] = useState({});
  const navigate = useNavigate();

  // set user input
  const handleChange = (e) => {
    setUser(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  };

  // sumbit info
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = await upload(file);
      const newUser = {
        ...info,
        img: url,
      };

      const res = await publicRequest.post("/auth/register", newUser);
      res && navigate("/users");
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className='new'>
      <div className="top">
        <h1>{title}</h1>
      </div>
      <div className="bottom">
        <div className="left">
          <img
            src={
              file ? URL.createObjectURL(file) :
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
              <input type="file" name="file" id='file'
                style={{ display: "none" }}
                onChange={e => setFile(e.target.files[0])}
              />
            </div>
            {
              inputs.map(input => (
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
            <button onClick={handleSubmit}>Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewUser;