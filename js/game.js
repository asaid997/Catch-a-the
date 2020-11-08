const GameManager = function () {
    const game = $('#game-screen')
    const eSecondsLeft = $('#top-bar')
    const eFrogsLeft = $('#frogs-left')
    const eLevel = $('#level')

    let timer 
    let level 
    let frogsToDisplay 

    let secondsChangerInterval
    let gameCheckIfEndedTimeout

    function _createElement (type, class1, text) {
        const element = $(`<${type}>${text}</${type}>`)
        element.addClass(class1)
        return element
    }

    function _setFrogsLeft (frogs) {
        eFrogsLeft.text(`${frogs} frogs left`)
    }
    function _setSecondsLeft (seconds) {
        eSecondsLeft.text(`${seconds} seconds left`)
    }
    function _setLevel (level) {
        eLevel.text(`Level ${level}`)
    }

    /**
     * Returns a random number between min (inclusive) and max (exclusive)
     */
    function _getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    function _displayItemRandomly () {
        const percent = _getRandom(10, 90) / 100
        const element = _createElement("i", "fas fa-frog froggies", "")

        const container_height = game.innerHeight()
        const container_width = game.innerWidth()
        const height = percent * 100
        const width = percent * 100
        element.css("height", `${height}px`)
        element.css("width", `${width}px`)

        let margin_top = percent * container_height - (height)
        if (margin_top < 0) { margin_top = height }

        let margin_left = (container_width * _getRandom(10, 90) / 100) - width
        if (margin_left < 0) { margin_left = width }


        element.css("margin-top", `${margin_top}px`)
        element.css("margin-left", `${margin_left}px`)
        element.css("align-content", "center")
        element.css("justify-content", "center")
        element.css("font-size", `${height}px`)
        element.css("color", `rgb(${_getRandom(1, 256)},${_getRandom(1, 100)},${_getRandom(1, 256)})`)

        game.append(element)
    }

    function _setRandomItems (numOfItems) {
        for (let i = 1; i < numOfItems + 1; i++) {
            _displayItemRandomly()
        }
        _setFrogsLeft(frogsToDisplay)
    }

    function _removeFroggies () {
        $('.froggies').remove()
    }


    function _startGameTimeout () {
        gameCheckIfEndedTimeout = setTimeout(() => {
            _stopGame()
            game.text("You lost,no more Froggies to catch :(")
        }, timer * 1000);
    }
    function _stopSecondInterval () {
        clearInterval(secondsChangerInterval)
    }

    function _startSecondInterval () {
        secondsChangerInterval = setInterval(() => {
            _setSecondsLeft(--timer)
        }, 1000);
    }
    function _stopGameTimeout () {
        clearTimeout(gameCheckIfEndedTimeout)
    }

    function _stopGame () {
        _stopSecondInterval()
        _stopGameTimeout()
        _removeFroggies()
        $('start').text("Start")
    }


    function _levelUp () {
        _stopGameTimeout()
        _stopSecondInterval()
        level++
        timer += level
        frogsToDisplay = level
        _setLevel(level)
        _setSecondsLeft(timer)
        _startSecondInterval()
        _startGameTimeout()
    }

    const clicked = function () {
        _removeFroggies()
        frogsToDisplay--

        if (frogsToDisplay == 0) {
            _levelUp()
        }

        _setRandomItems(frogsToDisplay)
    }

    const startGame = function () {
        _stopGame()
        game.text("")
        $('start').text("Catch the froggies!")

        timer = 2
        level = 1
        frogsToDisplay = level

        _setSecondsLeft(timer)
        _setLevel(level)
        _setRandomItems(frogsToDisplay)

        _startSecondInterval()
        _startGameTimeout()
    }

    return {
        startGame,
        clicked,
    }
}
