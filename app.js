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
    var POSTION = [0,0];

    
    window.goRight = function () {
        if (!MAZE.hasWall(POS, Maze.RIGHT)) {
          POS[0]++;
          updateMyPosition();
        }
      }
      window.goDown = function () {
        if (!MAZE.hasWall(POS, Maze.BOTTOM)) {
          POS[1]++;
          updateMyPosition();
        }
      }
      window.goLeft = function () {
        if (!MAZE.hasWall(POS, Maze.LEFT)) {
          POS[0]--;
          updateMyPosition();
        }
      }
      window.goUp = function () {
        if (!MAZE.hasWall(POS, Maze.TOP)) {
          POS[1]--;
          updateMyPosition();
        }
      }
    // Register key listeners
    $(document).keydown(function (e) {
        switch (e.keyCode) {
            case 37: //left
                goLeft();
                break;
            case 38: //up
                goUp();
                break;
            case 39: //right
                goRight();
                break;
            case 40: //down
                goDown();
                break;
            default:
                return;
        }
        // Disable document scrolling.
        e.preventDefault();
    });
});