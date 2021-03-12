let docs = document.links; //get all links in the document 
let docLinks = []; //make an array for storing all same origin links


for (const i in docs) {
  //iterate through all same origin and cross origin links
  let uri = docs[i].href; //get the link referenced (docs[i] is the <a> element itself)
  //could not find out how to weed out cross origin urls
    docLinks.push(uri); //add to the array of urls   
}

let navigation = (linkGraph) => {
  //to be safe, pass the linkGraph parameter to the function directly
  for (const z in docLinks) {
    let prev = docLinks[z]; //are there already inbound links for this page stored in localStorage? that's what we're asking
    if (linkGraph.get(prev)) {
      //if there's already inbound links to this page
      let oldArray = linkGraph.get(prev); //let's get the array that stored the urls for the old inbound links
      oldArray.push(location.href) //let's create a new entry in the array for the current document url
      linkGraph.set(prev, oldArray); //let's save the modified array to localStorage under the page name
      console.log("in linkGraph.get(prev)");
    } else if (!linkGraph.get(prev)) {
      // this is if there are no previous inbound links for this page
      let newArray = []; //create a new array to store inbound links
      newArray.push(location.href); //let's create a new entry in the array for the current document url
      linkGraph.set(prev, newArray); //let's save this new array to localStorage under the page name
      console.log("!linkGraph.get(prev)");
    }
 }
};

let links = localStorage.getItem("backlinks"); //get backlinks from localStorage (we'll see if they exist)
if (links) {
  //if the backlinks are already in localStorage we don't need to do as much work
  let linkGraph = new Map(JSON.parse(links)); //we need to get the map back from its stringified form
  console.log(linkGraph);
  navigation(linkGraph); //do the work of storing inbound links for later
  let storage = JSON.stringify(Array.from(linkGraph.entries())); //stringify our work for the browser
  localStorage.setItem("backlinks", storage); //save our work for later
} else {
  let linkGraph = new Map(); //we need to create a new map to store links in and save to localStorage
  console.log(linkGraph);
  navigation(linkGraph); //do the work of storing inbound links
  let storage = JSON.stringify(Array.from(linkGraph.entries())); //stringify our work for the browser
  localStorage.setItem("backlinks", storage); //save our work for later
}



document.querySelector("button").style.display = "none";
