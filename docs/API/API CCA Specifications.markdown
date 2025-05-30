REI API CCA v1.0
Executive Summary
Through our REI API CCA v1.0 we have achieved a new way of updating our property publication system (RECONNECT) via electronically.
This opportunity directly allow updates data on the RECONNECT website through the use of an API. As a result, RECONNECT will be enhanced to provide API functionality. The intention is to exclusively allow trusted 3rd party sites/integrators the use of this functionality to keep the data updated on RECONNECT in a more real-time manner and with more immediate feedback with the added benefit of reduced support.
A. General Considerations
REI API CCA supports only JSON format.
Using REI API CCA, client applications can acquire data, as well as update listings and listing images.
REIAPI CCA setup and supported methods and functions are mostly the same in both cases, with minor variations, outlined where necessary in the present documentation.
1. Getting Started
To initiate the setup process you will need to contact our regional IT Support (support@remax-cca.com)
The IT Support team will guide you through the process and cover for the following aspects:
Provide the API documentation, which includes the following: The present document;
.	CCA API Data dictionary (Excel spreadsheets) containing the following object models: Properties
.	Property Images
As part of the REI API CCA set-up process, IT support team will provide the following set of keys:
1.	API Key
2.	Secret Key
3.	IntegratorID.
The API Key and Secret Key will be used for authentication purposes as detailed below.
The IntegratorID uniquely identifies the client application and determines the level of access.
2. Base URL
REI API CCA is served over HTTPS to ensure data privacy.
The Integrator Id will be part of the Base URL.
All URLs referenced in the documentation will have the following base:
https://remax-cca.com/reiapi/
3. Authentication
The authentication process is based on oAuth 2.0 standards.
The Client Application must request access to REI API CCA, which will return the access token.
After successfully receiving the token, the Client Application will be able to access the API method of choice. Every authorization token has an expiry date. The validity of the token can be checked before making the call to the API or a new token can be requested.
3.1. Receiving your Authorization Token
Obtaining the authorization token is the key of using the API. The following call must be made to request the token:
POST https://remax-cca.com/api/v1/oauth/token
The API Key and Secret Key must be sent in the body of the request:
grant_type=password& apikey ={Api Key}&integratorID={Integrator ID}&secretkey={Secret Key}
The body of the request MUST be “application/x-www-form-urlencoded”.
IMPORTANT: The character "=" must be present at the beginning of the body content.
3.1.1. Request
Sample request:
Note: Some headers where excluded for brevity.
POST /api/v1/oauth/token HTTP/1.1
Host: remax-cca.com
Content-Type: application/x-www-form-urlencoded
Cache-Control: no-cache
apiKey=DB0AD4F4-8533-4290-B3A9-B93643720ECE&integratorID=90001&secretKey=9DFB74EE-0241-4425-B295-2234075889A9&grant_type=password
3.1.2. Response
Sample JSON response:
{
"access_token": "uDoaibIiKlNM4-CluOoyDmB-XJRekt4D4u5zHaQKFXxdnUv1u75l_mB9cUbquB7Tu6WOpLULh4y1wea-6q2-JFrBdbTBUiQC61nNSRyjD0RSP0ss4INGcPkN_jIEjSfTLeISI3Grp0C6QgMVngLpnBz3Mdy8CbDN__FSvXphQDfTF7Uu7Shfn9D2HaCMWNJVPoLzaby5A765NfoZvbJgJoTV2lDyHu9MlhQSsGFOSHb-sydD4fOFbCszsWv4IByKkkSNIs1Xrj1pwfgIShd4tW1Q6ngySYg-904iiTcIIYS_9RcrUdIparATW9gyvoW9",
"token_type": "bearer",
"expires_in": 86399
}
access_token
This is the authorization token. It must be used in all API calls.
expires_in
This represent the life span of the authorization token. Its value is in seconds. In our example, 172800 seconds = 48 hours. This means that this token will expire (no longer be valid) after 48 hours from the moment it was generated.
token_type
It will always return "bearer".
4. Making Calls
All API requests to resources must be authenticated. REI API CCA uses the Authorization header for this purpose.
Sample authorization header:
POST /api/v1/CreatePropertyImage HTTP/1.1
Host: remax-cca.com
Authorization: bearer uDoaibIiKlNM4-CluOoyDmB-XJRekt4D4u5zHaQKFXxdnUv1u75l_mB9cUbquB7Tu6WOpLULh4y1wea-6q2-JFrBdbTBUiQC61nNSRyjD0RSP0ss4INGcPkN_jIEjSfTLeISI3Grp0C6QgMVngLpnBz3Mdy8CbDN__FSvXphQDfTF7Uu7Shfn9D2HaCMWNJVPoLzaby5A765NfoZvbJgJoTV2lDyHu9MlhQSsGFOSHb-sydD4fOFbCszsWv4IByKkkSNIs1Xrj1pwfgIShd4tW1Q6ngySYg-904iiTcIIYS_9RcrUdIparATW9gyvoW9
Content-Type: application/json
Cache-Control: no-cache
Authorization _token
This is the authorization token obtained as explained in paragraph 3.1.
Sample request:
GET /api/v1/lookups/names HTTP/1.1
Host: remax-cca.com
Authorization: bearer uDoaibIiKlNM4-CluOoyDmB-XJRekt4D4u5zHaQKFXxdnUv1u75l_mB9cUbquB7Tu6WOpLULh4y1wea-6q2-JFrBdbTBUiQC61nNSRyjD0RSP0ss4INGcPkN_jIEjSfTLeISI3Grp0C6QgMVngLpnBz3Mdy8CbDN__FSvXphQDfTF7Uu7Shfn9D2HaCMWNJVPoLzaby5A765NfoZvbJgJoTV2lDyHu9MlhQSsGFOSHb-sydD4fOFbCszsWv4IByKkkSNIs1Xrj1pwfgIShd4tW1Q6ngySYg-904iiTcIIYS_9RcrUdIparATW9gyvoW9
Content-Type: application/json
Cache-Control: no-cache
5. Testing
Full testing of REI API CCA can be performed on our staging environment.
The API Key, Secret Key and Integrator ID received during the setup process may be utilized for testing purposes on the staging environment.
Please inform to IT Support Team(support@remax-cca.com) at RE/MAX CCA when you will be ready for testing.
The base URL is the following:
https://remax-cca.com/reiapi/
B. API Resources
REI API CCA provides the ability to query previously uploaded data, as well as creating or updating listings onto RECONNECT platform.
The information returned by REI API CCA is restricted to the office to which the client application was granted access.
The following tree structure shows the request types available as part of the API. Each of the methods below are explained in detail in the following paragraphs.
  Associates
  Get AllAssociates
  AssociatesDetails
  Properties
  GetProperties
  GetPropertyDetails
  CreateProperty
  FullUpdateProperty
  CancelProperty
  TransferToAnotherAssociate
  Property Images
  GetPropertyImages
  GetPropertyImageDetails
  CreatePropertyImage
  UpdatePropertyImage
  DeleteOneImage
  DeleteAllImagesForOneProperty
  Property Images
  Lookups
  GetLookupNames
  GetLookupDetails
  Geo Data
  GetAllCountries
  GetAllStateProvincesInACountry
  GetAllLocationsInAStateProvince
  Associates
  Through the functions detailed in this paragraph, REI API CCA provides the ability to obtain a paginated list of associates in an office and extract the details of an associate.
  5.1. Get AllAssociates
  The method returns the list of associates within the client application scope.
  Using the default options, the method returns only active associates (visible on the website).
  Method call:
  GET https://remax-cca.com/api/v1/associates/take/{take}/skip/{skip}
  Accepted parameters:
  All parameters can be used at the same time. Their effect is cumulative.
  take
  Represents the page size (how many records a page should contain). The minimum value is 1.
  skip
  This parameter is optional and is use to skip a set of results. The minimum value is 1.
  Sample Request
  GET https://remax-cca.com/api/v1/associates/take/10/skip/0
  Authorization: bearer B80CZ7pO77NrG-GYZSmTCQ28V8ZcnCjqWSuiKw-sMwfR-lSJAbuVq3e9KmGgo3vW0Prr9bKCmD336OXi0cDWUsDKCLhW_dklFj-m_7VkDlMjAw3zRRu-PNiO2UOKvE3lovOlzTnjIxjghGi39TzmalLdmXVpPAciNjofT11lyfLphRLYwiJx-Sx8oXFW02T6FquvlvT5Eg7pnltXux9-hWQM3stdOKLrWyH0I6z_5M8L-IDAxE43jadsGn3SF2orhK5ChKGt29_P3dla77XOO1i6HHkYp6_QVlluudMWUpWkEd_23xpsZ1NpR_373umg
  Key: Content-Type
  Value: application/json
  5.1.1. Response
  Status
  200 - OK
  Message
The list of objects is returned
  Description
  Call was successful
  Status
  404 - Bad request
  Message
<Error> <Message> Bad Request</Message> </Error>
  Description
Wrong parameter values have been used. <ModelState> element will provide the necessary details. Please correct the issues and try again.
Sample JSON Response
Status: 200 – OK
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
},
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
5.2. AssociateDetails
The method returns the details of one associate. You can use Associate ID of RECONNECT.
5.2.1. Request
Method call:
GET https://remax-cca.com/api/v1/associates/{associateid}
Resource id represents:
  RECONNECT internal associate ID
Sample Request
GET https://remax-cca.com/api/v1/associates/128
Authorization: bearer B80CZ7pO77NrG-GYZSmTCQ28V8ZcnCjqWSuiKw-sMwfR-lSJAbuVq3e9KmGgo3vW0Prr9bKCmD336OXi0cDWUsDKCLhW_dklFj-m_7VkDlMjAw3zRRu-PNiO2UOKvE3lovOlzTnjIxjghGi39TzmalLdmXVpPAciNjofT11lyfLphRLYwiJx-Sx8oXFW02T6FquvlvT5Eg7pnltXux9-hWQM3stdOKLrWyH0I6z_5M8L-IDAxE43jadsGn3SF2orhK5ChKGt29_P3dla77XOO1i6HHkYp6_QVlluudMWUpWkEd_23xpsZ1NpR_373umg
Key: Content-Type
Value: application/json
5.2.2. Response
Status
200 - OK
Message
The resource object is returned
Description
Call was successful
Status
404 - Not Found
Message
NaN
Description
Resource was not found for the specified ID
Sample JSON Response
Status: 200 - OK
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
6. Properties
The REI API CCA manages all of the listing information through the Listings section. Through the functions detailed in this paragraph, REI API CCA provides the ability to obtain the list of listings available online, the full list of listings, as well as extracting the details of a single listing.
6.1. GetProperties
The method returns a paginated list of properties within the client application scope. Using the default options, the method returns only properties available online. See optional parameters below.
6.1.1. Request
Method call:
GET https://remax-cca.com/api/v1/GetProperties/take/{take}/skip/{skip}
Accepted parameters:
take
Represents the page size. The minimum value is 1.
skip
This parameter is optional and is use to skip a set of results. The minimum value is 1.
Sample Request
GET https://remax-cca.com/api/v1/GetProperties/take/10/skip/0
Authorization: bearer B80CZ7pO77NrG-GYZSmTCQ28V8ZcnCjqWSuiKw-sMwfR-lSJAbuVq3e9KmGgo3vW0Prr9bKCmD336OXi0cDWUsDKCLhW_dklFj-m_7VkDlMjAw3zRRu-PNiO2UOKvE3lovOlzTnjIxjghGi39TzmalLdmXVpPAciNjofT11lyfLphRLYwiJx-Sx8oXFW02T6FquvlvT5Eg7pnltXux9-hWQM3stdOKLrWyH0I6z_5M8L-IDAxE43jadsGn3SF2orhK5ChKGt29_P3dla77XOO1i6HHkYp6_QVlluudMWUpWkEd_23xpsZ1NpR_373umg
Key: Content-Type
Value: application/json
6.1.1. Responses
Http Status Codes Responses & Messages
Status
200 - OK
Message
You get the list of objects
Description
Call was successful
Status
404 - Bad request
Message
<Error> <Message>The request is invalid.</Message> <ModelState> ..... </ModelState> </Error>
Description
Wrong parameter values have been used.
<ModelState> element will provide the necessary details. Please correct the issues and try again.
Sample JSON Response
Status: 200 - OK
{
"result": [
{
"listingId": 10744,
"listingKey": "00130283001",
"listingContractType": 1,
"listingTitle_en": "Modanza Villa Texel",
"listingTitle_es": null,
"publicRemarks_en": "This beautiful listing is located in villa park Modanza, only 5 minutes away from town (Oranjestad) and 10 minutes from the beach. The well-maintained villa has an open plan kitchen, living room, laundry room with washer, 3 bedrooms and 2,5 bathrooms. The property is fully fenced, has a nice big covered back porch with gorgeous tropical garden and a swimming pool. This villa is sold completely furnished.
Great family home or vacation rental.
",
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
"seo_description": "This beautiful listing is located in villa park Modanza, only 5 minutes away from town (Oranjestad) and 10 minutes from the beach. The well-maintained villa has an open plan kitchen, living room, laundry room with washer, 3 bedrooms and 2,5...",
"seo_keywords": "Caribbean Real Estate, Central America Real Estate,Aruba,Aruba",
"officecode": "R0700130"
}
....
6.2. GetPropertyDetails
The method returns the details of requested property.
6.2.1. Request
Method call:
GET https://remax-cca.com/api/v1/GetPropertyDetails/{listingid}
resource id
RECONNECT Property ID can be used.
Sample Request
GET https://remax-cca.com/api/v1/GetPropertyDetails/10744
Authorization: bearer B80CZ7pO77NrG-GYZSmTCQ28V8ZcnCjqWSuiKw-sMwfR-lSJAbuVq3e9KmGgo3vW0Prr9bKCmD336OXi0cDWUsDKCLhW_dklFj-m_7VkDlMjAw3zRRu-PNiO2UOKvE3lovOlzTnjIxjghGi39TzmalLdmXVpPAciNjofT11lyfLphRLYwiJx-Sx8oXFW02T6FquvlvT5Eg7pnltXux9-hWQM3stdOKLrWyH0I6z_5M8L-IDAxE43jadsGn3SF2orhK5ChKGt29_P3dla77XOO1i6HHkYp6_QVlluudMWUpWkEd_23xpsZ1NpR_373umg
Key: Content-Type
Value: application/json
6.2.2. Response
Http Status Codes Responses & Messages
Status 200 - OK
Message The resource object is returned
Description Call was successful
Status 404 - Not Found
Message Resource was not found for the specified ID
Description 404 - Not Found Resource was not found for the specified ID
Sample JSON Response
Status: 200 - OK
{
"result": [
{
"listingId": 10744,
"listingKey": "00130283001",
"listingContractType": 1,
"listingTitle_en": "Modanza Villa Texel",
"listingTitle_es": null,
"publicRemarks_en": "This beautiful listing is located in villa park Modanza, only 5 minutes away from town (Oranjestad) and 10 minutes from the beach. The well- maintained villa has an open plan kitchen, living room, laundry room with washer, 3 bedrooms and 2,5 bathrooms. The property is fully fenced, has a nice big covered back porch with gorgeous tropical garden and a swimming pool. This villa is sold completely furnished.
Great family home or vacation rental.
",
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
"seo_description": "This beautiful listing is located in villa park Modanza, only 5 minutes away from town (Oranjestad) and 10 minutes from the beach. The well-maintained villa has an open plan kitchen, living room, laundry room with washer, 3 bedrooms and 2,5...",
"seo_keywords": "Caribbean Real Estate, Central America Real Estate,Aruba,Aruba",
"officecode": "R0700130"
}
6.3. CreateProperty
Use this method to add a new property into the RECONNECT database.
The present method will create the main property record. To complete the property upload, make subsequent calls to add the following elements:
  Property Images (see paragraph 7.2) Add minimum one property photo
  It is highly recommended to add as many listing photos as possible (at least 6).
There are a series of factors that make a property listing visible on the website. Make sure your property meets following rules:
•	Listing Status is Active or, if Listing Status is Under offer or, if Listing Status is Under Contract.
•	Property is related to an Agent that is not disabled.
•	Property is related to an Office that is not disabled.
6.3.1. Request
Method call:
POST https://remax-cca.com/api/v1/CreateProperty
Sample JSON Request:
In JSON, elements order is important. The order is alphabetical.
POST https://remax-cca.com/api/v1/CreateProperty
Authorization: bearer B80CZ7pO77NrG-GYZSmTCQ28V8ZcnCjqWSuiKw-sMwfR-lSJAbuVq3e9KmGgo3vW0Prr9bKCmD336OXi0cDWUsDKCLhW_dklFj-m_7VkDlMjAw3zRRu-PNiO2UOKvE3lovOlzTnjIxjghGi39TzmalLdmXVpPAciNjofT11lyfLphRLYwiJx- Sx8oXFW02T6FquvlvT5Eg7pnltXux9-hWQM3stdOKLrWyH0I6z_5M8L-IDAxE43jadsGn3SF2orhK5ChKGt29_P3dla77XOO1i6HHkYp6_QVlluudMWUpWkEd_23xpsZ1NpR_373umg Key: Content-Type Value: application/json { "associateID":345, "ListingContractType":1, "ListingTitle_en":”Sale of Condo on the beach”, "ListingTitle_es":”Bonito condominio en la playa”, "PublicRemarks_en":”Excellent location and great view to the ocean. With some furnitures.”, "PublicRemarks_es":":”Excelente locacion con vista al oceano. Incluye algunos muebles.”, "StandardStatusId":2 , "ListingProbableUseId":1, "PropertyTypeId":1, "PropertyGeneralLocationId":1, "PropertyNewYN":false, "FurnishedYN":true, "ListingContractDate": "2016-05-16T00:00:00", "ExpirationDate":"2017-05-16T00:00:00", "OwnerName":”Frank Smith”, "OwnerPhones":”172045695”, "OwnerEmail":”frank@smithonly.com”, "ListingAgreementYN":true, "ListingSideComm":2.5, "SellingSideComm":2.5, "CloseListingCommAmount":0, "CloseSellingCommAmount":0, "PrivateRemarks_en":”available to negotiate”, "PrivateRemarks_es":”disponible para negociar”, "CountryId":1884, "StateDepProvId":18849, "LocationId":189545, "Latitude":-0.61, "Longitude":5.8988, "PostalCode":”0000”, "UnparsedAddress":”34avenue, house #4344”, "UnparsedAddressPublicYN":false, "ShowingInstruction":”Two blocks from Burger King”, "GarageYN":true, "GarageCovered":true, "GarageOpen":false, "GarageSpaces":2, "GarageNotes":”N/A”, "MaidRoomYN":true, "CoolingYN":true, "CoolingNotes":”Two A/C”, "PoolPrivateYN":true, "ViewYN":true, "ViewNotes":”To Ocean”, "BedroomsTotal":4, "BedroomsNotes":”Big bedrooms”, "BathroomsFull":3, "BathroomsNotes":”marmol baths”, "BathroomsHalf":1, "BathroomsHalfNotes":”luxury”, "Stories":2, "StoriesNotes":”N/A”, "LotSizeArea":1450, "LotSizeUnitsId":1, "ConstructionSizeLiving":500, "ConstructionSizeGarage":1950, "ConstructionSizeUnitsId":1, "YearBuilt":2000, "AssociationYN":false, "AssociationNotes":”N/A”, "GatedCommunityYN":false, "ListPrice":1000000, "ListPriceCurrencyID":1, "ListPricePrivateYN":false, "ClosePrice":0, "ClosePriceCurrencyID":1, "CloseDate":””, "VideoLink":”www.youtube.com/HGFR33”, "ConstructionSizeTotal":600, "ConstructionSize":700, "SwimmingPoolNotes":””, "seo_title":”sale house ocean view”, "seo_description":”low price ocean view sale house beach”, "seo_keywords":sale, real estate, ocean view, 4 bedrooms”, "officecode":”R0700101”, }
6.3.2. Response
Status 200 - OK
Message The created resource object is returned
Description Call was successful
Status 404 - Not Found
Message <Error> <Message> New resource validation failure. Resource was not created. </Message> <MessageDetail> ..... </MessageDetail> </Error>
Description <MessageDetail> element will contain the reasons why validation failed. Correct the issues and try again.
Status 404 - Not Found
Message <Error> <Message>The request is invalid.</Message> <ModelState> <requestModel>.....</requestModel> </ModelState> </Error>
Description The object you tried to upload does not match the expected object definition. <ModelState> element will explain where your object does not match the expected model. Please correct the raised issues and try again.
Sample JSON Response
Created
Content-Type: application/json; charset=utf-8
... created Property object with new ID ...
object with new ID ...
6.4. FullUpdateProperty
The method allows the client application to update an existing resource.
To remove a listing from appearing on the public web site use Cancel Listing method described in paragraph 6.5.
6.4.1. Request
Method call:
POST https://remax-cca.com/api/v1/FullUpdateProperty
Sample XML Request:
This is an example for a partial update. For a full update, the entire object must be present.
POST https://remax-cca.com/api/v1/FullUpdateProperty
Authorization: bearer B80CZ7pO77NrG-GYZSmTCQ28V8ZcnCjqWSuiKw-sMwfR-lSJAbuVq3e9KmGgo3vW0Prr9bKCmD336OXi0cDWUsDKCLhW_dklFj-m_7VkDlMjAw3zRRu-PNiO2UOKvE3lovOlzTnjIxjghGi39TzmalLdmXVpPAciNjofT11lyfLphRLYwiJx-Sx8oXFW02T6FquvlvT5Eg7pnltXux9-hWQM3stdOKLrWyH0I6z_5M8L-IDAxE43jadsGn3SF2orhK5ChKGt29_P3dla77XOO1i6HHkYp6_QVlluudMWUpWkEd_23xpsZ1NpR_373umg Key: Content-Type Value: application/json { "associateID":345, "ListingContractType":1, "ListingTitle_en":”Sale of Condo on the beach”, "ListingTitle_es":”Bonito condominio en la playa”, "PublicRemarks_en":”Excellent location and great view to the ocean. With some furnitures.”, "PublicRemarks_es":":”Excelente locacion con vista al oceano. Incluye algunos muebles.”, "StandardStatusId":2 , "ListingProbableUseId":1, "PropertyTypeId":1, "PropertyGeneralLocationId":1, "PropertyNewYN":false, "FurnishedYN":true, "ListingContractDate": "2016-05-16T00:00:00", "ExpirationDate":"2017-05-16T00:00:00", "OwnerName":”Frank Smith”, "OwnerPhones":”172045695”, "OwnerEmail":”frank@smithonly.com”, "ListingAgreementYN":true, "ListingSideComm":2.5, "SellingSideComm":2.5, "CloseListingCommAmount":0, "CloseSellingCommAmount":0, "PrivateRemarks_en":”available to negotiate”, "PrivateRemarks_es":”disponible para negociar”, "CountryId":1884, "StateDepProvId":18849, "LocationId":189545, "Latitude":-0.61, "Longitude":5.8988, "PostalCode":”0000”, "UnparsedAddress":”34avenue, house #4344”, "UnparsedAddressPublicYN":false, "ShowingInstruction":”Two blocks from Burger King”, "GarageYN":true, "GarageCovered":true, "GarageOpen":false, "GarageSpaces":2, "GarageNotes":”N/A”, "MaidRoomYN":true, "CoolingYN":true, "CoolingNotes":”Two A/C”, "PoolPrivateYN":true, "ViewYN":true, "ViewNotes":”To Ocean”, "BedroomsTotal":4, "BedroomsNotes":”Big bedrooms”, "BathroomsFull":3, "BathroomsNotes":”marmol baths”, "BathroomsHalf":1, "BathroomsHalfNotes":”luxury”, "Stories":2, "StoriesNotes":”N/A”, "LotSizeArea":1450, "LotSizeUnitsId":1, "ConstructionSizeLiving":500, "ConstructionSizeGarage":1950, "ConstructionSizeUnitsId":1, "YearBuilt":2000, "AssociationYN":false, "AssociationNotes":”N/A”, "GatedCommunityYN":false, "ListPrice":1000000, "ListPriceCurrencyID":1, "ListPricePrivateYN":false, "ClosePrice":0, "ClosePriceCurrencyID":1, "CloseDate":””, "VideoLink":”www.youtube.com/HGFR33”, "ConstructionSizeTotal":600, "ConstructionSize":700, "SwimmingPoolNotes":””, "seo_title":”sale house ocean view”, "seo_description":”low price ocean view sale house beach”, "seo_keywords":sale, real estate, ocean view, 4 bedrooms”, "officecode":”R0700101”, }
6.4.2. Response
If the update was successful, the resource object will be returned with the updated values. See Get Property method for a sample XML response.
Http Status Codes Responses & Messages
Status 200 - OK
Message You get the updated resource object
Description Call was successful
Status 404 - Not Found
Message <Error> <Message> Requested resource cannot be found. Requested operation was not performed. </Message> <MessageDetail> Please make sure that a resource with the requested ID actually exist before making the call </MessageDetail> </Error>
Description Resource was not found for the specified resource ID.
Status 400 - Bad Request
Message <Error> <Message> New resource validation failure. Resource was not created. </Message> <MessageDetail> ..... </MessageDetail> </Error>
Description <MessageDetail> element will contain the reasons why validation failed. Correct the raised issues and try again.
6.5. CancelProperty
Use this method to remove a property listing from public website.
The property is taken offline by setting the Listing Status of the property to Inactive.
Please note that as a result of this method call, the property will no longer be visible on the public website.
6.5.1. Request
Method call:
GET https://remax-cca.com/api/v1/CancelProperty/{listingid}
listing id
ListingID of the property in RECONNECT
Sample Request:
GET https://remax-cca.com/api/v1/CancelProperty/13456
Authorization: bearer B80CZ7pO77NrG-GYZSmTCQ28V8ZcnCjqWSuiKw-sMwfR-lSJAbuVq3e9KmGgo3vW0Prr9bKCmD336OXi0cDWUsDKCLhW_dklFj-m_7VkDlMjAw3zRRu-PNiO2UOKvE3lovOlzTnjIxjghGi39TzmalLdmXVpPAciNjofT11lyfLphRLYwiJx- Sx8oXFW02T6FquvlvT5Eg7pnltXux9-hWQM3stdOKLrWyH0I6z_5M8L-IDAxE43jadsGn3SF2orhK5ChKGt29_P3dla77XOO1i6HHkYp6_QVlluudMWUpWkEd_23xpsZ1NpR_373umg
Key: Content-Type
Value: application/json
6.5.2. Response
Http Status Codes Responses & Messages
Status 200 - OK
Message
Description Call was successful
Status 404 - Not Found
Message <Error> <Message> Requested resource cannot be found. Requested operation was not performed. </Message> </Error>
Description Resource was not found for the specified ID. As a result, the requested operation could not be performed.
6.6. TransferToAnotherAssociate
The method will transfer the property from the current associate to a different one.(In the same office)
The receiving associate must be an existing associate in our database when you make this call.
6.6.1. Request
Method call:
GET https://remax-cca.com/api/v1/property/{listingid}/transfer/from-{associateidfrom}/to-{associateidto}
Required parameters:
listing id
This is the ID of the property to be transferred.
associateidto
This is the ID of the associate receiving the property.
associateidfrom
This is the ID of the associate sending the property.
Sample Request:
https://remax-cca.com/api/v1/property/13456/transfer/from-314/to-315
Authorization: bearer B80CZ7pO77NrG-GYZSmTCQ28V8ZcnCjqWSuiKw-sMwfR-lSJAbuVq3e9KmGgo3vW0Prr9bKCmD336OXi0cDWUsDKCLhW_dklFj-m_7VkDlMjAw3zRRu-PNiO2UOKvE3lovOlzTnjIxjghGi39TzmalLdmXVpPAciNjofT11lyfLphRLYwiJx-Sx8oXFW02T6FquvlvT5Eg7pnltXux9-hWQM3stdOKLrWyH0I6z_5M8L-IDAxE43jadsGn3SF2orhK5ChKGt29_P3dla77XOO1i6HHkYp6_QVlluudMWUpWkEd_23xpsZ1NpR_373umg
6.6.2. Response
Sample Response:
HTTP/1.1 204 No Content
Status 200 - OK
Message
Description Call was successful
Status 404 - Not Found
Message <Error> <Message> Requested property cannot be found. Requested operation was not performed </Message> <MessageDetail> Please make sure that a resource with the requested ID actually exist before making the call </MessageDetail> </Error>
Message <Error> <Message> No Associate with with the specified ID can be found to receive the transfer </Message> </Error>
Description Resource was not found for the specified ID. As a result, the requested operation could not be performed.
7. Property Images
The methods described below enable the client application to manage listing images.
7.1. GetPropertyImages
The method returns the images information of a property.
7.1.1. Request
Method call:
GET https://remax-cca.com/api/v1/propertyimages/{listingid}
listingid
ID a property in RECONNECT
Sample Request
GET https://remax-cca.com/api/v1/propertyimages/13456
Authorization: bearer B80CZ7pO77NrG-GYZSmTCQ28V8ZcnCjqWSuiKw-sMwfR-lSJAbuVq3e9KmGgo3vW0Prr9bKCmD336OXi0cDWUsDKCLhW_dklFj-m_7VkDlMjAw3zRRu-PNiO2UOKvE3lovOlzTnjIxjghGi39TzmalLdmXVpPAciNjofT11lyfLphRLYwiJx-Sx8oXFW02T6FquvlvT5Eg7pnltXux9-hWQM3stdOKLrWyH0I6z_5M8L-IDAxE43jadsGn3SF2orhK5ChKGt29_P3dla77XOO1i6HHkYp6_QVlluudMWUpWkEd_23xpsZ1NpR_373umg
7.1.2. Response
Http Status Codes Responses & Messages
Status 200 - OK
Message You get the resource object
Description Call was successful
Status 404 - Not Found
Message
Description Resource was not found for the specified ID
Sample JSON Response
Status: 200 - OK
[
{
"photoID": 96268,
"listingID": 7342,
"prioridad": 1,
"imageURL": "https://remax-cca.com/Content/propertyPhotos/photos/L_de151c44376242d78d63aa2bc8bbb3aa_iList.jpg",
"imageThumbnailURL": "https://remax-cca.com/Content/propertyPhotos/thumbnail/L_de151c44376242d78d63aa2bc8bbb3aa_iList.jpg"
},
{
"photoID": 96269,
"listingID": 7342,
"prioridad": 10,
"imageURL": "https://remax-cca.com/Content/propertyPhotos/photos/L_af0b0043bf6c4ff19d5ab02ee06fb16a_iList.jpg",
"imageThumbnailURL": "https://remax-cca.com/Content/propertyPhotos/thumbnail/L_af0b0043bf6c4ff19d5ab02ee06fb16a_iList.jpg"
},
{
"photoID": 96270,
"listingID": 7342,
"prioridad": 11,
"imageURL": "https://remax-cca.com/Content/propertyPhotos/photos/L_a4116bc5e9024781ac016321facd78e9_iList.jpg",
"imageThumbnailURL": "https://remax-cca.com/Content/propertyPhotos/thumbnail/L_a4116bc5e9024781ac016321facd78e9_iList.jpg"
},
{
"photoID": 96271,
"listingID": 7342,
"prioridad": 12,
"imageURL": "https://remax-cca.com/Content/propertyPhotos/photos/L_cff51d45fad443db8c935430fda10660_iList.jpg",
"imageThumbnailURL": "https://remax-cca.com/Content/propertyPhotos/thumbnail/L_cff51d45fad443db8c935430fda10660_iList.jpg"
},
{
"photoID": 96272,
"listingID": 7342,
"prioridad": 13,
"imageURL": "https://remax-cca.com/Content/propertyPhotos/photos/L_78b07d7588284e8aaa32d3af8c59fa2b_iList.jpg",
"imageThumbnailURL": "https://remax-cca.com/Content/propertyPhotos/thumbnail/L_78b07d7588284e8aaa32d3af8c59fa2b_iList.jpg"
},
{
"photoID": 96273,
"listingID": 7342,
"prioridad": 14,
"imageURL": "https://remax-cca.com/Content/propertyPhotos/photos/L_1744673ccbac43acbad909977ec5f62a_iList.jpg",
"imageThumbnailURL": "https://remax-cca.com/Content/propertyPhotos/thumbnail/L_1744673ccbac43acbad909977ec5f62a_iList.jpg"
},
{
"photoID": 96274,
"listingID": 7342,
"prioridad": 15,
"imageURL": "https://remax-cca.com/Content/propertyPhotos/photos/L_b6d71c73b51345f1afd899df02281293_iList.jpg",
"imageThumbnailURL": "https://remax-cca.com/Content/propertyPhotos/thumbnail/L_b6d71c73b51345f1afd899df02281293_iList.jpg"
},
{
"photoID": 96275,
"listingID": 7342,
"prioridad": 16,
"imageURL": "https://remax-cca.com/Content/propertyPhotos/photos/L_c2b7b9400422426199a9b9a4afa5b206_iList.jpg",
"imageThumbnailURL": "https://remax-cca.com/Content/propertyPhotos/thumbnail/L_c2b7b9400422426199a9b9a4afa5b206_iList.jpg"
}
]
7.1. GetPropertyImageDetails
The method returns the detail information of an image of a property.
7.1.1. Request
Method call:
GET https://remax-cca.com/api/v1/propertyimagesdetails/{listingid}/{photoid}
listingid
ID a property in RECONNECT
Photoid
ID of an image in RECONNECT
Sample Request
GET https://remax-cca.com/api/v1/propertyimagesdetails/7342/96268
Authorization: bearer B80CZ7pO77NrG-GYZSmTCQ28V8ZcnCjqWSuiKw-sMwfR-lSJAbuVq3e9KmGgo3vW0Prr9bKCmD336OXi0cDWUsDKCLhW_dklFj-m_7VkDlMjAw3zRRu- PNiO2UOKvE3lovOlzTnjIxjghGi39TzmalLdmXVpPAciNjofT11lyfLphRLYwiJx-Sx8oXFW02T6FquvlvT5Eg7pnltXux9-hWQM3stdOKLrWyH0I6z_5M8L-IDAxE43jadsGn3SF2orhK5ChKGt29_P3dla77XOO1i6HHkYp6_QVlluudMWUpWkEd_23xpsZ1NpR_373umg
7.1.2. Response
Http Status Codes Responses & Messages
Status 200 - OK
Message You get the resource object
Description Call was successful
Status 404 - Not Found
Message
Description Resource was not found for the specified ID
Sample JSON Response
Status: 200 - OK
[
{
"photoID": 96268,
"listingID": 7342,
"prioridad": 1,
"imageURL": "https://remax-cca.com/Content/propertyPhotos/photos/L_de151c44376242d78d63aa2bc8bbb3aa_iList.jpg",
"imageThumbnailURL": "https://remax-cca.com/Content/propertyPhotos/thumbnail/L_de151c44376242d78d63aa2bc8bbb3aa_iList.jpg"
}
]
7.2. CreatePropertyImage
This method allows you to create a new property image.
The image will be resized to match the 3:2 aspect ratio and standard dimensions in our system.
7.2.1. Request
Method call:
GET https://remax-cca.com/api/v1/CreatePropertyImage
Sample JSON Request
In JSON, elements order is important. The order is alphabetical.
POST https://remax-cca.com/api/v1/CreatePropertyImage Accept: application/json; charset=utf-8 Content-Type: application/json; charset=utf-8 Authorization: bearer B80CZ7pO77NrG-GYZSmTCQ28V8ZcnCjqWSuiKw-sMwfR-lSJAbuVq3e9KmGgo3vW0Prr9bKCmD336OXi0cDWUsDKCLhW_dklFj-m_7VkDlMjAw3zRRu-PNiO2UOKvE3lovOlzTnjIxjghGi39TzmalLdmXVpPAciNjofT11lyfLphRLYwiJx-Sx8oXFW02T6FquvlvT5Eg7pnltXux9-hWQM3stdOKLrWyH0I6z_5M8L-IDAxE43jadsGn3SF2orhK5ChKGt29_P3dla77XOO1i6HHkYp6_QVlluudMWUpWkEd_23xpsZ1NpR_373umg { "listingid":13456, "imageURL":"http://www.myimagesofhouses.com/dewre343.jpg", "priorityImage":1 }
7.2.2. Response
Http Status Codes Responses & Messages
Status 200 - OK
Message The created resource object is returned in the response.
Description Call was successful
Status 404 - Not Found
Message <Error> <Message> New resource validation failure. Resource was not created. </Message> <MessageDetail> ..... </MessageDetail> </Error>
Description <MessageDetail> element will contain the reasons why validation failed. Correct the issues and try again.
Status 400 - Bad request
Message <Error> <Message>The request is invalid.</Message> <ModelState> <requestModel>.....</requestModel> </ModelState> </Error>
Description The object you tried to upload does not match the expected object definition. <ModelState> element will explain where your object do not match the expected model. Please correct the raised issues and try again.
Status 404 - Not found
Message <Error> <Message> No property was found to match the listing id. Please create the property before adding Images. </Message> </Error>
Description
7.3. UpdatePropertyImage
The method allows to update the details of an existing image.
7.3.1. Request
Method call:
POST https://remax-cca.com/api/v1/UpdatePropertyImage
Sample XML Request
POST https://remax-cca.com/api/v1/UpdatePropertyImage
Accept: application/json; charset=utf-8
Content-Type: application/json; charset=utf-8
Authorization: bearer B80CZ7pO77NrG-GYZSmTCQ28V8ZcnCjqWSuiKw-sMwfR-lSJAbuVq3e9KmGgo3vW0Prr9bKCmD336OXi0cDWUsDKCLhW_dklFj-m_7VkDlMjAw3zRRu-PNiO2UOKvE3lovOlzTnjIxjghGi39TzmalLdmXVpPAciNjofT11lyfLphRLYwiJx-Sx8oXFW02T6FquvlvT5Eg7pnltXux9-hWQM3stdOKLrWyH0I6z_5M8L-IDAxE43jadsGn3SF2orhK5ChKGt29_P3dla77XOO1i6HHkYp6_QVlluudMWUpWkEd_23xpsZ1NpR_373umg{
"listingid": 0,
"photoid": 0,
"imageURL":"url of the image, it must contain http or https, Important: If you do not update the image, this parameter must be null",
"priorityImage": 0,
"status": 0
}
7.3.2. Response
Http Status Codes Responses & Messages
Status 200 - OK
Message The updated resource object is returned in the response.
Description Call was successful
Status 404 - Not Found
Message <Error> <Message> Requested resource cannot be found. Requested operation was not performed </Message> <MessageDetail> Please make sure that a resource with the requested ID actually exist before making the call </MessageDetail> </Error>
Description Resource was not found for the specified resource ID
Status 400 - Bad Request
Message <Error> <Message> New resource validation failure. Resource was not updated. </Message> <MessageDetail> ..... </MessageDetail> </Error>
Description <MessageDetail> element will contain the reasons why validation failed. Correct the raised issues and try again.
Status 400 - Bad Request
Message <Error> <Message>The request is invalid.</Message> <ModelState> <requestModel>.....</requestModel> </ModelState> </Error>
Description The object you tried to upload does not match the expected object definition. <ModelState> element will explain where your object do not match the expected model. Please correct the raised issues and try again.
7.4. DeleteOneImage
The method allows the deletion of one property image.
7.4.1. Request
Method call:
GET https://remax-cca.com/api/v1/propertyimagesdetails/{listingid}/{photoid}/hide
listingid
ID of a property in RECONNECT.
Photoid
The ID of the photo of a property.
Sample Request
GET https://remax-cca.com/api/v1/propertyimagesdetails/13456/45656/hide
Accept: application/json; charset=utf-8
Content-Type: application/json; charset=utf-8
Authorization: bearer B80CZ7pO77NrG-GYZSmTCQ28V8ZcnCjqWSuiKw-sMwfR-lSJAbuVq3e9KmGgo3vW0Prr9bKCmD336OXi0cDWUsDKCLhW_dklFj-m_7VkDlMjAw3zRRu-PNiO2UOKvE3lovOlzTnjIxjghGi39TzmalLdmXVpPAciNjofT11lyfLphRLYwiJx-Sx8oXFW02T6FquvlvT5Eg7pnltXux9-hWQM3stdOKLrWyH0I6z_5M8L-IDAxE43jadsGn3SF2orhK5ChKGt29_P3dla77XOO1i6HHkYp6_QVlluudMWUpWkEd_23xpsZ1NpR_373umg
7.4.2. Response
Http Status Codes Responses & Messages
Status 204 - No Content
Message
Description Call was successful
Status 404 - Not Found
Message <Error> <Message> Requested resource cannot be found. Requested operation was not performed </Message> </Error>
Description Resource was not found for the specified ID. As a result, the requested operation could not be performed.
7.5. DeleteAllImagesForOneProperty
The method deleted all images for a property in RECONNECT,
Important: This method will inactivate a property.
7.5.1. Request
Method call:
GET https://remax-cca.com/api/v1/DeleteAllImagesForOneProperty/{listingid}
listingid
ID of a property in RECONNECT.
Sample Request
GET https://remax-cca.com/api/v1/DeleteAllImagesForOneProperty/{listingid}
Accept: application/json; charset=utf-8
Content-Type: application/json; charset=utf-8
Authorization: bearer B80CZ7pO77NrG-GYZSmTCQ28V8ZcnCjqWSuiKw-sMwfR-lSJAbuVq3e9KmGgo3vW0Prr9bKCmD336OXi0cDWUsDKCLhW_dklFj-m_7VkDlMjAw3zRRu-PNiO2UOKvE3lovOlzTnjIxjghGi39TzmalLdmXVpPAciNjofT11lyfLphRLYwiJx-Sx8oXFW02T6FquvlvT5Eg7pnltXux9-hWQM3stdOKLrWyH0I6z_5M8L-IDAxE43jadsGn3SF2orhK5ChKGt29_P3dla77XOO1i6HHkYp6_QVlluudMWUpWkEd_23xpsZ1NpR_373umg
7.5.2. Response
Http Status Codes Responses & Messages
Status 204 - No Content
Message
Description Call was successful
Status 404 - Not Found
Message <Error> <Message> Requested resource cannot be found. Requested operation was not performed </Message> </Error>
Description Resource was not found for the specified ID. As a result, the requested operation could not be performed.
8. Lookups
The methods described below enable the client application to manage different catalogues related to a property. First method invoke the names of catalogues and the other method invoke values of each catalogue for information purpose.
8.1. GetLookupnames
The method returns the catalogues information related to a property.
8.1.1. Request
Method call:
GET https://remax-cca.com/api/v1/lookups/names
Sample Request
GET https://remax-cca.com/api/v1/lookups/names
Authorization: bearer B80CZ7pO77NrG-GYZSmTCQ28V8ZcnCjqWSuiKw-sMwfR-lSJAbuVq3e9KmGgo3vW0Prr9bKCmD336OXi0cDWUsDKCLhW_dklFj-m_7VkDlMjAw3zRRu-PNiO2UOKvE3lovOlzTnjIxjghGi39TzmalLdmXVpPAciNjofT11lyfLphRLYwiJx-Sx8oXFW02T6FquvlvT5Eg7pnltXux9-hWQM3stdOKLrWyH0I6z_5M8L-IDAxE43jadsGn3SF2orhK5ChKGt29_P3dla77XOO1i6HHkYp6_QVlluudMWUpWkEd_23xpsZ1NpR_373umg
8.1.2. Response
Http Status Codes Responses & Messages
Status 200 - OK
Message You get the resource object
Description Call was successful
Status 404 - Not Found
Message
Description Resource was not found for the specified ID
Sample JSON Response
Status: 200 - OK
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
},
{
"idLookupName": 3,
"lookupName": "PROPERTY GENERAL LOCATION",
"lookupDescription": "PROPERTY_GENERAL_LOCATION"
},
{
"idLookupName": 4,
"lookupName": "PROPERTY STATUS",
"lookupDescription": "PROPERTY_STATUS"
},
{
"idLookupName": 5,
"lookupName": "PROPERTY TYPE",
"lookupDescription": "PROPERTY_TYPE"
},
{
"idLookupName": 6,
"lookupName": "CURRENCY",
"lookupDescription": "CURRENCY"
},
{
"idLookupName": 7,
"lookupName": "Contract Type",
"lookupDescription": "Contract_Type"
}
]
8.2. GetLookupDetails
The method returns the values of a catalogue related to a property.
8.2.1. Request
Method call:
GET https://remax-cca.com/api/v1/lookups/detailsbyid/{id}
id
ID of the catalogue(idLookupName).
Sample Request
GET https://remax-cca.com/api/v1/lookups/detailsbyid/2
Authorization: bearer B80CZ7pO77NrG-GYZSmTCQ28V8ZcnCjqWSuiKw-sMwfR-lSJAbuVq3e9KmGgo3vW0Prr9bKCmD336OXi0cDWUsDKCLhW_dklFj-m_7VkDlMjAw3zRRu-PNiO2UOKvE3lovOlzTnjIxjghGi39TzmalLdmXVpPAciNjofT11lyfLphRLYwiJx-Sx8oXFW02T6FquvlvT5Eg7pnltXux9-hWQM3stdOKLrWyH0I6z_5M8L-IDAxE43jadsGn3SF2orhK5ChKGt29_P3dla77XOO1i6HHkYp6_QVlluudMWUpWkEd_23xpsZ1NpR_373umg
8.2.2. Response
Http Status Codes Responses & Messages
Status 200 - OK
Message You get the resource object
Description Call was successful
Status 404 - Not Found
Message
Description Resource was not found for the specified ID
Status: 200 - OK
[
{
"mostProbableUseID": 1,
"mostprobableUseName_EN": "General"
},
{
"mostProbableUseID": 2,
"mostprobableUseName_EN": "RE/MAX Commercial"
},
{
"mostProbableUseID": 3,
"mostprobableUseName_EN": "RE/MAX Collection"
}
]
9. Geo Data
The methods described below enable the client application to view different catalogues related to Geographical Data in RECONNECT.
If you want to add/delete or modify these lists, please contact our support service: support@remax-cca.com
9.1. GetAllCountries
The method returns the catalogues information of Countries in Caribbean and Central America.
9.1.1. Request
Method call:
GET https://remax-cca.com/api/v1/geo/countries
Sample Request
GET https://remax-cca.com/api/v1/geo/countries
Authorization: bearer B80CZ7pO77NrG-GYZSmTCQ28V8ZcnCjqWSuiKw-sMwfR-lSJAbuVq3e9KmGgo3vW0Prr9bKCmD336OXi0cDWUsDKCLhW_dklFj-m_7VkDlMjAw3zRRu-PNiO2UOKvE3lovOlzTnjIxjghGi39TzmalLdmXVpPAciNjofT11lyfLphRLYwiJx-Sx8oXFW02T6FquvlvT5Eg7pnltXux9-hWQM3stdOKLrWyH0I6z_5M8L-IDAxE43jadsGn3SF2orhK5ChKGt29_P3dla77XOO1i6HHkYp6_QVlluudMWUpWkEd_23xpsZ1NpR_373umg
9.1.2. Response
Http Status Codes Responses & Messages
Status 200 - OK
Message You get the resource object
Description Call was successful
Status 404 - Not Found
Message
Description Resource was not found for the specified ID
Sample JSON Response
Status: 200 - OK
[
{
"countryID": 1856,
"countryName_en": "Antigua and Barbuda",
"countryName_es": "Antigua y Barbuda",
"flagurl": "https://www.remax-caribbeanislands.com/content/assets/img/flags/antiguabarbuda.gif"
},
{
"countryID": 1857,
"countryName_en": "Puerto Rico",
"countryName_es": "Puerto Rico",
"flagurl": "https://www.remax-caribbeanislands.com/content/assets/img/flags/puertorico.gif"
},
{
"countryID": 1859,
"countryName_en": "Cayman Islands",
"countryName_es": "Cayman Islands",
"flagurl": "https://www.remax-caribbeanislands.com/content/assets/img/flags/caymanisland.gif"
},
{
"countryID": 1860,
"countryName_en": "Guadeloupe",
"countryName_es": "Guadeloupe",
"flagurl": "https://www.remax-caribbeanislands.com/content/assets/img/flags/guadalupe.gif"
},
{
"countryID": 1861,
"countryName_en": "Martinique",
"countryName_es": "Martinique",
"flagurl": "https://www.remax-caribbeanislands.com/content/assets/img/flags/martinique.gif"
},
{
"countryID": 1862,
"countryName_en": "Bonaire",
"countryName_es": "Bonaire",
"flagurl": "https://www.remax-caribbeanislands.com/content/assets/img/flags/bonaire.gif"
},
{
"countryID": 1863,
"countryName_en": "Guatemala",
"countryName_es": "Guatemala",
"flagurl": "https://www.remax-caribbeanislands.com/content/assets/img/flags/guatemala.gif"
},
{
"countryID": 1864,
"countryName_en": "Barbados",
"countryName_es": "Barbados",
"flagurl": "https://www.remax-caribbeanislands.com/content/assets/img/flags/barbados.gif"
},
{
"countryID": 1865,
"countryName_en": "Aruba",
"countryName_es": "Aruba",
"flagurl": "https://www.remax-caribbeanislands.com/content/assets/img/flags/aruba.gif"
},
……………………._._ _c_o_n_t_i_n_u_e_ _……………………._ _
9.2. GetAllStatesProvincesInACountry
The method returns the values of states, provinces or departments in a country.
9.2.1. Request
Method call:
GET https://remax-cca.com/api/v1/geo/countries/{id}/StateProvincesInaCountry
id
ID of the country.
Sample Request
GET https://remax-cca.com/api/v1/geo/countries/1859/StateProvincesInaCountry
Authorization: bearer B80CZ7pO77NrG-GYZSmTCQ28V8ZcnCjqWSuiKw-sMwfR-lSJAbuVq3e9KmGgo3vW0Prr9bKCmD336OXi0cDWUsDKCLhW_dklFj-m_7VkDlMjAw3zRRu-PNiO2UOKvE3lovOlzTnjIxjghGi39TzmalLdmXVpPAciNjofT11lyfLphRLYwiJx-Sx8oXFW02T6FquvlvT5Eg7pnltXux9-hWQM3stdOKLrWyH0I6z_5M8L-IDAxE43jadsGn3SF2orhK5ChKGt29_P3dla77XOO1i6HHkYp6_QVlluudMWUpWkEd_23xpsZ1NpR_373umg
9.2.2. Response
Http Status Codes Responses & Messages
Status 200 - OK
Message You get the resource object
Description Call was successful
Status 404 - Not Found
Message
Description Resource was not found for the specified ID
Sample JSON Response
Status: 200 - OK
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
},
{
"countryID": 1859,
"stateDepProvID": 17176,
"stateDepProv_en": "Cayman Brac",
"stateDepProv_es": "Cayman Brac"
},
{
"countryID": 1859,
"stateDepProvID": 17177,
"stateDepProv_en": "Little Cayman",
"stateDepProv_es": "Little Cayman"
}
]
9.3. GetAllLocationsInAStateProvince
The method returns the values of locations in a state, provinces or departments in a country.
9.3.1. Request
Method call:
GET https://remax-cca.com/api/v1/geo/countries/{countryid}/StateProvincesInaCountry/{stateDepProvID}/LocationsInAStateProvince
id
ID of the country.
Sample Request
GET GET https://remax-cca.com/api/v1/geo/countries/1859/StateProvincesInaCountry/17175/LocationsInAStateProvince
Authorization: bearer B80CZ7pO77NrG-GYZSmTCQ28V8ZcnCjqWSuiKw-sMwfR-lSJAbuVq3e9KmGgo3vW0Prr9bKCmD336OXi0cDWUsDKCLhW_dklFj-m_7VkDlMjAw3zRRu-PNiO2UOKvE3lovOlzTnjIxjghGi39TzmalLdmXVpPAciNjofT11lyfLphRLYwiJx-Sx8oXFW02T6FquvlvT5Eg7pnltXux9-hWQM3stdOKLrWyH0I6z_5M8L-IDAxE43jadsGn3SF2orhK5ChKGt29_P3dla77XOO1i6HHkYp6_QVlluudMWUpWkEd_23xpsZ1NpR_373umg
9.3.2. Response
Http Status Codes Responses & Messages
Status 200 - OK
Message You get the resource object
Description Call was successful
Status 404 - Not Found
Message
Description Resource was not found for the specified ID
Sample JSON Response
Status: 200 – OK
[
{
"locationId": 6698703,
"stateDepProvId": 17175,
"location_en": "South Sound",
"location_es": "South Sound"
},
{
"locationId": 6698704,
"stateDepProvId": 17175,
"location_en": "Barkers",
"location_es": "Barkers"
},
{
"locationId": 6698705,
"stateDepProvId": 17175,
"location_en": "North West Point",
"location_es": "North West Point"
},
{
"locationId": 6698706,
"stateDepProvId": 17175,
"location_en": "Rum Point",
"location_es": "Rum Point"
},
{
"locationId": 6698707,
"stateDepProvId": 17175,
"location_en": "Queens Highway",
"location_es": "Queens Highway"
},
{
"locationId": 6698708,
"stateDepProvId": 17175,
"location_en": "Beach Bay",
"location_es": "Beach Bay"
},
{
"locationId": 6698709,
"stateDepProvId": 17175,
"location_en": "Snug Harbour",
"location_es": "Snug Harbour"
},
{
"locationId": 6698710,
"stateDepProvId": 17175,
"location_en": "Kaibo",
"location_es": "Kaibo"
},
{
"locationId": 6698711,
"stateDepProvId": 17175,
"location_en": "Governors Harbour",
"location_es": "Governors Harbour"
},
{
"locationId": 6698745,
"stateDepProvId": 17175,
"location_en": "George Town",
"location_es": "George Town"
},
{
"locationId": 6698746,
"stateDepProvId": 17175,
"location_en": "West Bay",
"location_es": "West Bay"
},
{
"locationId": 6698747,
"stateDepProvId": 17175,
"location_en": "Bodden Town",
"location_es": "Bodden Town"
},
{
"locationId": 6698748,
"stateDepProvId": 17175,
"location_en": "East End",
"location_es": "East End"
},
{
"locationId": 6698749,
"stateDepProvId": 17175,
"location_en": "North Side",
"location_es": "North Side"
},
{
"locationId": 6698750,
"stateDepProvId": 17175,
"location_en": "Seven Mile Beach",
"location_es": "Seven Mile Beach"
},
{
"locationId": 6698751,
"stateDepProvId": 17175,
"location_en": "Savannah",
"location_es": "Savannah"
},
{
"locationId": 6698752,
"stateDepProvId": 17175,
"location_en": "Red Bay",
"location_es": "Red Bay"
},
{
"locationId": 6698753,
"stateDepProvId": 17175,
"location_en": "Spotts",
"location_es": "Spotts"
},
{
"locationId": 6698754,
"stateDepProvId": 17175,
"location_en": "Newlands",
"location_es": "Newlands"
},
{
"locationId": 6698755,
"stateDepProvId": 17175,
"location_en": "Colliers",
"location_es": "Colliers"
},
{
"locationId": 6698756,
"stateDepProvId": 17175,
"location_en": "High Rock",
"location_es": "High Rock"
},
{
"locationId": 6698757,
"stateDepProvId": 17175,
"location_en": "Gun Bay",
"location_es": "Gun Bay"
},
{
"locationId": 6698758,
"stateDepProvId": 17175,
"location_en": "Breakers",
"location_es": "Breakers"
},
{
"locationId": 6698759,
"stateDepProvId": 17175,
"location_en": "Frank Sound",
"location_es": "Frank Sound"
},
{
"locationId": 6698760,
"stateDepProvId": 17175,
"location_en": "Prospect",
"location_es": "Prospect"
},
{
"locationId": 6698761,
"stateDepProvId": 17175,
"location_en": "Old Prospect",
"location_es": "Old Prospect"
},
{
"locationId": 6698762,
"stateDepProvId": 17175,
"location_en": "Northward",
"location_es": "Northward"
}
]
