import React, { useState } from "react";
import robot from "../assets/gifs/rbot.gif";
import baseUrl from "../components/baseUrl";
import Spinner from "../components/Spinner";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { saveAs } from "file-saver";
import MicOffIcon from "@mui/icons-material/MicOff";
// speech
import useSpeechToText from "react-hook-speech-to-text";
// speech
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./style.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import theCat from "/cat.gif";
import IconButton from "@mui/material/IconButton";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
const GArt = () => {
  const [inputVal, setInputVal] = useState("");
  const [getSelectState, setSelectState] = React.useState("");
  const [img, setImg] = useState("");
  const [spin, setSpin] = useState(false);
  const handleChange = async (e) => {
    const value = e.target.value;
    setInputVal(value);
  };

  // speech started (this is a pkg)
  const { error, interimResult, isRecording, results, startSpeechToText, stopSpeechToText } =
    useSpeechToText({
      continuous: true,
      useLegacyResults: false,
    });

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;
  // speech end
  const lastIndex = results.map((items) => {
    return items.transcript;
  });
  const lastItem = lastIndex[lastIndex.length - 1];
  // speech ended
  let SendingPrompt = JSON.stringify({ inputVal: inputVal, getSelectState: getSelectState });
  let voiceData = JSON.stringify({
    inputVal: lastItem || lastIndex[0],
    getSelectState: getSelectState,
  });

  const handleClick = async () => {
    setSpin(true);
    const response = await baseUrl
      .post("/image/generator", {
        input: lastItem !== undefined && lastIndex !== "" ? voiceData : SendingPrompt,
      })
      .catch((err) => {
        console.log(err);
        alert(err.message, "please refresh and send text again");
        console.log("error");
      });
    if (response) {
      setImg(response.data.result);
      setSpin(false);
    }
  };
  //collection api
  const handleCollections = async () => {
    const imageURL = JSON.stringify(img);
    const response = await baseUrl
      .post("/imageCollection", {
        name: lastItem !== undefined && lastIndex !== "" ? lastItem || lastIndex[0] : inputVal,
        imageUrls: imageURL,
      })
      .catch((err) => {
        console.log(err);
      });
    if (response) {
      console.log(response);
      alert(response.data);
    }
  };
  const downloadImage = () => {
    console.log(img[0]?.url, "images");
    if (img && img[0]?.url) {
      saveAs(img[0]?.url, "image.jpg");
    }
  };
  const handleSelectChange = (e) => {
    setSelectState(e.target.value);
  };

  const handleDownload = () => {
    saveImg(urlArr)(async () => {
      let name = "img" + 0 + ".jpg";
      let blob = await fetch(img[0]).then((r) => r.blob());
      saveAs(blob, name);
    })();
    (async () => {
      let name2 = "img" + 2 + ".jpg";
      let blob2 = await fetch(img[2]).then((r) => r.blob());
      saveAs(blob2, name2);
    })();
  };

  return (
    <div>
      <div className="flex items-center  justify-center gap-12 mb-20 mt-20 ">
        <img width={"200px"} src={robot ? robot : "robot"} alt="" />
        <h1 className="text-white text-3xl text-center">
          Let's create an image by Automated Text-to-Image Generator!
          <br />
          <span>(Artistic Art)</span>
        </h1>
      </div>
      <div className="flex flex-col items-center justify-around">
        <div>
          <div className="formField">
            {/* speech start */}
            {/* speech end */}
            {/* we have to find the last index and put it in input then in request */}
            <TextField
              value={
                lastItem !== undefined && lastIndex !== "" ? lastItem || lastIndex[0] : inputVal
              }
              label="Enter your text"
              variant="filled"
              style={{
                width: "84vh",
                backgroundColor: "lightBlue",
                borderTopLeftRadius: "3px",
                borderBottomLeftRadius: "3px",
              }}
              onChange={(e) => {
                handleChange(e);
              }}
              name="input"
            />
            <Tooltip title="Size of Image" placement="top">
              <Select
                style={{ borderStartStartRadius: "0px" }}
                onChange={handleSelectChange}
                sx={{ background: "#27C3E3" }}
              >
                <MenuItem value={"256x256"}>256px</MenuItem>
                <MenuItem value={"512x512"}>512px</MenuItem>
                <MenuItem value={"1024x1024"}>1024px</MenuItem>
              </Select>
            </Tooltip>
            {/* speech */}
            <Button
              style={{ height: "58px" }}
              onClick={() => {
                isRecording ? stopSpeechToText() : startSpeechToText();
              }}
              variant="contained"
              sx={{ backgroundColor: "#02091E" }}
            >
              {isRecording ? (
                <KeyboardVoiceIcon
                  onClick={() => {
                    isRecording ? stopSpeechToText() : startSpeechToText();
                  }}
                  style={{ color: "white" }}
                />
              ) : (
                <MicOffIcon
                  onClick={() => {
                    isRecording ? stopSpeechToText() : startSpeechToText();
                  }}
                  style={{ color: "white" }}
                />
              )}
            </Button>
            {/* speech end */}
          </div>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              onClick={handleClick}
              sx={{ width: "90vh" }}
              variant="contained"
              style={{ backgroundColor: "rgb(39, 195, 227)" }}
            >
              Generate Image
            </Button>
          </Box>
        </div>

        <div>
          {/* mapped */}
          {img ? (
            <div className="imageBox" style={{ textAlign: "center" }}>
              <div className={`${getSelectState && getSelectState !== "" ? "null" : "gridFour"}`}>
                {img.map((items, id) => {
                  return (
                    <div style={{ position: "relative" }} key={id}>
                      <Box
                        component={LazyLoadImage}
                        src={items.url}
                        effect="blur"
                        placeholderSrc={theCat}
                        sx={{ width: "100%" }}
                      />
                      <Tooltip
                        title="Download Image"
                        sx={{ position: "absolute", zIndex: 9999, right: "0px", top: 0 }}
                      >
                        {/* <a download="image.jpg" href={items.url} title="ImageName">
                          <img alt="ImageName" src={items.url} width="100px" />
                        </a> */}
                        <IconButton>
                          <a href={items.url} download={""}>
                            <DownloadForOfflineIcon
                              onClick={handleDownload}
                              sx={{
                                backgroundColor: "#01091E",
                                borderRadius: "100%",
                                transition: "background-color 0.3s ease",
                                cursor: "pointer",
                                color: "white",
                                "&:hover": {
                                  backgroundColor: "#01091E",
                                },
                              }}
                              fontSize="large"
                            />
                          </a>
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        title="Print Image"
                        sx={{ position: "absolute", zIndex: 9999, right: "0px", top: 40 }}
                      >
                        <IconButton>
                          <LocalPrintshopIcon
                            onClick={() => alert("Device isnt available or connected")}
                            sx={{
                              backgroundColor: "#01091E",
                              color: "white",
                              borderRadius: "100%",
                              transition: "background-color 0.3s ease",
                              cursor: "pointer",
                              "&:hover": {
                                backgroundColor: "#a0a0a0",
                              },
                            }}
                            fontSize="large"
                          />
                        </IconButton>
                      </Tooltip>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div style={{ position: "relative" }}>
              <div className="center">{spin ? <Spinner /> : null}</div>
              {/* <img className="logoImage" src={imageBox} alt="" /> */}
              <div className="logoImage"></div>
            </div>
          )}
          {img ? (
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Button
                variant="contained"
                onClick={handleCollections}
                style={{ backgroundColor: "rgb(39, 195, 227)" }}
              >
                Save
              </Button>
            </Box>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default GArt;
