//Type definition for a JSON object or Array of JSON objects
type JSONValue =
    | string
    | number
    | boolean
    | null
    | JSONValue[]
    | {[key: string]: JSONValue}

export interface JSONObject {
    [k: string]: JSONValue
}
interface JSONArray extends Array<JSONValue> {}

//Type definition for Customer, as defined by the Atsea Shop API
export interface Customer {
    customerId?: number;
    name: string;
    address: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    enabled: boolean;
    role: string;
}