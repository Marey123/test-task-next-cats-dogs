'use client';

import { useEffect, useState, FC } from "react";
import { getDogBreeds, getCatBreeds } from "../utils/api";
import BreedCard from "./components/Card";
import Search from "./components/Search";
import { BREED_TYPE } from "../constants/constants";
import BreedInterface from "../types/Breed";
import BreedCardInterface from "../types/BreedCard";

const Home:FC = () => {
  const [breeds, setBreeds] = useState<BreedCardInterface[]>([]);
  const [filteredBreeds, setFilteredBreeds] = useState<BreedCardInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dogBreeds = await getDogBreeds();
        const catBreeds = await getCatBreeds();

        const dogBreedsWithType = dogBreeds.map((breed: BreedInterface) => ({
          ...breed,
          type: BREED_TYPE.DOG,
          emoji: "🐶"
        }));

        const catBreedsWithType = catBreeds.map((breed: BreedInterface) => ({
          ...breed,
          type: BREED_TYPE.CAT,
          emoji: "🐱"
        }));

        const allBreeds = [...dogBreedsWithType, ...catBreedsWithType];
        setBreeds(allBreeds);
        setFilteredBreeds(allBreeds);
      } catch (err) {
        setError('Error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-violet-700"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between mt-10">
      <div className="container mx-auto p-4">
        <Search
          breeds={breeds}
          onFilteredBreedsChange={setFilteredBreeds}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBreeds.map(
            (breed) =>
              breed.image && (
                <BreedCard
                  key={breed.id}
                  name={breed.name}
                  imageUrl={breed.image?.url}
                  type={breed.type}
                  emoji={breed.emoji}
                  id={breed.id}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
