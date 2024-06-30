import { faker } from '@faker-js/faker';
import {Customer} from "./typesHelper";

export function priceStringToFloat(priceString : string){
    // regex to filter out all NON digit or . chars
    let regex : RegExp = /[^0-9|.]*/

    return Number(priceString.replace(regex, ''));
}

export function createRandomUser() : Customer {
    let fullName = faker.person.firstName() + ' ' + faker.person.lastName();

    return {
        name: fullName,
        address: faker.location.streetAddress(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        username: fullName.toLowerCase().replace(/\s/g, ''),
        password: faker.internet.password(),
        enabled: false,
        role: "USER"
    }
}

export function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}