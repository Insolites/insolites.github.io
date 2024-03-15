import { Feature, Map, View } from "ol";
import { fromLonLat } from "ol/proj";
import { Source, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import { GeoJSON } from "ol/format";
import { Control } from "ol/control";
import { defaults } from "ol/control/defaults";
import { circular } from "ol/geom/Polygon";
import WMTS, { optionsFromCapabilities } from "ol/source/WMTS";
import WMTSCapabilities from "ol/format/WMTSCapabilities";

import { OpenAPI, DefaultService } from "./client";
import { Point } from "ol/geom";
OpenAPI.BASE = "https://points-air.ecolingui.ca/api/stable";
// For debugging (avoid CORS issues)
// OpenAPI.BASE = "http://localhost:8092/api/v1";

const repentignyLonLat = [-73.431657, 45.76838];

window.addEventListener("load", initApp);

async function makeTiles() {
  const parser = new WMTSCapabilities();
  let response = await fetch("./wmts.xml");
  if (!response.ok) throw "Impossible de télécharger les infos WMTS";
  const captext = await response.text();
  const caps = parser.read(captext);
  const options = optionsFromCapabilities(caps, {
    layer: "carte_gouv_qc",
    matrixSet: "EPSG_3857",
  });
  if (options === null) throw "Impossible de construire options de WMTS";
  options.attributions = "© Gouvernement du Québec";
  options.attributionsCollapsible = false;
  return new TileLayer({
    source: new WMTS(options),
  });
}

function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    const options = {
      enableHighAccuracy: true,
    };
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

async function geolocateMe(map: Map, source: VectorSource) {
  const pos = await getCurrentPosition();
  const coords = [pos.coords.longitude, pos.coords.latitude];
  const accuracy = circular(coords, pos.coords.accuracy);
  source.clear(true);
  source.addFeatures([
    //new Feature(accuracy.transform("EPSG:4326", map.getView().getProjection())),
    new Feature(new Point(fromLonLat(coords))),
  ]);
  map.getView().fit(source.getExtent(), {
    maxZoom: 16,
    duration: 500,
  });
}

async function initApp() {
  const plateaux = await DefaultService.activVillePlateauxVilleGet({
    ville: "ville-de-repentigny",
    geometrie: true,
  });
  const geoj = new GeoJSON();
  const geojOpts = {
    featureProjection: "EPSG:3857",
  };
  const plateauxSource = new VectorSource({
    features: plateaux.map((p) => geoj.readFeature(p.feature, geojOpts)),
  });
  const plateauxLayer = new VectorLayer({
    source: plateauxSource,
  });
  const tileLayer = await makeTiles();
  const locate = document.getElementById("locate");
  if (locate === null) throw "Impossible de trouver element locate";
  const geolocSource = new VectorSource();
  const geolocLayer = new VectorLayer({
    source: geolocSource,
  });

  const controls = defaults();
  controls.extend([
    new Control({
      element: locate,
    }),
  ]);
  const map = new Map({
    target: "map",
    layers: [tileLayer, plateauxLayer, geolocLayer],
    view: new View({
      center: fromLonLat(repentignyLonLat),
      zoom: 14,
    }),
  });
  locate.addEventListener("click", () => geolocateMe(map, geolocSource));
}
