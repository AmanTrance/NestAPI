<h1>A Simple Nestjs CRUD API</h1>

If you want to test it out, remember to initialise ".env" for database connection key and to install require dependencies.

To test out API endpoints consider using a tool like Postman API.

I used JWT Tokens for access Tokens, I don't implement Refresh Tokens right now because I don't think we require those in this CRUD API but it's very easy to implement will soon do that also.

Every API endpoint except the 'createuser' one requires accessTokens and to get them you need to hit the 'createuser' endpoint with required Details i.e. signup page in the frontend and then you can store them in local storage for further tasks, validity of a access token only changes when you update user and in result you get a new access token which is the valid one after updating any user. 