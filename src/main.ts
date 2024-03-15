import { Feature, Map, View } from "ol";
import { fromLonLat, toLonLat } from "ol/proj";
import { Source, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import { GeoJSON } from "ol/format";
import { Control } from "ol/control";
import { defaults } from "ol/control/defaults";
import WMTS, { optionsFromCapabilities } from "ol/source/WMTS";
import WMTSCapabilities from "ol/format/WMTSCapabilities";

import { OpenAPI, DefaultService } from "./client";
import { Point } from "ol/geom";
OpenAPI.BASE = "https://points-air.ecolingui.ca/api/stable";
// For debugging (avoid CORS issues)
// OpenAPI.BASE = "http://localhost:8092/api/v1";

let map: Map;
const geoj = new GeoJSON();
const geojOpts = {
  featureProjection: "EPSG:3857",
};
const plateauxSource = new VectorSource();
const geolocSource = new VectorSource();

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

async function updateActivities(): Promise<void> {
  const view = map.getView();
  const center = view.getCenter();
  if (center === undefined)
    throw "WTF map has no center";
  const [longitude, latitude] = toLonLat(center);
  const r = await DefaultService.activWgs84PlateauxLatitudeLongitudeGet({
    latitude, longitude, geometrie: true
  });
  geolocSource.clear(true);
  const point = new Feature(new Point(center));
  geolocSource.addFeature(point);
  plateauxSource.clear();
  plateauxSource.addFeatures(r.map(([_, p]) => geoj.readFeature(p.feature, geojOpts)));
  const target = document.getElementById("activites");
  if (target === null)
    throw "WTF no target";
  target.innerHTML = "";
  const ul = document.createElement("ul");
  for (const [dist, p] of r) {
    const li = document.createElement("li");
    li.innerHTML = `${p.nom} (${dist.toFixed(0)}m)`;
    ul.appendChild(li);
  }
  target.appendChild(ul);
}

async function updatePalmares(): Promise<void> {
  const p = await DefaultService.palmaresPalmaresGet();
  const target = document.getElementById("palmares");
  if (target === null)
    throw "WTF no target";
  target.innerHTML = "";
  const ul = document.createElement("ul");
  for (const {score, ville} of p) {
    const li = document.createElement("li");
    li.innerHTML = `${ville}: ${score}`;
    ul.appendChild(li);
  }
  target.appendChild(ul);
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
  const position = [pos.coords.longitude, pos.coords.latitude];
  source.clear(true);
  source.addFeatures([
    new Feature(new Point(fromLonLat(position))),
  ]);
  map.getView().fit(source.getExtent(), {
    maxZoom: 16,
    duration: 500,
  });
  updateActivities()
}

async function initApp() {
  const plateauxLayer = new VectorLayer({
    source: plateauxSource,
  });
  const tileLayer = await makeTiles();
  const locate = document.getElementById("locate");
  if (locate === null) throw "Impossible de trouver element locate";
  const geolocLayer = new VectorLayer({
    source: geolocSource,
  });

  const controls = defaults();
  controls.extend([
    new Control({
      element: locate,
    }),
  ]);
  map = new Map({
    target: "map",
    layers: [tileLayer, plateauxLayer, geolocLayer],
    view: new View({
      center: fromLonLat([-73.431657, 45.76838]),
      zoom: 14,
    }),
  });
  locate.addEventListener("click", () => geolocateMe(map, geolocSource));
  map.on("moveend", updateActivities);
  updateActivities();
  updatePalmares();
}
