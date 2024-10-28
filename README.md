# LyfDesk 🚀

All-in-One Solution for Receptionist Tasks 🏢

[Live Deployment](https://main.d2312vzugm71c2.amplifyapp.com/) 🌐
[Demo Video](https://youtu.be/kZMzEGOXbsk) 🎥

## Project Background 📋

HackGlobal 🌍 - The Global Hackathon Series 2024

## Tech Stack 💻

- [Next.js](https://nextjs.org/) ⚛️
- [React](https://react.dev/) ⚛️
- [TypeScript](https://www.typescriptlang.org/) 📘
- [Twilio](https://www.twilio.com/en-us) 📞
- [OpenAI](https://openai.com/) 🧠
- [Google Cloud](https://cloud.google.com/) ☁️
- [Instagram API](https://developers.facebook.com/products/instagram/apis/) 📸
- [AWS](https://aws.amazon.com/) 🌐

## Prerequisites 🛠️

Dependencies to be installed:
* [Node](https://nodejs.org/en/download) 🟩

## Run Web Application Locally 🏃‍♂️

1. Clone the project

    ```bash
    git clone https://github.com/lluciiiia/switch.git
    ```

2. Go to the project directory

    ```bash
    cd switch
    ```

3. Install dependencies

    ```bash
    npm install
    ```

4. Run Development Environment

    ```bash
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result 🎉

## AI Call (Twilio & OpenAI) Set Up 📞🤖

1. Install necessary Python packages:

    ```bash
    pip install -r requirements.txt
    ```

2. Run main file:

    ```bash
    python app.py
    ```

3. Start ngrok:

    ```bash
    ngrok config add-authtoken YOUR_AUTH_TOKEN
    ngrok http 127.0.0.1:5000
    ```

4. Make a call to test:

    ```
    +1 731 326 1845
    ```

   - Press 1 to cancel the trial call message
   - Say you want to book a room at Lyf 🏨

5. Postman Testing 🧪

   - [POST] https://apt-centrally-humpback.ngrok-free.app/call-handler
   - [POST] https://apt-centrally-humpback.ngrok-free.app/process-speech

   In Postman “body”:
   - Key: `RecordingSid`
   - Value: `REf527e667c3907721e919d6f6fd8d274b`
   
   🎙️ The audio `REf527e667c3907721e919d6f6fd8d274b` can be found in the recording folder.

6. Team 👥

- [Seokyung Kim](https://github.com/lluciiiia) 🌟
- [Lim Wei Jie](https://github.com/Stabbershade) 🔥
- [Nguyen Binh](https://github.com/nguyentobinh12x5) 🚀
- [Candy Tam](https://github.com/CANDYTAM) 🌈


