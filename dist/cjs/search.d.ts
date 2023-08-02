interface Address {
    city: string;
    countryCode: string;
    timeZone: string;
    type: string;
}
interface InternetAddress {
    id: string;
    service: string;
    caption: string;
    type: string;
}
interface CountryDetails {
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
interface Data {
    name?: string;
    altName?: string;
    addresses?: Address[];
    internetAddresses?: InternetAddress[];
}
interface SearchData {
    number: string;
    countryCode: string;
    installationId: string;
}
interface BulkSearchData {
    data: Data[];
}
declare class Format {
    private data;
    constructor(data: BulkSearchData);
    json(): BulkSearchData;
    xml(color?: boolean): string;
    yaml(color?: boolean): string;
    text(color?: boolean, space?: boolean): string;
    getName(): string;
    getAlternateName(): string;
    getAddresses(): Address[];
    getEmailId(): string;
    getCountryDetails(): CountryDetails;
}
/**
 * Searching phone number on truecallerjs
 * @var response => {...}
 * @method response.json(color) JSON response.
 * @method response.xml(color)  XML output.
 * @method response.yaml(color) YAML output.
 * @method response.html(color) HTML output.
 * @method response.text(color,space) JSON response.
 * @method response.getName() => "Sumith Emmadi"
 * @method response.getAlternateName() => "sumith"
 * @method response.getAddresses() => {....}
 * @method response.getEmailId() => sumithemmadi244@gmail.com
 * @method response.getCountryDetails() => {...}
 * @name search
 * @function truecallerjs.search(search_data)
 * @return {Object} It contains details of the phone number
 */
declare function search(searchData: SearchData): Promise<Format>;
/**
 * Bulk search on truecallerjs
 * @name bulkSearch
 * @function truecallerjs.bulkSearch(phoneNumbers,countryCode,installationId)
 * @param {String} phoneNumbers phone number separted with coma.
 * @param {String} installationId 6-digits OTP .
 * @return {Object} It contains phone numbers information in a array
 */
declare function bulkSearch(phoneNumbers: string, regionCode: string, installationId: string): Promise<BulkSearchData>;
export { search, bulkSearch };
