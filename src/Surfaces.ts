import Color from './Color';
import Surface from './Surface';

export namespace Surfaces {
    export const shiny: Surface = {
        diffuse: () => Color.white,
        specular: () => Color.grey,
        reflect: () => 0.7,
        roughness: 250,
    };

    export const shinyRed: Surface = {
        diffuse: () => Color.red,
        specular: () => Color.red,
        reflect: () => 0.1,
        roughness: 250,
    };

    export const checkerboard: Surface = {
        diffuse: (pos) => {
            if ((Math.floor(pos.z) + Math.floor(pos.x)) % 2 !== 0) {
            return Color.white;
            }
            return Color.black;
        },
        specular: () => Color.white,
        reflect: (pos) => {
            if ((Math.floor(pos.z) + Math.floor(pos.x)) % 2 !== 0) {
            return 0.1;
            }
            return 0.7;
        },
        roughness: 150,
    };
}
