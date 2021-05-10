class Player {
    constructor() {
        this.index = null;
        this.distance = 0;
        this.name = null;
        this.rank = null;
        this.x = 0;
        this.y = 0;
    }

    getCount() {
        var playerCountRef = database.ref('runnerCount');
        playerCountRef.on("value", (data) => {
            playerCount = data.val();
        })
    }

    updateCount(count) {
        database.ref('/').update({
            runnerCount: count
        });
    }

    update() {
        var playerIndex = "runners/runner" + this.index;
        database.ref(playerIndex).set({
            name: this.name,
            distance: this.distance,
            x : this.x,
            y : this.y,
        });
    }

    static getPlayerInfo() {
        var playerInfoRef = database.ref('runners');
        playerInfoRef.on("value", (data) => {
            allPlayers = data.val();
        })
    }

    getPlayersAtEnd() {
        database.ref('CarsAtEnd').on("value", (data) => {
            this.rank = data.val();
        })
    }

    static updatePlayersAtEnd(rank) {
        database.ref('/').update({
            playersAtEnd: rank
        })
    }
}