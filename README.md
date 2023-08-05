# QUIDDITCH-REALM

*Quidditch-realm is a full stack **harry potter** theme based site.*

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