import { randomUUID } from "crypto";

export class Customer {
  public readonly id: string;
  
  public name: string;
  public email: string;
  public password: string;
  
  constructor(
    props: Omit<Customer, "id">,
    id?: string
  ) {
    Object.assign(this, props);
    
    this.id = id ?? randomUUID();
  }
}