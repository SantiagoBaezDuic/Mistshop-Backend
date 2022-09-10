Hi!, this is an express server that will give support to an ecommerce frontend page, with that in mind, the following steps are needed to execute it properly:

Files to add at root level:

.env file containing:
-PORT with the choosen port number.
-PROCESSING_MODE with either "fork" or "cluster" uppercase not needed.
-SECRET with a string for usage on both the session and the cookies.
-MONGO_ATLAS_STRING with the nodejs connection string provided by mongoatlas, replacing the password and the collection name.
---The following variables are all part of the .json file firebase gives you as the service account data, so they wont be explained further---
-TYPE
-PROJECT_ID
-PRIVATE_KEY_ID
-CLIENT_EMAIL
-CLIENT_ID
-AUTH_URI
-TOKEN_URI
-AUTH_PROVIDER_X509_CERT_URL
-CLIENT_X509_CERT_URL

Remember to run "npm i" to download the required node modules.

Extra files:

logConfig contains strings to paint certain texts for easier distinction of useful information.