/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FeatureModel } from './FeatureModel';
import type { PointModel } from './PointModel';
/**
 * Plateau d'activité physique pour participer dans la compétition.
 */
export type Plateau = {
    /**
     * Identificateur unique pour ce plateau d'activité
     */
    id?: string;
    /**
     * Nom usuel de ce plateau
     */
    nom: string;
    /**
     * Identificateur de la ville où se trouve ce plateau
     */
    ville: string;
    /**
     * Saisons d'utilisation de ce plateau
     */
    saison: 'Hiver' | 'TroisSaisons' | 'QuatreSaisons';
    /**
     * Sports pratiqués à cet endroits
     */
    sports: Array<'Marche' | 'Vélo'>;
    /**
     * Centroïde géométrique de ce plateau
     */
    centroide: PointModel;
    /**
     * Feature GeoJSON de ce plateau
     */
    feature?: (FeatureModel | null);
};

