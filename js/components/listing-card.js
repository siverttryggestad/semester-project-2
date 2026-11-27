export function formatTimeLeft(endsAt) {
  const remaining = Date.parse(endsAt) - Date.now();

  if (!Number.isFinite(remaining)) return "End time unavailable";
  if (remaining <= 0) return "Auction ended";

  const totalMinutes = Math.ceil(remaining / 60_000);
  const days = Math.floor(totalMinutes / 1_440);
  const hours = Math.floor((totalMinutes % 1_440) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) return `Ends in ${days}d ${hours}h`;
  if (hours > 0) return `Ends in ${hours}h ${minutes}m`;
  return `Ends in ${minutes}m`;
}

export function formatCurrentBid(bids) {
  if (!Array.isArray(bids)) return "Bid unavailable";
  if (bids.length === 0) return "No bids yet";

  const highestBid = Math.max(...bids.map((bid) => bid.amount));
  return `${highestBid} credits`;
}

export function createListingCard(listing) {
  const card = document.createElement("article");
  card.className = "card h-100 overflow-hidden";

  const placeholder = document.createElement("div");
  placeholder.className =
    "listing-card-image bg-body-secondary d-grid align-items-center text-center text-body-secondary";
  placeholder.textContent = "No image available";

  const media = listing.media?.[0];

  if (media?.url) {
    const image = document.createElement("img");
    image.className = "card-img-top listing-card-image";
    image.alt = media.alt || listing.title;
    image.loading = "lazy";
    image.addEventListener("error", () => image.replaceWith(placeholder), {
      once: true,
    });
    image.src = media.url;
    card.append(image);
  } else {
    card.append(placeholder);
  }

  const body = document.createElement("div");
  body.className = "card-body d-flex flex-column align-items-start";

  const title = document.createElement("h3");
  title.className = "h5 mb-1";
  title.textContent = listing.title;

  const timeLeft = document.createElement("p");
  timeLeft.className = "small text-body-secondary mb-2";
  timeLeft.textContent = formatTimeLeft(listing.endsAt);

  const bidLabel = document.createElement("p");
  bidLabel.className = "small mb-1";
  bidLabel.textContent = "Current bid";

  const bidValue = document.createElement("p");
  bidValue.className = "fw-bold mb-2";
  bidValue.textContent = formatCurrentBid(listing.bids);

  const link = document.createElement("a");
  link.className = "btn btn-outline-primary btn-sm stretched-link mt-auto";
  link.href = `./listing.html?id=${encodeURIComponent(listing.id)}`;
  link.textContent = "View listing";
  link.setAttribute("aria-label", `View listing: ${listing.title}`);

  body.append(title, timeLeft, bidLabel, bidValue, link);
  card.append(body);

  return card;
}