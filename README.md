# microbitscan

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
Run an https:// server with the page or
Start a local web server and open it as http://localhost
(You'll run into permission issues if you try it any other way)

