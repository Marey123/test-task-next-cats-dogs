import { FC } from "react";
import Link from "next/link";
import { BREED_TYPE } from "../../constants/constants";

interface BreedCardProps {
    name: string;
    imageUrl: string;
    type: BREED_TYPE.DOG | BREED_TYPE.CAT;
    emoji: string;
    id: string;
}

const Card: FC<BreedCardProps> = ({ name, imageUrl, type, id, emoji }) => (
    <Link href={`/${type}/${id}`}>
        <div className="rounded-xl overflow-hidden shadow-lg cursor-pointer transform transition duration-300 hover:scale-110">
            <div className="w-full h-48 bg-violet-50 flex items-center justify-center overflow-hidden">
                <img
                    className="w-full h-full object-contain"
                    src={imageUrl}
                    alt={name}
                />
            </div>
            <div className="px-6 py-4 bg-violet-200 shadow-xl shadow-violet-500 ">
                <div className="font-bold text-xl mb-2">{name} {emoji}</div>
            </div>
        </div>
    </Link>
);

export default Card;
