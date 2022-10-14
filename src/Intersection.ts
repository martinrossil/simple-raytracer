import Ray from './Ray';
import Thing from './Thing';

export default interface Intersection {
    thing: Thing;
    ray: Ray;
    dist: number;
}
