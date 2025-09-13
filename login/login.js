// Replace with your OAuth 2.0 Client ID
const CLIENT_ID = "22195300401-69o6lu8e3nv856paoq44h620cncu6sef.apps.googleusercontent.com";

// Initialize the Google button
window.onload = function () {
  google.accounts.id.initialize({
    client_id: CLIENT_ID,
    callback: handleCredentialResponse
  });

  google.accounts.id.renderButton(
    document.getElementById("buttonDiv"),
    { theme: "outline", size: "large" } // customizations
  );
};

// Handle login response
function handleCredentialResponse(response) {
  // Decode JWT token to get user info
  const data = parseJwt(response.credential);
  console.log("User Info:", data);

  // Show user info
  document.getElementById("user-info").classList.remove("hidden");
  document.getElementById("user-pic").src = data.picture;
  document.getElementById("user-name").textContent = data.name;
  document.getElementById("user-email").textContent = data.email;

  // Hide Google button after login
  document.getElementById("buttonDiv").style.display = "none";
}

// Helper: Decode JWT token
function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  google.accounts.id.disableAutoSelect();
  document.getElementById("user-info").classList.add("hidden");
  document.getElementById("buttonDiv").style.display = "block";
});
