//thats how we have to write if we have to create our own method or infact override an existing method
//the use of prototype word is very important

String.prototype.repeatify=function(n){
    for(let i=0;i<n;i++)
        console.log(""+this);
}

"naman".repeatify(5);

//this will be the output
// naman
// naman
// naman
// naman
// naman