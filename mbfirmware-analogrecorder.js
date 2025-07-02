const SERVO_MIN = 500
const SERVO_MAX = 2500

let isSampling = false
let samples: number[][] = []
let MAX_SAMPLE_COUNT = 10000
let isReplaying = false
let sampleIndex = 0
let displayMode = false

function normalizeToHeight(value: number): number {
    return Math.map(value + (1023 / 10), 0, 1023, 0, 5)
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
pins.setPull(DigitalPin.P6, PinPullMode.PullUp)
pins.setPull(DigitalPin.P7, PinPullMode.PullUp)
pins.setPull(DigitalPin.P8, PinPullMode.PullUp)
pins.setPull(DigitalPin.P9, PinPullMode.PullUp)
pins.setPull(DigitalPin.P6, PinPullMode.PullUp)

input.onButtonPressed(Button.A, function () {
    isSampling = !isSampling
    if (isSampling) {
        samples = []
        basic.showIcon(IconNames.SmallDiamond)
                music.playTone(Note.C, music.beat(BeatFraction.Half))

        music.playTone(Note.E, music.beat(BeatFraction.Quarter))

        basic.pause(300)

    } else {
        basic.showIcon(IconNames.SmallSquare)
        music.playTone(Note.E, music.beat(BeatFraction.Quarter))
        music.playTone(Note.C, music.beat(BeatFraction.Half))

        basic.pause(300)

    }
})

input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.Triangle)

    if (samples.length == 0) {
        basic.showIcon(IconNames.Sad)
        music.playTone(Note.C, music.beat(BeatFraction.Whole))
        basic.pause(300)
        music.playTone(Note.C, music.beat(BeatFraction.Whole))
        return
    }

    isReplaying = !isReplaying
    sampleIndex = 0

    if (isReplaying) {
        music.playTone(Note.A, music.beat(BeatFraction.Quarter))

        basic.showIcon(IconNames.Triangle)
        basic.pause(300)

    } else {
        music.playTone(Note.C, music.beat(BeatFraction.Quarter))

        basic.showIcon(IconNames.SmallSquare)
        basic.pause(300)

    }
})

input.onButtonPressed(Button.AB, function () {
    displayMode = !displayMode
    basic.showIcon(displayMode ? IconNames.Pitchfork : IconNames.Square)
    basic.pause(800)

})

basic.forever(function () {
    let current: number[]

    if (isReplaying) {
        current = samples[sampleIndex]
        sampleIndex += 1
        if (sampleIndex >= samples.length) {
            sampleIndex = 0
            music.playTone(Note.A, music.beat(BeatFraction.Quarter))
        }
    } else {
        let a0 = pins.analogReadPin(AnalogPin.P0)
        basic.pause(1)
        let a1 = pins.analogReadPin(AnalogPin.P1)
        basic.pause(1)
        let a2 = pins.analogReadPin(AnalogPin.P2)
        basic.pause(1)
        let d3 = pins.digitalReadPin(DigitalPin.P8) * 1023
        current = [a0, a1, a2, d3]

        if (isSampling && samples.length < MAX_SAMPLE_COUNT) {
            samples.push(current)
        }
    }

    if (displayMode) {
        led.enable(true)
        showBars(current)
    } else {
        led.enable(false)
        pins.servoSetPulse(AnalogPin.P3, Math.map(current[0], 0, 1023, SERVO_MIN, SERVO_MAX))
        pins.servoSetPulse(AnalogPin.P4, Math.map(current[1], 0, 1023, SERVO_MIN, SERVO_MAX))
        pins.servoSetPulse(AnalogPin.P10, Math.map(current[2], 0, 1023, SERVO_MIN, SERVO_MAX))
        pins.digitalWritePin(DigitalPin.P16, current[3] > 0 ? 1 : 0)
    }

    serial.writeLine((isReplaying ? "PLAY: " : isSampling ? "REC: " : "Live: ") + current.join(", "))
    basic.pause(100)
})
