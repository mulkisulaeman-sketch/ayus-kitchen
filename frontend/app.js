const API_BASE = "/api";

const apiStatus = document.getElementById("api-status");
const serviceEl = document.getElementById("service");
const versionEl = document.getElementById("version");
const environmentEl = document.getElementById("environment");
const databaseEl = document.getElementById("database");
const usersEl = document.getElementById("users");
const userForm = document.getElementById("user-form");
const formMessage = document.getElementById("form-message");
const refreshButton = document.getElementById("refresh-users");

async function getHealth() {
  const response = await fetch(`${API_BASE}/health`);

  if (!response.ok) {
    throw new Error(`Health check failed: ${response.status}`);
  }

  return response.json();
}

async function getVersion() {
  const response = await fetch(`${API_BASE}/version`);

  if (!response.ok) {
    throw new Error(`Version request failed: ${response.status}`);
  }

  return response.json();
}

async function getUsers() {
  const response = await fetch(`${API_BASE}/users`);

  if (!response.ok) {
    throw new Error(`Users request failed: ${response.status}`);
  }

  return response.json();
}

function renderUsers(users) {
  if (!users.length) {
    usersEl.innerHTML = '<p class="muted">No users found.</p>';
    return;
  }

  usersEl.innerHTML = users.map((user) => `
    <div class="user">
      <strong>${escapeHtml(user.name)}</strong>
      <span>${escapeHtml(user.email)}</span>
    </div>
  `).join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function loadDashboard() {
  try {
    const [health, version, users] = await Promise.all([
      getHealth(),
      getVersion(),
      getUsers()
    ]);

    apiStatus.textContent = "API Online";
    apiStatus.className = "status status-ok";

    serviceEl.textContent = "ayus-kitchen-api";
    versionEl.textContent = version.version || health.version || "-";
    environmentEl.textContent = health.environment || "development";
    databaseEl.textContent = health.database || "up";

    renderUsers(users);
  } catch (error) {
    console.error(error);

    apiStatus.textContent = "API Offline";
    apiStatus.className = "status status-error";
    databaseEl.textContent = "Unavailable";
    usersEl.innerHTML = '<p class="muted">Unable to load users.</p>';
  }
}

userForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(userForm);

  const payload = {
    name: formData.get("name"),
    email: formData.get("email")
  };

  formMessage.textContent = "Creating user...";

  try {
    const response = await fetch(`${API_BASE}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to create user");
    }

    formMessage.textContent = "User created successfully.";
    userForm.reset();

    await loadDashboard();
  } catch (error) {
    console.error(error);
    formMessage.textContent = error.message;
  }
});

refreshButton.addEventListener("click", loadDashboard);

loadDashboard();
