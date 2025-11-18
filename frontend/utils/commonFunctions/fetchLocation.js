export async function fetchLocation() {
  try {
    const res = await fetch("https://ipapi.co/json/");

    const data = await res.json();

    if (!res.ok) {
      console.log("Error occured in fetching location with network");
      return;
    }

    console.log("newtwork lcoation data", data);

    return { latitude: data.latitude, longitude: data.longitude };
  } catch (error) {
    console.log(
      "Erro occured in fetching location with network",
      error.message
    );
    return;
  }
}
