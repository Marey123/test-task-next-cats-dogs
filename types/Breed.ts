export default interface BreedInterface {
    id: string;
    name: string;
    image: {
        url: string;
    };
    weight: {
        imperial: string;
        metric: string;
    };
    height: {
        imperial: string;
        metric: string;
    };
    bred_for: string;
    breed_group: string;
    life_span: string;
    temperament: string;
    origin: string;
    description: string;
}
