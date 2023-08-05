# QUIDDITCH-REALM

*Quidditch-realm is a full stack **harry potter** theme based site.*

---

>**FOR PAYMENT GATEWAY**

*real* payments haven't been enabled yet for security purposes.
Please use following detail to initiate test payments(fake ones) with *stripe*
* Card Number: *4242 4242 4242 4242*
* Expiration : *04/24*
* C.V.C: *424*

---

**Features:**
* Admin and user-based authentication
* Remain updated with latest match results
* Light/Dark theme
  * User side:
    * user can see the upcoming quidditch events
    * User can register for a particular event
    * event registration with stripe payment gateway
    * mark the event remainder on their calendar with google calendar integration
    * Mails and server side notifications when event starts with interest is marked for that event
    * User can also see the past matches score with proper scorer name with the respective timestamps
    * Comment section in every post match details for interactive user experience
    * Browse through the available teams and get more info about respective teams
    * User can see their registered events with there ticket information
    * user profiles and notifications
    * chose there favourite team and can get there upcoming match details directly on dashboard
  * Admin Side:
    * Includes everything which is in user side
    * CRUD events
    * Add/update match scores
    * CRUD teams/team details
    * Can see the registered teams
    * Admin gets updated with email and notification when any particular match ends to update the score
    * Ticket sales data
  * You'll find some interesting spell info as well

**Tech Stack used:**
  * Reactjs
  * Nodejs
  * Expressjs
  * MongoDB
  * Redux
* UI: Material UI 
  

*checkout [here](https://quidditch-realm-five.vercel.app)*

**QUIDDITCH REALM** *(bit overview)*

*Admin Dashboard*
![image](https://github.com/Saumya40-codes/Quidditch-Realm/assets/115284013/e87d03d8-ec3f-4b2f-b9ab-f616e3adfb95)

*Post Match Details*
![image](https://github.com/Saumya40-codes/Quidditch-Realm/assets/115284013/2531493b-7d30-4ac4-92d1-49af1004c219)

*Event registration part*
![image](https://github.com/Saumya40-codes/Quidditch-Realm/assets/115284013/5812d46f-7214-40fc-a844-136087aa05d5)

---
## Get started with project
___
* In your editor command line
```
   cd Quidditch-Realm
```
* In another terminal
```
   cd Quidditch-Realm
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
  **Add your mongodb** *CONNECTION_URI* **and your** *JWT_SECRET* **in server/.env file**
___

## Some process related to the features that are used in this website
---


##### *all this is part of what we learned while implementing this*

>## Authentication process

*refer below figure*

![auth_process](https://github.com/Saumya40-codes/Quidditch-Realm/assets/115284013/6760d94a-b8a1-461d-b8c0-0948f5ca9dde)

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
___
>## Stripe Payment Gateway
#### necessary requirements: (from stripe developers site)
  * PUBLISHABLE_KEY
  * SECRET_KEY
  
**Steps:**
  * initially from server side /config endpoint, publishable key is sent to client side for authorization with stripe.
  * when user initialise the payment, an API call is sent to server side /create-payment-intent endpoint, this creates the payment, payment amount is sent in body of this req.
  we retrive client secret from this.
  * loadStripe(publishableKey) helps to expose publishable key on client side safely.
  * We have used *Element* from @stripe/react-stripe-js package to get necessart components.
  * There are many internal steps in between but to keep this short, in the end the inbuilt *stripe.confirmPayment* is called and we check for any possible error during this.
  
---
>## Contributions

**QUIDDITCH-REALM** *is open for contributing/enlisting issues/bug on our site*
