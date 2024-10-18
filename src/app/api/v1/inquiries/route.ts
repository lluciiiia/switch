import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../supabaseClient";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await supabase.from("inquiries").select("*");
  if (error) return res.status(500).json({ error });
  res.status(200).json(data);
}
