console.clear();

async function getData() {
  try{
    const api = `https://v2.api.noroff.dev/square-eyes`;
    const response = await fetch(api);
    //console.log(api)
    if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
    const obj = await response.json();
    //console.log(obj);    
  } catch (error) {
    //console.error(error.message); 
  }
}

getData();

const api = `https://v2.api.noroff.dev/square-eyes`;
fetch(api)
    .then ((response) => {
        if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
        return response.json();
    })
    .then ((obj) => console.log(obj))
    .catch (error => console.error(error.message))













/*async function getData() {
    const api = "https://api.noroff.dev/api/v2/square-eyes";
    console.log(api);

    const response = await fetch(api);
    const obj = await response.json();
    }
    getData();*/