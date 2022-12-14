export default class Color {
    red = 0;
    green = 0;
    blue = 0;
    static YELLOW = new Color(179, 143, 14);
    constructor(red: number, green: number, blue: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
    get code() {
        const redHex = ('00' + this.red.toString(16)).slice(-2);
        const greenHex = ('00' + this.green.toString(16)).slice(-2);
        const blueHex = ('00' + this.blue.toString(16)).slice(-2);

        return `#${redHex}${greenHex}${blueHex}`;
    }
    static fromHex(hex: string) {
        const red = Number.parseInt(hex.slice(1, 3), 16);
        const green = Number.parseInt(hex.slice(3, 5), 16);
        const blue = Number.parseInt(hex.slice(5, 7), 16);
        return new Color(red, green, blue);
    }
}
