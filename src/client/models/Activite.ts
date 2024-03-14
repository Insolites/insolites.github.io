/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Activite = {
    /**
     * Identificateur unique pour cette activité
     */
    id?: string;
    /**
     * Identificateur de l'utilisateur
     */
    user: string;
    /**
     * Quels sports ont été pratiqués lors de cette activité
     */
    sport: Array<'Marche' | 'Vélo'>;
    /**
     * Date de début de l'activité
     */
    date: string;
    /**
     * L'activité est-elle confirmée?
     */
    confirme?: boolean;
    /**
     * Identificateur du plateau d'activité où l'activité a eu lieu
     */
    plateau: string;
};

