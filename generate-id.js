export default function handler(req, res) {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "No userId" });

  const personalId = ((parseInt(userId) % 900000) + 100000).toString();
  res.status(200).json({ personalId });
}
