import Ray from './Ray';
import Surface from './Surface';
import Vector from './Vector';
import Intersection from './Intersection';

export default interface Thing {
    intersect: (ray: Ray) => Intersection | null;
    normal: (pos: Vector) => Vector;
    surface: Surface;
}
