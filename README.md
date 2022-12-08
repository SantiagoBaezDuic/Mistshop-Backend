Hi!, this is an express server that will give support to an ecommerce frontend page, with that in mind, the following steps are needed to execute it properly:

Files to add at root level:

.env file containing:
-PORT with the choosen port number.
-PROCESSING_MODE with either "fork" or "cluster" uppercase not needed.
-SECRET with a string for usage on both the session and the cookies.
-MONGO_ATLAS_STRING with the nodejs connection string provided by mongoatlas, replacing the password and the collection name.
-ETHEREAL_MAIL a string with the email from an Ethereal account.
-ETHEREAL_PASS a string with the password from an Ethereal account.
-FIREBASE_ACCOUNT with the firebase service account json data without the line breaks.

Remember to run "npm i" to download the required node modules.

Extra files:

logConfig contains strings to paint certain texts for easier distinction of useful information.