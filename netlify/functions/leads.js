const SUPABASE_URL = "https://dirqvqxjkjeatptbvxje.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpcnF2cXhqa2plYXRwdGJ2eGplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MTU3NDcsImV4cCI6MjA4ODk5MTc0N30.NNj0dX0POwzgzUWEdzZubKMMO_yURxe8PFPfPV5m2TY";
const WATI_URL = "https://live-mt-server.wati.io/10113827/api/v1/sendTemplateMessage";
const WATI_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Im5pcmdlcnRlbEBnbWFpbC5jb20iLCJuYW1laWQiOiJuaXJnZXJ0ZWxAZ21haWwuY29tIiwiZW1haWwiOiJuaXJnZXJ0ZWxAZ21haWwuY29tIiwiYXV0aF90aW1lIjoiMDMvMTYvMjAyNiAyMTo0NDoxNiIsInRlbmFudF9pZCI6IjEwMTEzODI3IiwiZGJfbmFtZSI6Im10LXByb2QtVGVuYW50cyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFETUlOSVNUUkFUT1IiLCJleHAiOjI1MzQwMjMwMDgwMCwiaXNzIjoiQ2xhcmVfQUkiLCJhdWQiOiJDbGFyZV9BSSJ9.hKjEuN6X2UKlVgx2_IQ6eCpCDwTn00Cl-A4JwHeiL_s";

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const body = JSON.parse(event.body || "{}");

    const name = body.full_name || body.name || "";
    const phone = (body.phone_number || body.phone || "").replace(/[^0-9]/g, "");
    const city = body.city || "";
    const jobType = body.job_type || body.form_name || "";

    let watiPhone = phone;
    if (phone.startsWith("0")) {
      watiPhone = "972" + phone.slice(1);
    } else if (!phone.startsWith("972")) {
      watiPhone = "972" + phone;
    }

    const isBeerSheva = jobType.includes("באר שבע") || city.includes("באר שבע");
    const templateName = isBeerSheva ? "aldar_welcome_bs_v2" : "aldar_welcome_tlv_v2";

    // שמירה ב-Supabase
    await fetch(`${SUPABASE_URL}/rest/v1/candidates`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation"
      },
      body: JSON.stringify({ name, phone, city, job_type: jobType, status: "חדש", score: 0 })
    });

    // שליחת וואטסאפ
    const watiRes = await fetch(WATI_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WATI_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        template_name: templateName,
        broadcast_name: "fb_leads",
        receivers: [{ whatsappNumber: watiPhone, customParams: [{ name: "1", value: name }] }]
      })
    });

    const watiResult = await watiRes.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, candidate: name, wati: watiResult })
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    };
  }
};
