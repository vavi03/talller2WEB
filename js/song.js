//canvas

var visualizer = function (p) {

    var canvas = document.querySelectorAll(".top-works__song")[indexSong];

    var id = indexSong;

    var width = canvas.clientWidth;
    var height = canvas.clientHeight;
    var x = width / 2;
    var y = height / 2;
    var song;

    let spectrum;

    let lines = [];

    p.preload = function () {
        p.soundFormats('mp3', 'ogg');
        var s = p.loadSound('../songs/s' + id + '.mp3');
        song = s;
        fft = new p5.FFT();

    }

    p.setup = function () {
        p.createCanvas(width, height);
        p.noStroke();
        p.angleMode(p.DEGREES);

        spectrum = fft.waveform();

        lines = new Array(3);

        for (let index = 0; index < lines.length; index++) {
            lines[index] = 0;
        }

        p.frameRate(60);
    };

    p.draw = function () {
        p.background(255);
        spectrum = fft.analyze();
        
        p.fill(191, 236, 74);
        p.rectMode(p.CORNER);
        var v1 = p.map(spectrum[0], 0, 300, 0, width);
        p.rect(0, 0, v1, height/6);

        var v2 = p.map(spectrum[150], 0, 300, 0, width);
        p.rect(0, 2*height/6, v2, height/6);

        var v3 = p.map(spectrum[400], 0, 300, 0, width);
        p.rect(0, 4*height/6, v3, height/6);

        p.noFill();

        
    };

    
    p.changePlay = function () {
        if (song != null) {
            if (song.isPlaying()) {
                song.pause();

            } else {
                song.loop();
                console.log("play");
            }
        }
    }

    p.stop = function () {
        if (song != null) {
            song.stop();
        }
    }

    p.windowResized = function () {
        width = canvas.clientWidth;
        height = canvas.clientHeight;
        x = width / 2;
        y = height / 2;
        p.resizeCanvas(width, height);
    };

};

