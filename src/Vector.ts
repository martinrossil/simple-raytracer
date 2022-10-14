export default class Vector {
    public x: number;

    public y: number;

    public z: number;

    public constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public static times(k: number, v: Vector) {
        return new Vector(k * v.x, k * v.y, k * v.z);
    }

    public static minus(v1: Vector, v2: Vector) {
        return new Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    }

    public static plus(v1: Vector, v2: Vector) {
        return new Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    }

    public static dot(v1: Vector, v2: Vector) {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }

    public static mag(v: Vector) {
        return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    }

    public static norm(v: Vector) {
        const mag = Vector.mag(v);
        const div = mag === 0 ? Infinity : 1.0 / mag;
        return Vector.times(div, v);
    }

    public static cross(v1: Vector, v2: Vector) {
        return new Vector(
          v1.y * v2.z - v1.z * v2.y,
          v1.z * v2.x - v1.x * v2.z,
          v1.x * v2.y - v1.y * v2.x,
        );
    }
}
