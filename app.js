$(function(){
    var MAZE = new Maze();
    var SIZE = 30;
    var CANVAS = $("#canvas");
    var UID = Math.round(Math.random() * 1000000);
    var POSITION = [0, 0];
    var DESTINATION = [SIZE -1,SIZE -1];
    var PLAYERDIVS = {};
    var GRIDSIZE= CANVAS.width() / SIZE;
    var BOARD_SIZE = 600;

    function updatePlayerLocation(uid, coord, write = true) {
        if (!PLAYERDIVS[uid]) {
            var div = $("<div id=player" + uid + " class=player style='background-color:" + getRandomColor(uid) + "'></div>");
            $("#players").append(div);
            PLAYERDIVS[uid] = div;
        }

        var circleSize = 10;
        var nudge = GRIDSIZE * 0.25; // offset the player a bit randomly
        var offsetx = nudge;
        var offsety = nudge;
        var left = coord[0] * GRIDSIZE + offsetx;
        var top = coord[1] * GRIDSIZE + offsety;
        var css = { left: left, top: top, width: circleSize, height: circleSize };
        PLAYERDIVS[uid].css(css);
    }

    function updateMyPosition() {
      console.log("POSITION: "+POSITION+" 終點: "+[SIZE,SIZE]);
      if(POSITION[0] == DESTINATION[0] && POSITION[1] == DESTINATION[1]){
        alert("抵達終點!");
        return
      }
      updatePlayerLocation(UID,POSITION);
    }
  
    function getRandomColor(seed) {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
            ++seed;
        }
        return color;
    }

    function clearPlayer() {
      $("#players").empty();
      var star = $("<div class=player>&#x2605;</div>");
      star.css({left: BOARD_SIZE - GRIDSIZE/2 - 6, top: BOARD_SIZE - GRIDSIZE/2 - 10, border:0});
      $("#players").append(star);
      PLAYERDIVS = {};
      POSITION = [0, 0];
    }

    window.goRight = function () {
        if (!MAZE.hasWall(POSITION, RIGHT)) {
          POSITION[0]++;
          updateMyPosition();
        }
      }
      window.goDown = function () {
        if (!MAZE.hasWall(POSITION, BOTTOM)) {
          POSITION[1]++;
          updateMyPosition();
        }
      }
      window.goLeft = function () {
        if (!MAZE.hasWall(POSITION, LEFT)) {
          POSITION[0]--;
          updateMyPosition();
        }
      }
      window.goUp = function () {
        if (!MAZE.hasWall(POSITION, TOP)) {
          POSITION[1]--;
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

    function funInit() {
        MAZE.create(SIZE);
        MAZE.draw(CANVAS);
        // console.log(MAZE);
        clearPlayer();
        updatePlayerLocation(UID, POSITION, false);
    }

    funInit();
});