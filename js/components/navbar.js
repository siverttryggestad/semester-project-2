export function renderNavbar({ isLoggedIn = false, credits } = {}) {
  const header = document.querySelector("#site-header");

  const accountLinks = isLoggedIn
    ? `
      <a class="btn btn-light text-primary" href="./profile.html">Profile</a>
      <a class="btn btn-primary" href="./create.html">Create</a>
    `
    : `
      <a class="btn btn-light text-primary" href="./login.html">Log in</a>
      <a class="btn btn-primary" href="./register.html">Register</a>
    `;

 header.innerHTML = `
  <nav class="navbar bidly-navbar bg-primary-subtle px-3" aria-label="Main navigation">
    <a class="navbar-brand fw-bold text-black" href="./index.html">Bidly</a>

    <form class="d-none d-lg-block" role="search" action="./index.html">
      <input
        class="form-control"
        type="search"
        name="q"
        aria-label="Search for items"
        placeholder="Search for items..."
      >
    </form>

    <div class="d-none d-lg-flex align-items-center gap-2 justify-self-end">
      ${isLoggedIn ? '<span id="nav-credits" class="fw-semibold me-2"></span>' : ""}
      <a class="btn btn-light text-primary" href="./index.html">Auctions</a>
      ${accountLinks}
    </div>
  </nav>
`;

  if (isLoggedIn) {
    const balance = header.querySelector("#nav-credits");
    balance.textContent = Number.isFinite(credits) ? `${credits} credits` : "— credits";
  }
}