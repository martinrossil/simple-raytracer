import Intersection from './Intersection';
import Ray from './Ray';
import Surface from './Surface';
import Thing from './Thing';
import Vector from './Vector';

export default class Sphere implements Thing {
    public radius2: number;

    public center: Vector;

    public surface: Surface;

    constructor(center: Vector, radius: number, surface: Surface) {
        this.radius2 = radius * radius;
        this.center = center;
        this.surface = surface;
    }

    public normal(pos: Vector): Vector {
        return Vector.norm(Vector.minus(pos, this.center));
    }

    public intersect(ray: Ray): Intersection | null {
        const eo = Vector.minus(this.center, ray.start);
        const v = Vector.dot(eo, ray.dir);
        let dist = 0;
        if (v >= 0) {
            const disc = this.radius2 - (Vector.dot(eo, eo) - v * v);
            if (disc >= 0) {
                dist = v - Math.sqrt(disc);
            }
        }

        if (dist === 0) {
            return null;
        }

        return {
            thing: this,
            ray,
            dist,
        };
    }
}
