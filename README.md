## Get started with project
___

* In your editor command line
```
   cd Quidditch-Realm
   (if not already)
```
* In another terminal
```
   cd Quidditch-Realm
   (if not already)
   cd server
```
*In both do:*
```
   npm install
```

**Start server**

 *On client side:*
 ```
 npm start
 ```

*On server side:*
```
 npm run dev

```
  **Add your mongodb** *CONNECTION_URI* **and your** *JWT_SECRET* **in server/.env file****
___

## Some process related to the features that are used in this website
---


##### *all this is part of what we learned while implementing this*

>## Authentication process

*refer below figure*

![auth_process](https://github.com/Saumya40-codes/Quidditch-Realm/assets/115284013/0c5dad65-349f-40eb-8889-78a15091b629)

**technologies/packages used**
* Node, Express
  * jwt
* MongoDB
* In frontend
  * Reactjs
  * Redux

___
>## Google calendar integration
#### necessary requirements
* From Google Cloud APIS (keep this in .env file in server)
  1. REFRESH_TOKEN
  2. CLIENT_SECRET
  3. API_KEY
  4. *keep redirect uri domainname/redirect*

* Steps:
  * OAuth (more precisely OAuth 2.0) is used here for google services authorization
  
  * Generally what we do is redirecting user to what we call as OAuth consent screen within the scope(the google calendar here)
    * With this user will be asked for the authorization
      * once we got that we will get the tokens which include access and a refresh token. This token format are in terms of jwt!


  * For adding events to google calendar as a part of this website functionality, user is redirected to server side page for authorization and once that's been done successfully, event is being added to google calendar
