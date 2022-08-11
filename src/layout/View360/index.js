import React, { useEffect } from "react";
import "./style.scss";
import { createHotSpot, createPanoViewer, createScene } from "./functions";
import { img360 } from "../../assets/img/index";
import ButtonFoot from "../../assets/component/ButtonFoot";
import { data360 } from "./data";
import Marzipano from "marzipano";
import Hotspot from "../../assets/component/Hotspot";

function View360() {
  const pano = React.useRef();
  const scenes = React.useRef([]);
  const spotsTiger = React.useRef([]);
  const spots = [spotsTiger];
  useEffect(() => {
    const settings = {
      mouseViewMode: "drag",
    };

    const panoViewer = createPanoViewer(pano.current, settings);

    scenes.current = data360.scenes.map((data) => {
      const scene = createScene(panoViewer, data);
      return { scene, spots: [] };
    });

    scenes.current.forEach((scene, index) => {
      createHotSpot(scene.scene, spots[index]);
    });

    // var Hammer = Marzipano.dependencies["hammerjs"];

    // var hammerMouse = panoViewer._hammerManagerMouse;
    // hammerMouse.manager().add(new Hammer.Press({}));
    // hammerMouse.on("press", showMarkerCommentModal);
    // var markerCoordinates = null;
    // function showMarkerCommentModal(e) {
    //   markerCoordinates = panoViewer.view().screenToCoordinates(e.center);
    //   console.debug("~ e", markerCoordinates);
    // }

    scenes.current[0].scene.scene.switchTo();
  }, []);

  const renderHotspot = (spot, index) => {
    const positionHotspot = data360.scenes[index].linkHotspot;
    return (
      <>
        {positionHotspot.map((position, i) => {
          return (
            <>
              {position.type === "hotspot" ? (
                <div ref={(e) => (spot[i] = e)} key={i}>
                  <Hotspot />
                </div>
              ) : (
                <div ref={(e) => (spot[i] = e)} key={i}>
                  <ButtonFoot />
                </div>
              )}
            </>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div ref={pano} className="pano" />
      {renderHotspot(spotsTiger, 0)}
    </>
  );
}

export default View360;
