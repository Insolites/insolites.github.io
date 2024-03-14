import { Map, View } from "ol";
import { fromLonLat } from "ol/proj";
import { Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import { GeoJSON } from "ol/format";
import WMTS, { optionsFromCapabilities } from "ol/source/WMTS";
import WMTSCapabilities from "ol/format/WMTSCapabilities";

import { OpenAPI, DefaultService } from "./client";
OpenAPI.BASE = "http://points-air.ecolingui.ca/api/v1"
// For debugging (avoid CORS issues)
// OpenAPI.BASE = "http://localhost:8092/api/v1"

const repentignyLonLat = [-73.431657, 45.768380]

window.addEventListener("load", initApp);

async function initApp() {
  const plateaux = await DefaultService.activVillePlateauxVilleGet({ ville: "ville-de-repentigny", geometrie: true });
  const geoj = new GeoJSON();
  const geojOpts = {
    featureProjection: "EPSG:3857",
  };
  const plateauxSource = new VectorSource({
    features: plateaux.map(p => geoj.readFeature(p.feature, geojOpts))
  });
  const plateauxLayer = new VectorLayer({
    source: plateauxSource
  });

  const parser = new WMTSCapabilities();
  let response = await fetch("./wmts.xml");
  if (!response.ok) throw "Impossible de télécharger les infos WMTS";
  const captext = await response.text();
  const caps = parser.read(captext);
  const options = optionsFromCapabilities(caps, {
    layer: "carte_gouv_qc",
    matrixSet: "EPSG_3857",
  });
  if (options === null)
    throw "Impossible de construire options de WMTS";
  options.attributions = "© Gouvernement du Québec";
  options.attributionsCollapsible = false;
  new Map({
    target: "map",
    layers: [
      new TileLayer({
        source: new WMTS(options),
      }),
      plateauxLayer
    ],
    view: new View({
      center: fromLonLat(repentignyLonLat),
      zoom: 14,
    }),
  });
}
