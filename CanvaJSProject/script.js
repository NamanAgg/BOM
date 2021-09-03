let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let clearBtn = document.querySelector("button");
let ctx = canvas.getContext("2d");
let triangles = [];
let colors = ["red", "green", "blue", "orange", "yellow", "purple", "pink"];
let startPoint;
let endPoint;
let idxOfColor;
let idx;
let dragStartPoint;


clearBtn.addEventListener("click", function (e) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    triangles = [];
})
canvas.addEventListener("mousemove", function (e) {
    if (e.buttons == 1) {
        let pos = getMousePos(canvas, e);
        if (idx == undefined) getPosForDrag(pos.pageX, pos.pageY);
        if (idx != undefined) {
            if (dragStartPoint) {

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                let diff = getDiff(dragStartPoint, [pos.pageX, pos.pageY]);
                dragStartPoint[0] = pos.pageX;
                dragStartPoint[1] = pos.pageY;
                triangles[idx][0] += diff[0];
                triangles[idx][1] += diff[1];
                triangles[idx][2] += diff[0];
                triangles[idx][3] += diff[1];
                for (let tri of triangles)
                    draw([tri[0], tri[1]], [tri[2], tri[3]], tri[4]);


            }
            else {
                let pos = getMousePos(canvas, e);
                if (dragStartPoint == undefined)
                    dragStartPoint = [pos.pageX, pos.pageY];
            }
        }
        else {
            if (startPoint) {

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (let tri of triangles)
                    draw([tri[0], tri[1]], [tri[2], tri[3]], tri[4]);

                let pos = getMousePos(canvas, e);
                endPoint = [pos.pageX, pos.pageY];
                draw(startPoint, endPoint, idxOfColor);

            }
            else {
                let pos = getMousePos(canvas, e);
                startPoint = [pos.pageX, pos.pageY];
                idxOfColor = Math.floor(Math.random() * 7);
                for (let tri of triangles)
                    draw([tri[0], tri[1]], [tri[2], tri[3]], tri[4]);

            }
        }
    }
    else {
        if (startPoint != undefined && endPoint != undefined) {
            triangles.push([...startPoint, ...endPoint, idxOfColor]);
            console.log(triangles);
            startPoint = undefined;
            endPoint = undefined;
            for (let tri of triangles)
                draw([tri[0], tri[1]], [tri[2], tri[3]], tri[4]);
        }
        dragStartPoint = undefined;
        idx = undefined;
    }
});


canvas.addEventListener("dblclick", function (e) {
    let pos = getMousePos(canvas, e);
    let idx = getPos(pos.pageX, pos.pageY);
    if (idx != undefined) {
        triangles.splice(idx, 1);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let tri of triangles)
            draw([tri[0], tri[1]], [tri[2], tri[3]], tri[4]);

    }
});


function getPos(clickedPointX, clickedPointY) {
    for (let i = 0; i < triangles.length; i++) {
        let start = [triangles[i][0], triangles[i][1]];
        let end = [triangles[i][2], triangles[i][3]];
        tempTriangle(start, end);
        if (ctx.isPointInPath(clickedPointX, clickedPointY)) {
            return i;
        }
    }
}


function draw(start, end, idxOfColor) {
    ctx.beginPath();
    ctx.moveTo(start[0], start[1]);
    ctx.lineTo(end[0], end[1]);
    ctx.lineTo(start[0] + start[0] - end[0], end[1]);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = colors[idxOfColor];
    ctx.fill();
}


function tempTriangle(start, end) {
    ctx.beginPath();
    ctx.moveTo(start[0], start[1]);
    ctx.lineTo(end[0], end[1]);
    ctx.lineTo(start[0] + start[0] - end[0], end[1]);
    ctx.closePath()
}


function getDiff(point, origin) {
    return [origin[0] - point[0], origin[1] - point[1]];
}


function getPosForDrag(clickedPointX, clickedPointY) {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!startPoint)
        for (let i = 0; i < triangles.length; i++) {
            let start = [triangles[i][0], triangles[i][1]];
            let end = [triangles[i][2], triangles[i][3]];
            tempTriangle(start, end);
            if (ctx.isPointInPath(clickedPointX, clickedPointY)) {
                idx = i;
            }
        }
}

function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect(),
        scaleX = canvas.width / rect.width,
        scaleY = canvas.height / rect.height;

    return {
        pageX: (e.clientX - rect.left) * scaleX,
        pageY: (e.clientY - rect.top) * scaleY
    }
}