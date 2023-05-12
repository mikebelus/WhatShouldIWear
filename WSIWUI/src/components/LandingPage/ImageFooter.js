import React, { useEffect, useState } from "react";
import { Button, Image, Text } from "@chakra-ui/react";
import { Grid } from "@chakra-ui/react";
import "./footer.css";
import Modal from "react-modal";
import { CloseIcon } from "@chakra-ui/icons";
import Cookies from "universal-cookie";
import axios from "axios";
Modal.setAppElement("#root");

const ImageFooter = (props) => {
  //let showdata = true;
  const cookies = new Cookies();
  const [isOpen, setIsOpen] = useState(false);
  const [showdata, setshowdata] = useState(false);
  const [src1, setsrc1] = useState([]);
  const [src2, setsrc2] = useState([]);
  const [setstaas, setsetstaas] = useState(false);
  const [valueofimage, setvalueofimage] = useState([]);
  // const [valueofimage, setvalueofimage] = useState([]);
  // function toggleModal() {
  //   setIsOpen(!isOpen);
  // }
  const toggleiframe = () => {
    
    //setshowdata(!showdata);
    // const longitude = cookies.get("longitude");
    // const latitude = cookies.get("latitude");
    const latitude = props.latlong.latitude;
    const longitude = props.latlong.longitude;
    const t1 =
      "https://www.rainviewer.com/map.html?loc=" +
      latitude +
      "," +
      longitude +
      ",5&oFa=0&oC=1&oU=0&oCS=1&oF=0&oAP=1&c=3&o=90&lm=1&layer=radar&sm=1&sn=1&hu=0";
    setsrc1(t1);
    const t2 =
      "https://www.rainviewer.com/map.html?loc=" +
      latitude +
      "," +
      longitude +
      ",5&oFa=0&oC=1&oU=0&oCS=1&oF=0&oAP=1&c=3&o=90&lm=1&layer=sat&sm=1&sn=1&hu=0";
    setsrc2(t2);
    setshowdata(true)
  };
  useEffect(() => {
    const longitude = cookies.get("longitude");
    const latitude = cookies.get("latitude");
    // const latitude = props.latlong.latitude;
    // const longitude = props.latlong.longitude;
    setshowdata(false)
    if (typeof longitude != "undefined" && typeof latitude != "undefined") {
      if(latitude != '' && longitude!=''){
        var config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `https://api.windy.com/api/webcams/v2/list/nearby=${latitude},${longitude},10?show=webcams:image`,
          headers: {
            "x-windy-key": "9vDr8AL8jAcXfXmcULOPs7nLLuiqCyUY",
          },
        };
  
        axios(config)
          .then(function (response) {
            // console.log(response.data);
            if (response.data.result.total != 0) {
              if (
                response.data.result.webcams[0].image.current.preview != "" ||
                typeof response.data.result.webcams[0].image.current.preview !=
                  "undefined"
              ) {
                setsetstaas(true);
                setvalueofimage(
                  response.data.result.webcams[0].image.current.preview
                );
              } else {
                setvalueofimage("No Image");
                setsetstaas(false);
              }
              // test(response);
            } else {
              setsetstaas(false);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        toggleiframe();
      }
    }
    //Runs on the first render
    //And any time any dependency value changes
  }, [props]);
  return (
    <>
    <div className="feedback_footer">
      {/* <Grid
        templateColumns="repeat(2, 1fr)"
        gap={"0"}
        marginTop={"2vh"}
        display={"flex"}
        flexWrap="wrap"
        justifyContent={"space-around"}
        bg="gray.100"
        mb="2vh"
      > */}
        {/* : //   <div >
            //   {" "} */}
        {/* {showdata ? alert(showdata) : ""} */}

        {showdata && props.postal_code!==''? (
          <div className="map-image-container" style={{ width: "100%", display: "flex"}}>
            <div className="map-image">
              <iframe width={"100%"} src={src1} height={"300px"}></iframe>
            </div>
            <div className="map-image">
              {setstaas ? (
                <img
                  src={valueofimage}
                  alt="No Image Available"
                  style={{height: "300px", width: "100%"}}
                  //style={{ width: "100%"  }}
                 // height={"300px"}
                />
              ) : (
                "Image not available for this area"
              )}
            </div>
          </div>
        ) 
        : (
          // <button
          //   onClick={() => window.location.reload(false)}
          //   style={{ width: "20%", border: "1px solid black" }}
          // >
          //   Load Images
          // </button>
          <div> Radar Data Unavailable </div>
        )
        }

        {/* </div> */}
      {/* </Grid> */}

      
        {/* <Text
          color={"black"}
          right="2"
          fontSize={"xl"}
          position={"absolute"}
          mt="1vh"
        >
          <Button onClick={toggleModal}>Feedback</Button>
        </Text> */}
      </div>
    </>
  );
};

export default ImageFooter;