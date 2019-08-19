$(function(){
    var maze = new Maze();
    maze.create(30);
    console.log(maze);
    
    var canvas = $("#canvas");
    // canvas.height = 1000;
    // canvas.width = 1000;
    // let ctx = canvas.get(0).getContext("2d");
    // //使用lineWidth指定線條寬度
    // ctx.lineWidth = 3;
    // //使用strokeStyle指定線條顏色
    // ctx.strokeStyle = "#0000FF";
    maze.draw(canvas);
});