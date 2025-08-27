exports.handler = async (event) => {
  const { q, units = 'metric', lang = 'ru' } = event.queryStringParameters || {};
  if (!q) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing ?q=' }) };
  }

  const url = `https://api.openweathermap.org/data/2.5/weather` +
              `?q=${encodeURIComponent(q)}` +
              `&units=${units}` +
              `&lang=${lang}` +
              `&appid=${process.env.OPENWEATHER_API_KEY}`;

  try {
    const r = await fetch(url);
    const body = await r.text(); 
    return {
      statusCode: r.status,
      headers: {
        'content-type': 'application/json',
        'cache-control': 's-maxage=300, max-age=60',
      },
      body,
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Upstream error', details: String(err) }) };
  }
};
