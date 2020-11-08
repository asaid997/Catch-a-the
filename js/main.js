const gameManager = GameManager()


$('#start').click(function () {
    gameManager.startGame()
})


$('#game-screen').on("click", ".froggies", function () {
    gameManager.clicked()
})
