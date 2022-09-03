Hi!, this is an express server that will give support to an ecommerce frontend page, with that in mind, the following steps are needed to execute it properly:

Files to add at root level:

configFiles folder containing:
-firebase-key.js with a variable called "account" wich is an object with the firebase service account settings being default exported.

.env file containing:
-PORT with the choosen port number.
-PROCESSING_MODE with either "fork" or "cluster" uppercase not needed.

Remember to run "npm i" to download the required node modules.

Extra files:

logConfig contains strings to paint certain texts for easier distinction of useful information.