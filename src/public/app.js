console.log({ message: "Hello. I was served from the server" });

async function handleAuthForm(formId, endpoint) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const errorDiv = document.getElementById("error");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log({ message: result.message });
        localStorage.setItem("user", JSON.stringify(result.user));
        window.location.href = "/pages/todos";
      } else {
        const result = await response.json();
        errorDiv.textContent = result.error || "An error occurred";
        errorDiv.style.display = "block";
      }
    } catch (err) {
      errorDiv.textContent = "Network error";
      errorDiv.style.display = "block";
    }
  });
}

handleAuthForm("login-form", "/api/auth/login");
handleAuthForm("signup-form", "/api/auth/register");