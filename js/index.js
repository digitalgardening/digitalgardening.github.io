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
      let oldObject = linkGraph.get(prev); //let's get the object that stored the title and url for the old inbound links
      oldObject[document.title] = location.href; //let's create a new value for that key containing the current document url
      linkGraph.set(prev, oldObject); //let's save the modified object to localStorage under the page name
    } else if (!linkGraph.get(prev)) {
      //this is if there are no previous inbound links for this page
      let newObject = {};
      newObject[document.title] = location.href; //let's create a new value for that key containing the current document url
      linkGraph.set(prev, newObject); //let's save this new object to localStorage under the page name
    }
 }
};

let links = localStorage.getItem("backlinks"); //get backlinks from localStorage (we'll see if they exist)
if (links) {
  //if the backlinks are already in localStorage we don't need to do as much work
  let linkGraph = new Map(JSON.parse(links)); //we need to get the map back from its stringified form
  navigation(linkGraph); //do the work of storing inbound links for later
  let storage = JSON.stringify(Array.from(linkGraph.entries())); //stringify our work for the browser
  localStorage.setItem("backlinks", storage); //save our work for later
} else {
  let linkGraph = new Map(); //we need to create a new map to store links in and save to localStorage
  navigation(linkGraph); //do the work of storing inbound links
  let storage = JSON.stringify(Array.from(linkGraph.entries())); //stringify our work for the browser
  localStorage.setItem("backlinks", storage); //save our work for later
}



document.querySelector("button").style.display = "none";
