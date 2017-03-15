function AstroSystem() {
    var astroHelper = {
        starClasses: {
            'O': {
                temperatures: [30000, 50000],
                color: '#66c0fc',
                lum: [30, 50],
                radius: [6.6, 8],
                mass: [16, 32]
            },
            'B': {
                temperatures: [10000, 30000],
                color: '#c1e8fc',
                lum: [25, 30],
                radius: [1.8, 6.6],
                mass: [2.1, 16]
            },
            'A': {
                temperatures: [7500, 10000],
                color: '#f8f8fc',
                lum: [5, 25],
                radius: [1.4, 1.8],
                mass: [1.4, 2.1]
            },
            'F': {
                temperatures: [6000, 7500],
                color: '#fcfbec',
                lum: [1.5, 5],
                radius: [1.15, 1.4],
                mass: [1.04, 1.4]
            },
            'G': {
                temperatures: [5200, 6000],
                color: '#fcf9a6',
                lum: [0.6, 1.5],
                radius: [0.96, 1.15],
                mass: [0.8, 1.4]
            },
            'K': {
                temperatures: [3700, 5200],
                color: '#fcb16e',
                lum: [0.08, 0.6],
                radius: [0.7, 0.96],
                mass: [0.45, 0.8]
            },
            'M': {
                temperatures: [2400, 3700],
                color: '#fc602d',
                lum: [30000, 50000],
                radius: [0.4, 0.7],
                mass: [0.08, 0.45]
            }
        },
        getProperty: function (propArray, percent) {
            return (((propArray[1] - propArray[0]) / 10) * (10 - percent)) + propArray[0]
        },
        maxStarRadius: 8,
        minStarRadius: 0.4
    };

    var starsArray = [];

    function Star(name, type) {
        var typeParse = type.split('');

        this.astroType = 'Star';
        this.name = name;
        this.type = type;
        this.temperature = astroHelper.getProperty(astroHelper.starClasses[typeParse[0]].temperatures, typeParse[1]);
        this.color = astroHelper.starClasses[typeParse[0]].color;
        this.lum = astroHelper.getProperty(astroHelper.starClasses[typeParse[0]].lum, typeParse[1]);
        this.radius = astroHelper.getProperty(astroHelper.starClasses[typeParse[0]].radius, typeParse[1]);
        this.mass = astroHelper.getProperty(astroHelper.starClasses[typeParse[0]].mass, typeParse[1]);
    }

    return {
        createStar: function (name, type) {
            starsArray.push(new Star(name, type));
            return starsArray[starsArray.length - 1]
        },
        getAllStars: function () {
            return starsArray
        },
        getStarClasses: function () {
            var arr = [];
            for(var c in astroHelper.starClasses) {
                arr.push(c)
            }
            return arr
        },
        getStarsRadius: function () {
            return {
                max: astroHelper.maxStarRadius,
                min: astroHelper.minStarRadius
            }
        },
        systemSaveToJSON: function () {
            return JSON.stringify(starsArray)
        },
        systemLoadFromJSON: function (json) {
            starsArray = JSON.parse(json)
        }
    }
}

function astroService(astroModule) {
    var width = 0;
    var height = 0;
    var density = 0;
    return {
        random: function (num) {
            return Math.floor(Math.random() * num)
        },
        setSize: function (w, h) {
            width = w;
            height = h;
        },
        getSize: function () {
            return {
                width: width,
                height: height
            }
        },
        getDensity: function () {
            return density
        },
        nameCreator: function() {
            var particles =
                ['re', 'te', 'de', 'ge', 'je', 'ke', 'le', 'ce', 've', 'be', 'ne', 'me', 'ru', 'tu', 'du', 'gu', 'ju', 'ku',
                'lu', 'cu', 'vu', 'bu', 'nu', 'mu', 'ro', 'to', 'do', 'go', 'jo', 'ko', 'lo', 'co', 'vo', 'bo', 'no',
                'mo', 'ra', 'ta', 'da', 'ga', 'ja', 'ka', 'la', 'ca', 'va', 'ba', 'na', 'ma', 'fe', 'fo', 'fa', 'fi',
                'war', 'tar', 'bar', 'gar', 'har', 'kar', 'par', 'car', 'nar', 'mar', 'zar', 'a', 'o', 'u', 'i', 'e',
                'u', 'astar', 'ostar', 'vastar', 'istar', 'ustar', 'estar', 'zar', 'zor', 'zir', 'zer', 'zur', 'bar',
                'mar', 'nar', 'zan', 'zon', 'zun', 'zen', 'zin', 'ard', 'ord', 'urd', 'ird', 'kurd', 'kord', 'kird',
                'kerd', 'zam', 'zom', 'zum', 'zem', 'zim', 'and', 'ond', 'und', 'ind', 'burd', 'bord', 'bird', 'berd',
                'fast', 'mast', 'bast', 'alo', 'ala', 'alu', 'ali', 'olo', 'ola', 'olu', 'oli', 'jar', 'jor', 'jur',
                'jir', 'jer', 'ari', 'ori', 'uri', 'eri', 'thor', 'tpor', 'tbor', 'tmor', 'tsor', 'zif', 'zuf', 'zef',
                'zaf', 'zair', 'zeir', 'zoir', 'zuir', 'nipal', 'nopal', 'napal', 'nupal', 'argan', 'argon', 'argun',
                'argin', 'ora', 'ara', 'oru', 'ori'];
            var nameLength = (Math.floor(Math.random() * 4)) + 1;
            var name = '';
            for(var i = 0; i < nameLength; i++) {
                name = name + particles[Math.floor(Math.random() * particles.length)];
                if(name.length > 9) break
            }
            if(name.length <= 2) {
                return this.nameCreator()
            }
            return name.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }).slice(0,10);
        },
        createStars: function (dens) {
            density = dens;
            var num = (width / density) * (height / density);

            var types = astroModule.getStarClasses();
            function getRandomStarType() {
                return types[(Math.floor(Math.random() * types.length))] + '' + (Math.floor(Math.random() * 10))
            }
            for(var i = 0; i < num; i++) {
                astroModule.createStar(this.nameCreator(), getRandomStarType())
            }
        }
    }
}

function astroView(astroModule, servise) {
    var width = servise.getSize().width;
    var height = servise.getSize().height;
    var density = servise.getDensity();

    var stage = new Konva.Stage({
        container: 'generalScreen',
        width: width,
        height: height,
        fill: '#000'
    });
    var layer = new Konva.Layer();
    var background = new Konva.Rect({
        x: 0,
        y: 0,
        width: width,
        height: height,
        fill: '#202020'
    });

    layer.add(background);

    stage.add(layer);

    return {
        viewStars: function (minView, maxView) {
            var stars = astroModule.getAllStars();
            var starsLayer = new Konva.Layer();
            var padding = 20;

            var maxStarRadius = astroModule.getStarsRadius().max;
            var minStarRadius = astroModule.getStarsRadius().min;
            var radiusPercent = (maxStarRadius - minStarRadius) / 100;
            var xCounter = 0;
            var yCounter = 0;

            for(var s = 0; s < stars.length; s++) {
                var xCoord;
                if(!stars[s].x) {
                    xCoord = xCounter + servise.random(density / 0.4);
                    stars[s].x = xCoord;
                } else {
                    xCoord = stars[s].x
                }

                var yCoord;
                if(!stars[s].y) {
                    yCoord = yCounter + servise.random(density / 0.4);
                    stars[s].y = yCoord;
                } else {
                    yCoord = stars[s].y
                }

                var radius = ((maxView - minView) / 100) * (stars[s].radius / radiusPercent) + minView;

                var star = new Konva.Circle({
                    x: xCoord,
                    y: yCoord,
                    radius: radius,
                    fill: stars[s].color
                });

                var toMsg = stars[s].name + ' ' + stars[s].type;

                (function (starView, starObj) {
                    starView.on('mousedown touchstart', function() {
                        console.log(starObj)
                    });
                })(star, stars[s]);


                var title = new Konva.Text({
                    x: xCoord - 5,
                    y: yCoord + radius + 3,
                    text: stars[s].name,
                    fontSize: 10,
                    fontFamily: 'Verdana, sans-serif',
                    fill: '#fff'
                });

                starsLayer.add(star);
                starsLayer.add(title);

                if(xCounter < (width - density - padding)) {
                    xCounter += density;
                } else {
                    xCounter = 0;
                    yCounter += density
                }
            }

            stage.add(starsLayer);
        }
    }
}

function integrator(AstroSystem, astroService, astroView) {
    var astroModule = new AstroSystem();
    var servise = astroService(astroModule);

    return {
        systemSave: function () {
            var xhr = new XMLHttpRequest();
            var body = JSON.stringify(astroModule.getAllStars());
            xhr.open("POST", '/save', true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.onreadystatechange = function (a) {

            };
            xhr.send(body);
        },
        systemLoad: function () {
            return new Promise(function (res, rej) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", '/load', true);
                xhr.onreadystatechange = function (a) {
                    if(xhr.readyState == 4) {
                        if(xhr.response) {
                            return res(xhr.response)
                        }
                        return rej(false)
                    }
                };
                xhr.send();
            })
        },
        init: function () {
            servise.setSize(window.innerWidth, window.innerHeight);
            this.systemLoad().then(function (data) {
                astroModule.systemLoadFromJSON(data);
                var view = astroView(astroModule, servise);
                view.viewStars(3, 7);
            }, function () {
                servise.createStars(100);
                var view = astroView(astroModule, servise);
                view.viewStars(3, 7);
            });
        }
    }
}

var integr = integrator(AstroSystem, astroService, astroView);
integr.init();