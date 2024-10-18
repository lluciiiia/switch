import { NextApiRequest, NextApiResponse } from "next";
import { signIn, signUp } from "./service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { action } = req.query;

  try {
    switch (action) {
      case "signin":
        const { email, password } = req.body;
        await signIn(email, password);
        res.status(200).json({ message: "Signed in successfully" });
        break;

      case "signup":
        const { email: signupEmail, password: signupPassword } = req.body;
        await signUp(signupEmail, signupPassword);
        res.status(200).json({ message: "Signed up successfully" });
        break;

      default:
        res.status(400).json({ error: "Invalid action" });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
