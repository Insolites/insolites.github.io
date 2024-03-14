/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Utilisateur = {
    /**
     * Identificateur unique pour cet utilisateur
     */
    id?: string;
    /**
     * Identificateur court pour cet utilisateur
     */
    nom: string;
    /**
     * Nom complet de cet utilisateur
     */
    nom_complet?: (string | null);
    /**
     * Sports pratiqués par cet utilisateur
     */
    sports: Array<'Marche' | 'Vélo'>;
    /**
     * Date de création de l'utilisateur
     */
    debut?: string;
    /**
     * Date de dernière utilisation
     */
    dernier?: string;
};

