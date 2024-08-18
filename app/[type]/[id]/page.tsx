"use client";

import { useEffect, useState } from "react";
import {
  getDogBreeds,
  getCatBreeds,
  getImagesDogsBreeds,
  getImagesCatsBreeds,
} from "../../../utils/api";

import Breed from "../../../types/Breed"
import { BREED_TYPE } from "../../../constants/constants";
import Loading from "@/app/components/Loading";

const BreedPage = ({
  params,
}: {
  params: { type: BREED_TYPE.DOG | BREED_TYPE.CAT; id: string };
}) => {
  const { id, type } = params;
  const [breed, setBreed] = useState<Breed | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isDogType = type === BREED_TYPE.DOG;

  const fetchBreedData = async () => {
    try {
      const breeds = isDogType ? await getDogBreeds() : await getCatBreeds();
      const foundBreed = breeds.find(
        (breed: Breed) => String(breed.id) === String(id)
      );

      if (!foundBreed) {
        throw new Error("Breed not found");
      }

      setBreed(foundBreed);

      const fetchImages = isDogType ? getImagesDogsBreeds : getImagesCatsBreeds;
      const imagesData = await fetchImages(id);
      setImages(imagesData.map((image: { url: string }) => image.url));
    } catch (err) {
      setError(
        (err as Error).message || "Error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBreedData();
  }, [id, type]);

  if (loading) {
    return (<Loading/>);
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-10">
    <div className="container mx-auto p-6 bg-violet-50 rounded-xl shadow-lg">
      <div className="flex flex-col">
        <div className="w-full h-52 flex justify-center md:justify-start overflow-hidden mb-6">
          <img
            src={breed?.image?.url || `/default-${type}.jpg`}
            alt={breed?.name}
            className=" h-full w-auto object-contain rounded-lg"
          />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          {breed?.name}
        </h1>
        <div className="bg-violet-200 p-6 rounded-lg shadow-md">
          {isDogType ? (
            <>
              <p>
                <strong>Weight:</strong> {breed?.weight.imperial} lbs (
                {breed?.weight.metric} kg)
              </p>
              <p>
                <strong>Height:</strong> {breed?.height.imperial} inches (
                {breed?.height.metric} cm)
              </p>
              <p>
                <strong>Bred For:</strong> {breed?.bred_for || "no information"}
              </p>
              <p>
                <strong>Breed Group:</strong> {breed?.breed_group || "no information"}
              </p>
            </>
          ) : (
            <p>
              <strong>Description:</strong>
              {breed?.description || "no information"}
            </p>
          )}

          <p>
            <strong>Life Span:</strong> {breed?.life_span || "no information"}
          </p>
          <p>
            <strong>Temperament:</strong> {breed?.temperament || "no information"}
          </p>
          <p>
            <strong>Origin:</strong> {breed?.origin || "no information"}
          </p>
        </div>
        {images.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Gallary</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((url, index) => (
                <div
                  key={index}
                  className="w-full max-h-40 bg-violet-100 flex items-center justify-center overflow-hidden rounded-lg"
                >
                  <img
                    src={url}
                    alt="image"
                    className="w-full h-full object-contain "
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default BreedPage;
