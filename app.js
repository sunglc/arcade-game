// 游戏中要躲避的敌人
var Enemy = function(x,y) {
    // 应用到每个敌人的实例的变量
    this.x=x;
    this.y=y;
    this.width=45;
    this.height=45;
    this.speed=Math.floor(Math.random()*400);
    // 敌人的图片
    this.sprite = 'images/enemy-bug.png';
};

// 更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    if(this.x>ctx.canvas.width){
        this.x=-100;
    };
    this.x+=dt*this.speed;
};

// 在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 玩家类
var Player=function(){
    Enemy.call(this);
    this.x=200;
    this.y=400;
    this.sprite='images/char-boy.png';
};
Player.prototype=Object.create(Enemy.prototype);
Player.prototype.constructor=Player;
Player.prototype.update=function(){};
Player.prototype.reset=function(){
    this.x=200;
    this.y=400;
};

Player.prototype.handleInput=function(movement){
    var PLAYER_STEP=17;
    var ASIDE=410;
    switch(movement){
        case 'up':
            if(this.y>0){
                this.y-=PLAYER_STEP;
                 if(this.y==-8){
                    if(confirm("恭喜你，你赢了！再来一局？"))
                    {
                       window.location.reload();

                    }else{
                       Enemy.prototype.render = function(){
                        return null;
                       }
                    }
                }
            }
            break;
        case 'down':
            if(this.y<ASIDE){
                this.y+=PLAYER_STEP;
            }
            break;
        case 'right':
            if(this.x<ASIDE){
                this.x+=PLAYER_STEP;
            }
            break;
        case 'left':
            if(this.x>5){
                this.x-=PLAYER_STEP;
            }
            break;
    };
};
// 实例化所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies=[
    new Enemy(150,50),
    new Enemy(50,150),
    new Enemy(150,300)
]

var player = new Player();

var distance=function(one,two){
    return((one.x+one.width)>two.x)&&
          (one.x<(two.x+two.width))&&
          ((one.y+one.height)>two.y)&&
          (one.y<(two.y+two.height));
};

// 监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
