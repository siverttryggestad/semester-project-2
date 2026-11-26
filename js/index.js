import { getActiveListings } from "./api.js";
import { renderNavbar } from "./components/navbar.js";
import { createListingCard } from "./components/listing-card.js";

renderNavbar();

const query = new URLSearchParams(window.location.search).get("q")?.trim() || "";

if (query) {
  const searchInput = document.querySelector('#site-header input[name="q"]');
  const heading = document.querySelector("#popular-auctions-heading");

  searchInput.value = query;
  heading.textContent = `Search results for “${query}”`;
}

async function showListings() {
  const container = document.querySelector("#listings");
  const status = document.querySelector("#listings-status");

  try {
    const listings = await getActiveListings(query);

    if (listings.length === 0) {
      status.textContent = query ? "No auctions match your search." : "No active auctions yet.";
      return;
    }

    for (const listing of listings) {
      const column = document.createElement("div");
      column.className = "col";
      column.append(createListingCard(listing));
      container.append(column);
    }

    status.textContent = "";
  } catch (error) {
    console.error(error);
    status.textContent = "Could not load auctions. Please try again later.";
  }
}

showListings();