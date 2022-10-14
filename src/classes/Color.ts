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
}
