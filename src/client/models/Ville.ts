/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FeatureModel } from './FeatureModel';
import type { PointModel } from './PointModel';
/**
 * Une ville de compétition.
 */
export type Ville = {
    /**
     * Identifieur pour cette ville (nom d'organisme dans l'api DQ)
     */
    id: string;
    /**
     * Nom usuel de cette ville
     */
    nom: string;
    /**
     * Référent Overpass pour cette ville (area)
     */
    overpass?: (number | null);
    /**
     * Centroïde géométrique de cette ville
     */
    centroide: PointModel;
    /**
     * Feature GeoJSON de cette ville (fort probablement une MultiPolygon)
     */
    feature?: (FeatureModel | null);
};

