# LyfDesk 

HackGlobal, The Global Hackathon Series 2024

## Background

All-in-One Solution for Receptionist Tasks

### Assumption

 * Each staff pass is a unique ID.
 * Data is given in .csv files.
 * Continuous prompt from user until exit. 
 
## Tech Stack
- [Next](https://nextjs.org/)
- [React](https://react.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Twilio](https://www.twilio.com/en-us)
- [OpenAI](https://openai.com/)
- [Google Cloud](https://cloud.google.com/)
- [Instagram API](https://developers.facebook.com/products/instagram/apis/)[]
- [AWS](https://aws.amazon.com/)

## Prerequisites

Dependencies to be installed:
* [Node](https://nodejs.org/en/download) 

## Run Web Application Locally

Clone the project

```bash
  git clone https://github.com/lluciiiia/switch.git
```

Go to the project directory

```bash
  cd switch
```

Install dependencies

```bash
  npm install
```

Run Development Environment

```bash
  npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## AI Call (Twilio & OpenAI) Set Up

1. This file contains the necessary Python packages that should be installed for the project to run.

pip install -r requirements.txt
 
2. run main file
python app.py

3. run grok

ngrok config add-authtoken 2nroPjoOKo1Q8OoeInrij6JvtpD_7zg8gmqKCCUpVkRUFQajW

ngrok http --url=apt-centrally-humpback.ngrok-free.app 127.0.0.1:5000

4. call 

+1 731 326 1845

Press 1 to cancel the trial call message

Say you want to book a room at Lyf

5. postman testing

[POST] https://apt-centrally-humpback.ngrok-free.app/call-handler 

[POST] https://apt-centrally-humpback.ngrok-free.app/process-speech 

Under postman “body”
Key : RecordingSid
Value : REf527e667c3907721e919d6f6fd8d274b
Audio REf527e667c3907721e919d6f6fd8d274b can be found in the recording folder
