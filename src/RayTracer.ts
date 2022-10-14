import Camera from './Camera';
import Color from './Color';
import Intersection from './Intersection';
import Light from './Light';
import Ray from './Ray';
import Scene from './Scene';
import Thing from './Thing';
import Vector from './Vector';

export default class RayTracer {
    private maxDepth = 10;

    private intersections(ray: Ray, scene: Scene): Intersection | null {
        let closest = +Infinity;
        let closestInter: Intersection | null = null;

        for (const i in scene.things) {
            if (scene.things[i]) {
                const inter = scene.things[i].intersect(ray);
                if (inter != null && inter.dist < closest) {
                    closestInter = inter;
                    closest = inter.dist;
                }
            }
        }

        return closestInter;
    }

    private testRay(ray: Ray, scene: Scene): number | null {
        const isect = this.intersections(ray, scene);
        if (isect) {
            return isect.dist;
        }
        return null;
    }

    private traceRay(ray: Ray, scene: Scene, depth: number): Color {
        const isect = this.intersections(ray, scene);
        if (isect === null) {
            return Color.background;
        }
        return this.shade(isect, scene, depth);
    }

    private shade(isect: Intersection, scene: Scene, depth: number) {
        const d = isect.ray.dir;
        const pos = Vector.plus(Vector.times(isect.dist, d), isect.ray.start);
        const normal = isect.thing.normal(pos);
        const reflectDir = Vector.minus(
            d,
            Vector.times(2, Vector.times(Vector.dot(normal, d), normal)),
        );
        const naturalColor = Color.plus(
            Color.background,
            this.getNaturalColor(isect.thing, pos, normal, reflectDir, scene),
        );

        let reflectedColor;

        if (depth >= this.maxDepth) {
            reflectedColor = Color.grey;
        } else {
            reflectedColor = this.getReflectionColor(
                isect.thing,
                pos,
                normal,
                reflectDir,
                scene,
                depth,
                );
        }

        return Color.plus(naturalColor, reflectedColor);
    }

    private getReflectionColor(
                                thing: Thing,
                                pos: Vector,
                                normal: Vector,
                                rd: Vector,
                                scene: Scene,
                                depth: number,
                                ) {
                                return Color.scale(
                                    thing.surface.reflect(pos),
                                    this.traceRay({ start: pos, dir: rd }, scene, depth + 1),
                                );
    }

    private getNaturalColor(
                thing: Thing,
                pos: Vector,
                norm: Vector,
                rd: Vector,
                scene: Scene,
            ) {
            const addLight = (col: Color, light: Light) => {
            const ldis = Vector.minus(light.pos, pos);
            const livec = Vector.norm(ldis);
            const neatIsect = this.testRay({ start: pos, dir: livec }, scene);

            let isInShadow = false;

            if (neatIsect === null) {
                isInShadow = false;
            }

            if (neatIsect !== null) {
                isInShadow = neatIsect <= Vector.mag(ldis);
            }

            if (isInShadow) {
                return col;
            }

            const illum = Vector.dot(livec, norm);
            const lcolor = illum > 0 ? Color.scale(illum, light.color) : Color.defaultColor;
            const specular = Vector.dot(livec, Vector.norm(rd));
            const scolor = specular > 0 ? Color.scale(specular ** thing.surface.roughness, light.color) : Color.defaultColor;
            return Color.plus(
                col,
                Color.plus(
                Color.times(thing.surface.diffuse(pos), lcolor),
                Color.times(thing.surface.specular(pos), scolor),
                ),
            );
        };
        return scene.lights.reduce(addLight, Color.defaultColor);
    }

    public render(scene: Scene, ctx: CanvasRenderingContext2D | null, screenWidth: number, screenHeight: number) {
        if (ctx === null) {
            return;
        }
        const getPoint = (x: number, y: number, camera: Camera) => {
            const recenterX = (x: number) => (x - screenWidth / 2.0) / 2.0 / screenWidth;
            const recenterY = (y: number) => -(y - screenHeight / 2.0) / 2.0 / screenHeight;
            return Vector.norm(
                Vector.plus(
                    camera.forward,
                    Vector.plus(
                    Vector.times(recenterX(x), camera.right),
                    Vector.times(recenterY(y), camera.up),
                    ),
                ),
            );
        };
        for (let y = 0; y < screenHeight; y += 1) {
            for (let x = 0; x < screenWidth; x += 1) {
                const color = this.traceRay(
                    { start: scene.camera.pos, dir: getPoint(x, y, scene.camera) },
                    scene,
                    0,
                );
                const c = Color.toDrawingColor(color);
                ctx.fillStyle = 'rgb(' + String(c.r) + ', ' + String(c.g) + ', ' + String(c.b) + ')';
                ctx.fillRect(x, y, x + 1, y + 1);
            }
        }
    }
}
