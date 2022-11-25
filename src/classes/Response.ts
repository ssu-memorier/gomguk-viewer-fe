export default class Response {
    isSuccess: boolean;
    payload: any;
    message: string;

    constructor(isSuccess: boolean, payload: any, message = '') {
        this.isSuccess = isSuccess;
        this.payload = payload;
        this.message = message;
    }
    static success(payload?: any) {
        return new Response(true, payload);
    }
    static failed(message?: string) {
        return new Response(false, null, message);
    }
}
