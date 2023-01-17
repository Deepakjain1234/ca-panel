// navbar shrink script starts here
window.onscroll = function () { scrollFunction() };

function scrollFunction() {


  if(window.innerWidth>1110){
    let nav = document.getElementsByTagName("nav")[0].style;
    let logo1 = document.getElementById("logo-1").style;
   
    let navItem = document.getElementsByClassName("nav-items")[0].style;
  
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      nav.height = "94px";
      logo1.height = "60px";
      logo1.width = "60px";
    
      navItem.marginTop = "22px";
     
      
    } else {
      nav.height = "132px";
      logo1.height = "94px";
      logo1.width = "94px";
      
      navItem.marginTop = "45px";
      
      
    }
  }
}


const navSlide = () => {
   const burger = document.querySelector('.burger');
   const nav = document.querySelector('.nav-items');
   const navLinks = document.querySelectorAll('.nav-link');
   // Toggle Nav
   burger.addEventListener('click', () => {
     nav.classList.toggle('nav-active');
     // Animate links
     navLinks.forEach((link, index) => {
       if (link.style.animation) {
         link.style.animation = '';
       }
       else {

         link.style.animation = 'navLinkFade 0.5s ease forwards  1';

       }
     });
     // Burger Animation
     burger.classList.toggle('toggle');
   });


 }
 navSlide();

 function closeNav(){
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-items');
  if(window.innerWidth<1110){
    nav.classList.remove("nav-active");
    burger.classList.remove('toggle');

  }
}

(function() {

  var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

  // Main
  initHeader();
  initAnimation();
  addListeners();

  function initHeader() {
      width = window.innerWidth;
      height = window.innerHeight;
      target = {x: width/2, y: height/2};

      largeHeader = document.getElementById('large-header');
      largeHeader.style.height = height+'px';

      canvas = document.getElementById('demo-canvas');
      canvas.width = width;
      canvas.height = height;
      ctx = canvas.getContext('2d');

      // create points
      points = [];
      for(var x = 0; x < width; x = x + width/20) {
          for(var y = 0; y < height; y = y + height/20) {
              var px = x + Math.random()*width/20;
              var py = y + Math.random()*height/20;
              var p = {x: px, originX: px, y: py, originY: py };
              points.push(p);
          }
      }

      // for each point find the 5 closest points
      for(var i = 0; i < points.length; i++) {
          var closest = [];
          var p1 = points[i];
          for(var j = 0; j < points.length; j++) {
              var p2 = points[j]
              if(!(p1 == p2)) {
                  var placed = false;
                  for(var k = 0; k < 5; k++) {
                      if(!placed) {
                          if(closest[k] == undefined) {
                              closest[k] = p2;
                              placed = true;
                          }
                      }
                  }

                  for(var k = 0; k < 5; k++) {
                      if(!placed) {
                          if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                              closest[k] = p2;
                              placed = true;
                          }
                      }
                  }
              }
          }
          p1.closest = closest;
      }

      // assign a circle to each point
      for(var i in points) {
          var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
          points[i].circle = c;
      }
  }

  // Event handling
  function addListeners() {
      if(!('ontouchstart' in window)) {
          window.addEventListener('mousemove', mouseMove);
      }
      window.addEventListener('scroll', scrollCheck);
      window.addEventListener('resize', resize);
  }

  function mouseMove(e) {
      var posx = posy = 0;
      if (e.pageX || e.pageY) {
          posx = e.pageX;
          posy = e.pageY;
      }
      else if (e.clientX || e.clientY)    {
          posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
          posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
      target.x = posx;
      target.y = posy;
  }

  function scrollCheck() {
      if(document.body.scrollTop > height) animateHeader = false;
      else animateHeader = true;
  }

  function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      largeHeader.style.height = height+'px';
      canvas.width = width;
      canvas.height = height;
  }

  // animation
  function initAnimation() {
      animate();
      for(var i in points) {
          shiftPoint(points[i]);
      }
  }

  function animate() {
      if(animateHeader) {
          ctx.clearRect(0,0,width,height);
          for(var i in points) {
              // detect points in range
              if(Math.abs(getDistance(target, points[i])) < 4000) {
                  points[i].active = 0.3;
                  points[i].circle.active = 0.6;
              } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                  points[i].active = 0.1;
                  points[i].circle.active = 0.3;
              } else if(Math.abs(getDistance(target, points[i])) < 40000) {
                  points[i].active = 0.02;
                  points[i].circle.active = 0.1;
              } else {
                  points[i].active = 0;
                  points[i].circle.active = 0;
              }

              drawLines(points[i]);
              points[i].circle.draw();
          }
      }
      requestAnimationFrame(animate);
  }

  function shiftPoint(p) {
      TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
          y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
          onComplete: function() {
              shiftPoint(p);
          }});
  }

  // Canvas manipulation
  function drawLines(p) {
      if(!p.active) return;
      for(var i in p.closest) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.closest[i].x, p.closest[i].y);
          ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
          ctx.stroke();
      }
  }

  function Circle(pos,rad,color) {
      var _this = this;

      // constructor
      (function() {
          _this.pos = pos || null;
          _this.radius = rad || null;
          _this.color = color || null;
      })();

      this.draw = function() {
          if(!_this.active) return;
          ctx.beginPath();
          ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
          ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
          ctx.fill();
      };
  }

  // Util
  function getDistance(p1, p2) {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  }
  
})();

/**
 * Ribbons Class File.
 * Creates low-poly ribbons background effect inside a target container.
 */
(function (name, factory) {
    if (typeof window === "object") {
      window[name] = factory();
    }
  })("Ribbons", function () {
    var _w = window,
      _b = document.body,
      _d = document.documentElement;
  
    // random helper
    var random = function () {
      if (arguments.length === 1) {
        // only 1 argument
        if (Array.isArray(arguments[0])) {
          // extract index from array
          var index = Math.round(random(0, arguments[0].length - 1));
          return arguments[0][index];
        }
        return random(0, arguments[0]); // assume numeric
      } else if (arguments.length === 2) {
        // two arguments range
        return Math.random() * (arguments[1] - arguments[0]) + arguments[0];
      } else if (arguments.length === 4) {
        //
  
        var array = [arguments[0], arguments[1], arguments[2], arguments[3]];
        return array[Math.floor(Math.random() * array.length)];
        //return console.log(item)
      }
      return 0; // default
    };
  
    // screen helper
    var screenInfo = function (e) {
      var width = Math.max(
          0,
          _w.innerWidth || _d.clientWidth || _b.clientWidth || 0
        ),
        height = Math.max(
          0,
          _w.innerHeight || _d.clientHeight || _b.clientHeight || 0
        ),
        scrollx =
          Math.max(0, _w.pageXOffset || _d.scrollLeft || _b.scrollLeft || 0) -
          (_d.clientLeft || 0),
        scrolly =
          Math.max(0, _w.pageYOffset || _d.scrollTop || _b.scrollTop || 0) -
          (_d.clientTop || 0);
  
      return {
        width: width,
        height: height,
        ratio: width / height,
        centerx: width / 2,
        centery: height / 2,
        scrollx: scrollx,
        scrolly: scrolly
      };
    };
  
    // mouse/input helper
    var mouseInfo = function (e) {
      var screen = screenInfo(e),
        mousex = e ? Math.max(0, e.pageX || e.clientX || 0) : 0,
        mousey = e ? Math.max(0, e.pageY || e.clientY || 0) : 0;
  
      return {
        mousex: mousex,
        mousey: mousey,
        centerx: mousex - screen.width / 2,
        centery: mousey - screen.height / 2
      };
    };
  
    // point object
    var Point = function (x, y) {
      this.x = 0;
      this.y = 0;
      this.set(x, y);
    };
    Point.prototype = {
      constructor: Point,
  
      set: function (x, y) {
        this.x = x || 0;
        this.y = y || 0;
      },
      copy: function (point) {
        this.x = point.x || 0;
        this.y = point.y || 0;
        return this;
      },
      multiply: function (x, y) {
        this.x *= x || 1;
        this.y *= y || 1;
        return this;
      },
      divide: function (x, y) {
        this.x /= x || 1;
        this.y /= y || 1;
        return this;
      },
      add: function (x, y) {
        this.x += x || 0;
        this.y += y || 0;
        return this;
      },
      subtract: function (x, y) {
        this.x -= x || 0;
        this.y -= y || 0;
        return this;
      },
      clampX: function (min, max) {
        this.x = Math.max(min, Math.min(this.x, max));
        return this;
      },
      clampY: function (min, max) {
        this.y = Math.max(min, Math.min(this.y, max));
        return this;
      },
      flipX: function () {
        this.x *= -1;
        return this;
      },
      flipY: function () {
        this.y *= -1;
        return this;
      }
    };
  
    // class constructor
    var Factory = function (options) {
      this._canvas = null;
      this._context = null;
      this._sto = null;
      this._width = 0;
      this._height = 0;
      this._scroll = 0;
      this._ribbons = [];
      this._options = {
        // ribbon color HSL saturation amount
        colorSaturation: "80%",
        // ribbon color HSL brightness amount
        colorBrightness: "60%",
        // ribbon color opacity amount
        colorAlpha: 0.65,
        // how fast to cycle through colors in the HSL color space
        colorCycleSpeed: 6,
        // where to start from on the Y axis on each side (top|min, middle|center, bottom|max, random)
        verticalPosition: "center",
        // how fast to get to the other side of the screen
        horizontalSpeed: 150,
        // how many ribbons to keep on screen at any given time
        ribbonCount: 3,
        // add stroke along with ribbon fill colors
        strokeSize: 0,
        // move ribbons vertically by a factor on page scroll
        parallaxAmount: -0.5,
        // add animation effect to each ribbon section over time
        animateSections: true
      };
      this._onDraw = this._onDraw.bind(this);
      this._onResize = this._onResize.bind(this);
      this._onScroll = this._onScroll.bind(this);
      this.setOptions(options);
      this.init();
    };
  
    // class prototype
    Factory.prototype = {
      constructor: Factory,
  
      // Set and merge local options
      setOptions: function (options) {
        if (typeof options === "object") {
          for (var key in options) {
            if (options.hasOwnProperty(key)) {
              this._options[key] = options[key];
            }
          }
        }
      },
  
      // Initialize the ribbons effect
      init: function () {
        try {
          this._canvas = document.createElement("canvas");
          this._canvas.style["display"] = "block";
          this._canvas.style["position"] = "fixed";
          this._canvas.style["margin"] = "0";
          this._canvas.style["padding"] = "0";
          this._canvas.style["border"] = "0";
          this._canvas.style["outline"] = "0";
          this._canvas.style["left"] = "0";
          this._canvas.style["top"] = "0";
          this._canvas.style["width"] = "100%";
          this._canvas.style["height"] = "100%";
          this._canvas.style["z-index"] = "-1";
          this._onResize();
  
          this._context = this._canvas.getContext("2d");
          this._context.clearRect(0, 0, this._width, this._height);
          this._context.globalAlpha = this._options.colorAlpha;
  
          window.addEventListener("resize", this._onResize);
          window.addEventListener("scroll", this._onScroll);
          document.body.appendChild(this._canvas);
        } catch (e) {
          console.warn("Canvas Context Error: " + e.toString());
          return;
        }
        this._onDraw();
      },
  
      // Create a new random ribbon and to the list
      addRibbon: function () {
        // movement data
        var dir = Math.round(random(1, 9)) > 5 ? "right" : "left",
          stop = 1000,
          hide = 200,
          min = 0 - hide,
          max = this._width + hide,
          movex = 0,
          movey = 0,
          startx = dir === "right" ? min : max,
          starty = Math.round(random(0, this._height));
  
        // asjust starty based on options
        if (/^(top|min)$/i.test(this._options.verticalPosition)) {
          starty = 0 + hide;
        } else if (/^(middle|center)$/i.test(this._options.verticalPosition)) {
          starty = this._height / 2;
        } else if (/^(bottom|max)$/i.test(this._options.verticalPosition)) {
          starty = this._height - hide;
        }
  
        // ribbon sections data
        var ribbon = [],
          point1 = new Point(startx, starty),
          point2 = new Point(startx, starty),
          point3 = null,
          color = Math.round(random(35, 35, 40, 40)),
          delay = 0;
  
        // buils ribbon sections
        while (true) {
          if (stop <= 0) break;
          stop--;
  
          movex = Math.round(
            (Math.random() * 1 - 0.2) * this._options.horizontalSpeed
          );
          movey = Math.round((Math.random() * 1 - 0.5) * (this._height * 0.25));
  
          point3 = new Point();
          point3.copy(point2);
  
          if (dir === "right") {
            point3.add(movex, movey);
            if (point2.x >= max) break;
          } else if (dir === "left") {
            point3.subtract(movex, movey);
            if (point2.x <= min) break;
          }
          // point3.clampY( 0, this._height );
          //console.log(Math.round(random(1, 5)))
          ribbon.push({
            // single ribbon section
            point1: new Point(point1.x, point1.y),
            point2: new Point(point2.x, point2.y),
            point3: point3,
            color: color,
            delay: delay,
            dir: dir,
            alpha: 0,
            phase: 0
          });
  
          point1.copy(point2);
          point2.copy(point3);
  
          delay += 4;
          //color += 1
          //console.log('colorCycleSpeed', color)
        }
        this._ribbons.push(ribbon);
      },
  
      // Draw single section
      _drawRibbonSection: function (section) {
        if (section) {
          if (section.phase >= 1 && section.alpha <= 0) {
            return true; // done
          }
          if (section.delay <= 0) {
            section.phase += 0.02;
            section.alpha = Math.sin(section.phase) * 1;
            section.alpha = section.alpha <= 0 ? 0 : section.alpha;
            section.alpha = section.alpha >= 1 ? 1 : section.alpha;
  
            if (this._options.animateSections) {
              var mod = Math.sin(1 + (section.phase * Math.PI) / 2) * 0.1;
  
              if (section.dir === "right") {
                section.point1.add(mod, 0);
                section.point2.add(mod, 0);
                section.point3.add(mod, 0);
              } else {
                section.point1.subtract(mod, 0);
                section.point2.subtract(mod, 0);
                section.point3.subtract(mod, 0);
              }
              section.point1.add(0, mod);
              section.point2.add(0, mod);
              section.point3.add(0, mod);
            }
          } else {
            section.delay -= 0.5;
          }
          //console.log('section.color', section.color)
          var s = this._options.colorSaturation,
            l = this._options.colorBrightness,
            c =
              "hsla(" +
              section.color +
              ", " +
              s +
              ", " +
              l +
              ", " +
              section.alpha +
              " )";
  
          this._context.save();
  
          if (this._options.parallaxAmount !== 0) {
            this._context.translate(
              0,
              this._scroll * this._options.parallaxAmount
            );
          }
          this._context.beginPath();
          this._context.moveTo(section.point1.x, section.point1.y);
          this._context.lineTo(section.point2.x, section.point2.y);
          this._context.lineTo(section.point3.x, section.point3.y);
          this._context.fillStyle = c;
          this._context.fill();
  
          if (this._options.strokeSize > 0) {
            this._context.lineWidth = this._options.strokeSize;
            this._context.strokeStyle = c;
            this._context.lineCap = "round";
            this._context.stroke();
          }
          this._context.restore();
        }
        return false; // not done yet
      },
  
      // Draw ribbons
      _onDraw: function () {
        // cleanup on ribbons list to rtemoved finished ribbons
        for (var i = 0, t = this._ribbons.length; i < t; ++i) {
          if (!this._ribbons[i]) {
            this._ribbons.splice(i, 1);
          }
        }
  
        // draw new ribbons
        this._context.clearRect(0, 0, this._width, this._height);
  
        for (
          var a = 0;
          a < this._ribbons.length;
          ++a // single ribbon
        ) {
          var ribbon = this._ribbons[a],
            numSections = ribbon.length,
            numDone = 0;
  
          for (
            var b = 0;
            b < numSections;
            ++b // ribbon section
          ) {
            if (this._drawRibbonSection(ribbon[b])) {
              numDone++; // section done
            }
          }
          if (numDone >= numSections) {
            // ribbon done
            this._ribbons[a] = null;
          }
        }
        // maintain optional number of ribbons on canvas
        if (this._ribbons.length < this._options.ribbonCount) {
          this.addRibbon();
        }
        requestAnimationFrame(this._onDraw);
      },
  
      // Update container size info
      _onResize: function (e) {
        var screen = screenInfo(e);
        this._width = screen.width;
        this._height = screen.height;
  
        if (this._canvas) {
          this._canvas.width = this._width;
          this._canvas.height = this._height;
  
          if (this._context) {
            this._context.globalAlpha = this._options.colorAlpha;
          }
        }
      },
  
      // Update container size info
      _onScroll: function (e) {
        var screen = screenInfo(e);
        this._scroll = screen.scrolly;
      }
    };
  
    // export
    return Factory;
  });
  
  new Ribbons({
    colorSaturation: "60%",
    colorBrightness: "50%",
    colorAlpha: 0.5,
    colorCycleSpeed: 5,
    verticalPosition: "random",
    horizontalSpeed: 200,
    ribbonCount: 3,
    strokeSize: 0,
    parallaxAmount: -0.2,
    animateSections: true
  });
  