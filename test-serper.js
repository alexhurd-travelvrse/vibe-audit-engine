const API_KEY = "a23fd96c5cb1aace5f985e1d32f27492c241b349";
const sites = "site:timeout.com OR site:ra.co OR site:cntraveler.com OR site:theinfatuation.com OR site:vice.com OR site:wallpaper.com OR site:highsnobiety.com OR site:hypebeast.com OR site:monocle.com OR site:dezeen.com OR site:nowness.com OR site:thespaces.com OR site:suitcasemag.com OR site:kinfolk.com OR site:cerealmag.com OR site:archdigest.com OR site:surface.com OR site:coolhunting.com OR site:designboom.com OR site:somewhere.com";
const query = `${sites} brickell hidden gems`;

fetch("https://google.serper.dev/search", {
  method: "POST",
  headers: { "X-API-KEY": API_KEY, "Content-Type": "application/json" },
  body: JSON.stringify({ q: query, num: 10 })
})
.then(res => res.text())
.then(text => console.log("Response:", text.substring(0, 500)))
.catch(err => console.error("Error:", err));
