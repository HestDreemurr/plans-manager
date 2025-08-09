export class ClientError extends Error {
  public readonly status: number;
  
  constructor(
    message: string,
    status: string = 400
  ) {
    super(message);
    this.status = status;
    
    Object.setPrototypeOf(this, ClientError.prototype);
  }
}