// bluetooth gateway to radio - test
// for the bbc microbit v2. probably won't on v1

// what it does: 
// provides bluetooth connection
// listens for button A and B presses or Shake and relays them back via BT
// listens for string "P" and shows a heart icon
// listens to incoming values and writes them to the servo pins P0-P4 + P10
// note that the display will look weird when using more than 3 servo pins because the micro:bit shares the display pins with the servo pins
//
// Project settings: activate JustWorks Pairing

bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
input.onButtonPressed(Button.A, function () {
    bluetooth.uartWriteString("A")
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    let receivedString = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    if (receivedString == "P") {
        basic.showIcon(IconNames.Heart)
        basic.pause(100)
        basic.showIcon(IconNames.Yes)
    } else {
        let parts = receivedString.split(",")
        basic.clearScreen()
        for (let x = 0; x < parts.length; x++) {
            let v = parseFloat(parts[x])
            // Write to servo pins P0,P1,P2,P3, P4, P10 if x <= 6
            // theoretical maximum of analog output pins 
            if (x <= 6) {
                let angle = Math.round(Math.map(v, 0, 1, 0, 180))
                let pin = [AnalogPin.P0, AnalogPin.P1, AnalogPin.P2, AnalogPin.P3, AnalogPin.P4, AnalogPin.P10][x]
                pins.servoWritePin(pin, angle)
            }
            if (v >= 0) {
                let h = Math.round(Math.map(v, 0, 1, 0, 4))
                for (let y = 4; y >= 5 - h; y--) {
                    led.plot(x, y)
                }
            }
        }
    }

})
input.onButtonPressed(Button.B, function () {
    bluetooth.uartWriteString("B")
})
input.onGesture(Gesture.Shake, function () {
    bluetooth.uartWriteString("S")
})

let receivedString = ""
bluetooth.startUartService()
basic.showIcon(IconNames.Square)
