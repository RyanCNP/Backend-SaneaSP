export class ApiError extends Error{
    public httpStatus : number;
    constructor(message : string, httpStatus : number = 500){
        super(message);
        this.httpStatus = httpStatus;
        this.name = 'ApiError'
        Object.setPrototypeOf(this, ApiError.prototype)
    }
}