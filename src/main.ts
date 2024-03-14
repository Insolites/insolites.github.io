import { Map, View } from "ol";
import { fromLonLat } from "ol/proj";
import { Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import { GeoJSON } from "ol/format";
import WMTS, { optionsFromCapabilities } from "ol/source/WMTS";
import WMTSCapabilities from "ol/format/WMTSCapabilities";

import { OpenAPI, DefaultService } from "./client";

const repentignyLonLat = [-73.431657, 45.768380]

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

/* Pour debug */
OpenAPI.BASE = "http://localhost:8092/api/v1"
const plateaux = await DefaultService.activVillePlateauxVilleGet({ville: "ville-de-repentigny", geometrie: true});
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
