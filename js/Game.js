class Game {
    constructor() {
        this.index = 0;
    }

    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function(data) {
            gameState = data.val();
        })
    }

    update(state) {
        database.ref('/').update({
            gameState: state,
        });
    }

    updateRank(state) {
        database.ref('/').update({
            playersAtEnd: state,
        });
    }

    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('runnerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }

            form = new Form()
            form.display();
        }
        runner1 = createSprite(10, 200);
        runner1.scale = 1;
        runner1.setCollider("rectangle", 0, 0)
        runner1.debug = true;
        runner1.velocityY = 2;
        runner1.addAnimation("runner1", runner1_img);
        runner2 = createSprite(10, 500);
        runner2.scale = 1;
        runner2.velocityY = 2;

        runner2.setCollider("rectangle", 0, 0);
        runner2.debug = true;

        runner2.addAnimation("runner2", runner2_img);
        runners = [runner1, runner2];
        invisibleGround1 = createSprite((displayWidth * 5)/2, 480, displayWidth * 5, 20);
        invisibleGround1.setCollider("rectangle", 0, 0);
        invisibleGround1.debug = true;
        // invisibleGround1.visible = false;
        invisibleGround2 = createSprite((displayWidth * 5)/2, 750, displayWidth * 5, 20);
        invisibleGround2.setCollider("rectangle", 0, 0);
        invisibleGround2.debug = true;


        // invisibleGround2.visible = false;


    }
    play() {
        if (gameState === 1){
            form.hide();
            Player.getPlayerInfo();
            spawnObstacles();
            spawnObstacles1();



            // Player.getPlayersAtEnd();

            if (allPlayers !== undefined) {
                image(track, 0, -20, displayWidth * 5, displayHeight);

                //index of the array
                var index = 0;
                //x and y position of the cars
                var y = 140;
                var x = 50;


                runner1.collide(invisibleGround1);
                runner2.collide(invisibleGround2);


                for (var plr in allPlayers) {
                    index = index + 1;
                    this.index = this.index + 1;

                    y = y + 260;
                    //use data form the database to display the cars in x direction
                    x = displayWidth - allPlayers[plr].distance;

                    runners[index - 1].x = x;
                    runners[index - 1].y = y;
                    runners[index - 1].velocityY = 2;
                    runners[index - 1].velocityY = 2;

                    if (index === player.index) {
                        // console.log("yes")
                        stroke(10);
                        fill("red");
                        ellipse(x, y, 60, 60);
                        runners[index - 1].shapeColor = "red";
                        camera.position.x = runners[index - 1].x;
                        camera.position.y = runners[index - 1].y;
                        player.x = x;
                        player.y = y;
                        player.update()

                        if (keyIsDown(UP_ARROW)) {
                            // console.log(player.x)
                            runners[index - 1].velocityY = -4;

                        }
                        runners[index - 1].velocityY = runners[index - 1].velocityY + 0.8



                    }





                    if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                        player.distance -= 10
                        player.update();
                    }
                }

            }







            if (player.distance <= -9230) {
                gameState = 2;
                player.rank += 1
                Player.updatePlayersAtEnd(player.rank)
            }

            drawSprites();
        }
        
    }

    end() {
        console.log("Game Ended");
        console.log(player.rank);
    }
}

function spawnObstacles() {
    var i = 0;
    if (frameCount % 360 === 0) {
        i = i + 1000
        var obstacle = createSprite(runner1.x + 700, 325, 10, 10);

        obstacle.velocityX = -2;
        obstacle.addImage(hurdle);

        obstacle.scale = 0.80;
        obstacle.lifetime = 700;
        obstacle.setCollider("rectangle", -10, 0, 90, 150);
        obstacle.debug = true;
    }
    // if (runners[this.index-1].isTouching(obstacle)){
    //     console.log("touched")
    // }
}

function spawnObstacles1() {
    if (frameCount % 360 === 0) {

        var obstacle = createSprite(runner2.x + 700, 585, 10, 10);

        obstacle.velocityX = -2;
        obstacle.addImage(hurdle);
        obstacle.scale = 0.80;
        obstacle.lifetime = 700;
        obstacle.setCollider("rectangle", -10, 0, 90, 150);
        obstacle.debug = true;

    }
}