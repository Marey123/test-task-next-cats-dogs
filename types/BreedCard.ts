import { BREED_TYPE } from "../constants/constants"

export default interface BreedCardInterface {
    id: string;
    name: string;
    image: {
      url: string;
    };
    emoji: string;
    type: BREED_TYPE.DOG | BREED_TYPE.CAT;
  }