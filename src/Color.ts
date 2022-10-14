export default class Color {
    public r: number;

    public g: number;

    public b: number;

    public constructor(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    public static scale(k: number, v: Color) {
        return new Color(k * v.r, k * v.g, k * v.b);
    }

    public static plus(v1: Color, v2: Color) {
        return new Color(v1.r + v2.r, v1.g + v2.g, v1.b + v2.b);
    }

    public static times(v1: Color, v2: Color) {
        return new Color(v1.r * v2.r, v1.g * v2.g, v1.b * v2.b);
    }

    public static white = new Color(1.0, 1.0, 1.0);

    public static red = new Color(1.0, 0.0, 0.0);

    public static grey = new Color(0.5, 0.5, 0.5);

    public static black = new Color(0.0, 0.0, 0.0);

    public static background = Color.black;

    public static defaultColor = Color.black;

    static toDrawingColor(c: Color) {
        const legalize = (d: number) => (d > 1 ? 1 : d);
        return {
            r: Math.floor(legalize(c.r) * 255),
            g: Math.floor(legalize(c.g) * 255),
            b: Math.floor(legalize(c.b) * 255),
        };
    }
  }
