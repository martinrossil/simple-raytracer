import Camera from './Camera';
import Light from './Light';
import Thing from './Thing';

export default interface Scene {
    things: Thing[];
    lights: Light[];
    camera: Camera;
}
