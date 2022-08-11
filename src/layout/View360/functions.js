import Marzipano from "marzipano";

export const createPanoViewer = (panoElm, settings) => {
  const viewerOpts = {
    controls: {
      mouseViewMode: settings.mouseViewMode,
    },
  };
  const panoViewer = new Marzipano.Viewer(panoElm, viewerOpts);

  return panoViewer;
};

export const createScene = (panoViewer, data) => {
  // Create source.
  var urlPrefix = "tiles";
  var source = Marzipano.ImageUrlSource.fromString(
    urlPrefix + "/" + data.id + "/{z}/{f}/{y}/{x}.jpg",
    { cubeMapPreviewUrl: urlPrefix + "/" + data.id + "/preview.jpg" }
  );

  // Create geometry.
  var geometry = new Marzipano.CubeGeometry([
    {
      tileSize: 256,
      size: 256,
      fallbackOnly: true,
    },
    {
      tileSize: 512,
      size: 512,
    },
    {
      tileSize: 512,
      size: 1024,
    },
    {
      tileSize: 512,
      size: 2048,
    },
  ]);

  // Create view.
  const limiter = Marzipano.RectilinearView.limit.traditional(
    1944,
    (100 * Math.PI) / 180,
    (120 * Math.PI) / 180
  );

  const view = new Marzipano.RectilinearView(data.initialView, limiter);

  // Create scene.
  const scene = panoViewer.createScene({
    source: source,
    geometry: geometry,
    view: view,
    pinFirstLevel: true,
  });
  return {
    scene,
    data,
  };
};

export const createHotSpot = (scene, spots) => {
  scene.data.linkHotspot.forEach((position, index) => {
    scene.scene.hotspotContainer().createHotspot(spots[index], position);
  });
};
