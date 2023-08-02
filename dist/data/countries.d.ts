interface CountryData {
    name: string;
    native: string;
    phone: number[];
    continent: string;
    capital: string;
    currency: string[];
    languages: string[];
    flag: string;
    flagURL: string;
}
interface Countries {
    [countryCode: string]: CountryData;
}
declare const countries: Countries;
export { countries };
