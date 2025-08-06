import { describe, test, expect } from "vitest";
import { Customer } from "./Customer";

describe("Customer Entity", () => {
  test("successfully create an customer entity", () => {
    const customer = new Customer({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "johndoe123"
    });
    
    expect(customer).toBeInstanceOf(Customer);
    expect(customer).toEqual({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      password: customer.password
    });
  });
});