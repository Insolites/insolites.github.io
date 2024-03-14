/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Activite } from '../models/Activite';
import type { Espece } from '../models/Espece';
import type { Observation_Input } from '../models/Observation_Input';
import type { Observation_Output } from '../models/Observation_Output';
import type { Plateau } from '../models/Plateau';
import type { RootModel_List_Score__ } from '../models/RootModel_List_Score__';
import type { Utilisateur } from '../models/Utilisateur';
import type { Ville } from '../models/Ville';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Bonjour!
     * @returns string Successful Response
     * @throws ApiError
     */
    public static homePageGet(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }
    /**
     * Liste de villes
     * Obtenir la liste de villes de compétition.
     * @returns Ville Successful Response
     * @throws ApiError
     */
    public static villesVillesGet({
        geometrie = false,
    }: {
        /**
         * Retourner perimètre en GeoJSON
         */
        geometrie?: boolean,
    }): CancelablePromise<Array<Ville>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/villes',
            query: {
                'geometrie': geometrie,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Ville par emplacement
     * Localiser un emplacement dans une des villes de compétition.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static villeWsg84VilleLatitudeLongitudeGet({
        latitude,
        longitude,
        geometrie = false,
    }: {
        latitude: number,
        longitude: number,
        /**
         * Retourner perimètre en GeoJSON
         */
        geometrie?: boolean,
    }): CancelablePromise<(Ville | null)> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ville/{latitude},{longitude}',
            path: {
                'latitude': latitude,
                'longitude': longitude,
            },
            query: {
                'geometrie': geometrie,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Ville par identificateur
     * Obtenir les informations pour une ville de compétition.
     * @returns Ville Successful Response
     * @throws ApiError
     */
    public static villeIdVilleIdGet({
        id,
        geometrie = false,
    }: {
        id: string,
        geometrie?: boolean,
    }): CancelablePromise<Ville> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ville/{id}',
            path: {
                'id': id,
            },
            query: {
                'geometrie': geometrie,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Plateaux par emplacement
     * Localiser des activités par emplacement
     * @returns any[] Successful Response
     * @throws ApiError
     */
    public static activWgs84PlateauxLatitudeLongitudeGet({
        latitude,
        longitude,
        proximite = 10,
        limit = 10,
        geometrie = false,
    }: {
        latitude: number,
        longitude: number,
        /**
         * Distance maximale en km
         */
        proximite?: number,
        /**
         * Nombre maximal de plateaux à retourner
         */
        limit?: number,
        /**
         * Retourner perimètre en GeoJSON
         */
        geometrie?: boolean,
    }): CancelablePromise<Array<any[]>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/plateaux/{latitude},{longitude}',
            path: {
                'latitude': latitude,
                'longitude': longitude,
            },
            query: {
                'proximite': proximite,
                'limit': limit,
                'geometrie': geometrie,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Plateaux par ville
     * Localiser des activités par ville
     * @returns Plateau Successful Response
     * @throws ApiError
     */
    public static activVillePlateauxVilleGet({
        ville,
        geometrie = false,
    }: {
        ville: string,
        geometrie?: boolean,
    }): CancelablePromise<Array<Plateau>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/plateaux/{ville}',
            path: {
                'ville': ville,
            },
            query: {
                'geometrie': geometrie,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Palmarès des villes
     * Obtenir les palmares des villes
     * @returns RootModel_List_Score__ Successful Response
     * @throws ApiError
     */
    public static palmaresPalmaresGet(): CancelablePromise<RootModel_List_Score__> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/palmares',
        });
    }
    /**
     * Création/MÀJ activité
     * Creer ou mettre a jour une activite
     * @returns Activite Successful Response
     * @throws ApiError
     */
    public static putActiviteActivitePut({
        requestBody,
    }: {
        requestBody: Activite,
    }): CancelablePromise<Activite> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/activite',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Activites
     * Obtenir les contributions d'un utilisateur
     * @returns Activite Successful Response
     * @throws ApiError
     */
    public static activitesActivitesGet({
        user,
    }: {
        user: string,
    }): CancelablePromise<Array<Activite>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/activites',
            query: {
                'user': user,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Création/MÀJ observation
     * Creer ou mettre a jour une observation
     * @returns Observation_Output Successful Response
     * @throws ApiError
     */
    public static putObservationObservationPut({
        requestBody,
    }: {
        requestBody: Observation_Input,
    }): CancelablePromise<Observation_Output> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/observation',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Observations
     * Obtenir les observations d'EEE
     * @returns Observation_Output Successful Response
     * @throws ApiError
     */
    public static observationsObservationsGet({
        user,
    }: {
        user?: (string | null),
    }): CancelablePromise<Array<Observation_Output>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/observations',
            query: {
                'user': user,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Especes
     * Obtenir la liste d'EEE
     * @returns Espece Successful Response
     * @throws ApiError
     */
    public static especesEspecesGet(): CancelablePromise<Array<Espece>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/especes',
        });
    }
    /**
     * Création ou MÀJ utilisateur
     * Création d'un utilisateur
     * @returns Utilisateur Successful Response
     * @throws ApiError
     */
    public static putUserUserPut({
        requestBody,
    }: {
        requestBody: Utilisateur,
    }): CancelablePromise<Utilisateur> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/user',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * utilisateur par ID
     * Recherche d'un utilisateur
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getUserUserIdGet({
        id,
    }: {
        id: string,
    }): CancelablePromise<(Utilisateur | null)> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
