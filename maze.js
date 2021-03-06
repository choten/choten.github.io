var LEFT = 0b1000; //8
var TOP = 0b0100; //4
var RIGHT = 0b0010; //2
var BOTTOM = 0b0001; //1
var Maze_Size;

class Maze{
    create(size){
        Maze_Size = size;
        this.maze = new Array(Maze_Size);
        var seen = {};

        var maze = this.maze;
        for(var i = 0;i < Maze_Size; ++i){
            maze[i] = new Array(Maze_Size);
            for(var j = 0;j < Maze_Size; ++j){
                maze[i][j] = LEFT|TOP|RIGHT|BOTTOM;
                seen[this._convertArrayToString([i,j])] = false;
            }
        }
        
        var maze = this.maze;
        var stack = [];
        var coord = [0,0];
        var nextCoord;
        var seenCount = 0;
        while(seenCount < Maze_Size*Maze_Size){
            if(seen[this._convertArrayToString(coord)] === false){
                seenCount ++;
                seen[this._convertArrayToString(coord)] = true;
            }

            var direction = this._breakRandomWall(maze,coord,seen) //破牆
            if(direction){ // 破牆成功
                stack.push(coord);
                nextCoord = this._coordForDirection(coord,direction);
            }
            else{ //破牆失敗
                nextCoord = stack.pop();
            }

            coord = nextCoord;
        }
    }

    draw(canvas){
        var width = canvas.width();
        var grid_size = width/Maze_Size;
        var c = canvas.get(0).getContext("2d");

        c.clearRect(0,0,canvas.width(),canvas.height());
        for(var x =0;x < Maze_Size; ++x){
            for(var y = 0; y < Maze_Size; ++y){
                var grid = this.maze[y][x];
                if((grid & RIGHT) > 0){
                    c.moveTo((x+1) * grid_size,y * grid_size);
                    c.lineTo((x+1) * grid_size,(y+1) * grid_size);
                }

                if((grid & BOTTOM) > 0){
                    c.moveTo(x * grid_size,(y+1) * grid_size);
                    c.lineTo((x+1) * grid_size,(y+1) * grid_size);
                }
            }
        }

        c.stroke();
    }

    hasWall(coord,direction){
        var grid = this.maze[coord[1]][coord[0]];
        return (grid & direction) > 0;
    }

    _convertArrayToString(array){ return (array[0]+','+array[1])}

    _coordForDirection(coord,direction){
        var nextCoord = [coord[0], coord[1]];
        switch (direction) {
            case TOP:
            nextCoord[1]--;
            break;
            case LEFT:
            nextCoord[0]--;
            break;
            case BOTTOM:
            nextCoord[1]++;
            break;
            case RIGHT:
            nextCoord[0]++;
            break;
        }
        if (nextCoord[0] < 0 || nextCoord[0] >= Maze_Size ||
            nextCoord[1] < 0 || nextCoord[1] >= Maze_Size) return false;
    
        return nextCoord;
    }

    _breakRandomWall(maze,coord,seen){
        var y = coord[1];
        var x = coord[0];
        var walls = maze[y][x];
        if(walls > 0){
            var directions = [TOP,RIGHT,BOTTOM,LEFT];
            this._shuffleArray(directions);

            for(let wall of directions){
                if(x == 0 && wall == LEFT) continue;
                if(x >= Maze_Size -1 && wall == RIGHT) continue;
                if(y == 0 && wall == TOP) continue;
                if(y >= Maze_Size -1 && wall == BOTTOM) continue;
                var next_coord = this._coordForDirection(coord,wall);
                if(!next_coord) continue;
                if(seen[this._convertArrayToString(next_coord)] == true) continue;
                if((walls && wall) > 0){
                    maze[y][x] ^= wall; //XOR，將交集的牆消除成0
                    if(next_coord){
                        maze[next_coord[1]][next_coord[0]] ^= this._oppositeDirection(wall); //將下一格的相鄰的牆消掉
                    }
                    return wall;
                }
            }
        }

        return 0;
    }

    _shuffleArray(array){
        for(var i = array.length -1 ; i > 0;i--){
            var j = Math.floor(Math.random()*(i+1));
            var tmp = array[i];
            array[i] = array[j];
            array[j] = tmp;
        }
    }

    _oppositeDirection(direction){
        switch(direction){
            case TOP: return BOTTOM;
            case BOTTOM: return TOP;
            case LEFT: return RIGHT;
            case RIGHT: return LEFT;
        }
    }
}