# POC on VoiceBot for visualization.
Building an AI chatbot with Dialogflow, Angular4 and Node.js.

# Overview

We will build an application to generate the graphical representation of demad for any skill sets by reading the excel file having the HCL demand data. 

<details>
  <summary>Dialogflow Concepts & Constructs</summary>
 
[Dialogflow](https://dialogflow.com/docs/getting-started/basics) is a conversation building tool. It takes the human language and cleverly splits it into intents and arguments.

[Agent](https://dialogflow.com/docs/agents): Agents are best described as NLU (Natural Language Understanding) modules. These can be included in your app, product, or service and transforms natural user requests into actionable data.

This transformation occurs when a user input matches one of the intents inside your agent. [Intents](https://dialogflow.com/docs/intents) are the predefined or developer-defined components of agents that process a user's request.

[Intent](https://dialogflow.com/docs/intents): An intent represents a mapping between what a user says and what action should be taken by your software.

Intent interfaces have the following sections:

  - User says
  - Action
  - Response
  - Contexts

[Entity](https://dialogflow.com/docs/entities): Entities are powerful tools used for extracting [parameter values](https://dialogflow.com/docs/actions-and-parameters#parameters) from natural language inputs. Any important data you want to get from a user's request will have a corresponding entity.

The entities used in a particular agent will depend on the parameter values that are expected to be returned as a result of the agent functioning. In other words, a developer does not need to create entities for every possible concept mentioned in the agent – only for those needed for actionable data.

There are 3 types of entities:

  - [system](https://dialogflow.com/docs/entities#system_entities) (defined by Dialogflow)
  - [developer](https://dialogflow.com/docs/entities#developer_entities) (defined by a developer)
  - [user](https://dialogflow.com/docs/entities#user_entities) (built for each individual end-user in every request)

Each of these can be classified as:

  - mapping - having reference values
  - enum - having no reference values
  - composite - containing other entities with aliases and returning object type values
  
[Context](https://dialogflow.com/docs/contexts): Contexts represent the current context of a user's request. This is helpful for differentiating phrases which may be vague or have different meanings depending on the user's preferences, geographic location, the current page in an app, or the topic of conversation.

For example, if a user is listening to music and finds a band that catches their interest, they might say something like: "I want to hear more of them". As a developer, you can include the name of the band in the context with the request, so that the agent can use it in other intents.

[Fulfillment](https://dialogflow.com/docs/fulfillment): Fulfillment is a webhook that allows you to pass information from a matched intent into a web service and get a result from it.

_**Allow Fulfillment to read the excel file**_

Now you'll enable Fulfillment so get the the data from webhook(excel data).

Click on **Fulfillment** in the left panel and switch the **Inline Editor** toggle to "Enabled".

</details>

## Using `npm link`

Check out and build the [voiceBot-dialogflow-angula4](https://github.com/ERS-HCL/angular-atomic-library.git)
```bash
git clone https://github.com/ERS-HCL/voiceBot-dialogflow-angula4.git
cd voiceBot-dialogflow-angula4\client_webhook
npm install
```

## Follow the below steps to import the Dialogflow agent.<br>

  1. Signup to Dialogflow [click here](https://dialogflow.com/).
    2. After Signup successfully, Click on the setting icon (left cornor and below the Dialogflow logo of the page).
    3. Choose the Import and Export option.
    4. Click on the IMPORT FROM ZIP button and choose the zip file (path="voiceBot-dialogflow-angula4\client_webhook" whcich you have downloaded before).


## After imported the agent,follow the below steps to get the Client access token (API Keys)<br>
    1. Click on the same setting icon.
    2. Choose the General option.
    3. Scroll down, you will find the API keys. Capy the Client access token.
    4. Paste the Client access token into your angurlar project (Path=src\app\components\home\home.service.ts)
    inside the home.service.ts,a variable called "token"


## Deploy the nodejs server into heroku.(Dialogflow can only access the public accesable https server)
Goto working directory (voiceBot-dialogflow-angula4\client_webhook)

  ```bash
  git init
  heroku create 'any_app_name'
  git add .
  git commit -m 'any_message'
  git push heroku master
  ```

## Fulfillment setup
    1. Afeter deployed into heroku (or AWS) copy the url and append "api/dsm_api".
    For example: If "https://hcl-chatbot.herokuapp.com/" is your app url.
    webhook url should be https://hcl-chatbot.herokuapp.com/api/dsm_api
    2.Goto dialogflow account and select the agent which you have imported before.
    3.Click on the Fulfilment, paste the webhook url into URL* and click save.

## To test the application
  ```bash
 ng serve
server will start on "http://localhost:4200".
  ```




 
