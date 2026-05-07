const API_KEY = "AIzaSyCvyOLxUi-D19cvGjwpwxj8DjWwdvTwVkU";
const CX = "d3dbf0de4daf64262";
const query = "brickell hidden gems";

fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}`)
  .then(res => res.json())
  .then(data => console.log(JSON.stringify(data, null, 2).substring(0, 500)))
  .catch(err => console.error("Error:", err));
