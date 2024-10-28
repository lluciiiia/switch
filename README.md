This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## AI Call set up

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
