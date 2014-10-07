// JavaScript Document
$( document ).ready(function() {

    $(document).mousemove(function(e){
    		var amountMovedX = (e.pageX * -1 / 10);
    		$('.clouds_top').css('background-position', amountMovedX + 'px ' + 'top');
    });
    $(document).mousemove(function(e){
    		var amountMovedX = (e.pageX * -1 / 25);
    		$('.clouds_bottom').css('background-position', amountMovedX + 'px ' + 'top');
    });
    $(document).mousemove(function(e){
    		var amountMovedX = (e.pageX * -1 / 25);
    		$('.waves').css('background-position', amountMovedX + 'px ' + 'top');
    });

    // BUBBLES
    
    function bubbles() {

      var $bubbles = $('.bubbles');

      // Settings
      var min_bubble_count = 30, // Minimum number of bubbles
          max_bubble_count = 60, // Maximum number of bubbles
          min_bubble_size = 4, // Smallest possible bubble diameter (px)
          max_bubble_size = 12; // Largest possible bubble diameter (px)
      
      // Calculate a random number of bubbles based on our min/max
      var bubbleCount = min_bubble_count + Math.floor(Math.random() * (max_bubble_count + 1));
      
      // Create the bubbles
      for (var i = 0; i < bubbleCount; i++) {
        $bubbles.append('<div class="bubble-container"><div class="bubble"></div></div>');
      }
      
      // Now randomise the various bubble elements
      $bubbles.find('.bubble-container').each(function(){
        
        // Randomise the bubble positions (0 - 100%)
        var pos_rand = Math.floor(Math.random() * 101);
        
        // Randomise their size
        var size_rand = min_bubble_size + Math.floor(Math.random() * (max_bubble_size + 16));
        
        // Randomise the time they start rising (0-15s)
        var delay_rand = Math.floor(Math.random() * 16);
        
        // Randomise their speed (3-8s)
        var speed_rand = 3 + Math.floor(Math.random() * 10);
        
        // Cache the this selector
        var $this = $(this);
        
        // Apply the new styles
        $this.css({
          'left' : pos_rand + '%',
          
          '-webkit-animation-duration' : speed_rand + 's',
          '-moz-animation-duration' : speed_rand + 's',
          '-ms-animation-duration' : speed_rand + 's',
          'animation-duration' : speed_rand + 's',
          
          '-webkit-animation-delay' : delay_rand + 's',
          '-moz-animation-delay' : delay_rand + 's',
          '-ms-animation-delay' : delay_rand + 's',
          'animation-delay' : delay_rand + 's'
        });
        
        $this.children('.bubble').css({
          'width' : size_rand + 'px',
          'height' : size_rand + 'px'
        });
        
      });
    }

    bubbles();

    /*

    // CONFETTI

    const TWO_PI = Math.PI * 2;
    const HALF_PI = Math.PI * 0.5;

    // canvas settings
    var viewWidth = 620,
        viewHeight = 620,
        drawingCanvas = document.getElementById("drawing_canvas"),
        ctx,
        timeStep = (1/60);

    Point = function(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    };

    Particle = function(p0, p1, p2, p3) {
        this.p0 = p0;
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;

        this.time = 0;
        this.duration = 3 + Math.random() * 2;
        this.color =  '#' + Math.floor((Math.random() * 0xffffff)).toString(16);

        this.w = 8;
        this.h = 6;

        this.complete = false;
    };

    Particle.prototype = {
        update:function() {
            this.time = Math.min(this.duration, this.time + timeStep);

            var f = Ease.outCubic(this.time, 0, 1, this.duration);
            var p = cubeBezier(this.p0, this.p1, this.p2, this.p3, f);

            var dx = p.x - this.x;
            var dy = p.y - this.y;

            this.r =  Math.atan2(dy, dx) + HALF_PI;
            this.sy = Math.sin(Math.PI * f * 10);
            this.x = p.x;
            this.y = p.y;

            this.complete = this.time === this.duration;
        },
        draw:function() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.r);
            ctx.scale(1, this.sy);

            ctx.fillStyle = this.color;
            ctx.fillRect(-this.w * 0.5, -this.h * 0.5, this.w, this.h);

            ctx.restore();
        }
    };

    Loader = function(x, y) {
        this.x = x;
        this.y = y;

        this.r = 24;
        this._progress = 0;

        this.complete = false;
    };

    Loader.prototype = {
        reset:function() {
            this._progress = 0;
            this.complete = false;
        },
        set progress(p) {
            this._progress = p < 0 ? 0 : (p > 1 ? 1 : p);

            this.complete = this._progress === 1;
        },
        get progress() {
            return this._progress;
        },
        draw:function() {
            ctx.fillStyle = 'transparent';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, -HALF_PI, TWO_PI * this._progress - HALF_PI);
            ctx.lineTo(this.x, this.y);
            ctx.closePath();
            ctx.fill();
        }
    };

    // pun intended
    Exploader = function(x, y) {
        this.x = x;
        this.y = y;

        this.startRadius = 24;

        this.time = 0;
        this.duration = 0.4;
        this.progress = 0;

        this.complete = false;
    };

    Exploader.prototype = {
        reset:function() {
            this.time = 0;
            this.progress = 0;
            this.complete = false;
        },
        update:function() {
            this.time = Math.min(this.duration, this.time + timeStep);
            this.progress = Ease.inBack(this.time, 0, 1, this.duration);

            this.complete = this.time === this.duration;
        },
        draw:function() {
            ctx.fillStyle = 'transparent';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.startRadius * (1 - this.progress), 0, TWO_PI);
            ctx.fill();
        }
    };

    var particles = [],
        loader,
        exploader,
        phase = 0;

    function initDrawingCanvas() {
        drawingCanvas.width = viewWidth;
        drawingCanvas.height = viewHeight;
        ctx = drawingCanvas.getContext('2d');

        createLoader();
        createExploader();
        createParticles();
    }

    function createLoader() {
        loader = new Loader(viewWidth * 0.5, viewHeight * 0.5);
    }

    function createExploader() {
        exploader = new Exploader(viewWidth * 0.5, viewHeight * 0.5);
    }

    function createParticles() {
        for (var i = 0; i < 128; i++) {
            var p0 = new Point(viewWidth * 0.5, viewHeight * 0.5);
            var p1 = new Point(Math.random() * viewWidth, Math.random() * viewHeight);
            var p2 = new Point(Math.random() * viewWidth, Math.random() * viewHeight);
            var p3 = new Point(Math.random() * viewWidth, viewHeight + 64);

            particles.push(new Particle(p0, p1, p2, p3));
        }
    }

    function update() {

        switch (phase) {
            case 0:
                loader.progress += (1/45);
                break;
            case 1:
                exploader.update();
                break;
            case 2:
                particles.forEach(function(p) {
                    p.update();
                });
                break;
        }
    }

    function draw() {
        ctx.clearRect(0, 0, viewWidth, viewHeight);

        switch (phase) {
            case 0:
                loader.draw();
                break;
            case 1:
                exploader.draw();
                break;
            case 2:
                particles.forEach(function(p) {
                    p.draw();
                });
            break;
        }
    }

    window.onload = function() {
        initDrawingCanvas();
        requestAnimationFrame(loop);
    };

    function loop() {
        update();
        draw();

        if (phase === 0 && loader.complete) {
            phase = 1;
        }
        else if (phase === 1 && exploader.complete) {
            phase = 2;
        }
        else if (phase === 2 && checkParticlesComplete()) {
            // reset
            phase = 0;
            loader.reset();
            exploader.reset();
            particles.length = 0;
            createParticles();
        }

        requestAnimationFrame(loop);
    }

    function checkParticlesComplete() {
        for (var i = 0; i < particles.length; i++) {
            if (particles[i].complete === false) return false;
        }
        return true;
    }

    // math and stuff

    
    // * easing equations from http://gizma.com/easing/
    // * t = current time
    // * b = start value
    // * c = delta value
    // * d = duration
    
    var Ease = {
        inCubic:function (t, b, c, d) {
            t /= d;
            return c*t*t*t + b;
        },
        outCubic:function(t, b, c, d) {
            t /= d;
            t--;
            return c*(t*t*t + 1) + b;
        },
        inOutCubic:function(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t*t + b;
            t -= 2;
            return c/2*(t*t*t + 2) + b;
        },
        inBack: function (t, b, c, d, s) {
            s = s || 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        }
    };

    function cubeBezier(p0, c0, c1, p1, t) {
        var p = new Point();
        var nt = (1 - t);

        p.x = nt * nt * nt * p0.x + 3 * nt * nt * t * c0.x + 3 * nt * t * t * c1.x + t * t * t * p1.x;
        p.y = nt * nt * nt * p0.y + 3 * nt * nt * t * c0.y + 3 * nt * t * t * c1.y + t * t * t * p1.y;

        return p;
    }
    
    */

});