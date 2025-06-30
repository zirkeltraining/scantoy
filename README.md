# microbitscan

Consists of different interactions:

## mbFirmware-analogrecorder.js
a firmware to connect 3 servos, a solenoid, a joystick, a few buttons and a fader to a microbit, then sample the input and play it back.


## index.html + mbFirmware-BTReceiver.js

 a simple webpage that
 * displays the webcam in a large window
 * continuously scans one vertical line of pixels in the center of the video 
 * in that column, it looks for specific colors from a list and finds the best matching pixel
 * in an overlay to that video window, it highlights that column of pixels with a thin frame and a little tick mark with an id for each color
 * in a config dialog, allows you to create a list of color values and a delta percentage value for each color. Each color gets an ID (cardinal numbers)
 * the delta value is for the "fuzziness" or precision of the search
 * the array of y coordinates of these colors is continuously updated
 * if a color is not found within the delta bracket, return -1 for it.

To use, either:
* go to https://zirkeltraining.github.io/scantoy or
* Run an https:// server with the page or
* Start a local web server and open it as http://localhost
(You'll run into permission issues if you try it any other way)

To use it with a micro:bit:
* flash the mbFirmware-BTreceiver.js on your micro:bit v2
* connect it with the "bluetooth" button in the top left corner

To use it with a MIDI synth:
* enable the check box "MIDI" in the config
* run a MIDI synth on the machine that runs the web page. e.g. on a Mac, try GarageBand witha synth track. You may need to route the MIDI signals to your synth, e.g. on a mac via the Audio/MIDI control panel.
* You can see if MIDI is connected in the developer console of the web page. (F12) 

Still to do:
* UI  on mobile devices is hard to use, not responsive enough
* Android Chrome has no colot picker, need replacement for that.
* firmware to forward the values over the microbit radio (from a second microbit tethered to the first) (optional)
* universal receiver firmware for a third microbit to receive via radio and filter for a specific ID


Simple setup:
uses 1 mobile and 1 microbit. 
* webpage is running on a cheap tablet or mobile, connected to permanent power
* microbit 1 is the bluetooth receiver. The webpage connects to it and the microbit immediately drives relays connected to it

Full setup:
uses 1 mobile and 3 to _many_ microbits. (not clear how many are supported, probably 10 to 30)
* webpage is running on a cheap tablet or mobile, connected to permanent power
* local MIDI synth does (optional) sonification
* microbit 1 is the bluetooth receiver. The webpage connects to it and the microbit sends the received bluetooth string via serial cable (TX/RX lines) to microbit 2
* microbit 2 is the radio relay. it forwards the data from microbit 1 over the microbit radio
* microbits 3 to n receive the data over the microbit radio and immediately drive relays connected to them. 
