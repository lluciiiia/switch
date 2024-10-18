export async function getInquiries() {
  const res = await fetch("/api/v1/inquiries");
  return res.json();
}
