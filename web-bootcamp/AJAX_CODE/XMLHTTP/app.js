
// NOT AT ALL IMPORTANT TO REMEMBER ANY OF THIS CODE!


//====================================
// XMLHttpRequest
//====================================
// there's no support for promises or async functions 
// if we need to make subsequent requests , we would have to Nest things over and over with a bunch of callback
 
const req = new XMLHttpRequest();

req.onload = function () {
  console.log("IT LOADED!!");
  const data = JSON.parse(this.responseText);
  console.log(data.name, data.height);
};

req.onerror = function () {
  console.log("ERROR!!!!");
  console.log(this);
};

req.open("GET", "https://swapi.dev/api/people/1/");
req.send();
