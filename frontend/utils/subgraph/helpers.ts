export const performQuery = async (query: string) => {
  const subgraphEndpoint =
    "https://api.studio.thegraph.com/query/40280/rom-test/v0.0.5";

  const res = await fetch(subgraphEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
    }),
  });

  const json = await res.json();
  return json;
};
