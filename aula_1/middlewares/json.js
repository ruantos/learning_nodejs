export async function json(req, res) {
  const buffers = [];

  for await( const chunks of req) {
    buffers.push(chunks);
  }

  try {
    req.body = JSON.parse( Buffer.concat(buffers).toString() );
  } catch {
    req.body = null;
  }

  res.setHeader('Content-type', 'application/json')

}