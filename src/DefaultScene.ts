import Camera from './Camera';
import Color from './Color';
import Light from './Light';
import Plane from './Plane';
import Scene from './Scene';
import Sphere from './Sphere';
import { Surfaces } from './Surfaces';
import Thing from './Thing';
import Vector from './Vector';

export default class DefaultScene implements Scene {
    public get things(): Thing[] {
        return [
            new Plane(new Vector(0.0, 1.0, 0.0), 0.0, Surfaces.checkerboard),
            new Sphere(new Vector(0.0, 1.0, -0.25), 1.0, Surfaces.shinyRed),
            new Sphere(new Vector(-1.0, 0.5, 1.5), 0.5, Surfaces.shiny),
        ];
    }

    public get lights(): Light[] {
        return [
            { pos: new Vector(-2.0, 2.5, 0.0), color: new Color(0.49, 0.07, 0.07) },
            { pos: new Vector(1.5, 2.5, 1.5), color: new Color(0.07, 0.07, 0.49) },
            // { pos: new Vector(1.5, 2.5, -1.5), color: new Color(0.07, 0.49, 0.071) },
            { pos: new Vector(1.5, 2.5, -1.5), color: new Color(1.0, 1.0, 1.0) },
            { pos: new Vector(0.0, 3.5, 0.0), color: new Color(0.21, 0.21, 0.35) },
        ];
    }

    public get camera(): Camera {
        const pos = new Vector(3.0, 2.0, 4.0);
        const lookAt = new Vector(-1.0, 0.5, 0.0);
        return new Camera(pos, lookAt);
    }
}
