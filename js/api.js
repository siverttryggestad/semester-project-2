const API_BASE_URL = "https://v2.api.noroff.dev";

export async function getActiveListings(query = "") {
  const params = new URLSearchParams({
    _active: "true",
    _bids: "true",
  });

  let path = "/auction/listings";

  if (query) {
    path += "/search";
    params.set("q", query);
  }

  const response = await fetch(`${API_BASE_URL}${path}?${params}`);

  if (!response.ok) {
    throw new Error(`Could not load listings (${response.status})`);
  }

  const { data } = await response.json();
  return data;
}