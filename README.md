# microbitscan
by max.wolf@meso.design


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
* microbit is the bluetooth receiver (flashed with mbFirmware-BTreceiver.js). The webpage connects to it and the microbit immediately drives relays connected to it

Troubleshooting:
* servos move slowly, sometimes servos seem to not react or react too early: 
  * check if the power supply is sufficient
* (when using analogRecorder) "Ghost moves" - Inputs seem to move even though you didn't touch them (or touched another one)
  * make sure that all inputs are connected. if one is left out, that value can be undefined or "floating".