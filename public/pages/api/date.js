export default function handle(req, res) {
  console.log('env');
  console.log(JSON.stringify(process.env, null, 2));

  const date = new Date().toString();
  res.json({ date });
}
