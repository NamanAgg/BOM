let request = indexedDB.open("camera",1);
let db;
request.onsuccess=function(e){
    db = request.result;
}

request.onupgradeneeded=function(e){
    db=request.result;
    db.createObjectStore("gallery", { keyPath: "nId" });
}
