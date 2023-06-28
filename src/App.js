import React, { useEffect, useState } from "react";
import { Access_Key } from "./MyKey";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height:300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const App = () => {
  const [img, setImg] = useState("");
  const [res, setRes] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchRequest = async () => {
    const data = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${Access_Key}`
    );
    const dataJ = await data.json();
    const result = dataJ.results;

    setRes(result);
  };

  const Submit = (e) => {
    e.preventDefault();
    fetchRequest();
    if (e.target.value === "") {
      setImg("");
    } else {
      setImg(e.target.value);
    }
  };
  useEffect(() => {
    fetchRequest();
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 d-flex justify-content-center flex-column align-items-center bg-dark py-4 sticky-top input">
            <h2 className="text-light font-weight-bold">Search Photos</h2>
            <input
              className="col-3 form-control-sm fs-4 text-capitalize border rounded border-3 border-dark"
              type="text"
              placeholder="Search Photos..."
              value={img}
              onInput={Submit}
            />
          </div>
          <div className="col-12 d-flex justify-content-evenly flex-wrap">
            {res &&
              res.map((val) => {
                return (
                  <>
                    <img
                      className="col-3 img-fluid img-thumbnail"
                      src={val.urls.small}
                      alt="val.alt_description"
                      onClick={handleOpen}
                    />
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          <img
                            className="col-3 img-fluid img-thumbnail"
                            style={{width:"320px",height:"260px"}}
                            src={val.urls.small}
                            alt="val.alt_description"
                            
                          />
                        </Typography>
                      </Box>
                    </Modal>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};
export default App;