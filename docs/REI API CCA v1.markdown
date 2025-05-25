# REI API CCA v1.0 Documentation

## Executive Summary

The REI API CCA v1.0 provides a new way to electronically update the RECONNECT property publication system. This API enables trusted third-party sites or integrators to update data on the RECONNECT website in a more real-time manner, offering immediate feedback and reducing the need for support.

## Credentials - Current Development - RE/MAX AZURA and RE/MAX BLUE OCEAN

## RE/MAX AZURA

- **Public Key**: `3CD7819D-FD26-4DD6-ACAF-04D36E6365F5`
- **Private Key**: `27097A65-9E97-460F-B6DA-8BBB548A893E`
- **Integrator ID**: `R1040029`

NEXT_PUBLIC_API_URL=https://remax-cca.com/api/v1
REMAX_API_KEY=3CD7819D-FD26-4DD6-ACAF-04D36E6365F5
REMAX_INTEGRATOR_ID=R1040029
REMAX_SECRET_KEY=27097A65-9E97-460F-B6DA-8BBB548A893E
DATABASE_URL=postgresql://sendra:Liberia\*9432@localhost:5432/remax_dev
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=kJ9mXz2pQ8rT5uV7wY0aB1cD2eF3gH4i

## RE/MAX BLUE OCEAN

- **Public Key**: `07D693F7-12DC-4E7D-B652-E5CD38B591B4`
- **Private Key**: `050DC15F-C892-445A-A516-05459A07B2F1`
- **Integrator ID**: `R1040028`

NEXT_PUBLIC_API_URL=https://remax-cca.com/api/v1
REMAX_API_KEY=07D693F7-12DC-4E7D-B652-E5CD38B591B4
REMAX_INTEGRATOR_ID=R1040028
REMAX_SECRET_KEY=050DC15F-C892-445A-A516-05459A07B2F1
DATABASE_URL=postgresql://sendra:Liberia\*9432@localhost:5432/remax_dev
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=kJ9mXz2pQ8rT5uV7wY0aB1cD2eF3gH4i

## General Considerations

- The API exclusively supports **JSON format**.
- Client applications can **acquire data** as well as **Aiupdate listings and listing images**.
- The setup and supported methods are mostly consistent for both acquiring and updating data, with minor variations detailed in this documentation.

## Getting Started

To begin using the REI API CCA v1.0, contact the regional IT Support team at [support@remax-cca.com](mailto:support@remax-cca.com). They will provide:

- **API Documentation**: This document and a data dictionary covering:
  - Properties
  - Property Images
- **Authentication Credentials**:
  - **API Key**: Used for authentication.
  - **Secret Key**: Used for authentication.
  - **Integrator ID**: Uniquely identifies the client application and determines access level.

## Base URL

The API is served over HTTPS to ensure data privacy, with the following base URL:

```
https://remax-cca.com/reiapi/
```

The Integrator ID is incorporated into the base URL.

## Authentication

Authentication follows **OAuth 2.0 standards**. The client application must request an access token, which is then used in all API calls. Each token has an expiry date, and its validity can be checked or a new token requested as needed.

### Receiving Your Authorization Token

To obtain an authorization token, make the following request:

**Method:**

```
POST https://remax-cca.com/api/v1/oauth/token
```

**Request Body:**

```
=grant_type=password&apikey={Api Key}&integratorID={Integrator ID}&secretkey={Secret Key}
```

- **Content-Type**: `application/x-www-form-urlencoded`
- **Note**: The body must begin with an `=` character.

**Sample Request:**

```http
POST /api/v1/oauth/token HTTP/1.1
Host: remax-cca.com
Content-Type: application/x-www-form-urlencoded
Cache-Control: no-cache

=grant_type=password&apikey=DB0AD4F4-8533-4290-B3A9-B93643720ECE&integratorID=90001&secretkey=9DFB74EE-0241-4425-B295-2234075889A9
```

**Sample Response:**

```json
{
  "access_token": "uDoaibIiKlNM4-CluOoyDmB-XJRekt4D4u5zHaQKFXxdnUv1u75l_mB9cUbquB7Tu6WOpLULh4y1wea-6q2-JFrBdbTBUiQC61nNSRyjD0RSP0ss4INGcPkN_jIEjSfTLeISI3Grp0C6QgMVngLpnBz3Mdy8CbDN__FSvXphQDfTF7Uu7Shfn9D2HaCMWNJVPoLzaby5A765NfoZvbJgJoTV2lDyHu9MlhQSsGFOSHb-sydD4fOFbCszsWv4IByKkkSNIs1Xrj1pwfgIShd4tW1Q6ngySYg-904iiTcIIYS_9RcrUdIparATW9gyvoW9",
  "token_type": "bearer",
  "expires_in": 86399
}
```

- **access_token**: The token used in all API calls.
- **token_type**: Always returns `"bearer"`.
- **expires_in**: Token lifespan in seconds (e.g., 86399 seconds ≈ 24 hours).

## Making Calls

All API requests must include the `Authorization` header with the bearer token:

```http
Authorization: bearer {access_token}
```

**Sample Request:**

```http
GET /api/v1/lookups/names HTTP/1.1
Host: remax-cca.com
Authorization: bearer uDoaibIiKlNM4-CluOoyDmB-XJRekt4D4u5zHaQKFXxdnUv1u75l_mB9cUbquB7Tu6WOpLULh4y1wea-6q2-JFrBdbTBUiQC61nNSRyjD0RSP0ss4INGcPkN_jIEjSfTLeISI3Grp0C6QgMVngLpnBz3Mdy8CbDN__FSvXphQDfTF7Uu7Shfn9D2HaCMWNJVPoLzaby5A765NfoZvbJgJoTV2lDyHu9MlhQSsGFOSHb-sydD4fOFbCszsWv4IByKkkSNIs1Xrj1pwfgIShd4tW1Q6ngySYg-904iiTcIIYS_9RcrUdIparATW9gyvoW9
Content-Type: application/json
Cache-Control: no-cache
```

## Testing

Full testing can be conducted in the staging environment using the provided API Key, Secret Key, and Integrator ID. Notify the IT Support Team at [support@remax-cca.com](mailto:support@remax-cca.com) when ready to test.

**Staging Base URL:**

```
https://remax-cca.com/reiapi/
```

## Property Fields Definition

The following table defines the fields for properties as used in endpoints like `CreateProperty`, `FullUpdateProperty`, and `GetPropertyDetails`. These fields are critical for structuring API requests and validating data in your application.

| No. | Field Name                | Data Type    | Description                                                               | Required | Mandatory | Notes                                                                                                  |
| --- | ------------------------- | ------------ | ------------------------------------------------------------------------- | -------- | --------- | ------------------------------------------------------------------------------------------------------ |
| 1   | ListingId                 | integer      | Field generated automatically to identify a listing in the system         | N        | N         | Auto-generated, do not include in POST requests                                                        |
| 2   | ListingKey                | varchar(10)  | Field generated automatically to identify a listing for the users         | N        | N         | Auto-generated, do not include in POST requests                                                        |
| 3   | ListingContractType       | integer      | Field to identify the type of contract for a listing                      | Y        | Y         | Required for `CreateProperty`                                                                          |
| 4   | PropertyTitle_en          | varchar(75)  | Field to identify the title of a listing in English                       | Y        | Y         | Only one of `PropertyTitle_en` or `PropertyTitle_es` is required; use empty string (' ') for the other |
| 5   | PropertyTitle_es          | varchar(75)  | Field to identify the title of a listing in Spanish                       | Y        | Y         | Only one of `PropertyTitle_en` or `PropertyTitle_es` is required; use empty string (' ') for the other |
| 6   | PublicRemarks_en          | varchar(max) | Field to identify public remarks in English                               | Y        | Y         | Only one of `PublicRemarks_en` or `PublicRemarks_es` is required; use empty string (' ') for the other |
| 7   | PublicRemarks_es          | varchar(max) | Field to identify public remarks in Spanish                               | Y        | Y         | Only one of `PublicRemarks_en` or `PublicRemarks_es` is required; use empty string (' ') for the other |
| 8   | StandardStatusId          | integer      | Field to identify different status of a listing                           | Y        | Y         | Required; use `GetLookupDetails` for valid values                                                      |
| 9   | ListingProbableUseId      | integer      | Field to identify different probable use of a property                    | Y        | Y         | Required; use `GetLookupDetails` for valid values                                                      |
| 10  | PropertyTypeId            | integer      | Field to identify the property type                                       | Y        | Y         | Required; use `GetLookupDetails` for valid values                                                      |
| 11  | PropertyGeneralLocationId | integer      | Field to identify the property general location                           | Y        | Y         | Required; use `GetAllLocationsInAStateProvince` for valid values                                       |
| 12  | PropertyNewYN             | boolean      | Field to identify if the property is new or used                          | Y        | Y         | Required; true for new, false for used                                                                 |
| 13  | FurnishedYN               | boolean      | Field to identify if the property is furnished or not                     | Y        | Y         | Required; true for furnished, false for unfurnished                                                    |
| 14  | ListingContractDate       | date         | Field to identify the date of the property contract                       | Y        | Y         | Format: YYYY-MM-DDThh:mm:ss (e.g., 2016-05-16T00:00:00)                                                |
| 15  | ExpirationDate            | date         | Field to identify the date of expiration of the property contract         | Y        | Y         | Format: YYYY-MM-DDThh:mm:ss (e.g., 2017-05-16T00:00:00)                                                |
| 16  | OwnerName                 | varchar(50)  | Field to identify the name of the owner of the property                   | N        | N         | Optional; can be null                                                                                  |
| 17  | OwnerPhones               | varchar(50)  | Field to identify phone numbers of the owner of the property              | N        | N         | Optional; can be null                                                                                  |
| 18  | OwnerEmail                | varchar(50)  | Field to identify email of the owner of the property                      | N        | N         | Optional; can be null                                                                                  |
| 19  | ListingAgreementYN        | integer      | Field to identify if the listing is exclusive or not                      | Y        | Y         | Required; 1 for exclusive, 0 for non-exclusive                                                         |
| 20  | ListingSideComm           | decimal      | Field to identify the listing side commission of the property             | N        | N         | Optional; e.g., 2.5 for 2.5%                                                                           |
| 21  | SellingSideComm           | decimal      | Field to identify the selling side commission of the property             | N        | N         | Optional; e.g., 2.5 for 2.5%                                                                           |
| 22  | CloseListingCommAmount    | decimal      | Field to identify the close listing side commission of the property       | N        | N         | Optional; can be null                                                                                  |
| 23  | CloseSellingCommAmount    | decimal      | Field to identify the close selling side commission of the property       | N        | N         | Optional; can be null                                                                                  |
| 24  | PrivateRemarks_en         | varchar(max) | Field to identify private remarks in English                              | Y        | Y         | Use empty string (' ') if no private remarks                                                           |
| 25  | PrivateRemarks_es         | varchar(max) | Field to identify private remarks in Spanish                              | Y        | Y         | Use empty string (' ') if no private remarks                                                           |
| 26  | CountryID                 | integer      | Field to identify the country of the property                             | Y        | Y         | Required; use `GetAllCountries` for valid values                                                       |
| 27  | StateDepProvID            | integer      | Field to identify the state, department, or province of the property      | Y        | Y         | Required; use `GetAllStateProvincesInACountry` for valid values                                        |
| 28  | LocationID                | integer      | Field to identify the location of the property                            | Y        | Y         | Required; use `GetAllLocationsInAStateProvince` for valid values                                       |
| 29  | Latitude                  | nchar(10)    | Field to identify latitude of the property                                | Y        | Y         | Format: e.g., "12.53617008"                                                                            |
| 30  | Longitude                 | nchar(10)    | Field to identify longitude of the property                               | Y        | Y         | Format: e.g., "-70.0156505"                                                                            |
| 31  | PostalCode                | varchar(15)  | Field to identify the postal code of the property                         | N        | N         | Optional; can be null                                                                                  |
| 32  | UnparsedAddress           | varchar(200) | Field to identify the address of the property                             | Y        | Y         | Required; e.g., "34avenue, house #4344"                                                                |
| 33  | UnparsedAddressPublicYN   | boolean      | Field to identify if the address of the property will be public or not    | Y        | Y         | True for public, false for private                                                                     |
| 34  | ShowingInstruction        | varchar(200) | Field to identify the instruction or showing information for the property | N        | N         | Optional; e.g., "Two blocks from Burger King"                                                          |
| 35  | GarageYN                  | boolean      | Field to identify if the property has a garage or not                     | N        | N         | Optional; true for yes, false for no                                                                   |
| 36  | GarageCovered             | integer      | Field to identify if the property has a covered garage or not             | N        | N         | Optional; 1 for yes, 0 for no                                                                          |
| 37  | GarageOpen                | integer      | Field to identify if the property has an open garage or not               | N        | N         | Optional; 1 for yes, 0 for no                                                                          |
| 38  | GarageSpaces              | integer      | Field to identify the spaces of the garage in the property                | N        | N         | Optional; e.g., 2 for two spaces                                                                       |
| 39  | GarageNotes               | varchar(100) | Field to describe the garage of the property                              | N        | N         | Optional; can be null                                                                                  |
| 40  | MaidRoomYN                | integer      | Field to identify if the property has a maid room or not                  | N        | N         | Optional; 1 for yes, 0 for no                                                                          |
| 41  | CoolingYN                 | boolean      | Field to identify if the property has air conditioning or not             | N        | N         | Optional; true for yes, false for no                                                                   |
| 42  | CoolingNotes              | varchar(100) | Field to describe the air conditioning of the property                    | N        | N         | Optional; e.g., "Two A/C"                                                                              |
| 43  | PoolPrivateYN             | boolean      | Field to identify if the property has a pool or not                       | N        | N         | Optional; true for yes, false for no                                                                   |
| 44  | ViewYN                    | boolean      | Field to identify if the property has a view or not                       | N        | N         | Optional; true for yes, false for no                                                                   |
| 45  | ViewNotes                 | varchar(100) | Field to describe the view of the property                                | N        | N         | Optional; e.g., "To Ocean"                                                                             |
| 46  | BedroomsTotal             | integer      | Field to identify the number of bedrooms of the property                  | N        | N         | Optional; e.g., 4                                                                                      |
| 47  | BedroomsNotes             | varchar(100) | Field to describe the bedrooms of the property                            | N        | N         | Optional; e.g., "Big bedrooms"                                                                         |
| 48  | BathroomsFull             | integer      | Field to identify the number of full bathrooms of the property            | N        | N         | Optional; e.g., 3                                                                                      |
| 49  | BathroomsNotes            | varchar(100) | Field to describe the bathrooms of the property                           | N        | N         | Optional; e.g., "marble baths"                                                                         |
| 50  | BathroomsHalf             | integer      | Field to identify the number of half bathrooms of the property            | N        | N         | Optional; e.g., 1                                                                                      |
| 51  | BathroomsHalfNotes        | varchar(100) | Field to describe the half bathrooms of the property                      | N        | N         | Optional; e.g., "luxury"                                                                               |
| 52  | Stories                   | integer      | Field to identify the number of stories of the property                   | N        | N         | Optional; e.g., 2                                                                                      |
| 53  | StoriesNotes              | varchar(100) | Field to describe the stories of the property                             | N        | N         | Optional; can be null                                                                                  |
| 54  | LotSizeArea               | decimal      | Field to identify the lot size of the property                            | Y        | Y         | Required; e.g., 1450                                                                                   |
| 55  | LotSizeAreaUnitsId        | integer      | Field to identify the area unit of the lot size of the property           | Y        | Y         | Required; use `GetLookupDetails` for valid values                                                      |
| 56  | ConstructionSizeLiving    | decimal      | Field to identify the living construction size of the property            | N        | N         | Optional; e.g., 500                                                                                    |
| 57  | ConstructionSizeGarage    | decimal      | Field to identify the garage, porch, deck, etc. construction size         | N        | N         | Optional; e.g., 1950                                                                                   |
| 58  | ConstructionSizeUnitId    | integer      | Field to identify the area unit of the construction size of the property  | Y        | Y         | Required; use `GetLookupDetails` for valid values                                                      |
| 59  | YearBuilt                 | integer      | Field to identify the year built of the property                          | N        | N         | Optional; e.g., 2000                                                                                   |
| 60  | AssociationYN             | boolean      | Field to identify if the property has HOA (Home Owner Association) or not | N        | N         | Optional; true for yes, false for no                                                                   |
| 61  | AssociationNotes          | varchar(50)  | Field to describe the terms and amount of HOA                             | N        | N         | Optional; can be null                                                                                  |
| 62  | GatedCommunityYN          | boolean      | Field to identify if the property has a gated community or not            | N        | N         | Optional; true for yes, false for no                                                                   |
| 63  | ListPrice                 | decimal      | Field to identify the list price of the property                          | Y        | Y         | Required; e.g., 1000000                                                                                |
| 64  | ListPriceCurrencyId       | integer      | Field to identify the currency of the list price of the property          | Y        | Y         | Required; use `GetLookupDetails` for valid values                                                      |
| 65  | ClosePrice                | decimal      | Field to identify the close price of the property                         | N        | N         | Optional; can be null                                                                                  |
| 66  | ClosePriceCurrencyId      | integer      | Field to identify the currency of the close price of the property         | N        | N         | Optional; can be null                                                                                  |
| 67  | CloseDate                 | date         | Field to identify the close date of the property                          | N        | N         | Optional; format: YYYY-MM-DDThh:mm:ss or empty string                                                  |
| 68  | Videolink                 | varchar(50)  | Field to identify the video link that shows a video about the property    | N        | N         | Optional; e.g., "www.youtube.com/HGFR33"                                                               |
| 69  | SEO_title                 | varchar(100) | Field to describe the SEO title of the property                           | Y        | Y         | Required; e.g., "sale house ocean view"                                                                |
| 70  | SEO_Description           | varchar(100) | Field to describe the SEO description of the property                     | Y        | Y         | Required; e.g., "low price ocean view sale house beach"                                                |
| 71  | SEO_Keywords              | varchar(100) | Field to describe the keywords of the property                            | Y        | Y         | Required; e.g., "sale, real estate, ocean view, 4 bedrooms"                                            |

**Usage Notes**:

- **Required vs. Mandatory**: Fields marked `Y` under `Required` and `Mandatory` must be included in API requests (e.g., `CreateProperty`). Non-mandatory fields can be null or omitted if optional.
- **Language Fields**: For `PropertyTitle_en/es`, `PublicRemarks_en/es`, and `PrivateRemarks_en/es`, only one language is required. Use an empty string (`''`) for the other language if not provided.
- **Data Validation**: In VS Code, use JSON schemas or TypeScript interfaces to validate API payloads. For example:
  ```typescript
  interface Property {
    ListingContractType: number;
    PropertyTitle_en: string;
    PropertyTitle_es: string;
    PublicRemarks_en: string;
    PublicRemarks_es: string;
    StandardStatusId: number;
    // ... other required fields
  }
  ```
- **Database Mapping**: When using Prisma with PostgreSQL, map fields to a schema, ensuring nullable fields (e.g., `OwnerName`) are optional:
  ```prisma
  model Property {
    listingId          Int       @id @map("ListingId")
    listingKey        String?   @map("ListingKey")
    contractType      Int       @map("ListingContractType")
    titleEn           String?   @map("PropertyTitle_en")
    titleEs           String?   @map("PropertyTitle_es")
    // ... other fields
  }
  ```
- **Scalability**: Ensure your platform’s admin panel validates required fields before sending API requests. Use dropdowns for fields like `StandardStatusId` by fetching valid values from `GetLookupDetails`.

## Property Images Fields Definition

The following table defines the fields for property images as used in endpoints like `CreatePropertyImage`, `UpdatePropertyImage`, and `GetPropertyImages`.

| No. | Field Name | Data Type    | Description                               |
| --- | ---------- | ------------ | ----------------------------------------- |
| 1   | ListingId  | integer      | Field to identify a listing in the system |
| 2   | Prioridad  | integer      | Field to identify the order of the images |
| 3   | ImageUrl   | varchar(200) | Field to identify the URL of the image    |
| 4   | Status     | integer      | Field to identify the status of the image |

**Usage Notes**:

- **ListingId**: Must match an existing property’s `ListingId`. Validate using `GetPropertyDetails` before creating images.
- **Prioridad**: Determines image display order (e.g., 1 for primary image). Ensure unique values per listing.
- **ImageUrl**: Must be a valid URL pointing to an image file. Images are resized to a 3:2 aspect ratio by the API.
- **Status**: Indicates image status (e.g., active or inactive). Use `GetLookupDetails` for valid values.
- **VS Code Integration**: Create a reusable function in your Next.js project to handle image uploads:
  ```javascript
  async function createPropertyImage(listingId, imageUrl, prioridad) {
    const response = await fetch(
      "https://remax-cca.com/api/v1/CreatePropertyImage",
      {
        method: "POST",
        headers: {
          Authorization: `bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listingId, imageUrl, priorityImage: prioridad }),
      }
    );
    return response.json();
  }
  ```
- **Scalability**: Allow RE/MAX offices to upload images via an admin panel, validating `ImageUrl` and `Prioridad` before API submission.

## API Resources

The API allows querying previously uploaded data and creating or updating listings on the RECONNECT platform. Access is restricted to the office assigned to the client application.

### Associates

#### Get AllAssociates

Returns a paginated list of associates within the client application's scope. By default, only active associates are returned.

**Method:**

```
GET https://remax-cca.com/api/v1/associates/take/{take}/skip/{skip}
```

**Parameters:**

- `take`: Page size (minimum 1).
- `skip`: Optional, number of records to skip (minimum 1).

**Sample Request:**

```
GET https://remax-cca.com/api/v1/associates/take/10/skip/0
Authorization: bearer {access_token}
Content-Type: application/json
```

**Response:**

- **200 OK**: List of associates.
- **404 Bad Request**: Invalid parameters.

**Sample Response:**

```json
[
  {
    "associateID": 127,
    "remaxID": "10382943",
    "firstName": "Desy",
    "lastName": "Johnson",
    "mobile": "(291) 739-9191",
    "remaxEmail": "desyj@remax.net",
    "birthDay": "2015-11-01T00:00:00",
    "urlMemberImage": "https://matrix.remax.net/profileimages/10382943.jpg",
    "officeID": 23,
    "officeName": "RE/MAX ADVANTAGE REALTY",
    "officeCountryID": 1865,
    "countryName_en": "Aruba",
    "stateDepProvOffice": 15496,
    "stateDepProv_en": "Aruba",
    "officeCode": "R0700130"
  }
]
```

#### AssociateDetails

Returns details of a specific associate using their RECONNECT internal associate ID.

**Method:**

```
GET https://remax-cca.com/api/v1/associates/{associateid}
```

**Parameters:**

- `associateid`: RECONNECT internal associate ID.

**Sample Request:**

```
GET https://remax-cca.com/api/v1/associates/128
Authorization: bearer {access_token}
Content-Type: application/json
```

**Response:**

- **200 OK**: Associate details.
- **404 Not Found**: Associate not found.

**Sample Response:**

```json
[
  {
    "associateID": 128,
    "remaxID": "20572732",
    "firstName": "Edith",
    "lastName": "Coupland",
    "mobile": "(297) 586-4900",
    "remaxEmail": "edith@remax-arubarealestate.com",
    "birthDay": "2015-11-01T00:00:00",
    "urlMemberImage": "https://matrix.remax.net/profileimages/20572732.jpg",
    "officeID": 23,
    "officeName": "RE/MAX ADVANTAGE REALTY",
    "officeCountryID": 1865,
    "countryName_en": "Aruba",
    "stateDepProvOffice": 15496,
    "stateDepProv_en": "Aruba",
    "officeCode": "R0700130"
  }
]
```

### Properties

#### GetProperties

Returns a paginated list of properties within the client application's scope. By default, only properties available online are returned.

**Method:**

```
GET https://remax-cca.com/api/v1/GetProperties/take/{take}/skip/{skip}
```

**Parameters:**

- `take`: Page size (minimum 1).
- `skip`: Optional, number of records to skip (minimum 1).

**Sample Request:**

```
GET https://remax-cca.com/api/v1/GetProperties/take/10/skip/0
Authorization: bearer {access_token}
Content-Type: application/json
```

**Response:**

- **200 OK**: List of properties.
- **404 Bad Request**: Invalid parameters.

**Sample Response:**

```json
{
  "result": [
    {
      "listingId": 10744,
      "listingKey": "00130283001",
      "listingContractType": 1,
      "listingTitle_en": "Modanza Villa Texel",
      "listingTitle_es": null,
      "publicRemarks_en": "This beautiful listing is located in villa park Modanza...",
      "publicRemarks_es": null,
      "standardStatusId": 2,
      "listingProbableUseId": 1,
      "propertyTypeId": 1,
      "propertyGeneralLocationId": 1,
      "propertyNewYN": false,
      "furnishedYN": true,
      "listingContractDate": "2016-01-01T00:00:00",
      "expirationDate": "2016-09-30T00:00:00",
      "ownerName": null,
      "ownerPhones": null,
      "ownerEmail": null,
      "listingAgreementYN": 1,
      "listingSideComm": 2.5,
      "sellingSideComm": 2.5,
      "closeListingCommAmount": null,
      "closeSellingCommAmount": null,
      "privateRemarks_en": "",
      "privateRemarks_es": null,
      "countryId": 1865,
      "stateDepProvId": 15496,
      "locationId": 6624337,
      "latitude": "12.536170082294667",
      "longitude": "-70.01565051097566",
      "mapId": 0,
      "postalCode": null,
      "unparsedAddress": null,
      "unparsedAddressPublicYN": false,
      "showingInstruction": null,
      "garageYN": false,
      "garageCovered": 0,
      "garageOpen": 1,
      "garageSpaces": 0,
      "garageNotes": null,
      "maidRoomYN": 0,
      "coolingYN": true,
      "coolingNotes": null,
      "poolPrivateYN": true,
      "viewYN": false,
      "viewNotes": null,
      "bedroomsTotal": 3,
      "bedroomsNotes": null,
      "bathroomsFull": 2,
      "bathroomsNotes": null,
      "bathroomsHalf": 1,
      "bathroomsHalfNotes": null,
      "stories": null,
      "storiesNotes": null,
      "lotSizeArea": 436,
      "lotSizeUnitsId": 1,
      "constructionSizeLiving": 120,
      "constructionSizeGarage": 14,
      "constructionSizeUnitsId": 1,
      "yearBuilt": 2008,
      "associationYN": false,
      "associationNotes": null,
      "gatedCommunityYN": false,
      "listPrice": 298000,
      "listPriceCurrencyID": 4,
      "listPricePrivateYN": false,
      "closePrice": null,
      "closePriceCurrencyID": null,
      "closeDate": null,
      "videoLink": "https://youtu.be/57DLmmRTK18",
      "member": 283,
      "listingDate": "2016-05-16T00:00:00",
      "constructionSizeTotal": null,
      "constructionSize": 134,
      "swimmingPoolNotes": null,
      "seo_title": "Modanza Villa Texel...",
      "seo_description": "This beautiful listing is located in villa park Modanza...",
      "seo_keywords": "Caribbean Real Estate, Central America Real Estate,Aruba,Aruba",
      "officecode": "R0700130"
    }
  ]
}
```

#### GetPropertyDetails

Returns details of a specific property using its RECONNECT Property ID.

**Method:**

```
GET https://remax-cca.com/api/v1/GetPropertyDetails/{listingid}
```

**Parameters:**

- `listingid`: RECONNECT Property ID.

**Sample Request:**

```
GET https://remax-cca.com/api/v1/GetPropertyDetails/10744
Authorization: bearer {access_token}
Content-Type: application/json
```

**Response:**

- **200 OK**: Property details.
- **404 Not Found**: Property not found.

**Sample Response:**

```json
{
  "result": [
    {
      "listingId": 10744,
      "listingKey": "00130283001",
      "listingContractType": 1,
      "listingTitle_en": "Modanza Villa Texel",
      "listingTitle_es": null,
      "publicRemarks_en": "This beautiful listing is located in villa park Modanza...",
      "publicRemarks_es": null,
      "standardStatusId": 2,
      "listingProbableUseId": 1,
      "propertyTypeId": 1,
      "propertyGeneralLocationId": 1,
      "propertyNewYN": false,
      "furnishedYN": true,
      "listingContractDate": "2016-01-01T00:00:00",
      "expirationDate": "2016-09-30T00:00:00",
      "ownerName": null,
      "ownerPhones": null,
      "ownerEmail": null,
      "listingAgreementYN": 1,
      "listingSideComm": 2.5,
      "sellingSideComm": 2.5,
      "closeListingCommAmount": null,
      "closeSellingCommAmount": null,
      "privateRemarks_en": "",
      "privateRemarks_es": null,
      "countryId": 1865,
      "stateDepProvId": 15496,
      "locationId": 6624337,
      "latitude": "12.536170082294667",
      "longitude": "-70.01565051097566",
      "mapId": 0,
      "postalCode": null,
      "unparsedAddress": null,
      "unparsedAddressPublicYN": false,
      "showingInstruction": null,
      "garageYN": false,
      "garageCovered": 0,
      "garageOpen": 1,
      "garageSpaces": 0,
      "garageNotes": null,
      "maidRoomYN": 0,
      "coolingYN": true,
      "coolingNotes": null,
      "poolPrivateYN": true,
      "viewYN": false,
      "viewNotes": null,
      "bedroomsTotal": 3,
      "bedroomsNotes": null,
      "bathroomsFull": 2,
      "bathroomsNotes": null,
      "bathroomsHalf": 1,
      "bathroomsHalfNotes": null,
      "stories": null,
      "storiesNotes": null,
      "lotSizeArea": 436,
      "lotSizeUnitsId": 1,
      "constructionSizeLiving": 120,
      "constructionSizeGarage": 14,
      "constructionSizeUnitsId": 1,
      "yearBuilt": 2008,
      "associationYN": false,
      "associationNotes": null,
      "gatedCommunityYN": false,
      "listPrice": 298000,
      "listPriceCurrencyID": 4,
      "listPricePrivateYN": false,
      "closePrice": null,
      "closePriceCurrencyID": null,
      "closeDate": null,
      "videoLink": "https://youtu.be/57DLmmRTK18",
      "member": 283,
      "listingDate": "2016-05-16T00:00:00",
      "constructionSizeTotal": null,
      "constructionSize": 134,
      "swimmingPoolNotes": null,
      "seo_title": "Modanza Villa Texel...",
      "seo_description": "This beautiful listing is located in villa park Modanza...",
      "seo_keywords": "Caribbean Real Estate, Central America Real Estate,Aruba,Aruba",
      "officecode": "R0700130"
    }
  ]
}
```

#### CreateProperty

Adds a new property to the RECONNECT database. After creation, add property images using the `CreatePropertyImage` method (minimum one photo recommended, ideally 6+). For visibility on the website, ensure:

- Listing Status is Active, Under Offer, or Under Contract.
- Property is linked to an active agent and office.

**Method:**

```
POST https://remax-cca.com/api/v1/CreateProperty
```

**Request Body:**

A JSON object with property details (refer to the Property Fields Definition table).

**Sample Request:**

```http
POST https://remax-cca.com/api/v1/CreateProperty
Authorization: bearer {access_token}
Content-Type: application/json

{
  "associateID": 345,
  "ListingContractType": 1,
  "ListingTitle_en": "Sale of Condo on the beach",
  "ListingTitle_es": "Bonito condominio en la playa",
  "PublicRemarks_en": "Excellent location and great view to the ocean. With some furnitures.",
  "PublicRemarks_es": "Excelente locacion con vista al oceano. Incluye algunos muebles.",
  "StandardStatusId": 2,
  "ListingProbableUseId": 1,
  "PropertyTypeId": 1,
  "PropertyGeneralLocationId": 1,
  "PropertyNewYN": false,
  "FurnishedYN": true,
  "ListingContractDate": "2016-05-16T00:00:00",
  "ExpirationDate": "2017-05-16T00:00:00",
  "OwnerName": "Frank Smith",
  "OwnerPhones": "172045695",
  "OwnerEmail": "frank@smithonly.com",
  "ListingAgreementYN": true,
  "ListingSideComm": 2.5,
  "SellingSideComm": 2.5,
  "CloseListingCommAmount": 0,
  "CloseSellingCommAmount": 0,
  "PrivateRemarks_en": "available to negotiate",
  "PrivateRemarks_es": "disponible para negociar",
  "CountryId": 1884,
  "StateDepProvId": 18849,
  "LocationId": 189545,
  "Latitude": -0.61,
  "Longitude": 5.8988,
  "PostalCode": "0000",
  "UnparsedAddress": "34avenue, house #4344",
  "UnparsedAddressPublicYN": false,
  "ShowingInstruction": "Two blocks from Burger King",
  "GarageYN": true,
  "GarageCovered": true,
  "GarageOpen": false,
  "GarageSpaces": 2,
  "GarageNotes": "N/A",
  "MaidRoomYN": true,
  "CoolingYN": true,
  "CoolingNotes": "Two A/C",
  "PoolPrivateYN": true,
  "ViewYN": true,
  "ViewNotes": "To Ocean",
  "BedroomsTotal": 4,
  "BedroomsNotes": "Big bedrooms",
  "BathroomsFull": 3,
  "BathroomsNotes": "marmol baths",
  "BathroomsHalf": 1,
  "BathroomsHalfNotes": "luxury",
  "Stories": 2,
  "StoriesNotes": "N/A",
  "LotSizeArea": 1450,
  "LotSizeUnitsId": 1,
  "ConstructionSizeLiving": 500,
  "ConstructionSizeGarage": 1950,
  "ConstructionSizeUnitsId": 1,
  "YearBuilt": 2000,
  "AssociationYN": false,
  "AssociationNotes": "N/A",
  "GatedCommunityYN": false,
  "ListPrice": 1000000,
  "ListPriceCurrencyID": 1,
  "ListPricePrivateYN": false,
  "ClosePrice": 0,
  "ClosePriceCurrencyID": 1,
  "CloseDate": "",
  "VideoLink": "www.youtube.com/HGFR33",
  "ConstructionSizeTotal": 600,
  "ConstructionSize": 700,
  "SwimmingPoolNotes": "",
  "seo_title": "sale house ocean view",
  "seo_description": "low price ocean view sale house beach",
  "seo_keywords": "sale, real estate, ocean view, 4 bedrooms",
  "officecode": "R0700101"
}
```

**Response:**

- **200 OK**: Created property object with new ID.
- **404 Not Found**: Validation failure or invalid request.

#### FullUpdateProperty

Updates an existing property. For removing a listing from the public website, use `CancelProperty`.

**Method:**

```
POST https://remax-cca.com/api/v1/FullUpdateProperty
```

**Request Body:**

A JSON object with updated property details (full object required for a complete update).

**Sample Request:**

```http
POST https://remax-cca.com/api/v1/FullUpdateProperty
Authorization: bearer {access_token}
Content-Type: application/json

{
  "associateID": 345,
  "ListingContractType": 1,
  "ListingTitle_en": "Sale of Condo on the beach",
  "ListingTitle_es": "Bonito condominio en la playa",
  "PublicRemarks_en": "Excellent location and great view to the ocean. With some furnitures.",
  "PublicRemarks_es": "Excelente locacion con vista al oceano. Incluye algunos muebles.",
  "StandardStatusId": 2,
  "ListingProbableUseId": 1,
  "PropertyTypeId": 1,
  "PropertyGeneralLocationId": 1,
  "PropertyNewYN": false,
  "FurnishedYN": true,
  "ListingContractDate": "2016-05-16T00:00:00",
  "ExpirationDate": "2017-05-16T00:00:00",
  "OwnerName": "Frank Smith",
  "OwnerPhones": "172045695",
  "OwnerEmail": "frank@smithonly.com",
  "ListingAgreementYN": true,
  "ListingSideComm": 2.5,
  "SellingSideComm": 2.5,
  "CloseListingCommAmount": 0,
  "CloseSellingCommAmount": 0,
  "PrivateRemarks_en": "available to negotiate",
  "PrivateRemarks_es": "disponible para negociar",
  "CountryId": 1884,
  "StateDepProvId": 18849,
  "LocationId": 189545,
  "Latitude": -0.61,
  "Longitude": 5.8988,
  "PostalCode": "0000",
  "UnparsedAddress": "34avenue, house #4344",
  "UnparsedAddressPublicYN": false,
  "ShowingInstruction": "Two blocks from Burger King",
  "GarageYN": true,
  "GarageCovered": true,
  "GarageOpen": false,
  "GarageSpaces": 2,
  "GarageNotes": "N/A",
  "MaidRoomYN": true,
  "CoolingYN": true,
  "CoolingNotes": "Two A/C",
  "PoolPrivateYN": true,
  "ViewYN": true,
  "ViewNotes": "To Ocean",
  "BedroomsTotal": 4,
  "BedroomsNotes": "Big bedrooms",
  "BathroomsFull": 3,
  "BathroomsNotes": "marmol baths",
  "BathroomsHalf": 1,
  "BathroomsHalfNotes": "luxury",
  "Stories": 2,
  "StoriesNotes": "N/A",
  "LotSizeArea": 1450,
  "LotSizeUnitsId": 1,
  "ConstructionSizeLiving": 500,
  "ConstructionSizeGarage": 1950,
  "ConstructionSizeUnitsId": 1,
  "YearBuilt": 2000,
  "AssociationYN": false,
  "AssociationNotes": "N/A",
  "GatedCommunityYN": false,
  "ListPrice": 1000000,
  "ListPriceCurrencyID": 1,
  "ListPricePrivateYN": false,
  "ClosePrice": 0,
  "ClosePriceCurrencyID": 1,
  "CloseDate": "",
  "VideoLink": "www.youtube.com/HGFR33",
  "ConstructionSizeTotal": 600,
  "ConstructionSize": 700,
  "SwimmingPoolNotes": "",
  "seo_title": "sale house ocean view",
  "seo_description": "low price ocean view sale house beach",
  "seo_keywords": "sale, real estate, ocean view, 4 bedrooms",
  "officecode": "R0700101"
}
```

**Response:**

- **200 OK**: Updated property object.
- **404 Not Found**: Property not found.
- **400 Bad Request**: Validation failure.

#### CancelProperty

Removes a property from the public website by setting its status to Inactive.

**Method:**

```
GET https://remax-cca.com/api/v1/CancelProperty/{listingid}
```

**Parameters:**

- `listingid`: RECONNECT Property ID.

**Sample Request:**

```
GET https://remax-cca.com/api/v1/CancelProperty/13456
Authorization: bearer {access_token}
Content-Type: application/json
```

**Response:**

- **200 OK**: Operation successful.
- **404 Not Found**: Property not found.

#### TransferToAnotherAssociate

Transfers a property to another associate within the same office. The receiving associate must exist in the database.

**Method:**

```
GET https://remax-cca.com/api/v1/property/{listingid}/transfer/from-{associateidfrom}/to-{associateidto}
```

**Parameters:**

- `listingid`: Property ID.
- `associateidfrom`: Current associate ID.
- `associateidto`: New associate ID.

**Sample Request:**

```
GET https://remax-cca.com/api/v1/property/13456/transfer/from-314/to-315
Authorization: bearer {access_token}
```

**Response:**

- **204 No Content**: Operation successful.
- **404 Not Found**: Property or associate not found.

### Property Images

#### GetPropertyImages

Returns image information for a specific property.

**Method:**

```
GET https://remax-cca.com/api/v1/propertyimages/{listingid}
```

**Parameters:**

- `listingid`: Property ID.

**Sample Request:**

```
GET https://remax-cca.com/api/v1/propertyimages/7342
Authorization: bearer {access_token}
```

**Response:**

- **200 OK**: List of image objects.
- **404 Not Found**: Property not found.

**Sample Response:**

```json
[
  {
    "photoID": 96268,
    "listingID": 7342,
    "prioridad": 1,
    "imageURL": "https://remax-cca.com/Content/propertyPhotos/photos/L_de151c44376242d78d63aa2bc8bbb3aa_iList.jpg",
    "imageThumbnailURL": "https://remax-cca.com/Content/propertyPhotos/thumbnail/L_de151c44376242d78d63aa2bc8bbb3aa_iList.jpg"
  }
]
```

#### GetPropertyImageDetails

Returns details of a specific property image.

**Method:**

```
GET https://remax-cca.com/api/v1/propertyimagesdetails/{listingid}/{photoid}
```

**Parameters:**

- `listingid`: Property ID.
- `photoid`: Image ID.

**Sample Request:**

```
GET https://remax-cca.com/api/v1/propertyimagesdetails/7342/96268
Authorization: bearer {access_token}
```

**Response:**

- **200 OK**: Image details.
- **404 Not Found**: Image not found.

**Sample Response:**

```json
[
  {
    "photoID": 96268,
    "listingID": 7342,
    "prioridad": 1,
    "imageURL": "https://remax-cca.com/Content/propertyPhotos/photos/L_de151c44376242d78d63aa2bc8bbb3aa_iList.jpg",
    "imageThumbnailURL": "https://remax-cca.com/Content/propertyPhotos/thumbnail/L_de151c44376242d78d63aa2bc8bbb3aa_iList.jpg"
  }
]
```

#### CreatePropertyImage

Adds a new image to a property. Images are resized to a 3:2 aspect ratio and standard dimensions.

**Method:**

```
POST https://remax-cca.com/api/v1/CreatePropertyImage
```

**Request Body:**

```json
{
  "listingid": 13456,
  "imageURL": "http://www.myimagesofhouses.com/dewre343.jpg",
  "priorityImage": 1
}
```

**Response:**

- **200 OK**: Created image object.
- **404 Not Found**: Validation failure or property not found.
- **400 Bad Request**: Invalid request.

#### UpdatePropertyImage

Updates details of an existing property image.

**Method:**

```
POST https://remax-cca.com/api/v1/UpdatePropertyImage
```

**Request Body:**

```json
{
  "listingid": 13456,
  "photoid": 96268,
  "imageURL": "http://newimageurl.com/image.jpg",
  "priorityImage": 2,
  "status": 0
}
```

- **Note**: Set `imageURL` to `null` if not updating the image.

**Response:**

- **200 OK**: Updated image object.
- **404 Not Found**: Image not found.
- **400 Bad Request**: Validation failure.

#### DeleteOneImage

Deletes a specific property image.

**Method:**

```
GET https://remax-cca.com/api/v1/propertyimagesdetails/{listingid}/{photoid}/hide
```

**Parameters:**

- `listingid`: Property ID.
- `photoid`: Image ID.

**Sample Request:**

```
GET https://remax-cca.com/api/v1/propertyimagesdetails/13456/96268/hide
Authorization: bearer {access_token}
```

**Response:**

- **204 No Content**: Operation successful.
- **404 Not Found**: Image not found.

#### DeleteAllImagesForOneProperty

Deletes all images for a property, inactivating it.

**Method:**

```
GET https://remax-cca.com/api/v1/DeleteAllImagesForOneProperty/{listingid}
```

**Parameters:**

- `listingid`: Property ID.

**Sample Request:**

```
GET https://remax-cca.com/api/v1/DeleteAllImagesForOneProperty/13456
Authorization: bearer {access_token}
```

**Response:**

- **204 No Content**: Operation successful.
- **404 Not Found**: Property not found.

### Lookups

#### GetLookupNames

Returns the names of catalogues related to properties.

**Method:**

```
GET https://remax-cca.com/api/v1/lookups/names
```

**Sample Request:**

```
GET https://remax-cca.com/api/v1/lookups/names
Authorization: bearer {access_token}
```

**Response:**

- **200 OK**: List of lookup names.

**Sample Response:**

```json
[
  {
    "idLookupName": 1,
    "lookupName": "MEASUREMENT UNIT",
    "lookupDescription": "MEASUREMENT_UNIT"
  },
  {
    "idLookupName": 2,
    "lookupName": "MOST PROBABLE USE",
    "lookupDescription": "MOSTPROBABLEUSE"
  }
]
```

#### GetLookupDetails

Returns values of a specific catalogue.

**Method:**

```
GET https://remax-cca.com/api/v1/lookups/detailsbyid/{id}
```

**Parameters:**

- `id`: Catalogue ID (`idLookupName`).

**Sample Request:**

```
GET https://remax-cca.com/api/v1/lookups/detailsbyid/2
Authorization: bearer {access_token}
```

**Response:**

- **200 OK**: Catalogue details.
- **404 Not Found**: Catalogue not found.

**Sample Response:**

```json
[
  {
    "mostProbableUseID": 1,
    "mostprobableUseName_EN": "General"
  },
  {
    "mostProbableUseID": 2,
    "mostprobableUseName_EN": "RE/MAX Commercial"
  }
]
```

### Geo Data

#### GetAllCountries

Returns information about countries in the Caribbean and Central America.

**Method:**

```
GET https://remax-cca.com/api/v1/geo/countries
```

**Sample Request:**

```
GET https://remax-cca.com/api/v1/geo/countries
Authorization: bearer {access_token}
```

**Response:**

- **200 OK**: List of countries.

**Sample Response:**

```json
[
  {
    "countryID": 1856,
    "countryName_en": "Antigua and Barbuda",
    "countryName_es": "Antigua y Barbuda",
    "flagurl": "https://www.remax-caribbeanislands.com/content/assets/img/flags/antiguabarbuda.gif"
  },
  {
    "countryID": 1865,
    "countryName_en": "Aruba",
    "countryName_es": "Aruba",
    "flagurl": "https://www.remax-caribbeanislands.com/content/assets/img/flags/aruba.gif"
  }
]
```

#### GetAllStateProvincesInACountry

Returns states, provinces, or departments in a specified country.

**Method:**

```
GET https://remax-cca.com/api/v1/geo/countries/{id}/StateProvincesInaCountry
```

**Parameters:**

- `id`: Country ID.

**Sample Request:**

```
GET https://remax-cca.com/api/v1/geo/countries/1859/StateProvincesInaCountry
Authorization: bearer {access_token}
```

**Response:**

- **200 OK**: List of state/provinces.
- **404 Not Found**: Country not found.

**Sample Response:**

```json
[
  {
    "countryID": 1859,
    "stateDepProvID": 15524,
    "stateDepProv_en": "Cayman Islands",
    "stateDepProv_es": "Cayman Islands"
  },
  {
    "countryID": 1859,
    "stateDepProvID": 17175,
    "stateDepProv_en": "Grand Cayman",
    "stateDepProv_es": "Grand Cayman"
  }
]
```

#### GetAllLocationsInAStateProvince

Returns locations within a specific state, province, or department.

**Method:**

```
GET https://remax-cca.com/api/v1/geo/countries/{countryid}/StateProvincesInaCountry/{stateDepProvID}/LocationsInAStateProvince
```

**Parameters:**

- `countryid`: Country ID.
- `stateDepProvID`: State/Province ID.

**Sample Request:**

```
GET https://remax-cca.com/api/v1/geo/countries/1859/StateProvincesInaCountry/17175/LocationsInAStateProvince
Authorization: bearer {access_token}
```

**Response:**

- **200 OK**: List of locations.
- **404 Not Found**: State/Province not found.

**Sample Response:**

```json
[
  {
    "locationId": 6698703,
    "stateDepProvId": 17175,
    "location_en": "South Sound",
    "location_es": "South Sound"
  },
  {
    "locationId": 6698745,
    "stateDepProvId": 17175,
    "location_en": "George Town",
    "location_es": "George Town"
  }
]
```

---

**Note**: Replace `{access_token}` with the actual token in all requests. Use the Property Fields Definition and Property Images Fields Definition tables for detailed field requirements and validation.
