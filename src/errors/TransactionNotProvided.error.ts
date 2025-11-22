export class TransactionNotProvided extends Error {
    constructor(message: string) {
        super(message);

        this.name = 'TransactionNotProvided'
        Object.setPrototypeOf(this, TransactionNotProvided.prototype)
    }
}