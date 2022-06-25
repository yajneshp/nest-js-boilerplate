export class CreateCustomerDto {
    firstName: string;
    lastName: string;
    contactNumber: string;

    constructor(firstName: string, lastName: string, contactNumber: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.contactNumber = contactNumber;
    }
}
