const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

export async function deployNewPage(htmlContent: string) {
  const res = await fetch(`${API_BASE_URL}/deploy`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ htmlContent }),
  });

  return res.json();
}

export async function updateExistingPage(
  id: string,
  htmlContent: string,
  editToken: string
) {
  const res = await fetch(`${API_BASE_URL}/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ htmlContent, editToken }),
  });

  return res.json();
}
