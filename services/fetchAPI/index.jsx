// Öğrenci (kayıt) işlemleri için kullanılan servis
const postAPI = async (URL, body, method = "POST", headers = { "Content-Type": "application/json" }) => {
  try {
    if (!process.env.NEXT_PUBLIC_API_URL || !URL) {
      throw new Error("URL bulunamadı!");
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL + URL}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text(); // Yanıtı JSON olarak parse etmeden önce düz metin olarak alıyoruz
      console.error("Error response:", errorText);
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    return response.json(); // Yanıt başarılıysa JSON olarak parse edin
  } catch (err) {
    console.error("API request failed:", err);
    throw err;
  }
};


// Öğrenci (kayıt) işlemleri için kullanılan servis
const getAPI = async (
  URL,
  headers = { "Content-Type": "application/json" }
) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL + URL}`, {
    method: "GET",
    headers: headers,
    cache: "no-store",
  })
    .then((res) => {
      if (res.redirected) {
        // bazı yerlerde window'u bulamıyor kontrol et
        //return window.location.href = res.url;
      } else {
        return res.json();
      }
    })
    .catch((err) => console.log(err));

  return data;
};



export { postAPI, getAPI };
