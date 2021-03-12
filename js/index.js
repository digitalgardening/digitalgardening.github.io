let docs = document.links; //get all links in the document 
let docLinks = []; //make an array for storing all same origin links

for (i in docs) {
  //iterate through all same origin and cross origin links
  let uri = new URL(docs[i].href); //parse the link

  if (uri.origin === window.locatiion.origin) {
    //see whether the link is same origin
    docLinks.push(uri); //add it to the same origin array if it is same origin
  } else {
    console.log(uri.origin);
    console.log(window.locatiion.origin);
    console.log(docs[i]);
  }
}

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

let navigation = (linkGraph) => {
  //to be safe, pass the linkGraph parameter to the function directly
  for (i in docLinks) {
    // slow form of iteration (may optimize this loop later)
    let prev = docLinks[i]; //are there already inbound links for this page stored in localStorage? that's what we're asking
    if (linkGraph.get(prev)) {
      //if there's already inbound links to this page
      let oldObject = linkGraph.get(prev); //let's get the object that stored the title and url for the old inbound links
      let newKey = document.title; //let's create a new key for an inbound link containing the current document title
      oldObject.newKey = location.href; //let's create a new value for that key containing the current document url
      linkGraph.set(prev, oldObject); //let's save the modified object to localStorage under the page name
    } else if (!linkGraph.get(prev)) {
      //this is if there are no previous inbound links for this page
      let newKey = document.title; //let's create a new key for an inbound link containing the current document title
      newObject.newKey = location.href; //let's create a new value for that key containing the current document url
      linkGraph.set(prev, newObject); //let's save this new object to localStorage under the page name
    }
  }
};

document.querySelector("button").style.display = "none";
