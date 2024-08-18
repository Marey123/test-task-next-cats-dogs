import { BASE_CAT_API_URL, BASE_DOG_API_URL, DOG_API_KEY, CAT_API_KEY } from "../constants/constants";

const requestOptionsDogs = {
    method: 'GET',
    headers: new Headers({
        "Content-Type": "application/json",
        "x-api-key": DOG_API_KEY,
    }),
    redirect: 'follow' as RequestRedirect,
};

const requestOptionsCats = {
    method: 'GET',
    headers: new Headers({
        "Content-Type": "application/json",
        "x-api-key": CAT_API_KEY,
    }),
    redirect: 'follow' as RequestRedirect,
};

export const getDogBreeds = async () => {
    const response = await fetch(`${BASE_DOG_API_URL}/breeds`, requestOptionsDogs);
    return response.json();
};

export const getCatBreeds = async () => {
    const response = await fetch(`${BASE_CAT_API_URL}/breeds`, requestOptionsCats);
    return response.json();
};

export const getImagesDogsBreeds = async (id: string) => {
    const response = await fetch(`${BASE_DOG_API_URL}/images/search?limit=10&breed_ids=${id}`, requestOptionsDogs);
    return response.json();
};

export const getImagesCatsBreeds = async (id: string) => {
    const response = await fetch(`${BASE_CAT_API_URL}/images/search?limit=10&breed_ids=${id}`, requestOptionsDogs);
    return response.json();
};


