function AstroSystem() {
    var integrator;
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
                lum: [0.04, 0.08],
                radius: [0.4, 0.7],
                mass: [0.08, 0.45]
            }
        },
        getProperty: function (propArray, percent) {
            return parseFloat(((((propArray[1] - propArray[0]) / 10) * (10 - percent)) + propArray[0]).toFixed(2))
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
        inject: function (Integrator) {
            integrator = Integrator
        },
        init: function () {

        },
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
        },
        starsClear: function () {
            starsArray = [];
        }
    }
}

function AstroService() {
    var integrator;
    var astroSystem;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var density = 0;

    return {
        inject: function (Integrator) {
            integrator = Integrator;
            astroSystem = integrator.getAstroSystem();
        },
        init: function () {

        },
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

            var types = astroSystem.getStarClasses();
            function getRandomStarType() {
                return types[(Math.floor(Math.random() * types.length))] + '' + (Math.floor(Math.random() * 10))
            }
            for(var i = 0; i < num; i++) {
                astroSystem.createStar(this.nameCreator(), getRandomStarType())
            }
        }
    }
}

function AstroViewer() {
    var integrator;
    var astroSystem;
    var astroService;
    var interfase;
    var messager;

    var width;
    var height;
    var paddindWorld;

    var stage;
    var layer;
    var background;
    var generalLayer;

    return {
        inject: function (Integrator) {
            integrator = Integrator;
            astroSystem = Integrator.getAstroSystem();
            astroService = Integrator.getAstroService();
            interfase =  Integrator.getInterface();
            messager = Integrator.getMessager();
        },
        init: function () {
            width = astroService.getSize().width;
            height = astroService.getSize().height;
            paddindWorld = 100;

            stage = new Konva.Stage({
                container: 'generalScreen',
                width: width + (paddindWorld * 4),
                height: height + (paddindWorld * 4),
                fill: '#000'
            });
            layer = new Konva.Layer();
            background = new Konva.Rect({
                x: 0,
                y: 0,
                width: width + (paddindWorld * 4),
                height: height + (paddindWorld * 4),
                fill: '#202020'
            });
            layer.add(background);
            generalLayer = new Konva.Layer({
                name: 'stars'
            });
            stage.add(layer);
        },
        getGeneralLayer: function () {
            return generalLayer
        },
        getStage: function () {
            return stage
        },
        viewStars: function (minView, maxView) {
            generalLayer.destroy();
            var density = astroService.getDensity();
            var stars = astroSystem.getAllStars();
            var padding = 20;
            var maxStarRadius = astroSystem.getStarsRadius().max;
            var minStarRadius = astroSystem.getStarsRadius().min;
            var radiusPercent = (maxStarRadius - minStarRadius) / 100;
            var xCounter = 0;
            var yCounter = 0;

            for(var s = 0; s < stars.length; s++) {
                var xCoord;
                if(!stars[s].x) {
                    xCoord = (xCounter + astroService.random(density / 0.4)) + paddindWorld;
                    stars[s].x = xCoord;
                } else {
                    xCoord = stars[s].x
                }

                var yCoord;
                if(!stars[s].y) {
                    yCoord = (yCounter + astroService.random(density / 0.4)) + paddindWorld;
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
                        messager.sendInterfaceMessage({
                            title: 'Star: ' + starObj.name,
                            body: ['Class: <span>' + starObj.type + '</span>',
                                'Temperature: <span>' + starObj.temperature + '</span>K',
                                'Mass: <span>' + starObj.mass + '</span> in solar mass',
                                'Radius: <span>' + starObj.radius + '</span> in solar radius',
                                'Luminisity: <span>' + starObj.lum + '</span> in solar luminisity']
                        });
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

                generalLayer.add(star);
                generalLayer.add(title);

                if(xCounter < (width - density - padding)) {
                    xCounter += density;
                } else {
                    xCounter = 0;
                    yCounter += density
                }
            }
            stage.add(generalLayer);
        }
    }
}

function Interface() {
    var messager;
    var integrator;
    return {
        inject: function (Integrator) {
            integrator = Integrator;
        },
        init: function () {
            messager = integrator.getMessager();

            var overlays = document.getElementsByClassName('overlay');
            Array.prototype.forEach.call(overlays, function (el) {
                el.addEventListener('click', function () {
                    el.style.display = 'none'
                });
            });

            var eventStops = document.getElementsByClassName('eventStop');
            Array.prototype.forEach.call(eventStops, function (el) {
                el.addEventListener('click', function (e) {
                    e.stopPropagation()
                });
            });

            menuToggle.addEventListener('click', function () {
                menuContainer.style.display = 'flex'
            });

            menuSaveSystem.addEventListener('click', function () {
                messager.saveToServer().then(function (res) {
                    messager.sendInterfaceMessage({
                        title: 'Message',
                        body: ['<p class="center">' + res + '</p>']
                    })
                });
            });

            menuDeleteSystem.addEventListener('click', function () {
                messager.deleteOnServer().then(function (res) {
                    messager.sendInterfaceMessage({
                        title: 'Message',
                        body: ['<p class="center">' + res + '</p>']
                    })
                });
            });

            menuGenerateSystem.addEventListener('click', function () {
                integrator.createNew();
            });

            menuLoadSystem.addEventListener('click', function () {
                integrator.loadSystem();
            });

            document.body.addEventListener('mousemove', function (e) {
                var percentX = (100 / window.innerWidth) * e.screenX;
                var percentY = (100 / window.innerHeight) * e.screenY;

                var canvasOuterX = generalScreen.clientWidth - window.innerWidth;
                var canvasOuterY = generalScreen.clientHeight - window.innerHeight - 100;

                generalScreen.style.left = (0 - ((canvasOuterX / 100) * percentX)) + 'px';
                generalScreen.style.top = (0 - ((canvasOuterY / 100) * percentY)) + 'px';
            });
        },
        sendMessage: function (prop) {
            messageContainer.style.display = 'flex';
            messageTitle.innerText = prop.title;
            var msBody = prop.body.map(function (i) {
                return '<p>' + i + '</p>'
            });
            messageBody.innerHTML = msBody.join('</br>')
        },
        getCanvasContainer: function () {
            return generalScreen
        }
    }
}

function Messager() {
    var integrator;
    var interface;
    var astroSystem;

    return {
        inject: function (Integrator) {
            integrator = Integrator;
        },
        init: function () {
            interface = integrator.getInterface();
            astroSystem = integrator.getAstroSystem();
        },
        saveToServer: function () {
            return new Promise(function (res, rej) {
                var xhr = new XMLHttpRequest();
                var body = JSON.stringify(astroSystem.getAllStars());
                xhr.open("POST", '/astro', true);
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.onreadystatechange = function (a) {
                    if(xhr.readyState == 4) {
                        if(xhr.response) {
                            return res(xhr.response)
                        }
                        return rej(false)
                    }
                };
                xhr.send(body);
            });

        },
        loadFromServer: function () {
            return new Promise(function (res, rej) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", '/astro', true);
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
        deleteOnServer: function () {
            return new Promise(function (res, rej) {
                var xhr = new XMLHttpRequest();
                xhr.open("DELETE", '/astro', true);
                xhr.setRequestHeader('Content-type', 'application/json');
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
        sendInterfaceMessage: function (data) {
            interface.sendMessage(data);
        }
    }
}

function Integrator(AstroSystem, AstroService, AstroViewer, Interface, Messager) {
    var astroSystem;
    var astroService;
    var astroViewer;
    var interface;
    var messager;

    var getter = {};

    getter.getAstroSystem = function () {
        return astroSystem
    };
    getter.getAstroService = function () {
        return astroService
    };
    getter.getAstroViewer = function () {
        return astroViewer
    };
    getter.getInterface = function () {
        return interface
    };
    getter.getMessager = function () {
        return messager;
    };
    getter.createNew = function () {
        astroSystem.starsClear();
        creator();
    };
    getter.loadSystem = function () {
        loader();
    };

    function creator() {
        astroService.createStars(100);
        astroViewer.viewStars(3, 7);
    }

    function loader() {
        messager.loadFromServer().then(function (res) {
            astroSystem.systemLoadFromJSON(res);
            astroViewer.viewStars(3, 7);
        }, function () {
            creator();
        })
    }

    this.render = function () {
        loader();
    };
    this.createNew = function () {
        getter.createNew();
    };
    this.create = function () {
        astroSystem = new AstroSystem();
        astroService = AstroService();
        messager = Messager();
        astroViewer = AstroViewer();
        interface = Interface();

        astroSystem.inject(getter);
        astroService.inject(getter);
        messager.inject(getter);
        astroViewer.inject(getter);
        interface.inject(getter);

        astroSystem.init();
        astroService.init();
        messager.init();
        astroViewer.init();
        interface.init();

        return this
    };
}

var integrator = new Integrator(AstroSystem, AstroService, AstroViewer, Interface, Messager);
integrator.create().render();
