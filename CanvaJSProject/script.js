let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext("2d"); //this is to createpen or stylus for canvas
let triangles=[];
let colors=["red","green","blue","orange","yellow","purple","pink"];


let startPoint;
let endPoint;
let idxOfColor;
// let width;
// let height;
canvas.addEventListener("mousemove", function (e) {
    if (e.buttons == 1) {
        
        if (startPoint) {
            // ctx.beginPath();
            // ctx.strokeStyle = "blue";
            // ctx.lineWidth = 5;
            //  width = e.pageX - startPoint[0];
            // ctx.fillStyle = "red";
            // ctx.fillRect(startPoint[0], startPoint[1], width, height);
            // console.log(startPoint[0], startPoint[1], width, height," these are the values when formed");
            // console.log(rects);
            ctx.clearRect(0,0,canvas.width,canvas.height);
            for(let tri of triangles)
                draw([tri[0],tri[1]],[tri[2],tri[3]],tri[4]);
            
            endPoint=[e.pageX,e.pageY];
            draw(startPoint,endPoint,idxOfColor);
            
        } else {
            startPoint = [e.pageX, e.pageY];
            idxOfColor = Math.floor(Math.random() * 7);
            // for(let tri of triangles)
            //     draw([tri[0],tri[1]],[tri[2],tri[3]]);
            
        }
    } 
    else {
         if(startPoint!=undefined && endPoint!=undefined){
            triangles.push([...startPoint,...endPoint,idxOfColor]);
         console.log(triangles);
        startPoint = undefined;
        endPoint=undefined;
         }
    }
});

canvas.addEventListener("dblclick",function(e){
    let idx = getPos(e.pageX,e.pageY);
    if(idx!=undefined){
        triangles.splice(idx,1);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for(let tri of triangles)
            draw([tri[0],tri[1]],[tri[2],tri[3]],tri[4]);

    }
});

function getPos(clickedPointX,clickedPointY){
    for(let i=0;i<triangles.length;i++){
        let start=[triangles[i][0],triangles[i][1]];
        let end=[triangles[i][2],triangles[i][3]];
        tempTriangle(start,end);
        if(ctx.isPointInPath(clickedPointX,clickedPointY)){
            return i;
        }
    }
    
    // for(let i=0;i<rects.length;i++){
    //     let arr = rects[i];
    //     if(arr[0]<=clickedPointX && arr[1]<=clickedPointY && arr[0]+arr[2]>=clickedPointX && arr[1]+arr[3]>=clickedPointY){
    //         console.log(arr, "in this triangle db1 will occur");
    //          rects.splice(i,1);
    //          return arr;
    //         console.log(rects);
    //     }
    // }
}


function draw(start,end,idxOfColor){
    ctx.beginPath();
    ctx.moveTo(start[0],start[1]);
    ctx.lineTo(end[0],end[1]);
    ctx.lineTo(start[0]+start[0]-end[0],end[1]);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = colors[idxOfColor];
    ctx.fill();
}

function tempTriangle(start,end){
    ctx.beginPath();
    ctx.moveTo(start[0],start[1]);
    ctx.lineTo(end[0],end[1]);
    ctx.lineTo(start[0]+start[0]-end[0],end[1]);
    ctx.closePath()
}