let isSampling = false
let samples: number[][] = []
let MAX_SAMPLE_COUNT = 10000
let isReplaying = false
let sampleIndex = 0

function normalizeToHeight(value: number): number {
    return Math.map(value, 0, 1023, 0, 5)
}

function showBars(values: number[]) {
    basic.clearScreen()
    for (let x = 0; x < values.length; x++) {
        let height = normalizeToHeight(values[x])
        for (let y = 0; y < 5; y++) {
            if (y >= 5 - height) {
                led.plot(x, y)
            }
        }
    }
}

basic.showIcon(IconNames.TShirt)

input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.SmallDiamond)
    music.playTone(Note.C, music.beat(BeatFraction.Sixteenth))
    music.playTone(Note.E, music.beat(BeatFraction.Sixteenth))

    isSampling = !isSampling
    if (isSampling) {
        samples = []
        basic.showIcon(IconNames.SmallDiamond)
    } else {
        basic.showIcon(IconNames.SmallSquare)
    }
})

input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.Triangle)
    music.playTone(Note.G, music.beat(BeatFraction.Sixteenth))

    if (samples.length == 0) {
        basic.showIcon(IconNames.Sad)
        return
    }

    isReplaying = !isReplaying
    sampleIndex = 0

    if (isReplaying) {
        basic.showIcon(IconNames.Triangle)
    } else {
        basic.showIcon(IconNames.SmallSquare)
    }
})

basic.forever(function () {
    let current: number[]

    if (isReplaying) {
        current = samples[sampleIndex]
        sampleIndex += 1
        if (sampleIndex >= samples.length) {
            sampleIndex = 0
        }
    } else {
        current = [
            pins.analogReadPin(AnalogPin.P0),
            pins.analogReadPin(AnalogPin.P1),
            pins.analogReadPin(AnalogPin.P2),
            pins.digitalReadPin(DigitalPin.P8) * 1023
        ]

        if (isSampling && samples.length < MAX_SAMPLE_COUNT) {
            samples.push(current)
        }
    }

    showBars(current)
    serial.writeLine((isReplaying ? "PLAY: " : isSampling ? "REC: " : "Live: ") + current.join(", "))
    basic.pause(100)
})
