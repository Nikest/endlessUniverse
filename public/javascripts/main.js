function AstroSystem() {
    var integrator;
    var astroHelper = {
        starClasses: {
            'O': {
                temperatures: [30000, 50000],
                color: '#66c0fc',
                lum: [30, 50],
                radius: [6.6, 8],
                mass: [16, 32],
                frequency: [95, 100]
            },
            'B': {
                temperatures: [10000, 30000],
                color: '#c1e8fc',
                lum: [25, 30],
                radius: [1.8, 6.6],
                mass: [2.1, 16],
                frequency: [96, 100]
            },
            'A': {
                temperatures: [7500, 10000],
                color: '#f8f8fc',
                lum: [5, 25],
                radius: [1.4, 1.8],
                mass: [1.4, 2.1],
                frequency: [90, 95]
            },
            'F': {
                temperatures: [6000, 7500],
                color: '#fcfbec',
                lum: [1.5, 5],
                radius: [1.15, 1.4],
                mass: [1.04, 1.4],
                frequency: [80, 89]
            },
            'G': {
                temperatures: [5200, 6000],
                color: '#fcf9a6',
                lum: [0.6, 1.5],
                radius: [0.96, 1.15],
                mass: [0.8, 1.4],
                frequency: [55, 79]
            },
            'K': {
                temperatures: [3700, 5200],
                color: '#fcb16e',
                lum: [0.08, 0.6],
                radius: [0.7, 0.96],
                mass: [0.45, 0.8],
                frequency: [35, 54]
            },
            'M': {
                temperatures: [2400, 3700],
                color: '#fc602d',
                lum: [0.04, 0.08],
                radius: [0.4, 0.7],
                mass: [0.08, 0.45],
                frequency: [0, 34]
            }
        },
        planetClasses: {
            'Mercury': {
                radius: [0.1, 0.5],
                color: '#b6b6b6',
                frequency: [81, 100]
            },
            'Terra': {
                radius: [0.5, 1.5],
                color: '#80d68b',
                frequency: [61, 80]
            },
            'Super Terra': {
                radius: [1.5, 3],
                color: '#b1d8ce',
                frequency: [41, 60]
            },
            'Neptun': {
                radius: [3, 7],
                color: '#87afef',
                frequency: [21, 40]
            },
            'Jovian': {
                radius: [7, 15],
                color: '#efcd9f',
                frequency: [0, 20]
            }
        },
        getProperty: function (propArray, percent) {
            return parseFloat(((((propArray[1] - propArray[0]) / 10) * (10 - percent)) + propArray[0]).toFixed(2))
        },
        maxStarRadius: 8,
        minStarRadius: 0.4,
        maxPlanetRadius: 15,
        minPlanetRadius: 0.1
    };

    var starsArray = [];

    function Star(name, type) {
        var typeParse = type.split('');
        this.id = Math.floor(Math.random() * 100000);
        this.astroType = 'Star';
        this.name = name;
        this.type = type;
        this.temperature = astroHelper.getProperty(astroHelper.starClasses[typeParse[0]].temperatures, typeParse[1]);
        this.color = astroHelper.starClasses[typeParse[0]].color;
        this.lum = astroHelper.getProperty(astroHelper.starClasses[typeParse[0]].lum, typeParse[1]);
        this.radius = astroHelper.getProperty(astroHelper.starClasses[typeParse[0]].radius, typeParse[1]);
        this.mass = astroHelper.getProperty(astroHelper.starClasses[typeParse[0]].mass, typeParse[1]);
        this.orbits = [];
    }

    function Planet(starID, name, type) {
        var typeParse = type.split('_');
        this.astroType = 'Planet';
        this.name = name;
        this.starID = starID;
        this.color = astroHelper.planetClasses[typeParse[0]].color;
        this.type = typeParse[0];
        this.radius = astroHelper.getProperty(astroHelper.planetClasses[typeParse[0]].radius, typeParse[1])

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
        getStarClasses: function (full) {
            if(full = 'full') {
                return astroHelper.starClasses
            }
            var arr = [];
            for (var c in astroHelper.starClasses) {
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
        },
        getStarByID: function (id) {
            return new Promise(function (res) {
                for (var s = 0; s < starsArray.length; s++) {
                    if (starsArray[s].id == id) {
                        res(starsArray[s])
                    }
                }
            });
        },
        createPlanet: function (starID, name, type) {
            return new Planet(starID, name, type)
        },
        getPlanetClasses: function () {
            if(full = 'full') {
                return astroHelper.planetClasses
            }
            var arr = [];
            for (var c in astroHelper.planetClasses) {
                arr.push(c)
            }
            return arr
        },
        getPlanetRadius: function () {
            return {
                max: astroHelper.maxStarRadius,
                min: astroHelper.minStarRadius
            }
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
        nameCreator: function () {
            var symbols = [
                ['a', 'o', 'u', 'i', 'e'],
                ['l', 'n', 'r'],
                ['m', 'b', 'v', 'g', 'd', 'z', 'j'],
                ['p', 'f', 'k', 't', 's', 'h']
            ];

            var nameTemplate = new Array(Math.floor(Math.random() * 6) + 3);
            for(var n = 0; n < nameTemplate.length; n++) {
                nameTemplate[n] = Math.floor(Math.random() * 2);
            }

            for(var i = 1; i < nameTemplate.length; i++) {
                if(nameTemplate[i] == 0) {
                    if(nameTemplate[i - 1] == 0) {
                        nameTemplate.splice(i, 0, 1);
                        i += 1
                    }
                } else {
                    if(nameTemplate[i - 1] == 1 && nameTemplate[i + 1] == 1) {
                        nameTemplate.splice(i, 0, 0);
                        i += 1
                    }
                }
            }
            var prev = 0;
            function generateWithRules() {
                var num = Math.floor(Math.random() * (symbols.length - 1)) + 1;
                if((num == 2 || num == 3) && (prev == 2 || prev == 3)) {
                    return generateWithRules();
                }
                return num
            }
            for(var s = 0; s < nameTemplate.length; s++) {
                if(nameTemplate[s] == 0) {
                    nameTemplate[s] = symbols[0][Math.floor(Math.random() * (symbols[0].length))]
                } else {
                    var symbolsLine = generateWithRules();
                    prev = symbolsLine;
                    var symb = Math.floor(Math.random() * (symbols[symbolsLine].length));
                    nameTemplate[s] = symbols[symbolsLine][symb]
                }
            }

            return nameTemplate.join('').replace(/(?:^|\s)\S/g, function (a) {
                return a.toUpperCase();
            }).replace(/e$|o$/, function (s) {
                switch (s) {
                    case 'e': return 'et';
                    case 'o': return 'os';
                }
            });
        },
        createStars: function (dens) {
            density = dens;
            var num = (width / density) * (height / density);
            var types = astroSystem.getStarClasses('full');
            function getRandomStarType() {
                var percent = (Math.floor(Math.random() * 100));
                var type = '';
                for(var e in types) {
                    if(percent >= types[e].frequency[0] && percent <= types[e].frequency[1]) {
                        type = e
                    }
                }
                return type + (Math.floor(Math.random() * 10))
            }

            for (var i = 0; i < num; i++) {
                astroSystem.createStar(this.nameCreator(), getRandomStarType())
            }
        },
        createPlanetsForStar: function (id) {
            var that = this;
            return new Promise(function (res) {
                var types = astroSystem.getPlanetClasses('full');
                function getRandomPlanetType() {
                    var percent = (Math.floor(Math.random() * 100));
                    var type = '';
                    for(var e in types) {
                        if(percent >= types[e].frequency[0] && percent <= types[e].frequency[1]) {
                            type = e
                        }
                    }
                    return type + '_' + (Math.floor(Math.random() * 10))
                }
                var planetCount = Math.floor(Math.random() * 10) + 3;
                astroSystem.getStarByID(id).then(function (star) {
                    for (var i = 0; i < planetCount; i++) {
                        star.orbits.push(astroSystem.createPlanet(star.id, that.nameCreator(), getRandomPlanetType()))
                    }
                    res()
                })
            });
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
    var background;
    var generalLayer;
    var waiting;

    return {
        inject: function (Integrator) {
            integrator = Integrator;
            astroSystem = Integrator.getAstroSystem();
            astroService = Integrator.getAstroService();
            interfase = Integrator.getInterface();
            messager = Integrator.getMessager();
        },
        init: function () {
            waiting = {
                star: null,
                planet: null,
                moon: null
            };
            width = astroService.getSize().width;
            height = astroService.getSize().height;
            paddindWorld = 100;

            stage = new Konva.Stage({
                container: 'generalScreen',
                width: width + (paddindWorld * 4),
                height: height + (paddindWorld * 4),
                fill: '#202020'
            });

            generalLayer = new Konva.Layer({
                name: 'general'
            });
        },
        getGeneralLayer: function () {
            return generalLayer
        },
        getStage: function () {
            return stage
        },
        viewStarsCluster: function (min, max) {
            generalLayer.destroy();
            background = new Konva.Rect({
                x: 0,
                y: 0,
                width: width + (paddindWorld * 4),
                height: height + (paddindWorld * 4),
                fill: '#202020'
            });
            generalLayer.add(background);

            var minView = 3;
            var maxView = 7;
            var density = astroService.getDensity();
            var stars = astroSystem.getAllStars();
            var padding = 20;
            var maxStarRadius = astroSystem.getStarsRadius().max;
            var minStarRadius = astroSystem.getStarsRadius().min;
            var radiusPercent = (maxStarRadius - minStarRadius) / 100;
            var xCounter = 0;
            var yCounter = 0;

            for (var s = 0; s < stars.length; s++) {
                var xCoord;
                if (!stars[s].x) {
                    xCoord = (xCounter + astroService.random(density / 0.4)) + paddindWorld;
                    stars[s].x = xCoord;
                } else {
                    xCoord = stars[s].x
                }

                var yCoord;
                if (!stars[s].y) {
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
                    fill: stars[s].color,
                    shadowColor: stars[s].color,
                    shadowBlur: 2
                });

                (function (starView, starObj) {
                    starView.on('mousedown touchstart', function () {
                        function sendMessage() {
                            waiting.star = starObj;
                            messager.sendInterfaceMessage({
                                title: 'Star: ' + starObj.name,
                                body: ['Class: <span>' + starObj.type + '</span>',
                                    'Temperature: <span>' + starObj.temperature + '</span>K',
                                    'Mass: <span>' + starObj.mass + '</span> in solar mass',
                                    'Radius: <span>' + starObj.radius + '</span> in solar radius',
                                    'Luminisity: <span>' + starObj.lum + '</span> in solar luminisity',
                                    'Have <span>' + starObj.orbits.length + '</span> planets'],
                                control: {
                                    module: 'AstroViewer',
                                    method: 'viewStarsSystem',
                                    text: 'Enter to '+ starObj.name +' System'
                                }
                            });
                        }

                        if (starObj.orbits.length == 0) {
                            astroService.createPlanetsForStar(starObj.id).then(function () {
                                sendMessage();
                            });
                            return
                        }

                        sendMessage();
                    });
                })(star, stars[s]);

                var title = new Konva.Text({
                    x: xCoord - 5,
                    y: yCoord + radius + 3,
                    text: stars[s].name,
                    fontSize: 10,
                    align: 'center',
                    fontFamily: 'Verdana, sans-serif',
                    fill: '#fff'
                });

                generalLayer.add(star);
                generalLayer.add(title);

                if (xCounter < (width - density - padding)) {
                    xCounter += density;
                } else {
                    xCounter = 0;
                    yCounter += density
                }
            }
            stage.add(generalLayer);
        },
        viewStarsSystem: function () {
            generalLayer.destroy();
            background = new Konva.Rect({
                x: 0,
                y: 0,
                width: width + (paddindWorld * 4),
                height: height + (paddindWorld * 4),
                fill: '#202020'
            });
            generalLayer.add(background);

            var maxStarRadius = astroSystem.getStarsRadius().max;
            var minStarRadius = astroSystem.getStarsRadius().min;
            var minView = 7;
            var maxView = 30;
            var maxPlanetRadius = astroSystem.getPlanetRadius().max;
            var minPlanetRadius = astroSystem.getPlanetRadius().min;
            var radiusPercent = (maxStarRadius - minStarRadius) / 100;
            var planetRadiusPercent = (maxPlanetRadius - minPlanetRadius) / 100;

            var radiusStar = 50; //((maxView - minView) / 100) * (waiting.star.radius / radiusPercent) + minView;
            var planeDist = 80 + maxView;
            var systemCenter = {
                x: stage.attrs.width / 2,
                y: stage.attrs.height / 2,
                relativeX: (stage.attrs.width / 2) - (((waiting.star.orbits.length * planeDist) + (radiusStar * 2)) / 2)
            };
            var star = new Konva.Circle({
                x: systemCenter.relativeX,
                y: systemCenter.y,
                radius: radiusStar,
                fill: waiting.star.color,
                shadowColor: waiting.star.color,
                shadowBlur: 50
            });

            (function (starView, starObj) {
                starView.on('mousedown touchstart', function () {
                    function sendMessage() {
                        waiting.star = starObj;
                        messager.sendInterfaceMessage({
                            title: 'Star: ' + starObj.name,
                            body: ['Class: <span>' + starObj.type + '</span>',
                                'Temperature: <span>' + starObj.temperature + '</span>K',
                                'Mass: <span>' + starObj.mass + '</span> in solar mass',
                                'Radius: <span>' + starObj.radius + '</span> in solar radius',
                                'Luminisity: <span>' + starObj.lum + '</span> in solar luminisity',
                                'Have <span>' + starObj.orbits.length + '</span> planets'],
                            control: {
                                module: 'AstroViewer',
                                method: 'viewStarsCluster',
                                text: 'Return to stars cluster'
                            }
                        });
                    }

                    if (starObj.orbits.length == 0) {
                        astroService.createPlanetsForStar(starObj.id).then(function () {
                            sendMessage();
                        });
                        return
                    }

                    sendMessage();
                });
            })(star, waiting.star);

            var title = new Konva.Text({
                x: systemCenter.relativeX,
                y: systemCenter.y + radiusStar + 10,
                text: waiting.star.name,
                fontSize: 20,
                align: 'center',
                fontFamily: 'Verdana, sans-serif',
                fill: '#fff'
            });

            generalLayer.add(star);
            generalLayer.add(title);

            for(var p = 0; p < waiting.star.orbits.length; p++) {
                var radiusPlanet = ((maxView - minView) / 100) * (waiting.star.orbits[p].radius / planetRadiusPercent) + minView;

                var planetX = systemCenter.relativeX + radiusStar + (planeDist * (p + 1));
                var planet = new Konva.Circle({
                    x: planetX,
                    y: systemCenter.y,
                    radius: radiusPlanet,
                    fill: waiting.star.orbits[p].color
                });

                (function (planetView, planetObj) {
                    planetView.on('mousedown touchstart', function () {
                        function sendMessage() {
                            waiting.star = planetObj;
                            messager.sendInterfaceMessage({
                                title: 'Star: ' + planetObj.name,
                                body: ['Class: <span>' + planetObj.type + '</span>',
                                    'Radius: <span>' + planetObj.radius + '</span> in Earth radius (' +
                                    (planetObj.radius * 6000).toFixed(0) + ' km)']
                            });
                        }

                        /*if (planetObj.orbits.length == 0) {
                            astroService.createPlanetsForStar(planetObj.id).then(function () {
                                sendMessage();
                            });
                            return
                        }*/

                        sendMessage();
                    });
                })(planet, waiting.star.orbits[p]);

                var planetTitle = new Konva.Text({
                    x: planetX,
                    y: systemCenter.y + radiusPlanet + 10,
                    text: waiting.star.orbits[p].name,
                    fontSize: 10,
                    align: 'center',
                    fontFamily: 'Verdana, sans-serif',
                    fill: '#fff'
                });

                generalLayer.add(planetTitle);
                generalLayer.add(planet);
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

            menuScreenShot.addEventListener('click', function () {
                var canvas = document.querySelectorAll('#generalScreen canvas')[0];
                var download = document.createElement('a');
                download.href = canvas.toDataURL("image/jpeg");
                download.download = 'screen.jpg';
                download.click();
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
            messageBody.innerHTML = msBody.join('</br>');
            if(prop.control) {
                var button = document.createElement('button');
                button.innerText = prop.control.text;
                button.classList.add('controlButton');
                button.addEventListener('click', function () {
                    var event = document.createEvent('Event');
                    event.initEvent('click', true, true);
                    messageContainer.dispatchEvent(event);
                    integrator['get' + prop.control.module]()[prop.control.method]()
                });
                messageBody.appendChild(button);
            }
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
                    if (xhr.readyState == 4) {
                        if (xhr.response) {
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
                    if (xhr.readyState == 4) {
                        if (xhr.response) {
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
                    if (xhr.readyState == 4) {
                        if (xhr.response) {
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
        astroViewer.viewStarsCluster(3, 7);
    }

    function loader() {
        messager.loadFromServer().then(function (res) {
            astroSystem.systemLoadFromJSON(res);
            astroViewer.viewStarsCluster(3, 7);
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
    this.debug = function () {
        return getter
    }
}

var integrator = new Integrator(AstroSystem, AstroService, AstroViewer, Interface, Messager);
integrator.create().render();
