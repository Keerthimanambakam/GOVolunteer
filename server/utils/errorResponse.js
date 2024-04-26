class ErrorResponse extends Error{
    constructor(message, codeStatus){
        super(message) ; 
        this.codeStatus = this.codeStatus;
    }
}

export default ErrorResponse;