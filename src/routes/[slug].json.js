
const lookup = new Map();

import descs from './_descs.js'
descs.forEach(desc => {
  lookup.set(desc.slug, JSON.stringify(desc.html));
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const delay = 0 // 500 // ms for test purpose

async function asyncGet(req, res, next) {
  await sleep(delay);

  const { slug } = req.params;
  if (lookup.has(slug)) {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });

    res.end(lookup.get(slug));
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({
      message: `description not found for ${slug}`
    }));
  }
}

export function get(req, res, next) {
  asyncGet(req, res, next)
}
