import { getListingById } from "./api.js";
import { renderNavbar } from "./components/navbar.js";
import {
  formatCurrentBid,
  formatTimeLeft,
} from "./components/listing-card.js";

renderNavbar();

async function showListing() {
  const status = document.querySelector("#listing-status");
  const id = new URLSearchParams(window.location.search).get("id");

  if (!id) {
    status.textContent = "Choose an auction from the home page.";
    return;
  }

  try {
    const listing = await getListingById(id);

    document.title = `${listing.title} | Bidly`;
    document.querySelector("#listing-title").textContent = listing.title;
    document.querySelector("#listing-seller").textContent =
      `Listed by ${listing.seller?.name || "Unknown seller"}`;
    document.querySelector("#listing-description").textContent =
      listing.description?.trim() || "No description provided.";
    document.querySelector("#listing-time").textContent =
      formatTimeLeft(listing.endsAt);
    document.querySelector("#listing-bid").textContent =
      formatCurrentBid(listing.bids);

    const media = listing.media?.[0];
    const image = document.querySelector("#listing-image");
    const placeholder = document.querySelector("#listing-image-placeholder");

    if (media?.url) {
      image.alt = media.alt || listing.title;
      image.addEventListener("load", () => {
        image.hidden = false;
        placeholder.hidden = true;
      }, { once: true });
      image.src = media.url;
    }

    const bids = [...(listing.bids ?? [])].sort((a, b) => b.amount - a.amount);
    const bidHistory = document.querySelector("#bid-history");

    document.querySelector("#bid-count").textContent =
      `${bids.length} ${bids.length === 1 ? "bid" : "bids"}`;
    document.querySelector("#no-bids").hidden = bids.length > 0;

    for (const bid of bids) {
      const row = document.createElement("li");
      row.className = "list-group-item d-flex justify-content-between gap-2 px-0";

      const name = document.createElement("span");
      name.textContent = bid.bidder?.name || "Unknown bidder";

      const amount = document.createElement("strong");
      amount.className = "text-primary";
      amount.textContent = `${bid.amount} credits`;

      row.append(name, amount);
      bidHistory.append(row);
    }

    document.querySelector("#listing-details").hidden = false;
    status.textContent = "";
  } catch (error) {
    console.error(error);
    status.textContent = "Could not load this auction. Please try again later.";
  }
}

showListing();