export const performQuery = async (query: string) => {
  const subgraphEndpoint =
    "https://api.studio.thegraph.com/query/40280/rom-test/v0.0.15";

  const res = await fetch(subgraphEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Origin": subgraphEndpoint,
    },
    body: JSON.stringify({
      query: query,
    }),
  });

  const json = await res.json();
  return json;
};
