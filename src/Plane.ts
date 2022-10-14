import Intersection from './Intersection';
import Ray from './Ray';
import Surface from './Surface';
import Thing from './Thing';
import Vector from './Vector';

export default class Plane implements Thing {
    public norm: Vector;

    public offset: number;

    public surface: Surface;

    constructor(norm: Vector, offset: number, surface: Surface) {
        this.norm = norm;
        this.offset = offset;
        this.surface = surface;
    }

    public normal(): Vector {
        return this.norm;
    }

    public intersect(ray: Ray): Intersection | null {
        const denom = Vector.dot(this.norm, ray.dir);
        if (denom > 0) {
            return null;
        }

        const dist = (Vector.dot(this.norm, ray.start) + this.offset) / -denom;
        return {
            thing: this,
            ray,
            dist,
        };
    }
}
