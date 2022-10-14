import Vector from './Vector';

export default class Camera {
    public forward: Vector;

    public right: Vector;

    public up: Vector;

    public pos: Vector;

    constructor(pos: Vector, lookAt: Vector) {
        this.pos = pos;
        const down = new Vector(0.0, -1.0, 0.0);
        this.forward = Vector.norm(Vector.minus(lookAt, pos));
        this.right = Vector.times(1.5, Vector.norm(Vector.cross(this.forward, down)));
        this.up = Vector.times(1.5, Vector.norm(Vector.cross(this.forward, this.right)));
    }
  }
