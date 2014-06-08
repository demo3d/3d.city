var Micro = {};
//Game
/*Micro.nextFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    null;*/
//Simulation
Micro.speedPowerScan = [2, 4, 5];
Micro.speedPollutionTerrainLandValueScan = [2, 7, 17];
Micro.speedCrimeScan = [1, 8, 18];
Micro.speedPopulationDensityScan = [1, 9, 19];
Micro.speedFireAnalysis = [1, 10, 20];
Micro.CENSUS_FREQUENCY_10 = 4;
Micro.CENSUS_FREQUENCY_120 = Micro.CENSUS_FREQUENCY_10 * 10;
Micro.TAX_FREQUENCY = 48;
//MapCanvas
Micro.MAP_WIDTH = 128;//128;//120;
Micro.MAP_HEIGHT = 128;//128;//100;
Micro.MAP_DEFAULT_WIDTH = Micro.MAP_WIDTH*3;
Micro.MAP_DEFAULT_HEIGHT = Micro.MAP_HEIGHT*3;
Micro.MAP_BIG_DEFAULT_WIDTH = Micro.MAP_WIDTH*16;
Micro.MAP_BIG_DEFAULT_HEIGHT = Micro.MAP_HEIGHT*16;
Micro.MAP_BIG_DEFAULT_ID = "bigMap";
Micro.MAP_PARENT_ID = "splashContainer";
Micro.MAP_DEFAULT_ID = "SplashCanvas";
//GameCanvas
Micro.DEFAULT_WIDTH = 400;
Micro.DEFAULT_HEIGHT = 400;
Micro.DEFAULT_ID = "MicropolisCanvas";

Micro.RCI_DEFAULT_ID = "RCICanvas";

//Census
Micro.arrs = ['res', 'com', 'ind', 'crime', 'money', 'pollution'];

var M_ARRAY_TYPE;
if(!M_ARRAY_TYPE) { M_ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array; }

Micro.MouseBox = {
    draw: function(c, pos, width, height, options) {
        var lineWidth = options.lineWidth || 3.0;
        var strokeStyle = options.colour || 'yellow';
        var shouldOutline = (('outline' in options) && options.outline === true) || false;

        var startModifier = -1;
        var endModifier = 1;
        if (!shouldOutline) {
            startModifier = 1;
            endModifier = -1;
        }

        var startX = pos.x + startModifier * lineWidth * 0.5;
        width = width + endModifier * lineWidth;
        var startY = pos.y + startModifier * lineWidth * 0.5;
        height = height + endModifier * lineWidth;
 
        var ctx = c.getContext('2d');
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.strokeRect(startX, startY, width, height); 
    }
}

// MiscUtils,
Micro.clamp = function(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}
Micro.makeConstantDescriptor = function(value) {
    return {configurable: false, enumerable: false, writeable: false, value: value};
}
Micro.rotate10Arrays = function() {
    for (var i = 0; i < Micro.arrs.length; i++) {
        var name10 = Micro.arrs[i] + 'Hist10';
        this[name10] = [0].concat(this[name10].slice(0, -1));
    }
}
Micro.rotate120Arrays = function() {
    for (var i = 0; i < Micro.arrs.length; i++) {
        var name120 = Micro.arrs[i] + 'Hist120';
        this[name120] = [0].concat(this[name120].slice(0, -1));
    }
}

Micro.isCallable = function(f) {
    return typeof(f) === 'function';
};

// Simulation
Micro.LEVEL_EASY = 0;
Micro.LEVEL_MED = 1;
Micro.LEVEL_HARD = 2;
Micro.SPEED_PAUSED = 0;
Micro.SPEED_SLOW = 1;
Micro.SPEED_MED = 2;
Micro.SPEED_FAST = 3;

// Traffic
Micro.ROUTE_FOUND = 1;
Micro.NO_ROUTE_FOUND = 0;
Micro.NO_ROAD_FOUND = -1;
Micro.MAX_TRAFFIC_DISTANCE = 30;
Micro.perimX = [-1, 0, 1, 2, 2, 2, 1, 0,-1,-2,-2,-2];
Micro.perimY = [-2,-2,-2,-1, 0, 1, 2, 2, 2, 1, 0,-1];

//SpriteConstants
Micro.SPRITE_TRAIN = 1;
Micro.SPRITE_HELICOPTER = 2;
Micro.SPRITE_AIRPLANE = 3;
Micro.SPRITE_SHIP = 4;
Micro.SPRITE_MONSTER = 5;
Micro.SPRITE_TORNADO = 6;
Micro.SPRITE_EXPLOSION = 7;

// Evaluation
Micro.CC_VILLAGE = 'VILLAGE';
Micro.CC_TOWN = 'TOWN';
Micro.CC_CITY = 'CITY';
Micro.CC_CAPITAL = 'CAPITAL';
Micro.CC_METROPOLIS = 'METROPOLIS';
Micro.CC_MEGALOPOLIS = 'MEGALOPOLIS';
Micro.CRIME = 0;
Micro.POLLUTION = 1
Micro.HOUSING = 2;
Micro.TAXES = 3;
Micro.TRAFFIC = 4;
Micro.UNEMPLOYMENT = 5;
Micro.FIRE = 6;
// Valves
Micro.RES_VALVE_RANGE = 2000;
Micro.COM_VALVE_RANGE = 1500;
Micro.IND_VALVE_RANGE = 1500;
Micro.taxTable = [ 200, 150, 120, 100, 80, 50, 30, 0, -10, -40, -100, -150, -200, -250, -300, -350, -400, -450, -500, -550, -600];
Micro.extMarketParamTable = [1.2, 1.1, 0.98];
// Budget
Micro.RLevels = [0.7, 0.9, 1.2];
Micro.FLevels = [1.4, 1.2, 0.8];
Micro.MAX_ROAD_EFFECT = 32;
Micro.MAX_POLICESTATION_EFFECT = 1000;
Micro.MAX_FIRESTATION_EFFECT = 1000;
// PowerManager
Micro.COAL_POWER_STRENGTH = 700;
Micro.NUCLEAR_POWER_STRENGTH = 2000;

//DisasterWindow
Micro.DISASTER_NONE='None';
Micro.DISASTER_MONSTER='Monster';
Micro.DISASTER_FIRE='Fire';
Micro.DISASTER_FLOOD='Flood';
Micro.DISASTER_CRASH='Crash';
Micro.DISASTER_MELTDOWN='Meltdown';
Micro.DISASTER_TORNADO='Tornado';
Micro.Random = function(){}

Micro.Random.prototype = {
    constructor: Micro.Random,
    getChance : function(chance) {
      return (this.getRandom16() & chance) === 0;
    },
    getERandom : function(max) {
      var r1 = this.getRandom(max);
      var r2 = this.getRandom(max);
      return Math.min(r1, r2);
    },
    getRandom : function(max) {
      return Math.floor(Math.random() * (max + 1));
    },
    getRandom16 : function() {
      return this.getRandom(65535);
    },
    getRandom16Signed : function() {
      var value = this.getRandom16();
      if (value >= 32768)
        value = 32768 - value;
      return value;
    }
}

var Random = new Micro.Random();


Micro.Direction = function(){};

Micro.Direction.prototype = {
    constructor: Micro.Direction,
    "INVALID": -1,
    "NORTH": 0,
    "NORTHEAST": 1,
    "EAST": 2,
    "SOUTHEAST": 3,
    "SOUTH": 4,
    "SOUTHWEST": 5,
    "WEST": 6,
    "NORTHWEST": 7,
    "BEGIN": 0,
    "END": 8,
    // Move direction clockwise by 45 degrees. No bounds checking
    // i.e. result could be >= END. Has no effect on INVALID. Undefined
    // when dir >= END
    increment45: function(dir, count) {
        if (arguments.length < 1) throw new TypeError();
        if (dir == this.INVALID) return dir;
        if (!count && count !== 0) count = 1;
        return dir + count;
    },
    // Move direction clockwise by 90 degrees. No bounds checking
    // i.e. result could be >= END. Has no effect on INVALID. Undefined
    // when dir >= END
    increment90: function(dir) {
        if (arguments.length < 1) throw new TypeError();
        return this.increment45(dir, 2);
    },
    // Move direction clockwise by 45 degrees, taking the direction modulo 8
    // if necessary to force it into valid bounds. Has no effect on INVALID.
    rotate45: function(dir, count) {
        if (arguments.length < 1) throw new TypeError();
        if (dir == this.INVALID) return dir;
        if (!count && count !== 0) count = 1;
        return ((dir - this.NORTH + count) & 7) + this.NORTH;
    },
    // Move direction clockwise by 90 degrees, taking the direction modulo 8
    // if necessary to force it into valid bounds. Has no effect on INVALID.
    rotate90: function(dir) {
        if (arguments.length < 1) throw new TypeError();
        return this.rotate45(dir, 2);
    },
    // Move direction clockwise by 180 degrees, taking the direction modulo 8
    // if necessary to force it into valid bounds. Has no effect on INVALID.
    rotate180: function(dir) {
        if (arguments.length < 1) throw new TypeError();
        return this.rotate45(dir, 4);
    }
}

var Direction = new Micro.Direction();

var messageData = {
    AUTOBUDGET_CHANGED: Micro.makeConstantDescriptor('Autobudget changed'),
    BUDGET_NEEDED: Micro.makeConstantDescriptor('User needs to budget'),
    BLACKOUTS_REPORTED: Micro.makeConstantDescriptor('Blackouts reported'),
    DATE_UPDATED: Micro.makeConstantDescriptor('Date changed'),
    DID_TOOL: Micro.makeConstantDescriptor('Tool applied'),
    EARTHQUAKE: Micro.makeConstantDescriptor('Earthquake'),
    EXPLOSION_REPORTED: Micro.makeConstantDescriptor('Explosion Reported'),
    EVAL_UPDATED: Micro.makeConstantDescriptor('Evaluation Updated'),
    FIRE_REPORTED: Micro.makeConstantDescriptor('Fire!'),
    FIRE_STATION_NEEDS_FUNDING: Micro.makeConstantDescriptor('Fire station needs funding'),
    FLOODING_REPORTED: Micro.makeConstantDescriptor('Flooding reported'),
    FUNDS_CHANGED: Micro.makeConstantDescriptor('Total funds has changed'),
    HEAVY_TRAFFIC: Micro.makeConstantDescriptor('Total funds has changed'),
    HELICOPTER_CRASHED: Micro.makeConstantDescriptor('Helicopter crashed'),
    HIGH_CRIME: Micro.makeConstantDescriptor('High crime'),
    HIGH_POLLUTION: Micro.makeConstantDescriptor('High pollution'),
    MONSTER_SIGHTED: Micro.makeConstantDescriptor('Monster sighted'),
    NEED_ELECTRICITY: Micro.makeConstantDescriptor('More power needed'),
    NEED_FIRE_STATION: Micro.makeConstantDescriptor('Fire station needed'),
    NEED_MORE_COMMERCIAL: Micro.makeConstantDescriptor('More commercial zones needed'),
    NEED_MORE_INDUSTRIAL: Micro.makeConstantDescriptor('More industrial zones needed'),
    NEED_MORE_RESIDENTIAL: Micro.makeConstantDescriptor('More residential needed'),
    NEED_MORE_RAILS: Micro.makeConstantDescriptor('More railways needed'),
    NEED_MORE_ROADS: Micro.makeConstantDescriptor('More roads needed'),
    NEED_POLICE_STATION: Micro.makeConstantDescriptor('Police station needed'),
    NEED_AIRPORT: Micro.makeConstantDescriptor('Airport needed'),
    NEED_SEAPORT: Micro.makeConstantDescriptor('Seaport needed'),
    NEED_STADIUM: Micro.makeConstantDescriptor('Stadium needed'),
    NO_MONEY: Micro.makeConstantDescriptor('No money'),
    NOT_ENOUGH_POWER: Micro.makeConstantDescriptor('Not enough power'),
    NUCLEAR_MELTDOWN: Micro.makeConstantDescriptor('Nuclear Meltdown'),
    PLANE_CRASHED: Micro.makeConstantDescriptor('Plane crashed'),
    POLICE_NEEDS_FUNDING: Micro.makeConstantDescriptor('Police need funding'),
    QUERY_WINDOW_NEEDED: Micro.makeConstantDescriptor('Query window needed'),
    REACHED_CAPITAL: Micro.makeConstantDescriptor('Now a capital'),
    REACHED_CITY: Micro.makeConstantDescriptor('Now a city'),
    REACHED_METROPOLIS: Micro.makeConstantDescriptor('Now a metropolis'),
    REACHED_MEGALOPOLIS: Micro.makeConstantDescriptor('Now a megalopolis'),
    REACHED_TOWN: Micro.makeConstantDescriptor('Now a town'),
    REACHED_VILLAGE: Micro.makeConstantDescriptor('Now a village'),
    ROAD_NEEDS_FUNDING: Micro.makeConstantDescriptor('Roads need funding'),
    SHIP_CRASHED: Micro.makeConstantDescriptor('Shipwrecked'),
    SOUND_EXPLOSIONHIGH: Micro.makeConstantDescriptor('Explosion! Bang!'),
    SOUND_EXPLOSIONLOW: Micro.makeConstantDescriptor('Explosion! Bang!'),
    SOUND_HEAVY_TRAFFIC: Micro.makeConstantDescriptor('Heavy Traffic sound'),
    SOUND_HONKHONK: Micro.makeConstantDescriptor('HonkHonk sound'),
    SOUND_MONSTER: Micro.makeConstantDescriptor('Monster sound'),
    TAX_TOO_HIGH: Micro.makeConstantDescriptor('Tax too high'),
    TORNADO_SIGHTED: Micro.makeConstantDescriptor('Tornado sighted'),
    TRAFFIC_JAMS: Micro.makeConstantDescriptor('Traffic jams reported'),
    TRAIN_CRASHED: Micro.makeConstantDescriptor('Train crashed'),
    VALVES_UPDATED: Micro.makeConstantDescriptor('Valves updated'),
    WELCOME: Micro.makeConstantDescriptor('Welcome to 3D city')
};

var Messages = Object.defineProperties({}, messageData);
Micro.Notification = function(){
    this.elem = document.getElementById("notifications");
}
Micro.Notification.prototype = {
    constructor: Micro.Notification,
    badNews : function(msg) {
        this.elem.className = 'bad';
        this.elem.innerHTML=(msg);
    },
    goodNews : function(msg) {
        this.elem.className = 'good';
        this.elem.innerHTML=msg;
    },
    news : function(msg) {
        this.elem.className = 'neutral';
        this.elem.innerHTML=msg;
    }
}
Micro.MessageManager = function(){
    this.data = [];
}
Micro.MessageManager.prototype = {
    constructor: Micro.MessageManager,
    sendMessage : function(message, data) {
        this.data.push({message: message, data: data});
    },
    clear : function() {
        this.data = [];
    },
    getMessages : function() {
        return this.data.slice();
    }
}



Micro.Text = function(){
    // TODO Some kind of rudimentary L20N based on navigator.language?

    // Query tool strings
    var densityStrings = ['Low', 'Medium', 'High', 'Very High'];
    var landValueStrings = ['Slum', 'Lower Class', 'Middle Class', 'High'];
    var crimeStrings = ['Safe', 'Light', 'Moderate', 'Dangerous'];
    var pollutionStrings = ['None', 'Moderate', 'Heavy', 'Very Heavy'];
    var rateStrings = ['Declining', 'Stable', 'Slow Growth', 'Fast Growth'];
    var zoneTypes = ['Clear', 'Water', 'Trees', 'Rubble', 'Flood', 'Radioactive Waste',
                   'Fire', 'Road', 'Power', 'Rail', 'Residential', 'Commercial',
                   'Industrial', 'Seaport', 'Airport', 'Coal Power', 'Fire Department',
                   'Police Department', 'Stadium', 'Nuclear Power', 'Draw Bridge',
                   'Radar Dish', 'Fountain', 'Industrial', 'Steelers 38  Bears 3',
                   'Draw Bridge', 'Ur 238'];

    // Evaluation window
    var gameLevel = {};
    gameLevel['' + Micro.LEVEL_EASY] = 'Easy';
    gameLevel['' + Micro.LEVEL_MED] = 'Medium';
    gameLevel['' + Micro.LEVEL_HARD] = 'Hard';
 
    var cityClass = {};
    cityClass[Micro.CC_VILLAGE] = 'VILLAGE';
    cityClass[Micro.CC_TOWN] = 'TOWN';
    cityClass[Micro.CC_CITY] = 'CITY';
    cityClass[Micro.CC_CAPITAL] = 'CAPITAL';
    cityClass[Micro.CC_METROPOLIS] = 'METROPOLIS';
    cityClass[Micro.CC_MEGALOPOLIS] = 'MEGALOPOLIS';

    var problems = {};
    problems[Micro.CRIME] = 'Crime';
    problems[Micro.POLLUTION] = 'Pollution';
    problems[Micro.HOUSING] = 'Housing';
    problems[Micro.TAXES] = 'Taxes';
    problems[Micro.TRAFFIC] = 'Traffic';
    problems[Micro.UNEMPLOYMENT] = 'Unemployment';
    problems[Micro.FIRE] = 'Fire';

    // months
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Tool strings
    var toolMessages = {
        noMoney: 'Insufficient funds to build that',
        needsDoze: 'Area must be bulldozed first'
    };

    // Message strings
    var neutralMessages = {};
    neutralMessages[Messages.FIRE_STATION_NEEDS_FUNDING] = 'Fire departments need funding';
    neutralMessages[Messages.NEED_AIRPORT] = 'Commerce requires an Airport';
    neutralMessages[Messages.NEED_FIRE_STATION] = 'Citizens demand a Fire Department';
    neutralMessages[Messages.NEED_ELECTRICITY] = 'Build a Power Plant';
    neutralMessages[Messages.NEED_MORE_INDUSTRIAL] = 'More industrial zones needed';
    neutralMessages[Messages.NEED_MORE_COMMERCIAL] = 'More commercial zones needed';
    neutralMessages[Messages.NEED_MORE_RESIDENTIAL] = 'More residential zones needed';
    neutralMessages[Messages.NEED_MORE_RAILS] = 'Inadequate rail system';
    neutralMessages[Messages.NEED_MORE_ROADS] = 'More roads required';
    neutralMessages[Messages.NEED_POLICE_STATION] = 'Citizens demand a Police Department';
    neutralMessages[Messages.NEED_SEAPORT] = 'Industry requires a Sea Port';
    neutralMessages[Messages.NEED_STADIUM] = 'Residents demand a Stadium';
    neutralMessages[Messages.ROAD_NEEDS_FUNDING] = 'Roads deteriorating, due to lack of funds';
    neutralMessages[Messages.POLICE_NEEDS_FUNDING] = 'Police departments need funding';
    neutralMessages[Messages.WELCOME] = 'Welcome to 3D City';

    var badMessages = {};
    badMessages[Messages.BLACKOUTS_REPORTED] = 'Brownouts, build another Power Plant';
    badMessages[Messages.COPTER_CRASHED] = 'A helicopter crashed ';
    badMessages[Messages.EARTHQUAKE] = 'Major earthquake reported !!';
    badMessages[Messages.EXPLOSION_REPORTED] = 'Explosion detected ';
    badMessages[Messages.FLOODING_REPORTED] = 'Flooding reported !';
    badMessages[Messages.FIRE_REPORTED] = 'Fire reported ';
    badMessages[Messages.HEAVY_TRAFFIC] = 'Heavy Traffic reported';
    badMessages[Messages.HIGH_CRIME] = 'Crime very high';
    badMessages[Messages.HIGH_POLLUTION] = 'Pollution very high';
    badMessages[Messages.MONSTER_SIGHTED] = 'A Monster has been sighted !';
    badMessages[Messages.NO_MONEY] = 'YOUR CITY HAS GONE BROKE';
    badMessages[Messages.NOT_ENOUGH_POWER] = 'Blackouts reported. Check power map';
    badMessages[Messages.NUCLEAR_MELTDOWN] = 'A Nuclear Meltdown has occurred !!';
    badMessages[Messages.PLANE_CRASHED] = 'A plane has crashed ';
    badMessages[Messages.SHIP_CRASHED] = 'Shipwreck reported ';
    badMessages[Messages.TAX_TOO_HIGH] = 'Citizens upset. The tax rate is too high';
    badMessages[Messages.TORNADO_SIGHTED] = 'Tornado reported !';
    badMessages[Messages.TRAFFIC_JAMS] = 'Frequent traffic jams reported';
    badMessages[Messages.TRAIN_CRASHED] = 'A train crashed ';

    var goodMessages = ' {}';
    goodMessages[Messages.REACHED_CAPITAL] = 'Population has reached 50,000';
    goodMessages[Messages.REACHED_CITY] = 'Population has reached 10,000';
    goodMessages[Messages.REACHED_MEGALOPOLIS] = 'Population has reached 500,000';
    goodMessages[Messages.REACHED_METROPOLIS] = 'Population has reached 100,000';
    goodMessages[Messages.REACHED_TOWN] = 'Population has reached 2,000';

    return {
        badMessages: badMessages,
        cityClass: cityClass,
        crimeStrings: crimeStrings,
        densityStrings: densityStrings,
        gameLevel: gameLevel,
        goodMessages: goodMessages,
        landValueStrings: landValueStrings,
        months: months,
        neutralMessages: neutralMessages,
        problems: problems,
        pollutionStrings: pollutionStrings,
        rateStrings: rateStrings,
        toolMessages: toolMessages,
        zoneTypes: zoneTypes
    }

};

var TXT = new Micro.Text();
Micro.Census = function(){
    this.clearCensus();
    this.changed = false;
    this.crimeRamp = 0;
    this.pollutionRamp = 0;

    // Set externally
    this.landValueAverage = 0;
    this.pollutionAverage = 0;
    this.crimeAverage = 0;
    this.totalPop = 0;

    var createArray = function(arrName) {
        this[arrName] = [];
        for (var a = 0; a < 120; a++) this[arrName][a] = 0;
    }

    for (var i = 0; i < Micro.arrs.length; i++) {
        var name10 = Micro.arrs[i] + 'Hist10';
        var name120 = Micro.arrs[i] + 'Hist120';
        createArray.call(this, name10);
        createArray.call(this, name120);
    }
}

Micro.Census.prototype = {
    constructor: Micro.Census,
    clearCensus : function() {
        this.poweredZoneCount = 0;
        this.unpoweredZoneCount = 0;
        this.firePop = 0;
        this.roadTotal = 0;
        this.railTotal = 0;
        this.resPop = 0;
        this.comPop = 0;
        this.indPop = 0;
        this.resZonePop = 0;
        this.comZonePop = 0;
        this.indZonePop = 0;
        this.hospitalPop = 0;
        this.churchPop = 0;
        this.policeStationPop = 0;
        this.fireStationPop = 0;
        this.stadiumPop = 0;
        this.coalPowerPop = 0;
        this.nuclearPowerPop = 0;
        this.seaportPop = 0;
        this.airportPop = 0;
    },
    take10Census : function(budget) {
        var resPopDenom = 8;
        Micro.rotate10Arrays.call(this);

        this.resHist10[0] = Math.floor(this.resPop / resPopDenom);
        this.comHist10[0] = this.comPop;
        this.indHist10[0] = this.indPop;

        this.crimeRamp += Math.floor((this.crimeAverage - this.crimeRamp) / 4);
        this.crimeHist10[0] = Math.min(this.crimeRamp, 255);

        this.pollutionRamp += Math.floor((this.pollutionAverage - this.pollutionRamp) / 4);
        this.pollutionHist10[0] = Math.min(this.pollutionRamp, 255);

        var x = Math.floor(budget.cashFlow / 20) + 128;
        this.moneyHist10[0] = Micro.clamp(x, 0, 255);

        var resPopScaled = this.resPop >> 8;

        if (this.hospitalPop < this.resPopScaled)
          this.needHospital = 1;
        else if (this.hospitalPop > this.resPopScaled)
          this.needHospital = -1;
        else if (this.hospitalPop === this.resPopScaled)
          this.needHospital = 0;

        this.changed = true;
    },
    take120Census : function() {
        Micro.rotate120Arrays.call(this);
        var resPopDenom = 8;

        this.resHist120[0] = Math.floor(this.resPop / resPopDenom);
        this.comHist120[0] = this.comPop;
        this.indHist120[0] = this.indPop;
        this.crimeHist120[0] = this.crimeHist10[0];
        this.pollutionHist120[0] = this.pollutionHist10[0];
        this.moneyHist120[0] = this.moneyHist10[0];
        this.changed = true;
    }
}

Micro.PROBLEMS = ['CVP_CRIME', 'CVP_POLLUTION', 'CVP_HOUSING', 'CVP_TAXES', 'CVP_TRAFFIC', 'CVP_UNEMPLOYMENT', 'CVP_FIRE'];
Micro.NUMPROBLEMS = Micro.PROBLEMS.length;
Micro.NUM_COMPLAINTS = 4;

Micro.getTrafficAverage = function(blockMaps) {
    var trafficDensityMap = blockMaps.trafficDensityMap;
    var landValueMap = blockMaps.landValueMap;
    var trafficTotal = 0;
    var count = 1;

    for (var x = 0; x < landValueMap.mapWidth; x += landValueMap.blockSize) {
        for (var y = 0; y < landValueMap.mapHeight; y += landValueMap.blockSize) {
            if (landValueMap.worldGet(x, y) > 0) {
                trafficTotal += trafficDensityMap.worldGet(x, y);
                count++;
            }
        }
    }
    var trafficAverage = Math.floor(trafficTotal / count) * 2.4;
    return trafficAverage;
};


Micro.getUnemployment = function(census) {
    var b = (census.comPop + census.indPop) * 8;
    if (b === 0) return 0;
    // Ratio total people / working. At least 1.
    var r = census.resPop / b;
    b = Math.round((r - 1) * 255);
    return Math.min(b, 255);
};


Micro.getFireSeverity = function(census) {
    return Math.min(census.firePop * 5, 255);
};


Micro.Evaluation = function (gameLevel, SIM) {
    this.sim = SIM;
    this.problemVotes = [];
    this.problemOrder = [];
    this.evalInit();
    this.gameLevel = '' + gameLevel;
    this.changed = false;
}

Micro.Evaluation.prototype = {
    constructor: Micro.Evaluation,
    cityEvaluation : function() {
        var census = this.sim.census;

        if (census.totalPop > 0) {
            var problemTable = [];
            for (var i = 0; i < Micro.NUMPROBLEMS; i++) problemTable.push(0);
            this.getAssessedValue(census);
            this.doPopNum(census);
            this.doProblems(this.sim.census, this.sim.budget, this.sim.blockMaps, problemTable);
            this.getScore(problemTable);
            this.doVotes();
            this.changeEval();
        } else {
            this.evalInit();
            this.cityYes = 50;
            this.changeEval();
        }
    },
    /*cityEvaluation : function(simData) {
        var census = simData.census;

        if (census.totalPop > 0) {
            var problemTable = [];
            for (var i = 0; i < Micro.NUMPROBLEMS; i++) problemTable.push(0);
            this.getAssessedValue(census);
            this.doPopNum(census);
            this.doProblems(simData.census, simData.budget, simData.blockMaps, problemTable);
            this.getScore(simData, problemTable);
            this.doVotes();
            this.changeEval();
        } else {
            this.evalInit();
            this.cityYes = 50;
            this.changeEval();
        }
    },*/
    evalInit : function() {
        this.cityYes = 0;
        this.cityPop = 0;
        this.cityPopDelta = 0;
        this.cityAssessedValue = 0;
        this.cityClass = Micro.CC_VILLAGE;
        this.cityScore = 500;
        this.cityScoreDelta = 0;
        for (var i = 0; i < Micro.NUMPROBLEMS; i++) this.problemVotes[i] = 0;
        for (i = 0; i < Micro.NUM_COMPLAINTS; i++) this.problemOrder[i] = Micro.NUMPROBLEMS;
    },
    getAssessedValue : function(census) {
        var value;

        value = census.roadTotal * 5;
        value += census.railTotal * 10;
        value += census.policeStationPop * 1000;
        value += census.fireStationPop * 1000;
        value += census.hospitalPop * 400;
        value += census.stadiumPop * 3000;
        value += census.seaportPop * 5000;
        value += census.airportPop * 10000;
        value += census.coalPowerPop * 3000;
        value += census.nuclearPowerPop * 6000;

        this.cityAssessedValue = value * 1000;
    },
    getPopulation : function(census) {
        var population = (census.resPop + (census.comPop + census.indPop) * 8) * 20;
        return population;
    },
    doPopNum : function(census) {
        var oldCityPop = this.cityPop;

        this.cityPop = this.getPopulation(census);

        if (oldCityPop == -1)
            oldCityPop = this.cityPop;

        this.cityPopDelta = this.cityPop - oldCityPop;
        this.cityClass = this.getCityClass(this.cityPop);
    },
    getCityClass : function(cityPopulation) {
        this.cityClassification = Micro.CC_VILLAGE;
        if (cityPopulation > 2000) this.cityClassification = Micro.CC_TOWN;
        if (this.cityPopulation > 10000) this.cityClassification = Micro.CC_CITY;
        if (this.cityPopulation > 50000) this.cityClassification = Micro.CC_CAPITAL;
        if (this.cityPopulation > 100000) this.cityClassification = Micro.CC_METROPOLIS;
        if (this.cityPopulation > 500000) this.cityClassification = Micro.CC_MEGALOPOLIS;
        return this.cityClassification;
    },
    voteProblems : function(problemTable) {
    for (var i = 0; i < Micro.NUMPROBLEMS; i++) this.problemVotes[i] = 0;
        var problem = 0;
        var voteCount = 0;
        var loopCount = 0;

        while (voteCount < 100 && loopCount < 600) {
            if (Random.getRandom(300) < problemTable[problem]) {
                this.problemVotes[problem]++;
                voteCount++;
            }
            problem++;
            if (problem > Micro.NUMPROBLEMS) {
                problem = 0;
            }
            loopCount++;
        }
    },
    doProblems : function(census, budget, blockMaps, problemTable) {
        var problemTaken = [];

        for (var i = 0; i < Micro.NUMPROBLEMS; i++) {
            problemTaken[i] = false;
            problemTable[i] = 0;
        }

        problemTable[Micro.CRIME]        = census.crimeAverage;
        problemTable[Micro.POLLUTION]    = census.pollutionAverage;
        problemTable[Micro.HOUSING]      = census.landValueAverage * 7 / 10;
        problemTable[Micro.TAXES]        = budget.cityTax * 10;
        problemTable[Micro.TRAFFIC]      = Micro.getTrafficAverage(blockMaps);
        problemTable[Micro.UNEMPLOYMENT] = Micro.getUnemployment(census);
        problemTable[Micro.FIRE]         = Micro.getFireSeverity(census);

        this.voteProblems(problemTable);

        for (i = 0; i < Micro.NUM_COMPLAINTS; i++) {
            // Find biggest problem not taken yet
            var maxVotes = 0;
            var bestProblem = Micro.NUMPROBLEMS;
            for (var j = 0; j < Micro.NUMPROBLEMS; j++) {
                if ((this.problemVotes[j] > maxVotes) && (!problemTaken[j])) {
                   bestProblem = j;
                   maxVotes = this.problemVotes[j];
                }
            }
            // bestProblem == NUMPROBLEMS means no problem found
            this.problemOrder[i] = bestProblem;
            if (bestProblem < Micro.NUMPROBLEMS) {
                problemTaken[bestProblem] = true;
            }
        }
    },
    //getScore : function(simData, problemTable) {
    getScore : function(problemTable) {
        var census = this.sim.census;
        var budget = this.sim.budget;
        var valves = this.sim.valves;

        var cityScoreLast;

        cityScoreLast = this.cityScore;
        var score = 0;

        for (var i = 0; i < Micro.NUMPROBLEMS; i++) score += problemTable[i];

        score = Math.floor(score / 3);
        score = Math.min(score, 256);
        score = Micro.clamp((256 - score) * 4, 0, 1000);

        if (valves.resCap) score = Math.round(score * 0.85);

        if (valves.comCap) score = Math.round(score * 0.85);

        if (valves.indCap) score = Math.round(score * 0.85);

        if (budget.roadEffect < budget.MAX_ROAD_EFFECT) score -= budget.MAX_ROAD_EFFECT - budget.roadEffect;

        if (budget.policeEffect < budget.MAX_POLICE_STATION_EFFECT) {
            score = Math.round(score * (0.9 + (budget.policeEffect / (10.0001 * budget.MAX_POLICE_STATION_EFFECT))));
        }

        if (budget.fireEffect < budget.MAX_FIRE_STATION_EFFECT) {
            score = Math.round(score * (0.9 + (budget.fireEffect / (10.0001 * budget.MAX_FIRE_STATION_EFFECT))));
        }

        if (valves.resValve < -1000) score = Math.round(score * 0.85);
        if (valves.comValve < -1000) score = Math.round(score * 0.85);
        if (valves.indValve < -1000)  score = Math.round(score * 0.85);


        var scale = 1.0;
        if (this.cityPop === 0 || this.cityPopDelta === 0) {
            scale = 1.0; // there is nobody or no migration happened
        } else if (this.cityPopDelta == this.cityPop) {
            scale = 1.0; // city sprang into existence or doubled in size
        } else if (this.cityPopDelta > 0) {
            scale = (this.cityPopDelta / this.cityPop) + 1.0;
        } else if (this.cityPopDelta < 0) {
            scale = 0.95 + Math.floor(this.cityPopDelta / (this.cityPop - this.cityPopDelta));
        }

        score = Math.round(score * scale);
        score = score - Micro.getFireSeverity(census) - budget.cityTax; // dec score for fires and tax

        scale = census.unpoweredZoneCount + census.poweredZoneCount;   // dec score for unpowered zones
        if (scale > 0.0) score = Math.round(score * (census.poweredZoneCount / scale));

        score = Micro.clamp(score, 0, 1000);

        this.cityScore = Math.round((this.cityScore + score) / 2);

        this.cityScoreDelta = this.cityScore - cityScoreLast;
    },
    doVotes : function() {
        var i;
        this.cityYes = 0;
        for (i = 0; i < 100; i++) {
            if (Random.getRandom(1000) < this.cityScore) this.cityYes++;
        }
    },
    changeEval : function() {
        this.changed = true;
    },
    countProblems : function() {
        var i;
        for (i = 0; i < Micro.NUM_COMPLAINTS; i++) {
            if (this.problemOrder[i] === Micro.NUMPROBLEMS) break;
        }
        return i;
    },
    getProblemNumber : function(i) {
        if (i < 0 || i >= Micro.NUM_COMPLAINTS || this.problemOrder[i] === Micro.NUMPROBLEMS) return -1;
        else return this.problemOrder[i];
    },
    getProblemVotes : function(i) {
        if (i < 0 || i >= Micro.NUM_COMPLAINTS || this.problemOrder[i] == Micro.NUMPROBLEMS) return -1;
        else return this.problemVotes[this.problemOrder[i]];
    }
}

Micro.Budget = function () {
    this.roadEffect = Micro.MAX_ROAD_EFFECT;
    this.policeEffect = Micro.MAX_POLICESTATION_EFFECT;
    this.fireEffect = Micro.MAX_FIRESTATION_EFFECT;
    this.totalFunds = 0;
    this.cityTax = 7;
    this.cashFlow = 0;
    this.taxFund = 0;

    // The 'fund's respresent the cost of funding all these services on
    // the map 100%
    this.roadFund = 0;
    this.fireFund = 0;
    this.policeFund = 0;

    // Percentage of budget used
    this.roadPercent = 1;
    this.firePercent = 1;
    this.policePercent = 1;

    // Cash value of spending. Should equal Math.round(_Fund * _Percent)
    this.roadSpend = 0;
    this.fireSpend = 0;
    this.policeSpend = 0;

    this.autoBudget = true;
}

Micro.Budget.prototype = {

    constructor: Micro.Budget,

    doBudget : function(messageManager) {
       return this.doBudgetNow(false, messageManager);
    },
    // User initiated budget
    doBudgetMenu : function(messageManager) {
       return this.doBudgetNow(false, messageManager);
    },
    doBudgetNow : function(fromWindow, messageManager) {
        // How much would we be spending based on current percentages?
        this.roadSpend = Math.round(this.roadFund * this.roadPercent);
        this.fireSpend = Math.round(this.fireFund * this.firePercent);
        this.policeSpend = Math.round(this.policeFund * this.policePercent);
        var total = this.roadSpend + this.fireSpend + this.policeSpend;

        // If we don't have any services on the map, we can bail early
        if (total === 0) {
            this.roadPercent = 1;
            this.firePercent = 1;
            this.policePercent = 1;
            this.roadEffect = this.MAX_ROAD_EFFECT;
            this.policeEffect = this.MAX_POLICESTATION_EFFECT;
            this.fireEffect = this.MAX_FIRESTATION_EFFECT;
        }

        var cashAvailable = this.totalFunds + this.taxFund;
        var cashRemaining = cashAvailable;

        // How much are we actually going to spend?
        var roadValue = 0;
        var fireValue = 0;
        var policeValue = 0;

        // Spending priorities: road, fire, police
        if (cashRemaining >= this.roadSpend) roadValue = this.roadSpend;
        else roadValue = cashRemaining;
        cashRemaining -= roadValue;

        if (cashRemaining >= this.fireSpend) fireValue = this.fireSpend;
        else fireValue = cashRemaining;
        cashRemaining -= fireValue;

        if (cashRemaining >= this.policeSpend) policeValue = this.policeSpend;
        else policeValue = cashRemaining;
        cashRemaining -= policeValue;

        if (this.roadFund > 0) this.roadPercent = new Number(roadValue / this.roadFund).toPrecision(2) - 0;
        else this.roadPercent = 1;

        if (this.fireFund > 0) this.firePercent = new Number(fireValue / this.fireFund).toPrecision(2) - 0;
        else this.fireFund = 1;

        if (this.policeFund > 0) this.policePercent = new Number(policeValue / this.policeFund).toPrecision(2) - 0;
        else this.policeFund = 1;

        if (!this.autoBudget || fromWindow) {
            // If we were called as the result of a manual budget,
            // go ahead and spend the money
            if (!fromWindow) {
                this.doBudgetSpend(roadValue, fireValue, policeValue, this.cityTax, messageManager);
            }
            return;
        }
        // Autobudget
        if (cashAvailable >= total) {
            // We were able to fully fund services. Go ahead and spend
            this.doBudgetSpend(roadValue, fireValue, policeValue, this.cityTax, messageManager);
            return;
        }

        // Uh-oh. Not enough money. Make this the user's problem.
        // They don't know it yet, but they're about to get a budget window.
        this.autoBudget = false;
        messageManager.sendMessage(Messages.AUTOBUDGET_CHANGED, this.autoBudget);
        messageManager.sendMessage(Messages.BUDGET_NEEDED);
        messageManager.sendMessage(Messages.NO_MONEY);
    },
    doBudgetSpend : function(roadValue, fireValue, policeValue, taxRate, messageManager) {
        this.roadSpend = roadValue;
        this.fireSpend = fireValue;
        this.policeSpend = policeValue;
        this.setTax(taxRate);
        var total = this.roadSpend + this.fireSpend + this.policeSpend;

        this.spend(-(this.taxFund - total), messageManager);
        this.updateFundEffects();
    },
    updateFundEffects : function() {
        // Update effects
        this.roadEffect = Micro.MAX_ROAD_EFFECT;
        this.policeEffect = Micro.MAX_POLICESTATION_EFFECT;
        this.fireEffect = Micro.MAX_FIRESTATION_EFFECT;
        if (this.roadFund > 0) this.roadEffect = Math.floor(this.roadEffect * this.roadSpend / this.roadFund);
        if (this.fireFund > 0) this.fireEffect = Math.floor(this.fireEffect * this.fireSpend / this.fireFund);
        if (this.policeFund > 0) this.policeEffect = Math.floor(this.policeEffect * this.policeSpend / this.policeFund);
    },
    collectTax : function(gameLevel, census, messageManager) {
        this.cashFlow = 0;

        this.policeFund = census.policeStationPop * 100;
        this.fireFund = census.fireStationPop * 100;
        this.roadFund = Math.floor((census.roadTotal + (census.railTotal * 2)) * Micro.RLevels[gameLevel]);
        this.taxFund = Math.floor(Math.floor(census.totalPop * census.landValueAverage / 120) * this.cityTax * Micro.FLevels[gameLevel]);

        if (census.totalPop > 0) {
            this.cashFlow = this.taxFund - (this.policeFund + this.fireFund + this.roadFund);
            this.doBudget(messageManager);
        } else {
            // We don't want roads etc deteriorating when population hasn't yet been established
            // (particularly early game)
            this.roadEffect   = Micro.MAX_ROAD_EFFECT;
            this.policeEffect = Micro.MAX_POLICESTATION_EFFECT;
            this.fireEffect   = Micro.MAX_FIRESTATION_EFFECT;
        }
    },
    setTax : function(amount, messageManager) {
        if (amount === this.cityTax) return;
        this.cityTax = amount;
        if (messageManager !== undefined) messageManager.sendMessage(Messages.TAXRATE_CHANGED, this.cityTax);
    },
    setFunds : function(amount, messageManager) {
        if (amount === this.totalFunds) return;
        this.totalFunds = Math.max(0, amount);
        if (messageManager !== undefined) messageManager.sendMessage(Messages.FUNDS_CHANGED, this.totalFunds);
    },
    spend : function(amount, messageManager) {
        this.setFunds(this.totalFunds - amount, messageManager);
    },
    shouldDegradeRoad : function() {
        return this.roadEffect < Math.floor(15 * this.MAX_ROAD_EFFECT / 16);
    }

}

Micro.Valves = function () {
    this.changed = false;
    this.resValve = 0;
    this.comValve = 0;
    this.indValve = 0;
    this.resCap = false;
    this.comCap = false;
    this.indCap = false;
}

Micro.Valves.prototype = {
    constructor: Micro.Valves,
    setValves : function(gameLevel, census, budget) {
        var resPopDenom = 8;
        var birthRate = 0.02;
        var labourBaseMax = 1.3;
        var internalMarketDenom = 3.7;
        var projectedIndPopMin = 5.0;
        var resRatioDefault = 1.3;
        var resRatioMax = 2;
        var comRatioMax = 2;
        var indRatioMax = 2;
        var taxMax = 20;
        var taxTableScale = 600;
        var employment, labourBase;

        var normalizedResPop = census.resPop / resPopDenom;
        census.totalPop = Math.round(normalizedResPop + census.comPop + census.indPop);

        if (census.resPop > 0) employment = (census.comHist10[1] + census.indHist10[1]) / normalizedResPop;
        else employment = 1;

        var migration = normalizedResPop * (employment - 1);
        var births = normalizedResPop * birthRate;
        var projectedResPop = normalizedResPop + migration + births;

        // Compute labourBase
        var temp = census.comHist10[1] + census.indHist10[1];
        if (temp > 0.0) labourBase = (census.resHist10[1] / temp);
        else labourBase = 1;

        labourBase = Micro.clamp(labourBase, 0.0, labourBaseMax);
        var internalMarket = (normalizedResPop + census.comPop + census.indPop) / internalMarketDenom;
        var projectedComPop = internalMarket * labourBase;
        var projectedIndPop = census.indPop * labourBase * Micro.extMarketParamTable[gameLevel];
        projectedIndPop = Math.max(projectedIndPop, projectedIndPopMin);

        var resRatio;
        if (normalizedResPop > 0) resRatio = projectedResPop / normalizedResPop;
        else resRatio = resRatioDefault;

        var comRatio;
        if (census.comPop > 0) comRatio = projectedComPop / census.comPop;
        else comRatio = projectedComPop;

        var indRatio;
        if (census.indPop > 0) indRatio = projectedIndPop / census.indPop;
        else indRatio = projectedIndPop;

        resRatio = Math.min(resRatio, resRatioMax);
        comRatio = Math.min(comRatio, comRatioMax);
        resRatio = Math.min(indRatio, indRatioMax);

        // Global tax and game level effects.
        var z = Math.min((budget.cityTax + gameLevel), taxMax);
        resRatio = (resRatio - 1) * taxTableScale + Micro.taxTable[z];
        comRatio = (comRatio - 1) * taxTableScale + Micro.taxTable[z];
        indRatio = (indRatio - 1) * taxTableScale + Micro.taxTable[z];

        // Ratios are velocity changes to valves.
        this.resValve = Micro.clamp(this.resValve + Math.round(resRatio), -Micro.RES_VALVE_RANGE, Micro.RES_VALVE_RANGE);
        this.comValve = Micro.clamp(this.comValve + Math.round(comRatio), -Micro.COM_VALVE_RANGE, Micro.COM_VALVE_RANGE);
        this.indValve = Micro.clamp(this.indValve + Math.round(indRatio), -Micro.IND_VALVE_RANGE, Micro.IND_VALVE_RANGE);

        if (this.resCap && this.resValve > 0) this.resValve = 0;
        if (this.comCap && this.comValve > 0) this.comValve = 0;
        if (this.indCap && this.indValve > 0) this.indValve = 0;

        this.changed = true;
    }
}

Micro.Tile = function(tileValue, bitMask){
    if (!(this instanceof Micro.Tile)) return new Micro.Tile();
    if (arguments.length && (typeof(tileValue) !== 'number' || (arguments.length > 1 && typeof(bitMask) !== 'number') || tileValue < 0)) throw new Error('Invalid parameter');
    if (arguments.length > 1 && (tileValue >= Tile.TILE_COUNT || bitMask < Tile.BIT_START || bitMask >= (Tile.BIT_END << 1))) throw new Error('Invalid parameter');
    this._value = tileValue;
    // If no value supplied, default to Tile.DIRT
    if (this._value === undefined) this._value = Tile.DIRT;
    if (arguments.length > 1) this._value |= bitMask;
}

Micro.Tile.prototype = {
    constructor: Micro.Tile,
    getValue : function() {
        return this._value & Tile.BIT_MASK;
    },
    setValue : function(tileValue) {
        if (!arguments.length || typeof(tileValue) !== 'number' || tileValue < 0) throw new Error('Invalid parameter');

        var existingFlags = 0;
        if (tileValue < Tile.BIT_START) existingFlags = this.getFlags();
        this._value = tileValue | existingFlags;
    },
    isBulldozable : function() {
        return (this._value & Tile.BULLBIT) > 0;
    },
    isAnimated : function() {
        return (this._value & Tile.ANIMBIT) > 0;
    },
    isConductive : function() {
        return (this._value & Tile.CONDBIT) > 0;
    },
    isCombustible : function() {
        return (this._value & Tile.BURNBIT) > 0;
    },
    isPowered : function() {
        return (this._value & Tile.POWERBIT) > 0;
    },
    isZone : function() {
        return (this._value & Tile.ZONEBIT) > 0;
    },
    addFlags : function(bitMask) {
        if (!arguments.length || typeof(bitMask) !== 'number' || bitMask < Tile.BIT_START || bitMask >= Tile.BIT_END << 1) throw new Error('Invalid parameter');
        this._value |= bitMask;
    },
    removeFlags : function(bitMask) {
        if (!arguments.length || typeof(bitMask) !== 'number' || bitMask < Tile.BIT_START || bitMask >= Tile.BIT_END << 1) throw new Error('Invalid parameter');
        this._value &= ~bitMask;
    },
    setFlags : function(bitMask) {
        if (typeof(bitMask) !== 'number' || bitMask < Tile.BIT_START || bitMask >= (Tile.BIT_END << 1)) throw new Error('Invalid parameter');
        var existingValue = this._value & ~Tile.ALLBITS;
        this._value = existingValue | bitMask;
    },
    getFlags : function() {
        return this._value & Tile.ALLBITS;
    },
    getRawValue : function() {
        return this._value;
    },
    set : function(tileValue, bitMask) {
        if (arguments.length < 2 || typeof(tileValue) !== 'number' || typeof(bitMask) !== 'number' || tileValue >= Tile.TILE_COUNT) throw new Error('Invalid parameter');
        this.setValue(tileValue);
        this.setFlags(bitMask);
    },
    toString : function() {
        var value = this.getValue();
        var s = 'Tile# ' + value;
        s += this.isCombustible() ? ' burning' : '';
        s += this.isPowered() ? ' powered' : '';
        s += this.isAnimated() ? ' animated' : '';
        s += this.isConductive() ? ' conductive' : '';
        s += this.isZone() ? ' zone' : '';
        s += this.isBulldozable() ? ' bulldozeable' : '';
        return s;
    }
}

var Tile = {};

// Bit-masks for statusBits
Tile.POWERBIT  = 0x8000; // bit 15, tile has power.
Tile.CONDBIT = 0x4000; // bit 14. tile can conduct electricity.
Tile.BURNBIT = 0x2000; // bit 13, tile can be lit.
Tile.BULLBIT = 0x1000; // bit 12, tile is bulldozable.
Tile.ANIMBIT = 0x0800; // bit 11, tile is animated.
Tile.ZONEBIT = 0x0400; // bit 10, tile is the center tile of the zone.
Tile.BLBNBIT   = Tile.BULLBIT | Tile.BURNBIT;
Tile.BLBNCNBIT = Tile.BULLBIT | Tile.BURNBIT | Tile.CONDBIT;
Tile.BNCNBIT   = Tile.BURNBIT | Tile.CONDBIT;
Tile.ASCBIT   = Tile.ANIMBIT | Tile.CONDBIT | Tile.BURNBIT;
Tile.ALLBITS = Tile.POWERBIT | Tile.CONDBIT | Tile.BURNBIT | Tile.BULLBIT | Tile.ANIMBIT | Tile.ZONEBIT;
Tile.BIT_START = 0x400;
Tile.BIT_END = 0x8000;
Tile.BIT_MASK = Tile.BIT_START - 1;

// TODO Add comment for each tile
Tile.DIRT           = 0; // Clear tile
// tile 1 ?

/* Water */
Tile.RIVER          = 2;
Tile.REDGE          = 3;
Tile.CHANNEL        = 4;
Tile.FIRSTRIVEDGE   = 5;
// tile 6 -- 19 ?
Tile.LASTRIVEDGE    = 20;
Tile.WATER_LOW      = Tile.RIVER;   // First water tile
Tile.WATER_HIGH     = Tile.LASTRIVEDGE; // Last water tile (inclusive)

Tile.TREEBASE       = 21;
Tile.WOODS_LOW      = Tile.TREEBASE;
Tile.LASTTREE       = 36;
Tile.WOODS          = 37;
Tile.UNUSED_TRASH1  = 38;
Tile.UNUSED_TRASH2  = 39;
Tile.WOODS_HIGH     = Tile.UNUSED_TRASH2; // Why is an 'UNUSED' tile used?
Tile.WOODS2         = 40;
Tile.WOODS3         = 41;
Tile.WOODS4         = 42;
Tile.WOODS5         = 43;

/* Rubble (4 tiles) */
Tile.RUBBLE         = 44;
Tile.LASTRUBBLE     = 47;

Tile.FLOOD          = 48;
// tile 49, 50 ?
Tile.LASTFLOOD      = 51;

Tile.RADTILE        = 52; // Radio-active contaminated tile

Tile.UNUSED_TRASH3  = 53;
Tile.UNUSED_TRASH4  = 54;
Tile.UNUSED_TRASH5  = 55;

/* Fire animation (8 tiles) */
Tile.FIRE           = 56;
Tile.FIREBASE       = Tile.FIRE;
Tile.LASTFIRE       = 63;

Tile.HBRIDGE        = 64; // Horizontal bridge
Tile.ROADBASE       = Tile.HBRIDGE;
Tile.VBRIDGE        = 65; // Vertical bridge
Tile.ROADS          = 66;
Tile.ROADS2         = 67;
Tile.ROADS3         = 68;
Tile.ROADS4         = 69;
Tile.ROADS5         = 70;
Tile.ROADS6         = 71;
Tile.ROADS7         = 72;
Tile.ROADS8         = 73;
Tile.ROADS9         = 74;
Tile.ROADS10        = 75;
Tile.INTERSECTION   = 76;
Tile.HROADPOWER     = 77;
Tile.VROADPOWER     = 78;
Tile.BRWH           = 79;
Tile.LTRFBASE       = 80; // First tile with low traffic
// tile 81 -- 94 ?
Tile.BRWV           = 95;
// tile 96 -- 110 ?
Tile.BRWXXX1        = 111;
// tile 96 -- 110 ?
Tile.BRWXXX2        = 127;
// tile 96 -- 110 ?
Tile.BRWXXX3        = 143;
Tile.HTRFBASE       = 144; // First tile with high traffic
// tile 145 -- 158 ?
Tile.BRWXXX4        = 159;
// tile 160 -- 174 ?
Tile.BRWXXX5        = 175;
// tile 176 -- 190 ?
Tile.BRWXXX6        = 191;
// tile 192 -- 205 ?
Tile.LASTROAD       = 206;
Tile.BRWXXX7        = 207;

/* Power lines */
Tile.HPOWER         = 208;
Tile.VPOWER         = 209;
Tile.LHPOWER        = 210;
Tile.LVPOWER        = 211;
Tile.LVPOWER2       = 212;
Tile.LVPOWER3       = 213;
Tile.LVPOWER4       = 214;
Tile.LVPOWER5       = 215;
Tile.LVPOWER6       = 216;
Tile.LVPOWER7       = 217;
Tile.LVPOWER8       = 218;
Tile.LVPOWER9       = 219;
Tile.LVPOWER10      = 220;
Tile.RAILHPOWERV    = 221; // Horizontal rail, vertical power
Tile.RAILVPOWERH    = 222; // Vertical rail, horizontal power
Tile.POWERBASE      = Tile.HPOWER;
Tile.LASTPOWER      = Tile.RAILVPOWERH;

Tile.UNUSED_TRASH6  = 223;

/* Rail */
Tile.HRAIL          = 224;
Tile.VRAIL          = 225;
Tile.LHRAIL         = 226;
Tile.LVRAIL         = 227;
Tile.LVRAIL2        = 228;
Tile.LVRAIL3        = 229;
Tile.LVRAIL4        = 230;
Tile.LVRAIL5        = 231;
Tile.LVRAIL6        = 232;
Tile.LVRAIL7        = 233;
Tile.LVRAIL8        = 234;
Tile.LVRAIL9        = 235;
Tile.LVRAIL10       = 236;
Tile.HRAILROAD      = 237;
Tile.VRAILROAD      = 238;
Tile.RAILBASE       = Tile.HRAIL;
Tile.LASTRAIL       = 238;

Tile.ROADVPOWERH    = 239; /* bogus? */

// Residential zone tiles

Tile.RESBASE        = 240; // Empty residential, tiles 240--248
Tile.FREEZ          = 244; // center-tile of 3x3 empty residential

Tile.HOUSE          = 249; // Single tile houses until 260
Tile.LHTHR          = Tile.HOUSE;
Tile.HHTHR          = 260;

Tile.RZB            = 265; // center tile first 3x3 tile residential

Tile.HOSPITALBASE   = 405; // Center of hospital (tiles 405--413)
Tile.HOSPITAL       = 409; // Center of hospital (tiles 405--413)

Tile.CHURCHBASE     = 414; // Center of church (tiles 414--422)
Tile.CHURCH0BASE    = 414; // numbered alias
Tile.CHURCH         = 418; // Center of church (tiles 414--422)
Tile.CHURCH0        = 418; // numbered alias

// Commercial zone tiles

Tile.COMBASE        = 423; // Empty commercial, tiles 423--431
// tile 424 -- 426 ?
Tile.COMCLR         = 427;
// tile 428 -- 435 ?
Tile.CZB            = 436;
// tile 437 -- 608 ?
Tile.COMLAST        = 609;
// tile 610, 611 ?

// Industrial zone tiles.
Tile.INDBASE        = 612; // Top-left tile of empty industrial zone.
Tile.INDCLR         = 616; // Center tile of empty industrial zone.
Tile.LASTIND        = 620; // Last tile of empty industrial zone.

// Industrial zone population 0, value 0: 621 -- 629
Tile.IND1           = 621; // Top-left tile of first non-empty industry zone.
Tile.IZB            = 625; // Center tile of first non-empty industry zone.

// Industrial zone population 1, value 0: 630 -- 638

// Industrial zone population 2, value 0: 639 -- 647
Tile.IND2           = 641;
Tile.IND3           = 644;

// Industrial zone population 3, value 0: 648 -- 656
Tile.IND4           = 649;
Tile.IND5           = 650;

// Industrial zone population 0, value 1: 657 -- 665

// Industrial zone population 1, value 1: 666 -- 674

// Industrial zone population 2, value 1: 675 -- 683
Tile.IND6           = 676;
Tile.IND7           = 677;

// Industrial zone population 3, value 1: 684 -- 692
Tile.IND8           = 686;
Tile.IND9           = 689;

// Seaport
Tile.PORTBASE       = 693; // Top-left tile of the seaport.
Tile.PORT           = 698; // Center tile of the seaport.
Tile.LASTPORT       = 708; // Last tile of the seaport.

Tile.AIRPORTBASE    = 709;
// tile 710 ?
Tile.RADAR          = 711;
// tile 712 -- 715 ?
Tile.AIRPORT        = 716;
// tile 717 -- 744 ?

// Coal power plant (4x4).
Tile.COALBASE       = 745; // First tile of coal power plant.
Tile.POWERPLANT     = 750; // 'Center' tile of coal power plant.
Tile.LASTPOWERPLANT = 760; // Last tile of coal power plant.

// Fire station (3x3).
Tile.FIRESTBASE     = 761; // First tile of fire station.
Tile.FIRESTATION    = 765; // 'Center tile' of fire station.
// 769 last tile fire station.

Tile.POLICESTBASE   = 770;
// tile 771 -- 773 ?
Tile.POLICESTATION  = 774;
// tile 775 -- 778 ?

// Stadium (4x4).
Tile.STADIUMBASE    = 779; // First tile stadium.
Tile.STADIUM        = 784; // 'Center tile' stadium.
// Last tile stadium 794.

// tile 785 -- 799 ?
Tile.FULLSTADIUM    = 800;
// tile 801 -- 810 ?

// Nuclear power plant (4x4).
Tile.NUCLEARBASE    = 811; // First tile nuclear power plant.
Tile.NUCLEAR        = 816; // 'Center' tile nuclear power plant.
Tile.LASTZONE       = 826; // Also last tile nuclear power plant.

Tile.LIGHTNINGBOLT  = 827;
Tile.HBRDG0         = 828;
Tile.HBRDG1         = 829;
Tile.HBRDG2         = 830;
Tile.HBRDG3         = 831;
Tile.HBRDG_END      = 832;
Tile.RADAR0         = 832;
Tile.RADAR1         = 833;
Tile.RADAR2         = 834;
Tile.RADAR3         = 835;
Tile.RADAR4         = 836;
Tile.RADAR5         = 837;
Tile.RADAR6         = 838;
Tile.RADAR7         = 839;
Tile.FOUNTAIN       = 840;
// tile 841 -- 843: fountain animation.
Tile.INDBASE2       = 844;
Tile.TELEBASE       = 844;
// tile 845 -- 850 ?
Tile.TELELAST       = 851;
Tile.SMOKEBASE      = 852;
// tile 853 -- 859 ?
Tile.TINYEXP        = 860;
// tile 861 -- 863 ?
Tile.SOMETINYEXP    = 864;
// tile 865 -- 866 ?
Tile.LASTTINYEXP    = 867;
// tile 868 -- 882 ?
Tile.TINYEXPLAST    = 883;
// tile 884 -- 915 ?

Tile.COALSMOKE1     = 916; // Chimney animation at coal power plant (2, 0).
// 919 last animation tile for chimney at coal power plant (2, 0).

Tile.COALSMOKE2     = 920; // Chimney animation at coal power plant (3, 0).
// 923 last animation tile for chimney at coal power plant (3, 0).

Tile.COALSMOKE3     = 924; // Chimney animation at coal power plant (2, 1).
// 927 last animation tile for chimney at coal power plant (2, 1).

Tile.COALSMOKE4     = 928; // Chimney animation at coal power plant (3, 1).
// 931 last animation tile for chimney at coal power plant (3, 1).

Tile.FOOTBALLGAME1  = 932;
// tile 933 -- 939 ?
Tile.FOOTBALLGAME2  = 940;
// tile 941 -- 947 ?
Tile.VBRDG0         = 948;
Tile.VBRDG1         = 949;
Tile.VBRDG2         = 950;
Tile.VBRDG3         = 951;

Tile.NUKESWIRL1     = 952;
Tile.NUKESWIRL2     = 953;
Tile.NUKESWIRL3     = 954;
Tile.NUKESWIRL4     = 955;

// Tiles 956-959 unused (originally)
// TILE_COUNT     = 960;

// Extended zones: 956-1019
Tile.CHURCH1BASE    = 956;
Tile.CHURCH1        = 960;
Tile.CHURCH2BASE    = 965;
Tile.CHURCH2        = 969;
Tile.CHURCH3BASE    = 974;
Tile.CHURCH3        = 978;
Tile.CHURCH4BASE    = 983;
Tile.CHURCH4        = 987;
Tile.CHURCH5BASE    = 992;
Tile.CHURCH5        = 996;
Tile.CHURCH6BASE    = 1001;
Tile.CHURCH6        = 1005;
Tile.CHURCH7BASE    = 1010;
Tile.CHURCH7        = 1014;
Tile.CHURCH7LAST    = 1018;

// Tiles 1020-1023 unused
Tile.TILE_COUNT     = 1024;
Tile.TILE_INVALID   = -1; // Invalid tile (not used in the world map).
Tile.MIN_SIZE = 16; // Minimum size of tile in pixels

Micro.TileSet = function(src, loadCallback, errorCallback){
    //if (!(this instanceof TileSet)) return new TileSet(src, loadCallback, errorCallback);

    //var e = new Error('Invalid parameter');
    //if (arguments.length < 3) throw e;

    this.loaded = false;
    this._successCallback = loadCallback;
    this._errorCallback = errorCallback;
    var self = this;

    if (src instanceof Image) {
        // we need to spin event loop here for sake of callers
        // to ensure constructor returns before callback called
        setTimeout(function() {self._verifyImage(src);}, 0);
    } else {
        var img = new Image();
        img.onload = function() { self._verifyImage(img); };
        img.onerror = function() { self._triggerCallback(false); };
        img.src = src;
    }
};

Micro.TileSet.prototype = {

    constructor: Micro.TileSet,

    load : function(src, loadCallback, errorCallback) {
        //var e = new Error('Invalid parameter');
        //if (arguments.length < 3) throw e;

        // Don't allow overwriting an already loaded tileset
        if (this.loaded) throw new Error("TileSet already loaded");

        this._successCallback = loadCallback;
        this._errorCallback = errorCallback;
        if (src instanceof Image) {
          this._verifyImage(src);
        } else {
            var img = new Image();
            var self = this;

            img.onload = function() { self._verifyImage(img); };
            img.onerror = function() { self._triggerCallback(false); };
            img.src = src;
        }
    },

    _triggerCallback : function (successful) {
        if (!this._successCallback) // image supplied, no callbacks
          return;

        var cb = this._successCallback;
        if (!successful) cb = this._errorCallback;

        delete this._successCallback;
        delete this._errorCallback;

        cb();
    },
    _verifyImage : function (img) {
        var w = img.width, h = img.height;
        var tilesPerRow = Math.sqrt(Tile.TILE_COUNT);

        if (w !== h) {
            this._triggerCallback(false);
            return;
        }
        if ((w % tilesPerRow) !== 0) {
            this._triggerCallback(false);
            return;
        }

        this.tileWidth = w / tilesPerRow;
        var tileWidth = this.tileWidth;

        if (tileWidth < Tile.MIN_SIZE) {
            this._triggerCallback(false);
            return;
        }

        var notifications = 0;
        var self = this;

        // Paint the image onto a canvas so we can split it up
        var c = document.createElement('canvas');
        c.width = this.tileWidth;
        c.height = this.tileWidth;

        var cx = c.getContext('2d');

        var imageLoad = function() {
            notifications++;
            if (notifications == Tile.TILE_COUNT) {
                self.loaded = true;
                self._triggerCallback(true);
            }
        };

        for (var i = 0; i < Tile.TILE_COUNT; i++) {
            cx.clearRect(0, 0, this.tileWidth, this.tileWidth);

            var sourceX = i % tilesPerRow * tileWidth;
            var sourceY = Math.floor(i / tilesPerRow) * tileWidth;
            cx.drawImage(img, sourceX, sourceY, tileWidth, tileWidth, 0, 0, tileWidth, tileWidth);

            this[i] = new Image();
            this[i].onload = imageLoad;
            this[i].src = c.toDataURL();
        }
    }
};

Micro.PositionMaker = function (width, height) {
    if (arguments.length < 2 || typeof(width) !== 'number' || typeof(height) !== 'number' || width < 0 || height < 0) throw new Error('Invalid parameter');

    function isNumber(param) {
       return typeof(param) === 'number';
    }

    var validDirs = [Direction.NORTH, Direction.NORTHEAST, Direction.EAST, Direction.SOUTHEAST,
                    Direction.SOUTH, Direction.SOUTHWEST, Direction.WEST, Direction.NORTHWEST,
                    Direction.INVALID];

    function isDirection(param) {
        return isNumber(param) && validDirs.indexOf(param) !== -1;
    };

    var Position = function(pos, deltaX, deltaY) {
        if (arguments.length === 0) {
            this.x = 0;
            this.y = 0;
            return this;
        }

        // This overloaded constructor accepts the following parameters
        // Position(x, y) - positive integral coordinates
        // Position(Position p) - assign from existing position
        // Position(Position p, Direction d) - assign from existing position and move in direction d
        // Position(Position p, deltaX, deltaY) - assign from p and then adjust x/y coordinates
        // Check for the possible combinations of arguments, and error out for invalid arguments
        if ((arguments.length === 1 || arguments.length === 3) && !(pos instanceof Position)) throw new Error('Invalid parameter');
        if (arguments.length === 3 && (!isNumber(deltaX) || !isNumber(deltaY))) throw new Error('Invalid parameter');
        if (arguments.length === 2 && ((isNumber(pos) && !isNumber(deltaX)) || (pos instanceof Position && !isNumber(deltaX)) || (pos instanceof Position && isNumber(deltaX) && !isDirection(deltaX)) || (!isNumber(pos) && !(pos instanceof Position)))) throw new Error('Invalid parameter');
        var moveOK = true;
        if (isNumber(pos)) {
            // Coordinates
            this.x = pos;
            this.y = deltaX;
        } else {
            this._assignFrom(pos);
            if (arguments.length === 2) moveOK = this.move(deltaX);
            else if (arguments.length === 3) {
                this.x += deltaX;
                this.y += deltaY;
            }
        }
        if (this.x < 0 || this.x >= width || this.y < 0 || this.y >= height || !moveOK) throw new Error('Invalid parameter');
    };

    Position.prototype._assignFrom = function(from) {
        this.x = from.x;
        this.y = from.y;
    };

    Position.prototype.toString = function() {
        return '(' + this.x + ', ' + this.y + ')';
    };

    Position.prototype.toInt = function() {
        return this.y * width + this.x;
    };

    Position.prototype.move = function(dir) {
        switch (dir) {
            case Direction.INVALID: return true;
            case Direction.NORTH: if (this.y > 0) { this.y--; return true; } break;
            case Direction.NORTHEAST: if (this.y > 0 && this.x < width - 1) { this.y--; this.x++; return true; } break;
            case Direction.EAST: if (this.x < width - 1) { this.x++; return true; } break;
            case Direction.SOUTHEAST: if (this.y < height - 1 && this.x < width - 1) { this.x++; this.y++; return true; } break;
            case Direction.SOUTH: if (this.y < height - 1) { this.y++; return true; } break;
            case Direction.SOUTHWEST: if (this.y < height - 1 && this.x > 0) { this.y++; this.x--; return true; } break;
            case Direction.WEST: if (this.x > 0) { this.x--; return true; } break;
            case Direction.NORTHWEST: if (this.y > 0 && this.x > 0) { this.y--; this.x--; return true; } break;
        }
        return false;
    };
    return Position;
};

Micro.GameMap = function(width, height, defaultValue){

    /*if (!(this instanceof Micro.GameMap)) return new Micro.GameMap(width, height, defaultValue);
    var e = new Error('Invalid parameter');
    if (arguments.length > 1 && typeof(width) === 'number' && (width < 1 || height < 1)) throw e;

    // Argument shuffling
    if (arguments.length === 0) {
      width = 120;
      height = 100;
      defaultValue = new Micro.Tile().getValue();
    } else if (arguments.length === 1) {
      if (typeof(width) === 'number') {
        // Default value
        defaultValue = width;
      } else {
        // Tile
        defaultValue = width.getValue();
      }
      width = 120;
      height = 100;
    } else if (arguments.length === 2) {
      defaultValue = new Micro.Tile().getValue();
    } else if (arguments.length === 3) {
      if (typeof(defaultValue) === 'object')
        defaultValue = defaultValue.getValue();
    }*/
    this.isIsland = false;
    this.Direction = new Micro.Direction();
    this.Position = new Micro.PositionMaker(width, height);
    this.width = width;
    this.height = height;
    /*Object.defineProperties(this,
      {width: new Micro.makeConstantDescriptor(width),
       height: new Micro.makeConstantDescriptor(height)});*/

    this.defaultValue = 0;//new Micro.Tile().getValue();//defaultValue;


    this.data = new Array(this.width*this.height);//[];
    this.value = new M_ARRAY_TYPE(this.width*this.height);//new Array(this.width*this.height);
    /*var i = this.width*this.height;
    while(i--){this.data[i] = new Micro.Tile();}
    console.log(this.data.length)*/

    // Generally set externally
    this.cityCentreX = Math.floor(this.width * 0.5);
    this.cityCentreY = Math.floor(this.height * 0.5);
    this.pollutionMaxX = this.cityCentreX;
    this.pollutionMaxY = this.cityCentreY;
}

Micro.GameMap.prototype = {

    constructor: Micro.GameMap,
    genFull : function(){
        var i = this.data.length;
        while(i--){
            this.value[i] = this.data[i].getValue();
        }
        return this.value;
    },

    _calculateIndex : function(x, y) {
        return x + y * this.width;
    },
    testBounds : function(x, y) {
        return x >= 0 && y >= 0 && x < this.width && y < this.height;
    },
    getTile : function(x, y) {
        var e = new Error('Invalid parameter');
        if (arguments.length < 1) throw e;
        // Argument-shuffling
        if (typeof(x) === 'object') { y = x.y; x = x.x; }
        if (!this.testBounds(x, y)) throw e;

        var tileIndex = this._calculateIndex(x, y);

        if (!(tileIndex in this.data)) this.data[tileIndex] = new Micro.Tile(this.defaultValue);
        return this.data[tileIndex];
    },
    getTileValue : function(x, y) {
        var e = new Error('Invalid parameter');
        if (arguments.length < 1) throw e;
        // Argument-shuffling
        if (typeof(x) === 'object') {  y = x.y; x = x.x; }
        if (!this.testBounds(x, y)) throw e;

        var tileIndex = this._calculateIndex(x, y);

        if (!(tileIndex in this.data)) this.data[tileIndex] = new Micro.Tile(this.defaultValue);
        return this.data[tileIndex].getValue();
    },
    getTileFlags : function(x, y) {
        var e = new Error('Invalid parameter');
        if (arguments.length < 1) throw e;
        // Argument-shuffling
        if (typeof(x) === 'object') {  y = x.y; x = x.x; }
        if (!this.testBounds(x, y))  throw e;

        var tileIndex = this._calculateIndex(x, y);

        if (!(tileIndex in this.data)) this.data[tileIndex] = new Micro.Tile(this.defaultValue);
        return this.data[tileIndex].getFlags();
    },
    getTiles : function(x, y, w, h) {
        var e = new Error('Invalid parameter');
        if (arguments.length < 3) throw e;
        // Argument-shuffling
        if (arguments.length === 3) { h = w; w = y; y = x.y; x = x.x; }
        if (!this.testBounds(x, y)) throw e;

        var res = [];
        for (var a = y, ylim = y + h; a < ylim; a++) {
            res[a - y] = [];
            for (var b = x, xlim = x + w; b < xlim; b++) {
                var tileIndex = this._calculateIndex(b, a);
                if (!(tileIndex in this.data)) this.data[tileIndex] = new Micro.Tile(this.defaultValue);
                res[a-y].push(this.data[tileIndex]);
            }
        }
        return res;
    },
    getTileValues : function(x, y, w, h) {
        var e = new Error('Invalid parameter');
        if (arguments.length < 3) throw e;
        // Argument-shuffling
        if (arguments.length === 3) { h = w; w = y;  y = x.y; x = x.x; }
        if (!this.testBounds(x, y)) throw e;

        var res = [];
        for (var a = y, ylim = y + h; a < ylim; a++) {
            res[a - y] = [];
            for (var b = x, xlim = x + w; b < xlim; b++) {
                var tileIndex = this._calculateIndex(b, a);
                if (!(tileIndex in this.data)) this.data[tileIndex] = new Micro.Tile(this.defaultValue);
                res[a-y].push(this.data[tileIndex].getValue());
            }
        }
        return res;
    },
    getTileFromMapOrDefault : function(pos, dir, defaultTile) {
        switch (dir) {
            case this.Direction.NORTH: 
                if (pos.y > 0) return this.getTileValue(pos.x, pos.y - 1);
                return defaultTile;
            case this.Direction.EAST:
                if (pos.x < this.width - 1) return this.getTileValue(pos.x + 1, pos.y);
                return defaultTile;
            case this.Direction.SOUTH:
                if (pos.y < this.height - 1) return this.getTileValue(pos.x, pos.y + 1);
                return defaultTile;
            case this.Direction.WEST:
                if (pos.x > 0) return this.getTileValue(pos.x - 1, pos.y);
                return defaultTile;
            default:
                return defaultTile;
        }
    },
    setTile : function(x, y, value, flags) {
        var e = new Error('Invalid parameter');
        if (arguments.length < 3) throw e;
        // Argument-shuffling
        if (arguments.length === 3) { flags = value; value = y; y = x.y; x = x.x; }
        if (!this.testBounds(x, y)) throw e;

        var tileIndex = this._calculateIndex(x, y);
        if (!(tileIndex in this.data)) this.data[tileIndex] = new Micro.Tile(this.defaultValue);
        this.data[tileIndex].set(value, flags);
    },
    setTo : function(x, y, tile) {
        var e = new Error('Invalid parameter');
        if (arguments.length < 2) throw e;
        // Argument-shuffling
        if (tile === undefined) { tile = y; y = x.y; x = x.x; }
        if (!this.testBounds(x, y)) throw e;

        var tileIndex = this._calculateIndex(x, y);
        this.data[tileIndex] = tile;
    },
    setTileValue : function(x, y, value) {
        var e = new Error('Invalid parameter');
        if (arguments.length < 2) throw e;
        // Argument-shuffling
        if (arguments.length === 2) { value = y; y = x.y; x = x.x; }
        if (!this.testBounds(x, y)) throw e;

        var tileIndex = this._calculateIndex(x, y);
        if (!(tileIndex in this.data)) this.data[tileIndex] = new Micro.Tile(this.defaultValue);
        this.data[tileIndex].setValue(value);
    },
    setTileFlags : function(x, y, flags) {
        var e = new Error('Invalid parameter');
        if (arguments.length < 2) throw e;
        // Argument-shuffling
        if (arguments.length === 2) { flags = y; y = x.y; x = x.x; }
        if (!this.testBounds(x, y)) throw e;

        var tileIndex = this._calculateIndex(x, y);
        if (!(tileIndex in this.data)) this.data[tileIndex] = new Micro.Tile(this.defaultValue);
        this.data[tileIndex].setFlags(flags);
    },
    addTileFlags : function(x, y, flags) {
        var e = new Error('Invalid parameter');
        if (arguments.length < 2) throw e;
        // Argument-shuffling
        if (arguments.length === 2) { flags = y; y = x.y; x = x.x; }
        if (!this.testBounds(x, y)) throw e;

        var tileIndex = this._calculateIndex(x, y);
        if (!(tileIndex in this.data)) this.data[tileIndex] = new Micro.Tile(this.defaultValue);
        this.data[tileIndex].addFlags(flags);
    },
    removeTileFlags : function(x, y, flags) {
        var e = new Error('Invalid parameter');
        if (arguments.length < 2) throw e;
        // Argument-shuffling
        if (arguments.length === 2) { flags = y; y = x.y; x = x.x; }
        if (!this.testBounds(x, y)) throw e;

        var tileIndex = this._calculateIndex(x, y);
        if (!(tileIndex in this.data)) this.data[tileIndex] = new Micro.Tile(this.defaultValue);
        this.data[tileIndex].removeFlags(flags);
    },
    putZone : function(centreX, centreY, centreTile, size) {
        var e = new Error('Invalid parameter');

        if (!this.testBounds(centreX, centreY) || !this.testBounds(centreX - 1 + size, centreY - 1 + size)) throw e;

        var tile = centreTile - 1 - size;
        var startX = centreX - 1;
        var startY = centreY - 1;

        for (var y = startY; y < startY + size; y++) {
            for (var x = startX; x < startX + size; x++) {
                if (x === centreX && y === centreY) this.setTo(x, y, new Micro.Tile(tile, Tile.BNCNBIT | Tile.ZONEBIT));
                else this.setTo(x, y, new Micro.Tile(tile, Tile.BNCNBIT));
                tile += 1;
            }
        } 
    }
}


Micro.TERRAIN_CREATE_ISLAND = 0;
Micro.TERRAIN_TREE_LEVEL = -1;
Micro.TERRAIN_LAKE_LEVEL = -1;
Micro.TERRAIN_CURVE_LEVEL = 0;
Micro.ISLAND_RADIUS = 18;

Micro.generateMap = function() {
   // w = w || Micro.MAP_WIDTH;
   // h = h || Micro.MAP_HEIGHT;

    

    this.SRMatrix = [
        [0, 0, Tile.REDGE, Tile.REDGE, 0, 0],
        [0, Tile.REDGE, Tile.RIVER, Tile.RIVER, Tile.REDGE, 0],
        [Tile.REDGE, Tile.RIVER, Tile.RIVER, Tile.RIVER, Tile.RIVER, Tile.REDGE],
        [Tile.REDGE, Tile.RIVER, Tile.RIVER, Tile.RIVER, Tile.RIVER, Tile.REDGE],
        [0, Tile.REDGE, Tile.RIVER, Tile.RIVER, Tile.REDGE, 0],
        [0, 0, Tile.REDGE, Tile.REDGE, 0, 0]
    ];
    this.BRMatrix = [
        [0, 0, 0, Tile.REDGE, Tile.REDGE, Tile.REDGE, 0, 0, 0],
        [0, 0, Tile.REDGE, Tile.RIVER, Tile.RIVER, Tile.RIVER, Tile.REDGE, 0, 0],
        [0, Tile.REDGE, Tile.RIVER, Tile.RIVER, Tile.RIVER, Tile.RIVER, Tile.RIVER, Tile.REDGE, 0],
        [Tile.REDGE, Tile.RIVER, Tile.RIVER, Tile.RIVER, Tile.RIVER, Tile.RIVER, Tile.RIVER, Tile.RIVER, Tile.REDGE],
        [Tile.REDGE, Tile.RIVER, Tile.RIVER, Tile.RIVER, Tile.CHANNEL, Tile.RIVER, Tile.RIVER, Tile.RIVER, Tile.REDGE],
        [Tile.REDGE, Tile.RIVER, Tile.RIVER, Tile.RIVER, Tile.RIVER, Tile.RIVER, Tile.RIVER, Tile.RIVER, Tile.REDGE],
        [0, Tile.REDGE, Tile.RIVER, Tile.RIVER, Tile.RIVER, Tile.RIVER, Tile.RIVER, Tile.REDGE, 0],
        [0, 0, Tile.REDGE, Tile.RIVER, Tile.RIVER, Tile.RIVER, Tile.REDGE, 0, 0],
        [0, 0, 0, Tile.REDGE, Tile.REDGE, Tile.REDGE, 0, 0, 0]
    ];

    

    //this.map = new Micro.GameMap(w, h);
    // Construct land.
    /*if (Micro.TERRAIN_CREATE_ISLAND < 0) {
        if (Random.getRandom(100) < 10) {
            this.makeIsland();
            return this.map;
        }
    }

    if (Micro.TERRAIN_CREATE_ISLAND === 1) this.makeNakedIsland();
    else this.clearMap();

    // Lay a river.
    if (Micro.TERRAIN_CURVE_LEVEL !== 0) {
        var terrainXStart = 40 + Random.getRandom(this.map.width - 80);
        var terrainYStart = 33 + Random.getRandom(this.map.height - 67);
        var terrainPos = new this.map.Position(terrainXStart, terrainYStart);
        this.doRivers(terrainPos);
    }

    // Lay a few lakes.
    if (Micro.TERRAIN_LAKE_LEVEL !== 0) this.makeLakes();

    this.smoothRiver();

    // And add trees.
    if (Micro.TERRAIN_TREE_LEVEL !== 0) this.doTrees();

    return this.map;*/
};

Micro.generateMap.prototype = {

    constructor: Micro.generateMap,

    construct : function(w, h){
        this.map = new Micro.GameMap(w || Micro.MAP_WIDTH, h || Micro.MAP_HEIGHT);

        Micro.TERRAIN_CREATE_ISLAND = Random.getRandom(2) - 1;

        if (Micro.TERRAIN_CREATE_ISLAND < 0) {
        if (Random.getRandom(100) < 10) {
                this.makeIsland();
                return this.map;
            }
        }

        if (Micro.TERRAIN_CREATE_ISLAND === 1) this.makeNakedIsland();
        else this.clearMap();

        // Lay a river.
        if (Micro.TERRAIN_CURVE_LEVEL !== 0) {
            var terrainXStart = 40 + Random.getRandom(this.map.width - 80);
            var terrainYStart = 33 + Random.getRandom(this.map.height - 67);
            var terrainPos = new this.map.Position(terrainXStart, terrainYStart);
            this.doRivers(terrainPos);
        }

        // Lay a few lakes.
        if (Micro.TERRAIN_LAKE_LEVEL !== 0) this.makeLakes();

        this.smoothRiver();

        // And add trees.
        if (Micro.TERRAIN_TREE_LEVEL !== 0) this.doTrees();

        return this.map;
    },
    clearMap : function() {
        for (var x = 0; x < this.map.width; x++) {
            for (var y = 0; y < this.map.height; y++) {
                this.map.setTo(x, y, new Micro.Tile(Tile.DIRT));
            }
        }
    },
    clearUnnatural : function() {
        for (var x = 0; x < this.map.width; x++) {
            for (var y = 0; y < this.map.height; y++) {
                var tileValue = this.map.getTileValue(x, y);
                if (tileValue > Tile.WOODS) this.map.setTo(x, y, new Micro.Tile(Tile.DIRT));
            }
        }
    },
    makeNakedIsland : function() {
        this.map.isIsland = true;
        var terrainIslandRadius = Micro.ISLAND_RADIUS;
        var x, y, mapX, mapY;
        for (x = 0; x < this.map.width; x++) {
            for (y = 0; y < this.map.height; y++) {
                if ((x < 5) || (x >= this.map.width - 5) || (y < 5) || (y >= this.map.height - 5)) {
                    this.map.setTo(x, y, new Micro.Tile(Tile.RIVER));
                } else {
                    this.map.setTo(x, y, new Micro.Tile(Tile.DIRT));
                }
            }
        }
        for (x = 0; x < this.map.width - 5; x += 2) {
            mapY = Random.getERandom(terrainIslandRadius);
            this.plopBRiver(new this.map.Position(x, mapY));

            mapY = (this.map.height - 10) - Random.getERandom(terrainIslandRadius);
            this.plopBRiver( new this.map.Position(x, mapY))

            this.plopSRiver( new this.map.Position(x, 0));
            this.plopSRiver( new this.map.Position(x, this.map.height - 6));
        }
        for (y = 0; y < this.map.height - 5; y += 2) {
            mapX = Random.getERandom(terrainIslandRadius);
            this.plopBRiver( new this.map.Position(mapX, y));

            mapX = this.map.width - 10 - Random.getERandom(terrainIslandRadius);
            this.plopBRiver( new this.map.Position(mapX, y));

            this.plopSRiver( new this.map.Position(0, y));
            this.plopSRiver( new this.map.Position(this.map.width - 6, y));
        }
        
    },
    makeIsland : function() {
        this.makeNakedIsland();
        this.smoothWater();
        this.smoothRiver();
        this.doTrees();
        
    },
    makeLakes : function() {
        var numLakes;
        if (Micro.TERRAIN_LAKE_LEVEL < 0) numLakes = Random.getRandom(10);
        else numLakes = Micro.TERRAIN_LAKE_LEVEL / 2;

        while (numLakes > 0) {
            var x = Random.getRandom(this.map.width - 21) + 10;
            var y = Random.getRandom(this.map.height - 20) + 10;
            this.makeSingleLake(new this.map.Position(x, y));
            numLakes--;
        }
    },
    makeSingleLake : function(pos) {
        var numPlops = Random.getRandom(12) + 2;
        while (numPlops > 0) {
            var plopPos = new this.map.Position(pos, Random.getRandom(12) - 6, Random.getRandom(12) - 6);
            if (Random.getRandom(4)) this.plopSRiver(plopPos);
            else this.plopBRiver(plopPos);
            numPlops--;
        }
    },
    treeSplash : function(x, y) {
        var numTrees;
        if (Micro.TERRAIN_TREE_LEVEL < 0) numTrees = Random.getRandom(150) + 50;
        else numTrees = Random.getRandom(100 + (Micro.TERRAIN_TREE_LEVEL * 2)) + 50;
        var treePos = new this.map.Position(x, y);
        while (numTrees > 0) {
            var dir = Direction.NORTH + Random.getRandom(7);
            treePos.move(dir);
            // XXX Should use the fact that positions return success/failure for moves
            if (!this.map.testBounds(treePos.x, treePos.y)) return;
            if (this.map.getTileValue(treePos) === Tile.DIRT){
                this.map.setTo(treePos, new Micro.Tile(Tile.WOODS, Tile.BLBNBIT));
            }
            numTrees--;
        }
    },
    doTrees : function() {
        var amount;
        if (Micro.TERRAIN_TREE_LEVEL < 0) amount = Random.getRandom(100) + 50;
        else amount = Micro.TERRAIN_TREE_LEVEL + 3;
        for (var x = 0; x < amount; x++) {
            var xloc = Random.getRandom(this.map.width - 1);
            var yloc = Random.getRandom(this.map.height - 1);
            this.treeSplash(xloc, yloc);
        }
        this.smoothTrees();
        this.smoothTrees();
    },
    smoothRiver : function() {
        var dx = [-1,  0,  1,  0];
        var dy = [0,  1,  0, -1];
        var riverEdges = [
            13 | Tile.BULLBIT, 13 | Tile.BULLBIT, 17 | Tile.BULLBIT, 15 | Tile.BULLBIT,
            5 | Tile.BULLBIT, 2, 19 | Tile.BULLBIT, 17 | Tile.BULLBIT,
            9 | Tile.BULLBIT, 11 | Tile.BULLBIT, 2, 13 | Tile.BULLBIT,
            7 | Tile.BULLBIT, 9 | Tile.BULLBIT, 5 | Tile.BULLBIT, 2
        ];
        
        for (var x = 0; x < this.map.width; x++) {
            for (var y = 0; y < this.map.height; y++) {
                if (this.map.getTileValue(x, y) === Tile.REDGE) {
                    var bitIndex = 0;
                    for (var z = 0; z < 4; z++) {
                        bitIndex = bitIndex << 1;
                        var xTemp = x + dx[z];
                        var yTemp = y + dy[z];
                        if (this.map.testBounds(xTemp, yTemp) && this.map.getTileValue(xTemp, yTemp) !== Tile.DIRT && (this.map.getTileValue(xTemp, yTemp) < Tile.WOODS_LOW || this.map.getTileValue(xTemp, yTemp) > Tile.WOODS_HIGH)) {
                            bitIndex++;
                        }
                    }
                    var temp = riverEdges[bitIndex & 15];
                    if (temp !== Tile.RIVER && Random.getRandom(1)) temp++;
                    this.map.setTo(x, y, new Micro.Tile(temp));
                }
            }
        }
    },
    isTree : function(tileValue) {
        return tileValue >= Tile.WOODS_LOW && tileValue <= Tile.WOODS_HIGH;
    },
    smoothTrees : function() {
        for (var x = 0; x < this.map.width; x++) {
            for (var y = 0; y < this.map.height; y++) {
                if (this.isTree(this.map.getTileValue(x, y)))
                    this.smoothTreesAt( x, y, false);
            }
        }
    },
    smoothTreesAt : function(x, y, preserve) {
        var dx = [-1,  0,  1,  0 ];
        var dy = [ 0,  1,  0, -1 ];
        var treeTable = [
            0,  0,  0,  34,
            0,  0,  36, 35,
            0,  32, 0,  33,
            30, 31, 29, 37
        ];
        if (!this.isTree(this.map.getTileValue(x, y))) return;
        var bitIndex = 0;
        for (var i = 0; i < 4; i++) {
            bitIndex = bitIndex << 1;
            var xTemp = x + dx[i];
            var yTemp = y + dy[i];
            if (this.map.testBounds(xTemp, yTemp) && this.isTree(this.map.getTileValue(xTemp, yTemp))) bitIndex++;
        }
        var temp = treeTable[bitIndex & 15];
        if (temp) {
            if (temp !== Tile.WOODS) {
                if ((x + y) & 1) temp = temp - 8;
            }
            this.map.setTo(x, y, new Micro.Tile(temp, Tile.BLBNBIT));
        } else {
            if (!preserve) this.map.setTo(x, y, new Micro.Tile(temp));
        }
    },
    doRivers : function(terrainPos) {
        var riverDir = Direction.NORTH + Random.getRandom(3) * 2;
        this.doBRiver(terrainPos, riverDir, riverDir);

        riverDir = Direction.rotate180(riverDir);
        var terrainDir = this.doBRiver(terrainPos, riverDir, riverDir);

        riverDir = Direction.NORTH + Random.getRandom(3) * 2;
        this.doSRiver( terrainPos, riverDir, terrainDir);
    },
    doBRiver : function( riverPos, riverDir, terrainDir) {
        var rate1, rate2;
        if (Micro.TERRAIN_CURVE_LEVEL < 0) {
            rate1 = 100;
            rate2 = 200;
        } else {
            rate1 = Micro.TERRAIN_CURVE_LEVEL + 10;
            rate2 = Micro.TERRAIN_CURVE_LEVEL + 100;
        }
        var pos = new this.map.Position(riverPos);
        while (this.map.testBounds(pos.x + 4, pos.y + 4)) {
            this.plopBRiver(pos);
            if (Random.getRandom(rate1) < 10) {
                terrainDir = riverDir;
            } else {
                if (Random.getRandom(rate2) > 90) terrainDir = Direction.rotate45(terrainDir);
                if (Random.getRandom(rate2) > 90) terrainDir = Direction.rotate45(terrainDir, 7);
            }
            pos.move(terrainDir);
        }
        return terrainDir;
    },
    doSRiver : function(riverPos, riverDir, terrainDir) {
        var rate1, rate2;
        if (Micro.TERRAIN_CURVE_LEVEL < 0) {
            rate1 = 100;
            rate2 = 200;
        } else {
            rate1 = Micro.TERRAIN_CURVE_LEVEL + 10;
            rate2 = Micro.TERRAIN_CURVE_LEVEL + 100;
        }
        var pos = new this.map.Position(riverPos);
        while (this.map.testBounds(pos.x + 3, pos.y + 3)) {
            this.plopSRiver(pos);
            if (Random.getRandom(rate1) < 10) {
                terrainDir = riverDir;
            } else {
                if (Random.getRandom(rate2) > 90) terrainDir = Direction.rotate45(terrainDir);
                if (Random.getRandom(rate2) > 90) terrainDir = Direction.rotate45(terrainDir, 7);
            }
            pos.move(terrainDir);
        }
    return terrainDir;
    },
    putOnMap : function(newVal, x, y) {
        if (newVal === 0) return;
        if (!this.map.testBounds(x, y)) return;
        var tileValue = this.map.getTileValue(x, y);

        if (tileValue !== Tile.DIRT) {
            if (tileValue === Tile.RIVER) {
                if (newVal !== Tile.CHANNEL) return;
            }
            if (tileValue === Tile.CHANNEL) return;
        }
        this.map.setTo(x, y, new Micro.Tile(newVal));
    },
    plopBRiver : function(pos) {
        for (var x = 0; x < 9; x++) {
            for (var y = 0; y < 9; y++) {
                this.putOnMap(this.BRMatrix[y][x], pos.x + x, pos.y + y);
            }
        }
    },
    plopSRiver : function(pos) {
        for (var x = 0; x < 6; x++) {
            for (var y = 0; y < 6; y++) {
                this.putOnMap(this.SRMatrix[y][x], pos.x + x, pos.y + y);
            }
        }
    },
    smoothWater : function() {
        var x, y, tile, pos, dir;
        for (x = 0; x < this.map.width; x++) {
            for (y = 0; y < this.map.height; y++) {
                tile = this.map.getTileValue(x, y);
                // if (tile >= Tile.WATER_Tile.LOW && tile <= Tile.WATER_Tile.HIGH) {
                if (tile >= Tile.WATER_LOW && tile <= Tile.WATER_HIGH) {
                    pos = new this.map.Position(x, y);
                    for (dir = Direction.BEGIN; dir < Direction.END; dir = Direction.increment90(dir)) {
                        tile = this.map.getTileFromMapOrDefault(pos, dir, Tile.WATER_LOW);
                        /* If nearest object is not water: */
                        if (tile < Tile.WATER_LOW || tile > Tile.WATER_HIGH) {
                            this.map.setTo(x, y, new Micro.Tile(Tile.REDGE)); /* set river edge */
                            break; // Continue with next tile
                        }
                    }
                }
            }
        }

        for (x = 0; x < this.map.width; x++) {
            for (y = 0; y < this.map.height; y++) {
                tile = this.map.getTileValue(x, y);
                if (tile !== Tile.CHANNEL && tile >= Tile.WATER_LOW && tile <= Tile.WATER_HIGH) {
                    var makeRiver = true;
                    pos = new this.map.Position(x, y);
                    for (dir = Direction.BEGIN; dir < Direction.END; dir = Direction.increment90(dir)) {
                        tile = this.map.getTileFromMapOrDefault(pos, dir, Tile.WATER_LOW);
                        if (tile < Tile.WATER_LOW || tile > Tile.WATER_HIGH) {
                            makeRiver = false;
                            break;
                        }
                    }
                    if (makeRiver) this.map.setTo(x, y, new Micro.Tile(Tile.RIVER));
                }
            }
        }
        for (x = 0; x < this.map.width; x++) {
            for (y = 0; y < this.map.height; y++) {
                tile = this.map.getTileValue(x, y);
                if (tile >= Tile.WOODS_LOW && tile <= Tile.WOODS_HIGH) {
                    pos = new this.map.Position(x, y);
                    for (dir = Direction.BEGIN; dir < Direction.END; dir = Direction.increment90(dir)) {
                        tile = this.map.getTileFromMapOrDefault(pos, dir, Tile.TILE_INVALID);
                        if (tile === Tile.RIVER || tile === Tile.CHANNEL) {
                            this.map.setTo(x, y, new Micro.Tile(Tile.REDGE)); /* make it water's edge */
                            break;
                        }
                    }
                }
            }
        }
    }
}
Micro.SpriteLoader = function(src){
    this.src = src;
    this._loadCallback = null;
    this._errorCallback = null;
}

Micro.SpriteLoader.prototype = {

    constructor: Micro.SpriteLoader,

    _loadCB : function() {
        var callback = this._loadCallback;
        this._loadCallback = null;
        this._errorCallback = null;
        callback(this._spriteSheet);
    },
    _errorCB : function() {
        var callback = this._errorCallback;
        this._loadCallback = null;
        this._errorCallback = null;
        this._spriteSheet = null;
        callback();
    },
    load : function(loadCallback, errorCallback) {
        this._loadCallback = loadCallback;
        this._errorCallback = errorCallback;

        this._spriteSheet = new Image();
        this._spriteSheet.onerror = this._errorCB.bind(this);
        this._spriteSheet.onload = this._loadCB.bind(this);
        this._spriteSheet.src = this.src;
    }
}


Micro.SplashCanvas = function(){

    /*this._canvas = document.createElement('canvas');
    this._canvas.id = Micro.MAP_DEFAULT_ID;
    this._canvas.width = Micro.MAP_DEFAULT_WIDTH;
    this._canvas.height = Micro.MAP_DEFAULT_HEIGHT;*/

    this.canvas = document.createElement('canvas');
    this.canvas.id = Micro.MAP_BIG_DEFAULT_ID;
    this.canvas.width = Micro.MAP_DEFAULT_WIDTH;
    this.canvas.height = Micro.MAP_DEFAULT_HEIGHT;

    

    var parentNode=document.getElementById('SplashCanvas');
    parentNode.removeChild(parentNode.firstChild);
    parentNode.appendChild(this.canvas);
}

Micro.SplashCanvas.prototype = {

    constructor: Micro.SplashCanvas,

    init : function(map, tileSet) {
        //if (!tileSet.loaded) throw new Error('TileSet not ready!');

        this._tileSet = tileSet;
        this.paint(map);
    },
    paintTile : function(tileVal, x, y, canvas) {
        //canvas = canvas || this._canvas;
        var src = this._tileSet[tileVal];
        var ctx = this.canvas.getContext('2d');
        ctx.drawImage(src, x * 3, y * 3, 3, 3);
    },
    /*paintTile : function(tileVal, x, y) {
        var src = this._tileSet[tileVal];
        var ctx = this.canvas.getContext('2d');
        ctx.drawImage(src, x * 16, y * 16, 16, 16);
    },*/
    clearMap : function() {
        var ctx = this.canvas.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },
    paint : function(map) {
        var ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        var y = map.height;
        var x;
        while(y--){
            x=map.width;
            while(x--){
        //for (var y = 0; y < map.height; y++) {
           // for (var x = 0; x < map.width; x++) {
               // this.paintTile(map.getTileValue(x, y), x, y);
                this.paintTile(map.getTileValue(x, y), x, y);
            }
        }
    }

}

Micro.SplashScreen = function(tileSet, spriteSheet){
    this.debug = document.getElementById("debug");
    
    this.tileSet = tileSet;
    this.spriteSheet = spriteSheet;
    this.mapGen  = new Micro.generateMap();
    this.map = this.mapGen.construct();//Micro.MapGenerator();

    document.getElementById('splashGenerate').addEventListener( 'click', this.regenerateMap.bind(this), false );
    document.getElementById('splashPlay').addEventListener( 'click', this.playMap.bind(this), false );

    var g = document.getElementsByClassName('awaitGeneration');
    for(var i=0; i<g.length; i++){
        g[i].style.display = 'block';
    }

    this.splashCanvas = new Micro.SplashCanvas();
    this.splashCanvas.init(this.map, tileSet);
    
    //this.view3d.updateTerrain(this.splashCanvas.canvas, Micro.MAP_WIDTH, this.map.isIsland);
    //this.debug.innerHTML = this.map.data;
    //this.map.isIsland;
    //console.log(this.map.data)
}

Micro.SplashScreen.prototype = {
    constructor: Micro.SplashScreen,

    regenerateMap : function() {
        this.splashCanvas.clearMap();
        this.map = this.mapGen.construct();//Micro.generateMap();//Micro.MapGenerator();
        this.splashCanvas.paint(this.map);
        //this.view3d.updateTerrain(this.splashCanvas.canvas, Micro.MAP_WIDTH, this.map.isIsland );
        //this.debug.innerHTML = this.map.isIsland;
    },
    playMap : function() {
        var difficulty = 0;
        var d = document.getElementsByName('difficulty');
        for(var i= 0; i< d.length; i++){
            if (d[i].type === 'radio' && d[i].checked) difficulty=parseInt(d[i].value);
        }
        document.getElementById('splashGenerate').removeEventListener( 'click', this.regenerateMap.bind(this), false );
        document.getElementById('splashPlay').removeEventListener( 'click', this.playMap.bind(this), false );
        document.getElementById('splashContainer').innerHTML = "";

        

        // Actually launch the game
        var g = new Micro.Game(this.map, this.tileSet, this.spriteSheet, difficulty);
    }
}  


Micro.unwrapTile = function(f) {
    return function(tile) {
        if (tile instanceof Micro.Tile) tile = tile.getValue();
        return f.call(null, tile);
    }
};

Micro.canBulldoze = Micro.unwrapTile(function(tileValue) {
    return (tileValue >= Tile.FIRSTRIVEDGE  && tileValue <= Tile.LASTRUBBLE) ||
           (tileValue >= Tile.POWERBASE + 2 && tileValue <= Tile.POWERBASE + 12) ||
           (tileValue >= Tile.TINYEXP       && tileValue <= Tile.LASTTINYEXP + 2);
});

Micro.isCommercial = Micro.unwrapTile(function(tile) { return tile >= Tile.COMBASE && tile < Tile.INDBASE; });
//Micro.isDriveable = Micro.unwrapTile(function(tile) { return (tile >= Tile.ROADBASE && tile <= Tile.LASTRAIL) ||  tile === Tile.RAILPOWERV || tile === Tile.RAILPOWERH; });
Micro.isDriveable = Micro.unwrapTile(function(tile) { return (tile >= Tile.ROADBASE && tile <= Tile.LASTRAIL) ||  tile === Tile.RAILHPOWERV || tile === Tile.RAILVPOWERH; });
Micro.isFire = Micro.unwrapTile(function(tile) { return tile >= Tile.FIREBASE && tile < Tile.ROADBASE;});
Micro.isFlood = Micro.unwrapTile(function(tile) { return tile >= Tile.FLOOD && tile < Tile.LASTFLOOD;});
Micro.isIndustrial = Micro.unwrapTile(function(tile) { return tile >= Tile.INDBASE && tile < Tile.PORTBASE; });
Micro.isManualExplosion = Micro.unwrapTile(function(tile) { return tile >= Tile.TINYEXP && tile <= Tile.LASTTINYEXP; });
Micro.isRail = Micro.unwrapTile(function(tile) { return tile >= Tile.RAILBASE && tile < Tile.RESBASE; });
Micro.isResidential = Micro.unwrapTile(function(tile) { return tile >= Tile.RESBASE && tile < Tile.HOSPITALBASE; });
Micro.isRoad = Micro.unwrapTile(function(tile) { return tile >= Tile.ROADBASE && tile <= Tile.POWERBASE; });
Micro.normalizeRoad = Micro.unwrapTile(function(tile) { return (tile >= Tile.ROADBASE && tile <= Tile.LASTROAD + 1) ? (tile & 15) + 64 : tile; });

Micro.isCommercialZone = function(tile) { return tile.isZone() && Micro.isCommercial(tile); };
Micro.isIndustrialZone = function(tile) { return tile.isZone() && Micro.isIndustrial(tile); };
Micro.isResidentialZone = function(tile) { return tile.isZone() && Micro.isResidential(tile);};
Micro.randomFire = function() { return new Micro.Tile(Tile.FIRE + (Random.getRandom16() & 3), Tile.ANIMBIT); };
Micro.randomRubble = function() {  return new Micro.Tile(Tile.RUBBLE + (Random.getRandom16() & 3), Tile.BULLBIT); };
Micro.HOSPITAL = function() { };

Micro.checkBigZone = function(tileValue) {
    var result;

    switch (tileValue) {

        case Tile.POWERPLANT:
        case Tile.PORT:
        case Tile.NUCLEAR:
        case Tile.STADIUM:
            result = {zoneSize: 4, deltaX: 0, deltaY: 0};
        break;

        case Tile.POWERPLANT + 1:
        case Tile.COALSMOKE3:
        case Tile.COALSMOKE3 + 1:
        case Tile.COALSMOKE3 + 2:
        case Tile.PORT + 1:
        case Tile.NUCLEAR + 1:
        case Tile.STADIUM + 1:
            result = {zoneSize: 4, deltaX: -1, deltaY: 0};
        break;

        case Tile.POWERPLANT + 4:
        case Tile.PORT + 4:
        case Tile.NUCLEAR + 4:
        case Tile.STADIUM + 4:
            result = {zoneSize: 4, deltaX: 0, deltaY: -1};
        break;

        case Tile.POWERPLANT + 5:
        case Tile.PORT + 5:
        case Tile.NUCLEAR + 5:
        case Tile.STADIUM + 5:
            result = {zoneSize: 4, deltaX: -1, deltaY: -1};
        break;
        case Tile.AIRPORT: result = {zoneSize: 6, deltaX: 0, deltaY: 0}; break;
        case Tile.AIRPORT + 1: result = {zoneSize: 6, deltaX: -1, deltaY: 0}; break;
        case Tile.AIRPORT + 2: result = {zoneSize: 6, deltaX: -2, deltaY: 0}; break;
        case Tile.AIRPORT + 3: result = {zoneSize: 6, deltaX: -3, deltaY: 0}; break;
        case Tile.AIRPORT + 6: result = {zoneSize: 6, deltaX: 0, deltaY: -1}; break;
        case Tile.AIRPORT + 7: result = {zoneSize: 6, deltaX: -1, deltaY: -1}; break;
        case Tile.AIRPORT + 8: result = {zoneSize: 6, deltaX: -2, deltaY: -1}; break;
        case Tile.AIRPORT + 9: result = {zoneSize: 6, deltaX: -3, deltaY: -1}; break;
        case Tile.AIRPORT + 12: result = {zoneSize: 6, deltaX: 0, deltaY: -2}; break;
        case Tile.AIRPORT + 13: result = {zoneSize: 6, deltaX: -1, deltaY: -2}; break;
        case Tile.AIRPORT + 14: result = {zoneSize: 6, deltaX: -2, deltaY: -2}; break;
        case Tile.AIRPORT + 15: result = {zoneSize: 6, deltaX: -3, deltaY: -2}; break;
        case Tile.AIRPORT + 18: result = {zoneSize: 6, deltaX: 0, deltaY: -3}; break;
        case Tile.AIRPORT + 19: result = {zoneSize: 6, deltaX: -1, deltaY: -3}; break;
        case Tile.AIRPORT + 20: result = {zoneSize: 6, deltaX: -2, deltaY: -3}; break;
        case Tile.AIRPORT + 21: result = {zoneSize: 6, deltaX: -3, deltaY: -3}; break;
        default: result = {zoneSize: 0, deltaX: 0, deltaY: 0}; break;
    }
    return result;
};

Micro.checkZoneSize = function(tileValue) {
    if ((tileValue >= Tile.RESBASE - 1        && tileValue <= Tile.PORTBASE - 1) ||
        (tileValue >= Tile.LASTPOWERPLANT + 1 && tileValue <= Tile.POLICESTATION + 4) ||
        (tileValue >= Tile.CHURCH1BASE && tileValue <= Tile.CHURCH7LAST)) {
        return 3;
    }

    if ((tileValue >= Tile.PORTBASE    && tileValue <= Tile.LASTPORT) ||
        (tileValue >= Tile.COALBASE    && tileValue <= Tile.LASTPOWERPLANT) ||
        (tileValue >= Tile.STADIUMBASE && tileValue <= Tile.LASTZONE)) {
        return 4;
    }
    return 0;
};

Micro.fireZone = function(map, x, y, blockMaps) {
    var tileValue = map.getTileValue(x, y);
    var zoneSize = 2;

    // A zone being on fire naturally hurts growth
    var value = blockMaps.rateOfGrowthMap.worldGet(x, y);
    value = Micro.clamp(value - 20, -200, 200);
    blockMaps.rateOfGrowthMap.worldSet(x, y, value);

    if (tileValue === Tile.AIRPORT) zoneSize = 5;
    else if (tileValue >= Tile.PORTBASE) zoneSize = 3;
    else if (tileValue < Tile.PORTBASE) zoneSize = 2;

    // Make remaining tiles of the zone bulldozable
    for (var xDelta = -1; xDelta < zoneSize; xDelta++) {
        for (var yDelta = -1; yDelta < zoneSize; yDelta++) {
            var xTem = x + xDelta;
            var yTem = y + yDelta;
            if (!map.testBounds(xTem, yTem)) continue;
            if (map.getTileValue(xTem, yTem >= Tile.ROADBASE)) map.addTileFlags(xTem, yTem, Tile.BULLBIT);
        }
    }
};

Micro.getLandPollutionValue = function(blockMaps, x, y) {
    var landValue = blockMaps.landValueMap.worldGet(x, y);
    landValue -= blockMaps.pollutionDensityMap.worldGet(x, y);
    if (landValue < 30) return 0;
    if (landValue < 80) return 1;
    if (landValue < 150) return 2;
    return 3;
};

Micro.incRateOfGrowth = function(blockMaps, x, y, growthDelta) {
    var currentRate = blockMaps.rateOfGrowthMap.worldGet(x, y);
    // TODO why the scale of 4 here
    var newValue = Micro.clamp(currentRate + growthDelta * 4, -200, 200);
    blockMaps.rateOfGrowthMap.worldSet(x, y, newValue);
};

// Calls map.putZone after first checking for flood, fire
// and radiation
Micro.putZone = function(map, x, y, centreTile, isPowered) {
    for (var dY = 0; dY < 3; dY++) {
        for (var dX = 0; dX < 3; dX++) {
            var tileValue = map.getTileValue(x + dX, y + dY);
            if (tileValue >= Tile.FLOOD && tileValue < Tile.ROADBASE) return;
        }
    }
    map.putZone(x, y, centreTile, 3);
    map.addTileFlags(x, y, Tile.BULLBIT);
    if (isPowered) map.addTileFlags(x, y, Tile.POWERBIT);
};

Micro.pixToWorld = function(p) {
    return p >> 4;
};

Micro.worldToPix = function(w) {
    return w << 4;
};

// Attempt to move 45° towards the desired direction, either
// clockwise or anticlockwise, whichever gets us there quicker
Micro.turnTo = function(presentDir, desiredDir) {
    if (presentDir === desiredDir)
        return presentDir;

    if (presentDir < desiredDir) {
        // select clockwise or anticlockwise
        if (desiredDir - presentDir < 4) presentDir++;
        else presentDir--;
    } else {
        if (presentDir - desiredDir < 4) presentDir--;
        else presentDir++;
    }
    if (presentDir > 8) presentDir = 1;
    if (presentDir < 1) presentDir = 8;
    return presentDir;
};

Micro.absoluteValue = function(x) {
    return Math.abs(x);
};

Micro.getTileValue = function(map, x, y) {
    var wX = Micro.pixToWorld(x);
    var wY = Micro.pixToWorld(y);
    if (wX < 0 || wX >= map.width || wY < 0 || wY >= map.height)  return -1;
    return map.getTileValue(wX, wY);
};


// Choose the best direction to get from the origin to the destination
// If the destination is equidistant in both x and y deltas, a diagonal
// will be chosen, otherwise the most 'dominant' difference will be selected
// (so if a destination is 4 units north and 2 units east, north will be chosen).
// This code seems to always choose south if we're already there which seems like
// a bug
Micro.directionTable = [0, 3, 2, 1, 3, 4, 5, 7, 6, 5, 7, 8, 1];

Micro.getDir = function(orgX, orgY, destX, destY) {
    var deltaX = destX - orgX;
    var deltaY = destY - orgY;
    var i;
    if (deltaX < 0) {
        if (deltaY < 0) { i = 11; } else { i = 8; }
    } else {
        if (deltaY < 0) { i = 2; } else { i = 5; }
    }
    deltaX = Math.abs(deltaX);
    deltaY = Math.abs(deltaY);

    if (deltaX * 2 < deltaY) i++;
    else if (deltaY * 2 < deltaX) i--;
    if (i < 0 || i > 12) i = 0;
    return Micro.directionTable[i];
};

Micro.absoluteDistance = function(orgX, orgY, destX, destY) {
    var deltaX = destX - orgX;
    var deltaY = destY - orgY;
    return Math.abs(deltaX) + Math.abs(deltaY);
};

Micro.checkWet = function(tileValue) {
    if (tileValue === Tile.HPOWER || tileValue === Tile.VPOWER || tileValue === Tile.HRAIL || tileValue === Tile.VRAIL || tileValue === Tile.BRWH || tileValue === Tile.BRWV) return true;
    else  return false;
};

Micro.destroyMapTile = function(spriteManager, map, blockMaps, ox, oy) {
    var x = Micro.pixToWorld(ox);
    var y = Micro.pixToWorld(oy);
    if (!map.testBounds(x, y)) return;
    var tile = map.getTile(x, y);
    var tileValue = tile.getValue();
    if (tileValue < Tile.TREEBASE) return;
    if (!tile.isCombustible()) {
        if (tileValue >= Tile.ROADBASE && tileValue <= Tile.LASTROAD) map.setTo(x, y, new Micro.Tile(Tile.RIVER));
        return;
    }
    if (tile.isZone()) {
        Micro.fireZone(map, x, y, blockMaps);
        if (tileValue > Tile.RZB) spriteManager.makeExplosionAt(ox, oy);
    }
    if (Micro.checkWet(tileValue)) map.setTo(x, y, new Micro.Tile(Tile.RIVER));
    else map.setTo(x, y, new Micro.Tile(Tile.TINYEXP, Tile.BULLBIT | Tile.ANIMBIT));
};

Micro.getDistance = function(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

Micro.checkSpriteCollision = function(s1, s2) {
    return s1.frame !== 0 && s2.frame !== 0 && Micro.getDistance(s1.x, s1.y, s2.x, s2.y) < 30;
};

Micro.decRateOfGrowthMap = function(blockMaps) {
    var rateOfGrowthMap = blockMaps.rateOfGrowthMap;
    for (var x = 0; x < rateOfGrowthMap.width; x++) {
        for (var y = 0; y < rateOfGrowthMap.height; y++) {
            var rate = rateOfGrowthMap.get(x, y);
            if (rate === 0) continue;
            if (rate > 0) {
                rate--;
                rate = Micro.clamp(rate, -200, 200);
                rateOfGrowthMap.set(x, y, rate);
                continue;
            }
            if (rate < 0)  {
                rate++;
                rate = Micro.clamp(rate, -200, 200);
                rateOfGrowthMap.set(x, y, rate);
            }
        }
    }
};

Micro.decTrafficMap = function(blockMaps) {
    var trafficDensityMap = blockMaps.trafficDensityMap;
    for (var x = 0; x < trafficDensityMap.mapWidth; x += trafficDensityMap.blockSize) {
        for (var y = 0; y < trafficDensityMap.mapHeight; y += trafficDensityMap.blockSize) {
            var trafficDensity = trafficDensityMap.worldGet(x, y);
            if (trafficDensity === 0) continue;
            if (trafficDensity <= 24) {
                trafficDensityMap.worldSet(x, y, 0);
                continue;
            }
            if (trafficDensity > 200) trafficDensityMap.worldSet(x, y, trafficDensity - 34);
            else trafficDensityMap.worldSet(x, y, trafficDensity - 24);
        }
    }
};

Micro.getPollutionValue = function(tileValue) {
    if (tileValue < Tile.POWERBASE) {
        if (tileValue >= Tile.HTRFBASE) return 75;
        if (tileValue >= Tile.LTRFBASE) return 50;
        if (tileValue <  Tile.ROADBASE) {
            if (tileValue > Tile.FIREBASE) return 90;
            if (tileValue >= Tile.RADTILE) return 255;
        }
        return 0;
    }
    if (tileValue <= Tile.LASTIND) return 0;
    if (tileValue < Tile.PORTBASE) return 50;
    if (tileValue <= Tile.LASTPOWERPLANT) return 100;
    return 0;
};

Micro.getCityCentreDistance = function(map, x, y) {
    var xDis, yDis;
    if (x > map.cityCentreX) xDis = x - map.cityCentreX;
    else xDis = map.cityCentreX - x;
    if (y > map.cityCentreY) yDis = y - map.cityCentreY;
    else yDis = map.cityCentreY - y;
    return Math.min(xDis + yDis, 64);
};

// The original version of this function in the Micropolis code
// takes a ditherFlag. However, as far as I can tell, it was
// never called with a truthy value for the ditherFlag.
Micro.smoothDitherMap = function(srcMap, destMap) {
    for (var x = 0; x < srcMap.width; x++) {
        for (var y = 0; y < srcMap.height; y++) {
            var value = 0;
            if (x > 0) value += srcMap.get(x - 1, y);
            if (x < srcMap.width - 1) value += srcMap.get(x + 1, y);
            if (y > 0) value += srcMap.get(x, y - 1);
            if (y < (srcMap.height - 1)) value += srcMap.get(x, y + 1);
            value = (value + srcMap.get(x, y)) >> 2;
            if (value > 255) value = 255;
            destMap.set(x, y, value);
        }
    }
};

Micro.smoothTemp1ToTemp2 = function(blockMaps) {
    Micro.smoothDitherMap(blockMaps.tempMap1, blockMaps.tempMap2);
};

Micro.smoothTemp2ToTemp1 = function(blockMaps) {
    Micro.smoothDitherMap(blockMaps.tempMap2, blockMaps.tempMap1);
};

// Again, the original version of this function in the Micropolis code
// reads donDither, which is always zero. The dead code has been culled
Micro.smoothTerrain = function(blockMaps) {
    // Sets each tile to the average of itself and the average of the
    // 4 surrounding tiles
    var tempMap3 = blockMaps.tempMap3;
    var terrainDensityMap = blockMaps.terrainDensityMap;

    for (var x = 0; x < terrainDensityMap.width; x++) {
        for (var y = 0; y < terrainDensityMap.height; y++) {
            var value = 0;
            if (x > 0) value += tempMap3.get(x - 1, y);
            if (x < (terrainDensityMap.width - 1)) value += tempMap3.get(x + 1, y);
            if (y > 0) value += tempMap3.get(x, y - 1);
            if (y < (terrainDensityMap.height - 1)) value += tempMap3.get(x, y + 1);
            value = Math.floor(Math.floor(value / 4) + tempMap3.get(x, y) / 2);
            terrainDensityMap.set(x, y, value);
        }
    }
};

Micro.pollutionTerrainLandValueScan = function(map, census, blockMaps) {
    var tempMap1 = blockMaps.tempMap1;
    var tempMap3 = blockMaps.tempMap3;
    var landValueMap = blockMaps.landValueMap;
    var terrainDensityMap = blockMaps.terrainDensityMap;
    var pollutionDensityMap = blockMaps.pollutionDensityMap;
    var crimeRateMap = blockMaps.crimeRateMap;
    var x, y;

    // tempMap3 is a map of development density, smoothed into terrainMap.
    tempMap3.clear();

    var totalLandValue = 0;
    var numLandValueTiles = 0;

    for (x = 0; x < landValueMap.width; x++) {
        for (y = 0; y < landValueMap.height; y++) {
            var pollutionLevel = 0;
            var developed = false;
            var worldX = x * 2;
            var worldY = y * 2;

            for (var mapX = worldX; mapX <= worldX + 1; mapX++) {
                for (var mapY = worldY; mapY <= worldY + 1; mapY++) {
                    var tileValue = map.getTileValue(mapX, mapY);
                    if (tileValue > Tile.DIRT) {
                        if (tileValue < Tile.RUBBLE) {
                            // Undeveloped land: record in tempMap3
                            var value = tempMap3.get(x >> 1, y >> 1);
                            tempMap3.set(x >> 1, y >> 1, value + 15);
                            continue;
                        }
                        pollutionLevel += Micro.getPollutionValue(tileValue);
                        if (tileValue >= Tile.ROADBASE) {
                           developed = true;
                        }
                    }
                }
            }

            pollutionLevel = Math.min(pollutionLevel, 255);
            tempMap1.set(x, y, pollutionLevel);

            if (developed) {
                var dis = 34 - Math.floor(Micro.getCityCentreDistance(map, worldX, worldY) / 2);
                dis = dis << 2;
                dis += terrainDensityMap.get(x >> 1, y >> 1);
                dis -= pollutionDensityMap.get(x, y);
                if (crimeRateMap.get(x, y) > 190) { dis -= 20; }
                dis = Micro.clamp(dis, 1, 250);
                landValueMap.set(x, y, dis);
                totalLandValue += dis;
                numLandValueTiles++;
            } else {
                landValueMap.set(x, y, 0);
            }
        }
    }

    if (numLandValueTiles > 0) census.landValueAverage = Math.floor(totalLandValue / numLandValueTiles);
    else census.landValueAverage = 0;

    Micro.smoothTemp1ToTemp2(blockMaps);
    Micro.smoothTemp2ToTemp1(blockMaps);

    var maxPollution = 0;
    var pollutedTileCount = 0;
    var totalPollution = 0;

    for (x = 0; x < pollutionDensityMap.mapWidth; x += pollutionDensityMap.blockSize) {
        for (y = 0; y < pollutionDensityMap.mapHeight; y += pollutionDensityMap.blockSize)  {
            var pollution = tempMap1.worldGet(x, y);
            pollutionDensityMap.worldSet(x, y, pollution);

            if (pollution !== 0) {
                pollutedTileCount++;
                totalPollution += pollution;

                // note location of max pollution for monster
                if (pollution > maxPollution || (pollution === maxPollution && Random.getChance(3))) {
                    maxPollution = pollution;
                    map.pollutionMaxX = x;
                    map.pollutionMaxY = y;
                }
            }
        }
    }

    if (pollutedTileCount) census.pollutionAverage = Math.floor(totalPollution / pollutedTileCount);
    else census.pollutionAverage = 0;
    Micro.smoothTerrain(blockMaps);
};

Micro.smoothStationMap = function(map) {
    var tempMap = new Micro.BlockMap(map);
    for (var x = 0; x < tempMap.width; x++) {
        for (var y = 0; y < tempMap.height; y++) {
            var edge = 0;
            if (x > 0) edge += tempMap.get(x - 1, y);
            if (x < tempMap.width - 1) edge += tempMap.get(x + 1, y);
            if (y > 0) edge += tempMap.get(x, y - 1);
            if (y < tempMap.height - 1) edge += tempMap.get(x, y + 1);
            edge = tempMap.get(x, y) + Math.floor(edge / 4);
            map.set(x, y, Math.floor(edge / 2));
        }
    }
};

Micro.crimeScan = function(census, blockMaps) {
    var policeStationMap = blockMaps.policeStationMap;
    var policeStationEffectMap = blockMaps.policeStationEffectMap;
    var crimeRateMap = blockMaps.crimeRateMap;
    var landValueMap = blockMaps.landValueMap;
    var populationDensityMap = blockMaps.populationDensityMap;

    Micro.smoothStationMap(policeStationMap);
    Micro.smoothStationMap(policeStationMap);
    Micro.smoothStationMap(policeStationMap);

    var totalCrime = 0;
    var crimeZoneCount = 0;

    for (var x = 0; x < crimeRateMap.mapWidth; x += crimeRateMap.blockSize) {
        for (var y = 0; y < crimeRateMap.mapHeight; y += crimeRateMap.blockSize) {
            var value = landValueMap.worldGet(x, y);
            if (value > 0) {
                ++crimeZoneCount;
                value = 128 - value;
                value += populationDensityMap.worldGet(x, y);
                value = Math.min(value, 300);
                value -= policeStationMap.worldGet(x, y);
                value = Micro.clamp(value, 0, 250);
                crimeRateMap.worldSet(x, y, value);
                totalCrime += value;
            } else {
                crimeRateMap.worldSet(x, y, 0);
            }
        }
    }
    if (crimeZoneCount > 0) census.crimeAverage = Math.floor(totalCrime / crimeZoneCount);
    else census.crimeAverage = 0;
    blockMaps.policeStationEffectMap = new Micro.BlockMap(policeStationMap);
};

Micro.computeComRateMap = function(map, blockMaps) {
    var comRateMap = blockMaps.comRateMap;
    for (var x = 0; x < comRateMap.width; x++) {
        for (var y = 0; y < comRateMap.height; y++) {
            var value = Math.floor(Micro.getCityCentreDistance(map, x * 8, y * 8) / 2);
            value = value * 4;
            value = 64 - value;
            comRateMap.set(x, y, value);
        }
    }
};

Micro.getPopulationDensity = function(map, x, y, tile) {
    if (tile < Tile.COMBASE) return Residential.getZonePopulation(map, x, y, tile);
    if (tile < Tile.INDBASE) return Commercial.getZonePopulation(map, x, y, tile) * 8;
    if (tile < Tile.PORTBASE) return Industrial.getZonePopulation(map, x, y, tile) * 8;
    return 0;
};

Micro.populationDensityScan = function(map, blockMaps) {
    var tempMap1 = blockMaps.tempMap1;
    var tempMap2 = blockMaps.tempMap2;
    var populationDensityMap = blockMaps.populationDensityMap;
    tempMap1.clear();

    var Xtot = 0;
    var Ytot = 0;
    var zoneTotal = 0;

    for (var x = 0; x < map.width; x++) {
        for (var y = 0; y < map.height; y++) {
            var tile = map.getTile(x, y);
            if (tile.isZone()) {
                var tileValue = tile.getValue();

                var population = Micro.getPopulationDensity(map, x, y, tileValue) * 8;
                population = Math.min(population, 254);

                tempMap1.worldSet(x, y, population);
                Xtot += x;
                Ytot += y;
                zoneTotal++;
            }
        }
    }

    Micro.smoothTemp1ToTemp2(blockMaps);
    Micro.smoothTemp2ToTemp1(blockMaps);
    Micro.smoothTemp1ToTemp2(blockMaps);

    // Copy tempMap2 to populationDensityMap, multiplying by 2
    blockMaps.populationDensityMap = new Micro.BlockMap(tempMap2, function(x) {return 2 * x;});
    Micro.computeComRateMap(map, blockMaps);

    // Compute new city center
    if (zoneTotal > 0) {
        map.cityCentreX = Math.floor(Xtot / zoneTotal);
        map.cityCentreY = Math.floor(Ytot / zoneTotal);
    } else {
        map.cityCentreX = Math.floor(map.width * 0.5);
        map.cityCentreY = Math.floor(map.height * 0.5);
    }
};

Micro.fireAnalysis = function(blockMaps) {
    var fireStationMap = blockMaps.fireStationMap;
    var fireStationEffectMap = blockMaps.fireStationEffectMap;

    Micro.smoothStationMap(fireStationMap);
    Micro.smoothStationMap(fireStationMap);
    Micro.smoothStationMap(fireStationMap);

    blockMaps.fireStationEffectMap = new Micro.BlockMap(fireStationMap);
};

Micro.Residential = function (SIM) {
    var sim = SIM;
    // Residential tiles have 'populations' of 16, 24, 32 or 40
    // and value from 0 to 3. The tiles are laid out in
    // increasing order of land value, cycling through
    // each population value
    var placeResidential = function(map, x, y, population, lpValue, zonePower) {
        var centreTile = ((lpValue * 4) + population) * 9 + Tile.RZB;
        Micro.putZone(map, x, y, centreTile, zonePower);
    };

    // Look for housing in the adjacent 8 tiles
    var getFreeZonePopulation = function(map, x, y, tileValue) {
        var count = 0;
        for (var xx = x - 1; xx <= x + 1; xx++) {
            for (var yy = y - 1; yy <= y + 1; yy++) {
                if (xx === x && yy === y) continue;
                tileValue = map.getTileValue(xx, yy);
                if (tileValue >= Tile.LHTHR && tileValue <= Tile.HHTHR) count += 1;
            }
        }
        return count;
    };

    var getZonePopulation = function(map, x, y, tileValue) {
        if (tileValue instanceof Micro.Tile) tileValue =  new Micro.Tile().getValue();
        if (tileValue === Tile.FREEZ) return getFreeZonePopulation(map, x, y, tileValue);
        var populationIndex = Math.floor((tileValue - Tile.RZB) / 9) % 4 + 1;
        return populationIndex * 8 + 16;
    };

    // Assess a tile for suitability for a house. Prefer tiles
    // near roads
    var evalLot = function(map, x, y) {
        var xDelta = [0, 1, 0, -1];
        var yDelta = [-1, 0, 1, 0];

        var tileValue = map.getTileValue(x, y);
        if (tileValue < Tile.RESBASE || tileValue > Tile.RESBASE + 8) return -1;

        var score = 1;
        for (var i = 0; i < 4; i++) {
            tileValue = map.getTileValue(x + xDelta[i], y + yDelta[i]);
            if (tileValue !== Tile.DIRT && tileValue <= Tile.LASTROAD) score += 1;
        }
        return score;
    };

    var buildHouse = function(map, x, y, lpValue) {
        var best = 0;
        var bestScore = 0;

        //  Deliberately ordered so that the centre tile is at index 0
        var xDelta = [0, -1, 0, 1, -1, 1, -1, 0, 1];
        var yDelta = [0, -1, -1, -1, 0, 0, 1, 1, 1];

        for (var i = 0; i < 9; i++) {
            var xx = x + xDelta[i];
            var yy = y + yDelta[i];
            var score = evalLot(map, xx, yy);
            if (score > bestScore) {
                bestScore = score;
                best = i;
            } else if (score === bestScore && Random.getChance(7)) {
                // Ensures we don't always select the same position when we
                // have a choice
                best = i;
            }
        }
        if (best > 0) map.setTo(x + xDelta[best], y + yDelta[best], new Micro.Tile(Tile.HOUSE + Random.getRandom(2) + lpValue * 3, Tile.BLBNCNBIT)); 
    };

    var doMigrationIn = function(map, x, y, blockMaps, population, lpValue, zonePower) {
        var pollution = blockMaps.pollutionDensityMap.worldGet(x, y);
        // Cough! Too polluted noone wants to move here!
        if (pollution > 128) return;

        var tileValue = map.getTileValue(x, y);

        if (tileValue === Tile.FREEZ) {
            if (population < 8) {
                // Zone capacity not yet reached: build another house
                buildHouse(map, x, y, lpValue);
                Micro.incRateOfGrowth(blockMaps, x, y, 1);
                return;
            }
            if (blockMaps.populationDensityMap.worldGet(x, y) > 64) {
                // There is local demand for higher density housing
                placeResidential(map, x, y, 0, lpValue, zonePower);
                Micro.incRateOfGrowth(blockMaps, x, y, 8);
                return;
            }
        }

        if (population < 40) {
            // Zone population not yet maxed out
            placeResidential(map, x, y, Math.floor(population / 8) - 1, lpValue, zonePower);
            Micro.incRateOfGrowth(blockMaps, x, y, 8);
        }
    };

    var freeZone = [0, 3, 6, 1, 4, 7, 2, 5, 8];

    var doMigrationOut = function(map, x, y, blockMaps, population, lpValue, zonePower) {
        var xx, yy;
        if (population === 0) return;

        if (population > 16) {
            // Degrade to a lower density block
            placeResidential(map, x, y, Math.floor((population - 24) / 8), lpValue, zonePower);
            Micro.incRateOfGrowth(blockMaps, x, y, -8);
            return;
        }

        if (population === 16) {
            // Already at lowest density: degrade to 8 individual houses
            map.setTo(x, y, new Micro.Tile(Tile.FREEZ, Tile.BLBNCNBIT | Tile.ZONEBIT));

            for (yy = y - 1; yy <= y + 1; yy++) {
                for (xx = x - 1; xx <= x + 1; xx++) {
                    if (xx === x && yy === y) continue;
                    map.setTo(x, y, new Micro.Tile(Tile.LHTHR + lpValue + Random.getRandom(2), Tile.BLBNCNBIT));
                } 
            }
            Micro.incRateOfGrowth(blockMaps, x, y, -8);
            return;
        }

        // Already down to individual houses. Remove one
        var i = 0;
        Micro.incRateOfGrowth(blockMaps, x, y, -1);

        for (xx = x - 1; xx <= x + 1; xx++) {
            for (yy = y - 1; yy <= y + 1; yy++) {
                var currentValue = map.getTileValue(xx, yy);
                if (currentValue >= Tile.LHTHR && currentValue <= Tile.HHTHR) {
                    // We've found a house. Replace it with the normal free zone tile
                    map.setTo(xx, yy, new Micro.Tile(freeZone[i] + Tile.RESBASE, Tile.BLBNCNBIT));
                    return;
                } 
                i += 1;
            } 
        } 
    };

    var evalResidential = function(blockMaps, x, y, traffic) {
        if (traffic === Micro.NO_ROAD_FOUND) return -3000;
        var landValue = blockMaps.landValueMap.worldGet(x, y);
        landValue -= blockMaps.pollutionDensityMap.worldGet(x, y);
        if (landValue < 0)  landValue = 0;
        else landValue = Math.min(landValue * 32, 6000);
        return landValue - 3000;
    };


    var residentialFound = function(map, x, y, simData) {
        var lpValue;

        sim.census.resZonePop += 1;
        var tileValue = map.getTileValue(x, y);
        var tilePop = getZonePopulation(map, x, y, tileValue);
        sim.census.resPop += tilePop;
        var zonePower = map.getTile(x, y).isPowered();

        var trafficOK = Micro.ROUTE_FOUND;
        if (tilePop > Random.getRandom(35)) {
            // Try driving from residential to commercial
            trafficOK = sim.traffic.makeTraffic(x, y, sim.blockMaps, Micro.isCommercial);

            // Trigger outward migration if not connected to road network
            if (trafficOK ===  Micro.NO_ROAD_FOUND) {
                lpValue = Micro.getLandPollutionValue(sim.blockMaps, x, y);
                doMigrationOut(map, x, y, sim.blockMaps, tilePop, lpValue, zonePower);
                return;
            }
        }

        // Occasionally assess and perhaps modify the tile (or always in the
        // case of an empty zone)
        if (tileValue === Tile.FREEZ || Random.getChance(7)) {
            var locationScore = evalResidential(sim.blockMaps, x, y, trafficOK);
            var zoneScore = sim.valves.resValve + locationScore;

            if (!zonePower) zoneScore = -500;

            if (trafficOK && (zoneScore > -350) && ((zoneScore - 26380) > Random.getRandom16Signed())) {
                // If we have a reasonable population and this zone is empty, make a
                // hospital
                if (tilePop === 0 && ((Random.getRandom16() & 3) === 0)) {
                    makeHospital(map, x, y, simData, zonePower);
                    return;
                }

                lpValue = Micro.getLandPollutionValue(sim.blockMaps, x, y);
                doMigrationIn(map, x, y, sim.blockMaps, tilePop, lpValue, zonePower);
                return;
            }

            if (zoneScore < 350 && ((zoneScore + 26380) < Random.getRandom16Signed())) {
                lpValue = Micro.getLandPollutionValue(sim.blockMaps, x, y);
                doMigrationOut(map, x, y, sim.blockMaps, tilePop, lpValue, zonePower);
            }
        }
    };

    var makeHospital = function(map, x, y, simData, zonePower) {
        if (sim.census.needHospital > 0) {
            Micro.putZone(map, x, y, Tile.HOSPITAL, zonePower);
            sim.census.needHospital = 0;
            return;
        } 
    };

    var hospitalFound = function(map, x, y, simData) {
        sim.census.hospitalPop += 1;
        if (sim.census.needHospital === -1) {
            if (Random.getRandom(20) === 0) Micro.putZone(map, x, y, Tile.FREEZ);
        }
    };

    return {
        registerHandlers: function(mapScanner, repairManager) {
            mapScanner.addAction(Micro.isResidentialZone, residentialFound);
            mapScanner.addAction(Micro.HOSPITAL, hospitalFound);
            repairManager.addAction(Tile.HOSPITAL, 15, 3);
        },
        getZonePopulation:getZonePopulation
    };
};

Micro.Commercial = function (SIM) {
    var sim = SIM;
    // Commercial tiles have 'populations' from 1 to 5,
    // and value from 0 to 3. The tiles are laid out in
    // increasing order of land value, cycling through
    // each population value
    var getZonePopulation = function(map, x, y, tileValue) {
        if (tileValue instanceof Micro.Tile) tileValue = new Micro.Tile().getValue(); //COMCLEAR)
        if (tileValue === Tile.COMCLR) return 0;
        return Math.floor((tileValue - Tile.CZB) / 9) % 5 + 1;
    };

    var placeCommercial = function(map, x, y, population, lpValue, zonePower) {
        var centreTile = ((lpValue * 5) + population) * 9 + Tile.CZB;
        Micro.putZone(map, x, y, centreTile, zonePower);
    };

    var doMigrationIn = function(map, x, y, blockMaps, population, lpValue, zonePower) {
        var landValue = blockMaps.landValueMap.worldGet(x, y);
        landValue = landValue >> 5;

        if (population > landValue) return;

        // Desirable zone: migrate
        if (population < 5) {
            placeCommercial(map, x, y, population, lpValue, zonePower);
            Micro.incRateOfGrowth(blockMaps, x, y, 8);
        }
    };

    var doMigrationOut = function(map, x, y, blockMaps, population, lpValue, zonePower) {
        if (population > 1) {
            placeCommercial(map, x, y, population - 2, lpValue, zonePower);
            Micro.incRateOfGrowth(blockMaps, x, y, -8);
            return;
        }
        if (population === 1) {
            Micro.putZone(map, x, y, Tile.COMCLR, zonePower);
            Micro.incRateOfGrowth(blockMaps, x, y, -8);
        }
    };

    var evalCommercial = function(blockMaps, x, y, traffic) {
        if (traffic === Micro.NO_ROAD_FOUND) return -3000;
        var comRate = blockMaps.comRateMap.worldGet(x, y);
        return comRate;
    };

    var commercialFound = function(map, x, y, simData) {
        var lpValue;
        sim.census.comZonePop += 1;
        var tileValue = map.getTileValue(x, y);
        var tilePop = getZonePopulation(map, x, y, tileValue);
        sim.census.comPop += tilePop;
        var zonePower = map.getTile(x, y).isPowered();

        var trafficOK = Micro.ROUTE_FOUND;
        if (tilePop > Random.getRandom(5)) {
            // Try driving from commercial to industrial
            trafficOK = sim.traffic.makeTraffic(x, y, sim.blockMaps, Micro.isIndustrial);
            // Trigger outward migration if not connected to road network
            if (trafficOK ===  Micro.NO_ROAD_FOUND) {
                lpValue = Micro.getLandPollutionValue(sim.blockMaps, x, y);
                doMigrationOut(map, x, y, sim.blockMaps, tilePop, lpValue, zonePower);
                return;
            }
        }

        // Occasionally assess and perhaps modify the tile
        if (Random.getChance(7)) {
            var locationScore = evalCommercial(sim.blockMaps, x, y, trafficOK);
            var zoneScore = sim.valves.comValve + locationScore;

            if (!zonePower) zoneScore = -500;

            if (trafficOK && (zoneScore > -350) && ((zoneScore - 26380) > Random.getRandom16Signed())) {
                lpValue = Micro.getLandPollutionValue(sim.blockMaps, x, y);
                doMigrationIn(map, x, y, sim.blockMaps, tilePop, lpValue, zonePower);
                return;
            }

            if (zoneScore < 350 && ((zoneScore + 26380) < Random.getRandom16Signed())) {
                lpValue = Micro.getLandPollutionValue(sim.blockMaps, x, y);
                doMigrationOut(map, x, y, sim.blockMaps, tilePop, lpValue, zonePower);
            }
        }
    };

    return {
        registerHandlers: function(mapScanner, repairManager) {
            mapScanner.addAction(Micro.isCommercialZone, commercialFound);
        },
        getZonePopulation: getZonePopulation
    }
};

Micro.Industrial = function (SIM) {
    var sim = SIM;
    // Industrial tiles have 'populations' from 1 to 4,
    // and value from 0 to 3. The tiles are laid out in
    // increasing order of land value, cycling through
    // each population value
    var getZonePopulation = function(map, x, y, tileValue) {
        if (tileValue instanceof Micro.Tile) tileValue =  new Micro.Tile().getValue();
        if (tileValue === Tile.INDCLR) return 0;
        return Math.floor((tileValue - Tile.IZB) / 9) % 4 + 1;
    };

    var placeIndustrial = function(map, x, y, population, lpValue, zonePower) {
        var centreTile = ((lpValue * 4) + population) * 9 + Tile.IZB;
        Micro.putZone(map, x, y, centreTile, zonePower);
    };

    var doMigrationIn = function(map, x, y, blockMaps, population, lpValue, zonePower) {
        if (population < 4) {
            placeIndustrial(map, x, y, population, lpValue, zonePower);
            Micro.incRateOfGrowth(blockMaps, x, y, 8);
        }
    };

    var doMigrationOut = function(map, x, y, blockMaps, population, lpValue, zonePower) {
        if (population > 1) {
            placeIndustrial(map, x, y, population - 2, lpValue, zonePower);
            Micro.incRateOfGrowth(blockMaps, x, y, -8);
            return;
        }

        if (population === 1) {
            Micro.putZone(map, x, y, Tile.INDCLR, zonePower);
            Micro.incRateOfGrowth(blockMaps, x, y, -8);
        }
    };

    var evalIndustrial = function(blockMaps, x, y, traffic) {
        if (traffic === Micro.NO_ROAD_FOUND) return -1000;
        return 0;
    };

    var animated = [true, false, true, true, false, false, true, true];
    var xDelta = [-1, 0, 1, 0, 0, 0, 0, 1];
    var yDelta = [-1, 0, -1, -1, 0, 0, -1, -1];

    var setSmoke = function(map, x, y, tileValue, isPowered) {
        if (tileValue < Tile.IZB) return;
        // There are only 7 different types of populated industrial zones.
        // As tileValue - IZB will never be 8x9 or more away from IZB, we
        // can shift right by 3, and get the same effect as dividing by 9
        var i = (tileValue - Tile.IZB) >> 3;
        if (animated[i] && isPowered) {
            map.addTileFlags(x + xDelta[i], y + yDelta[i], Tile.ASCBIT);
        } else {
            map.addTileFlags(x + xDelta[i], y + yDelta[i], Tile.BNCNBIT);
            map.removeTileFlags(x + xDelta[i], y + yDelta[i], Tile.ANIMBIT);
        }
    }

    var industrialFound = function(map, x, y, simData) {
        sim.census.indZonePop += 1;
        var tileValue = map.getTileValue(x, y);
        var tilePop = getZonePopulation(map, x, y, tileValue);
        sim.census.indPop += tilePop;

        // Set animation bit if appropriate
        var zonePower = map.getTile(x, y).isPowered();
        setSmoke(map, x, y, tileValue, zonePower);

        var trafficOK = Micro.ROUTE_FOUND;
        if (tilePop > Random.getRandom(5)) {
            // Try driving from industrial to residential
            trafficOK = sim.traffic.makeTraffic(x, y, sim.blockMaps, Micro.isResidential);

            // Trigger outward migration if not connected to road network
            if (trafficOK ===  Micro.NO_ROAD_FOUND) {
                doMigrationOut(map, x, y, sim.blockMaps, tilePop, Random.getRandom16() & 1, zonePower);
                return;
            }
        }

        // Occasionally assess and perhaps modify the tile
        if (Random.getChance(7)) {
            var locationScore = evalIndustrial(sim.blockMaps, x, y, trafficOK);
            var zoneScore = sim.valves.indValve + locationScore;

            if (!zonePower) zoneScore = -500;
            if (trafficOK && (zoneScore > -350) && ((zoneScore - 26380) > Random.getRandom16Signed())) {
                doMigrationIn(map, x, y, sim.blockMaps, tilePop, Random.getRandom16() & 1, zonePower);
                return;
            }
            if (zoneScore < 350 && ((zoneScore + 26380) < Random.getRandom16Signed())) {
                doMigrationOut(map, x, y, sim.blockMaps, tilePop, Random.getRandom16() & 1, zonePower);
            }
        }
    };


    return {
        registerHandlers: function(mapScanner, repairManager) {
            mapScanner.addAction(Micro.isIndustrialZone, industrialFound);
        },
        getZonePopulation: getZonePopulation
    };
};

Micro.MiscTiles = function (SIM) {
    var sim = SIM;
    var xDelta = [-1,  0,  1,  0 ];
    var yDelta = [ 0, -1,  0,  1 ];

    var fireFound = function(map, x, y, simData) {
        sim.census.firePop += 1;

        if ((Random.getRandom16() & 3) !== 0) return;

        // Try to set neighbouring tiles on fire as well
        for (var i = 0; i < 4; i++) {
            if (Random.getChance(7)) {
                var xTem = x + xDelta[i];
                var yTem = y + yDelta[i];
                if (map.testBounds(xTem, yTem)) {
                    var tile = map.getTile(x, y);
                    if (!tile.isCombustible()) continue;
                    if (tile.isZone()) {
                        // Neighbour is a ione and burnable
                        Micro.fireZone(map, x, y, sim.blockMaps);
                        // Industrial zones etc really go boom
                        if (tile.getValue() > Tile.IZB) sim.spriteManager.makeExplosionAt(x, y);
                    }
                    map.setTo(Micro.randomFire());
                }
            }
        }

        // Compute likelyhood of fire running out of fuel
        var rate = 10; // Likelyhood of extinguishing (bigger means less chance)
        i = sim.blockMaps.fireStationEffectMap.worldGet(x, y);

        if (i > 100) rate = 1;
        else if (i > 20) rate = 2;
        else if (i > 0) rate = 3;

        // Decide whether to put out the fire.
        if (Random.getRandom(rate) === 0) map.setTo(x, y, Micro.randomRubble());
    };

    var radiationFound = function(map, x, y, simData) {
        if (Random.getChance(4095)) map.setTo(x, y, new Micro.Tile(Tile.DIRT));
    };

    var floodFound = function(map, x, y, simData) { 
        sim.disasterManager.doFlood(x, y, sim.blockMaps);
    };

    var explosionFound = function(map, x, y, simData) {
        var tileValue = map.getTileValue(x, y);
        map.setTo(x, y, Micro.randomRubble());
        return;
    };

    return {
        registerHandlers: function(mapScanner, repairManager) {
            mapScanner.addAction(Micro.isFire, fireFound, true);
            mapScanner.addAction(Tile.RADTILE, radiationFound, true);
            mapScanner.addAction(Micro.isFlood, floodFound, true);
            mapScanner.addAction(Micro.isManualExplosion, explosionFound, true);
        }
    };
};

Micro.Road = function (SIM) {
    var sim = SIM;

    var openBridge = function(map, origX, origY, xDelta, yDelta, oldTiles, newTiles) {
        for (var i = 0; i < 7; i++) {
            var x = origX + xDelta[i];
            var y = origY + yDelta[i];
            if (map.testBounds(x, y)) {
                if (map.getTileValue(x, y) === (oldTiles[i] & Tile.BIT_MASK)) map.setTileValue(newTiles[i]);
            }
        }
    }

    var closeBridge = function(map, origX, origY, xDelta, yDelta, oldTiles, newTiles) {
        for (var i = 0; i < 7; i++) {
            var x = origX + xDelta[i];
            var y = origY + yDelta[i];
            if (map.testBounds(x, y)) {
                var tileValue = map.getTileValue(x, y);
                if (tileValue === Tile.CHANNEL || (tileValue & 15) === (oldTiles[i] & 15)) map.setTileValue(newTiles[i]);
            }
       }
    }

    var verticalDeltaX = [0,  1,  0,  0,  0,  0,  1];
    var verticalDeltaY = [-2, -2, -1,  0,  1,  2,  2];
    var openVertical = [
        Tile.VBRDG0 | Tile.BULLBIT, Tile.VBRDG1 | Tile.BULLBIT,
        Tile.RIVER, Tile.BRWV | Tile.BULLBIT,
        Tile.RIVER, Tile.VBRDG2 | Tile.BULLBIT, Tile.VBRDG3 | Tile.BULLBIT];
    var closeVertical = [
        Tile.VBRIDGE | Tile.BULLBIT, Tile.RIVER, Tile.VBRIDGE | Tile.BULLBIT,
        Tile.VBRIDGE | Tile.BULLBIT, Tile.VBRIDGE | Tile.BULLBIT,
        Tile.VBRIDGE | Tile.BULLBIT, Tile.RIVER];
    var horizontalDeltaX = [-2,  2, -2, -1,  0,  1,  2];
    var horizontalDeltaY = [ -1, -1,  0,  0,  0,  0,  0];
     var openHorizontal = [
        Tile.HBRDG1 | Tile.BULLBIT, Tile.HBRDG3 | Tile.BULLBIT,
        Tile.HBRDG0 | Tile.BULLBIT, Tile.RIVER, Tile.BRWH | Tile.BULLBIT,
        Tile.RIVER, Tile.HBRDG2 | Tile.BULLBIT ];
    var closeHorizontal = [
        Tile.RIVER, Tile.RIVER, Tile.HBRIDGE | Tile.BULLBIT,
        Tile.HBRIDGE | Tile.BULLBIT, Tile.HBRIDGE | Tile.BULLBIT,
        Tile.HBRIDGE | Tile.BULLBIT, Tile.HBRIDGE | Tile.BULLBIT];

    var doBridge = function(map, x, y, currentTile, simData) {
        if (currentTile === Tile.BRWV) {
            // We have an open vertical bridge. Possibly close it.
            if (Random.getChance(3) && sim.spriteManager.getBoatDistance(x, y) > 340)
                closeBridge(map, x, y, verticalDeltaX, verticalDeltaY, openVertical, closeVertical);
            return true;
        }
        if (currentTile == Tile.BRWH) {
            // We have an open horizontal bridge. Possibly close it.
            if (Random.getChance(3) && sim.spriteManager.getBoatDistance(x, y) > 340)
                closeBridge(map, x, y, horizontalDeltaX, horizontalDeltaY, openHorizontal, closeHorizontal);
            return true;
        }
        if (sim.spriteManager.getBoatDistance(x, y) < 300 || Random.getChance(7)) {
            if (currentTile & 1) {
                if (x < map.width - 1) {
                    if (map.getTileValue(x + 1, y) === Tile.CHANNEL) {
                             // We have a closed vertical bridge. Open it.
                            openBridge(map, x, y, verticalDeltaX, verticalDeltaY, closeVertical, openVertical);
                        return true;
                    }
                }
                return false;
            } else {
                if (y > 0) {
                    if (map.getTileValue(x, y - 1) === Tile.CHANNEL) {
                            // We have a closed horizontal bridge. Open it.
                            openBridge(map, x, y, horizontalDeltaX, horizontalDeltaY, openVertical, closeVertical);
                        return true;
                    }
                }
            }
        }
        return false;
    }

    var densityTable = [Tile.ROADBASE, Tile.LTRFBASE, Tile.HTRFBASE];

    var roadFound = function(map, x, y, simData) {
        sim.census.roadTotal += 1;
        var currentTile = map.getTile(x, y);
        var tileValue = currentTile.getValue();
        if (sim.budget.shouldDegradeRoad()) {
            if (Random.getChance(511)) {
                currentTile = map.getTile(x, y);

                // Don't degrade tiles with power lines
                if (!currentTile.isConductive()) {
                    if (sim.budget.roadEffect < (Random.getRandom16() & 31)) {
                        var mapValue = currentTile.getValue();

                        // Replace bridge tiles with water, otherwise rubble
                        if ((tileValue & 15) < 2 || (tileValue & 15) === 15) map.setTo(x, y, Tile.RIVER);
                        else map.setTo(x, y, Micro.randomRubble());
                        return;
                    }
                }
            }
        }

        // Bridges are not combustible
        if (!currentTile.isCombustible()) {
            // The comment in the original Micropolis code states bridges count for 4
            // However, with the increment above, it's actually 5. Bug?
            sim.census.roadTotal += 4;
            if (doBridge(map, x, y, tileValue, null)) return;
        }

        // Examine traffic density, and modify tile to represent last scanned traffic
        // density
        var density = 0;
        if (tileValue < Tile.LTRFBASE) {
            density = 0;
        } else if (tileValue < Tile.HTRFBASE) {
            density = 1;
        } else {
            // Heavy traffic counts as two tiles with regards to upkeep cost
            // Note, if this is heavy traffic on a bridge, and it wasn't handled above,
            // it actually counts for 7 road tiles
            sim.census.roadTotal += 1;
            density = 2;
        }

        var currentDensity = sim.blockMaps.trafficDensityMap.worldGet(x, y) >> 6;
        // Force currentDensity in range 0-3 (trafficDensityMap values are capped at 240)
        if (currentDensity >> 1) currentDensity -= 1;
        if (currentDensity === density) return;

        var newValue = ((tileValue - Tile.ROADBASE) & 15) + densityTable[currentDensity];
        // Preserve all bits except animation
        var newFlags = currentTile.getFlags() & ~Tile.ANIMBIT;
        if (currentDensity > 0) newFlags |= Tile.ANIMBIT;

        map.setTo(x, y, new Micro.Tile(newValue, newFlags));
    }

    return {
        registerHandlers: function(mapScanner, repairManager) {
            mapScanner.addAction(Micro.isRoad, roadFound);
        }
    }
};

Micro.Stadia = function (SIM) {
    var sim = SIM;
    var emptyStadiumFound = function(map, x, y, simData) {
        sim.census.stadiumPop += 1;

        if (map.getTile(x, y).isPowered()) {
            // Occasionally start the big game
            if (((sim.cityTime + x + y) & 31) === 0) {
                map.putZone(x, y, Tile.FULLSTADIUM, 4);
                map.addTileFlags(x, y, Tile.POWERBIT);
                map.setTo(x + 1, y, new Micro.Tile(Tile.FOOTBALLGAME1, Tile.ANIMBIT));
                map.setTo(x + 1, y + 1, new Micro.Tile(Tile.FOOTBALLGAME2, Tile.ANIMBIT));
            }
        }
    }

    var fullStadiumFound = function(map, x, y, simData) {
        sim.census.stadiumPop += 1;
        var isPowered = map.getTile(x, y).isPowered();

        if (((sim.cityTime + x + y) & 7) === 0) {
            map.putZone(x, y, Tile.STADIUM, 4);
            if (isPowered) map.addTileFlags(x, y, Tile.POWERBIT);
        }
    }

    return {
        registerHandlers: function(mapScanner, repairManager) {
            mapScanner.addAction(Tile.STADIUM, emptyStadiumFound);
            mapScanner.addAction(Tile.FULLSTADIUM, fullStadiumFound);
            repairManager.addAction(Tile.STADIUM, 15, 4);
        }
    }
};

Micro.EmergencyServices = function (SIM) {
    var sim = SIM;

    var handleService = function(censusStat, budgetEffect, blockMap) {
        return function(map, x, y, simData) {
            sim.census[censusStat] += 1;
            var effect = sim.budget[budgetEffect];
            var isPowered = map.getTile(x, y).isPowered();
            // Unpowered buildings are half as effective
            if (!isPowered) effect = Math.floor(effect / 2);

            var pos = new map.Position(x, y);
            var connectedToRoads = sim.traffic.findPerimeterRoad(pos);
            if (!connectedToRoads) effect = Math.floor(effect / 2);

            var currentEffect = sim.blockMaps[blockMap].worldGet(x, y);
            currentEffect += effect;
            sim.blockMaps[blockMap].worldSet(x, y, currentEffect);
        }
    };

    var policeStationFound = handleService('policeStationPop', 'policeEffect', 'policeStationMap');
    var fireStationFound = handleService('fireStationPop', 'fireEffect', 'fireStationMap');

    return {
        registerHandlers: function(mapScanner, repairManager) {
            mapScanner.addAction(Tile.POLICESTATION, policeStationFound);
            mapScanner.addAction(Tile.FIRESTATION, fireStationFound);
        }
    }
};

Micro.Transport = function (SIM) {
    var sim = SIM;

    var railFound = function(map, x, y, simData) {
        sim.census.railTotal += 1;
        sim.spriteManager.generateTrain(sim.census, x, y);

        if (sim.budget.shouldDegradeRoad()) {
            if (Random.getChance(511)) {
                var currentTile = map.getTile(x, y);

                // Don't degrade tiles with power lines
                if (currentTile.isConductive()) return;

                if (sim.budget.roadEffect < (Random.getRandom16() & 31)) {
                    var mapValue = currentTile.getValue();

                    // Replace bridge tiles with water, otherwise rubble
                    var tile = map.getTile(x, y);
                    if (tile < Tile.RAILBASE + 2) map.setTo(x, y, Tile.RIVER);
                    else map.setTo(x, y, Micro.randomRubble());
                }
            }
        }
    };

    var airportFound = function(map, x, y, simData) {
        sim.census.airportPop += 1;

        var tile = map.getTile(x, y);
        if (tile.isPowered()) {
            if (map.getTileValue(x + 1, y - 1) === Tile.RADAR) map.setTo(x + 1, y - 1, new Micro.Tile(Tile.RADAR0, Tile.CONDBIT | Tile.ANIMBIT | Tile.BURNBIT));
            if (Random.getRandom(5) === 0) {
                sim.spriteManager.generatePlane(x, y);
                return;
            }
            if (Random.getRandom(12) === 0) sim.spriteManager.generateCopter(x, y);
        } else {
            map.setTo(x + 1, y - 1, new Micro.Tile(Tile.RADAR, Tile.CONDBIT | Tile.BURNBIT));
        }
    };

    var portFound = function(map, x, y, simData) {
        sim.census.seaportPop += 1;
        var tile = map.getTile(x, y);
        if (tile.isPowered() && sim.spriteManager.getSprite(Micro.SPRITE_SHIP) === null) sim.spriteManager.generateShip();
    };

    return {
        registerHandlers: function(mapScanner, repairManager) {
            mapScanner.addAction(Micro.isRail, railFound);
            mapScanner.addAction(Tile.PORT, portFound);
            mapScanner.addAction(Tile.AIRPORT, airportFound);

            repairManager.addAction(Tile.PORT, 15, 4);
            repairManager.addAction(Tile.AIRPORT, 7, 6);
        }
    }
};

Micro.toKey = function(x, y) {
    return [x, y].join(',');
};

Micro.fromKey = function(k) {
    k = k.split(',');
    return {x: k[0] - 0, y: k[1] - 0};
};

Micro.WorldEffects = function (map) {
    this._map = map;
    this._data = {};
};

Micro.WorldEffects.prototype = {
    constructor: Micro.WorldEffects,
    clear : function() {
        this._data = [];
    },
    getTile : function(x, y) {
        var key = Micro.toKey(x, y);
        var tile = this._data[key];
        if (tile === undefined) tile = this._map.getTile(x, y);
        return tile;
    },
    getTileValue : function(x, y) {
        return this.getTile(x, y).getValue();
    },
    setTile : function(x, y, value, flags) {
        if (flags !== undefined && value instanceof Micro.Tile) throw new Error('Flags supplied with already defined tile');
        if (flags === undefined && !(value instanceof Micro.Tile)) value = new Micro.Tile(value);
        else if (flags !== undefined) value = new Micro.Tile(value, flags);
        var key = Micro.toKey(x, y);
        this._data[key] = value;
    },
    apply : function() {
        var keys = Object.keys(this._data);
        for (var i = 0, l = keys.length; i < l; i++) {
            var coords = Micro.fromKey(keys[i]);
            this._map.setTo(coords, this._data[keys[i]]);
        }
    }
};

Micro.BaseTool = function(){
    this.TOOLRESULT_OK = 0;
    this.TOOLRESULT_FAILED = 1;
    this.TOOLRESULT_NO_MONEY = 2;
    this.TOOLRESULT_NEEDS_BULLDOZE = 3;
    this.autoBulldoze = true;
    this.bulldozerCost = 1;
};

Micro.BaseTool.prototype = {
    constructor: Micro.BaseTool,

    init : function(cost, map, shouldAutoBulldoze, IsDraggable) {
        Object.defineProperty(this, 'toolCost', Micro.makeConstantDescriptor(cost));
        this.result = null;
        this.isDraggable = IsDraggable || false;
        this._shouldAutoBulldoze = shouldAutoBulldoze;
        this._map = map;
        this._worldEffects = new Micro.WorldEffects(map);
        this._applicationCost = 0;
    },
    clear : function() {
        this._applicationCost = 0;
        this._worldEffects.clear();
        this.result = null;
    },
    addCost : function(cost) {
        this._applicationCost += cost;
    },
    doAutoBulldoze : function(x, y) {
        if (!this._shouldAutoBulldoze) return;
        var tile = this._worldEffects.getTile(x, y);
        if (tile.isBulldozable()) {
            tile = Micro.normalizeRoad(tile);
            if ((tile >= Tile.TINYEXP && tile <= Tile.LASTTINYEXP) || (tile < Tile.HBRIDGE && tile !== Tile.DIRT)) {
              this.addCost(1);
              this._worldEffects.setTile(x, y, Tile.DIRT);
            }
        }
    },
    apply : function(budget, messageManager) {
        this._worldEffects.apply();
        budget.spend(this._applicationCost, messageManager);
        messageManager.sendMessage(Messages.DID_TOOL);
        this.clear();
    },
    modifyIfEnoughFunding : function(budget, messageManager) {
        if (this.result !== this.TOOLRESULT_OK) return false;
        if (budget.totalFunds < this._applicationCost) { this.result = this.TOOLRESULT_NO_MONEY; return false; }
        this.apply.call(this, budget, messageManager);
        return true;
    },
    setAutoBulldoze: function(value) {
        this.autoBulldoze = value;
    }
};

Micro.RoadTable = [
    Tile.ROADS, Tile.ROADS2, Tile.ROADS, Tile.ROADS3,
    Tile.ROADS2, Tile.ROADS2, Tile.ROADS4, Tile.ROADS8,
    Tile.ROADS, Tile.ROADS6, Tile.ROADS, Tile.ROADS7,
    Tile.ROADS5, Tile.ROADS10, Tile.ROADS9, Tile.INTERSECTION
];

Micro.RailTable = [
    Tile.LHRAIL, Tile.LVRAIL, Tile.LHRAIL, Tile.LVRAIL2,
    Tile.LVRAIL, Tile.LVRAIL, Tile.LVRAIL3, Tile.LVRAIL7,
    Tile.LHRAIL, Tile.LVRAIL5, Tile.LHRAIL, Tile.LVRAIL6,
    Tile.LVRAIL4, Tile.LVRAIL9, Tile.LVRAIL8, Tile.LVRAIL10
];

Micro.WireTable = [
    Tile.LHPOWER, Tile.LVPOWER, Tile.LHPOWER, Tile.LVPOWER2,
    Tile.LVPOWER, Tile.LVPOWER, Tile.LVPOWER3, Tile.LVPOWER7,
    Tile.LHPOWER, Tile.LVPOWER5, Tile.LHPOWER, Tile.LVPOWER6,
    Tile.LVPOWER4, Tile.LVPOWER9, Tile.LVPOWER8, Tile.LVPOWER10
];


Micro.BaseToolConnector = function(){
    Micro.BaseTool.call( this );
};

Micro.BaseToolConnector.prototype = Object.create( Micro.BaseTool.prototype );

Micro.BaseToolConnector.prototype.fixSingle=function(x, y) {
    var adjTile = 0;
    var tile = this._worldEffects.getTile(x, y);

    tile = Micro.normalizeRoad(tile);

    if (tile >= Tile.ROADS && tile <= Tile.INTERSECTION) {
        if (y > 0) {
            tile = this._worldEffects.getTile(x, y - 1);
            tile = Micro.normalizeRoad(tile);
            if ((tile === Tile.HRAILROAD || (tile >= Tile.ROADBASE && tile <= Tile.VROADPOWER)) && tile !== Tile.HROADPOWER && tile !== Tile.VRAILROAD && tile !== Tile.ROADBASE) adjTile |= 1;
        }
        if (x < this._map.width - 1) {
            tile = this._worldEffects.getTile(x + 1, y);
            tile = Micro.normalizeRoad(tile);
            if ((tile === Tile.VRAILROAD || (tile >= Tile.ROADBASE && tile <= Tile.VROADPOWER)) && tile !== Tile.VROADPOWER && tile !== Tile.HRAILROAD && tile !== Tile.VBRIDGE) adjTile |= 2;
        }
        if (y < this._map.height - 1) {
            tile = this._worldEffects.getTile(x, y + 1);
            tile = Micro.normalizeRoad(tile);
            if ((tile === Tile.HRAILROAD || (tile >= Tile.ROADBASE && tile <= Tile.VROADPOWER)) && tile !== Tile.HROADPOWER && tile !== Tile.VRAILROAD && tile !== Tile.ROADBASE) adjTile |= 4;
        }
        if (x > 0) {
            tile = this._worldEffects.getTile(x - 1, y);
            tile = Micro.normalizeRoad(tile);
            if ((tile === Tile.VRAILROAD || (tile >= Tile.ROADBASE && tile <= Tile.VROADPOWER)) && tile !== Tile.VROADPOWER && tile !== Tile.HRAILROAD && tile !== Tile.VBRIDGE) adjTile |= 8;
        }

        this._worldEffects.setTile(x, y, Micro.RoadTable[adjTile] | Tile.BULLBIT | Tile.BURNBIT);
        return;
    }

    if (tile >= Tile.LHRAIL && tile <= Tile.LVRAIL10) {
        if (y > 0) {
            tile = this._worldEffects.getTile(x, y - 1);
            tile = Micro.normalizeRoad(tile);
            if (tile >= Tile.RAILHPOWERV && tile <= Tile.VRAILROAD && tile !== Tile.RAILHPOWERV && tile !== Tile.HRAILROAD && tile !== Tile.HRAIL) adjTile |= 1;
        }

        if (x < this._map.width - 1) {
            tile = this._worldEffects.getTile(x + 1, y);
            tile = Micro.normalizeRoad(tile);
            if (tile >= Tile.RAILHPOWERV && tile <= Tile.VRAILROAD && tile !== Tile.RAILVPOWERH && tile !== Tile.VRAILROAD && tile !== Tile.VRAIL) adjTile |= 2;
        }

        if (y < this._map.height - 1) {
            tile = this._worldEffects.getTile(x, y + 1);
            tile = Micro.normalizeRoad(tile);
            if (tile >= Tile.RAILHPOWERV && tile <= Tile.VRAILROAD && tile !== Tile.RAILHPOWERV && tile !== Tile.HRAILROAD && tile !== Tile.HRAIL) adjTile |= 4;
        }

        if (x > 0) {
            tile = this._worldEffects.getTile(x - 1, y);
            tile = Micro.normalizeRoad(tile);
            if (tile >= Tile.RAILHPOWERV && tile <= Tile.VRAILROAD && tile !== Tile.RAILVPOWERH && tile !== Tile.VRAILROAD && tile !== Tile.VRAIL) adjTile |= 8;
        }
        this._worldEffects.setTile(x, y, Micro.RailTable[adjTile] | Tile.BULLBIT | Tile.BURNBIT);
        return;
    }

    if (tile >= Tile.LHPOWER && tile <= Tile.LVPOWER10) {
        if (y > 0) {
            tile = this._worldEffects.getTile(x, y - 1);
            if (tile.isConductive()) {
                tile = tile.getValue();
                tile = Micro.normalizeRoad(tile);
                if (tile !== Tile.VPOWER && tile !== Tile.VROADPOWER && tile !== Tile.RAILVPOWERH) adjTile |= 1;
            }
        }
        if (x < this._map.width - 1) {
            tile = this._worldEffects.getTile(x + 1, y);
            if (tile.isConductive()) {
                tile = tile.getValue();
                tile = Micro.normalizeRoad(tile);
                if (tile !== Tile.HPOWER && tile !== Tile.HROADPOWER && tile !== Tile.RAILHPOWERV) adjTile |= 2;
            }
        }
        if (y < this._map.height - 1) {
            tile = this._worldEffects.getTile(x, y + 1);
            if (tile.isConductive()) {
                tile = tile.getValue();
                tile = Micro.normalizeRoad(tile);
                if (tile !== Tile.VPOWER && tile !== Tile.VROADPOWER && tile !== Tile.RAILVPOWERH) adjTile |= 4;
            }
        }
        if (x > 0) {
            tile = this._worldEffects.getTile(x - 1, y);
            if (tile.isConductive()) {
                tile = tile.getValue();
                tile = Micro.normalizeRoad(tile);
                if (tile !== Tile.HPOWER && tile !== Tile.HROADPOWER && tile !== Tile.RAILHPOWERV) adjTile |= 8;
            }
        }
        this._worldEffects.setTile(x, y, Micro.WireTable[adjTile] | Tile.BLBNCNBIT);
        return;
    }
};

Micro.BaseToolConnector.prototype.checkZoneConnections = function(x, y) {
    this.fixSingle(x, y);
    if (y > 0) this.fixSingle(x, y - 1);
    if (x < this._map.width - 1) this.fixSingle(x + 1, y);
    if (y < this._map.height - 1) this.fixSingle(x, y + 1);
    if (x > 0) this.fixSingle(x - 1, y);
}

Micro.BaseToolConnector.prototype.checkBorder = function(x, y, size) {
    // Adjust to top left tile
    x = x - 1;
    y = y - 1;
    var i;
    for (i = 0; i < size; i++) this.fixZone(x + i, y - 1);
    for (i = 0; i < size; i++) this.fixZone(x - 1, y + i);
    for (i = 0; i < size; i++) this.fixZone(x + i, y + size);
    for (i = 0; i < size; i++) this.fixZone(x + size, y + i);
}


Micro.ParkTool = function (map) {
    Micro.BaseTool.call( this );
    this.init(10, map, true);
};

Micro.ParkTool.prototype = Object.create( Micro.BaseTool.prototype );

Micro.ParkTool.prototype.doTool = function(x, y, messageManager, blockMaps) {
    var value = Random.getRandom(4);
    var tileFlags = Tile.BURNBIT | Tile.BULLBIT;
    var tileValue;

    if (value === 4) {
        tileValue = Tile.FOUNTAIN;
        tileFlags |= Tile.ANIMBIT;
    } else {
        tileValue = value + Tile.WOODS2;
    }

    this._worldEffects.setTile(x, y, tileValue, tileFlags);
    this.addCost(10);
    this.result = this.TOOLRESULT_OK;
};

Micro.BulldozerTool = function (map) {
    Micro.BaseTool.call( this );
    this.init(10, map, true);
}

Micro.BulldozerTool.prototype = Object.create( Micro.BaseTool.prototype );

Micro.BulldozerTool.prototype.putRubble = function(x, y, size) {
    for (var xx = x; xx < x + size; xx++) {
        for (var yy = y; yy < y + size; yy++)  {
            if (this._map.testBounds(xx, yy)) {
                var tile = this._worldEffects.getTile(xx, yy);
                if (tile != Tile.RADTILE && tile != Tile.DIRT) this._worldEffects.setTile(xx, yy, Tile.TINYEXP + Random.getRandom(2), Tile.ANIMBIT | Tile.BULLBIT);
            }
        }
    }
};

Micro.BulldozerTool.prototype.layDoze = function(x, y) {
    var tile = this._worldEffects.getTile(x, y);

    if (!tile.isBulldozable()) return this.TOOLRESULT_FAILED;

    tile = tile.getValue();
    tile = Micro.normalizeRoad(tile);

    switch (tile) {
        case Tile.HBRIDGE:
        case Tile.VBRIDGE:
        case Tile.BRWV:
        case Tile.BRWH:
        case Tile.HBRDG0:
        case Tile.HBRDG1:
        case Tile.HBRDG2:
        case Tile.HBRDG3:
        case Tile.VBRDG0:
        case Tile.VBRDG1:
        case Tile.VBRDG2:
        case Tile.VBRDG3:
        case Tile.HPOWER:
        case Tile.VPOWER:
        case Tile.HRAIL:
        case Tile.VRAIL:
            this._worldEffects.setTile(x, y, Tile.RIVER);
        break;

        default: this._worldEffects.setTile(x, y, Tile.DIRT); break;
    }

    this.addCost(1);
    return this.TOOLRESULT_OK;
};

Micro.BulldozerTool.prototype.doTool = function(x, y, messageManager, blockMaps) {
    if (!this._map.testBounds(x, y)) this.result = this.TOOLRESULT_FAILED;

    var tile = this._worldEffects.getTile(x, y);
    var tileValue = tile.getValue();

    var zoneSize = 0;
    var deltaX;
    var deltaY;

    if (tile.isZone()) {
        zoneSize = Micro.checkZoneSize(tileValue);
        deltaX = 0;
        deltaY = 0;
    } else {
        var result = Micro.checkBigZone(tileValue);
        zoneSize = result.zoneSize;
        deltaX = result.deltaX;
        deltaY = result.deltaY;
    }

    if (zoneSize > 0) {
        this.addCost(this.bulldozerCost);

        var dozeX = x;
        var dozeY = y;
        var centerX = x + deltaX;
        var centerY = y + deltaY;

        switch (zoneSize) {
            case 3:
                messageManager.sendMessage(Messages.SOUND_EXPLOSIONHIGH);
                this.putRubble(centerX - 1, centerY - 1, 3);
            break;
            case 4:
                messageManager.sendMessage(Messages.SOUND_EXPLOSIONLOW);
                this.putRubble(centerX - 1, centerY - 1, 4);
            break;
            case 6:
                messageManager.sendMessage(Messages.SOUND_EXPLOSIONHIGH);
                messageManager.sendMessage(Messages.SOUND_EXPLOSIONLOW);
                this.putRubble(centerX - 1, centerY - 1, 6);
            break;
        }

        this.result = this.TOOLRESULT_OK;
    }

    var toolResult;
    if (tileValue === Tile.RIVER || tileValue === Tile.REDGE || tileValue === Tile.CHANNEL) {
        toolResult = this.layDoze(x, y);
        if (tileValue !== this._worldEffects.getTileValue(x, y)) this.addCost(5);
    } else {
        toolResult =  this.layDoze(x, y);
    }

    this.result = toolResult;
};

Micro.BuildingTool = function(cost, centreTile, map, size, animated) {
    Micro.BaseToolConnector.call( this );
    this.init(cost, map, false);
    this.centreTile = centreTile;
    this.size = size;
    this.animated = animated;
};

Micro.BuildingTool.prototype = Object.create( Micro.BaseToolConnector.prototype );

Micro.BuildingTool.prototype.putBuilding = function(leftX, topY) {
    var posX, posY, tileValue, tileFlags;
    var baseTile = this.centreTile - this.size - 1;

    for (var dy = 0; dy < this.size; dy++) {
        posY = topY + dy;

        for (var dx = 0; dx < this.size; dx++) {
            posX = leftX + dx;
            tileValue = baseTile;
            tileFlags = Tile.BNCNBIT;

            if (dx === 1) {
                if (dy === 1) tileFlags |= Tile.ZONEBIT;
                else if (dy === 2 && this.animated) tileFlags |= Tile.ANIMBIT;
            }
            this._worldEffects.setTile(posX, posY, tileValue, tileFlags);
            baseTile++;
        }
    }
};

Micro.BuildingTool.prototype.prepareBuildingSite = function(leftX, topY) {
    // Check that the entire site is on the map
    if (leftX < 0 || leftX + this.size > this._map.width) return this.TOOLRESULT_FAILED;
    if (topY < 0 || topY + this.size > this._map.height) return this.TOOLRESULT_FAILED;

    var posX, posY, tileValue;

    // Check whether the tiles are clear
    for (var dy = 0; dy < this.size; dy++) {
        posY = topY + dy;
        for (var dx = 0; dx < this.size; dx++) {
            posX = leftX + dx;
            tileValue = this._worldEffects.getTileValue(posX, posY);

            if (tileValue === Tile.DIRT) continue;
            if (!this.autoBulldoze) {
                // No Tile.DIRT and no bull-dozer => not buildable
                return this.TOOLRESULT_NEEDS_BULLDOZE;
            }

            if (!Micro.canBulldoze(tileValue)) {
                // tilevalue cannot be auto-bulldozed
                return this.TOOLRESULT_NEEDS_BULLDOZE;
            }
        this._worldEffects.setTile(posX, posY, Tile.DIRT);
        this.addCost(this.bulldozerCost);
        }
    }
    return this.TOOLRESULT_OK;
};

Micro.BuildingTool.prototype.buildBuilding = function(x, y) {
    // Correct to top left
    x--;
    y--;

    var prepareResult = this.prepareBuildingSite(x, y);
    if (prepareResult !== this.TOOLRESULT_OK) return prepareResult;

    this.addCost(this.toolCost);
    this.putBuilding(x, y);
    this.checkBorder(x, y);

    return this.TOOLRESULT_OK;
};

Micro.BuildingTool.prototype.doTool = function(x, y, messageManager, blockMaps) {
    this.result = this.buildBuilding(x, y);
};

Micro.RailTool = function (map) {
    Micro.BaseToolConnector.call( this );
    this.init(20, map, true, true);
}

Micro.RailTool.prototype = Object.create( Micro.BaseToolConnector.prototype );

Micro.RailTool.prototype.layRail = function(x, y) {
    this.doAutoBulldoze(x, y);
    var cost = 20;

    var tile = this._worldEffects.getTileValue(x, y);
    tile = Micro.normalizeRoad(tile);

    switch (tile) {
        case Tile.DIRT: this._worldEffects.setTile(x, y, Tile.LHRAIL | Tile.BULLBIT | Tile.BURNBIT); break;

        case Tile.RIVER:
        case Tile.REDGE:
        case Tile.CHANNEL:
            cost = 100;
            if (x < this._map.width - 1) {
                tile = this._worldEffects.getTileValue(x + 1, y);
                tile = Micro.normalizeRoad(tile);
                if (tile == Tile.RAILHPOWERV || tile == Tile.HRAIL || (tile >= Tile.LHRAIL && tile <= Tile.HRAILROAD)) {
                    this._worldEffects.setTile(x, y, Tile.HRAIL, Tile.BULLBIT);
                    break;
                }
            }
            if (x > 0) {
                tile = this._worldEffects.getTileValue(x - 1, y);
                tile = Micro.normalizeRoad(tile);
                if (tile == Tile.RAILHPOWERV || tile == Tile.HRAIL || (tile > Tile.VRAIL && tile < Tile.VRAILROAD)) {
                    this._worldEffects.setTile(x, y, Tile.HRAIL, Tile.BULLBIT);
                    break;
                }
            }
            if (y < this._map.height - 1) {
                tile = this._worldEffects.getTileValue(x, y + 1);
                tile = Micro.normalizeRoad(tile);
                if (tile == Tile.RAILVPOWERH || tile == Tile.VRAILROAD || (tile > Tile.HRAIL && tile < Tile.HRAILROAD)) {
                    this._worldEffects.setTile(x, y, Tile.VRAIL, Tile.BULLBIT);
                    break;
                }
            }
            if (y > 0) {
                tile = this._worldEffects.getTileValue(x, y - 1);
                tile = Micro.normalizeRoad(tile);
                if (tile == Tile.RAILVPOWERH || tile == Tile.VRAILROAD || (tile > Tile.HRAIL && tile < Tile.HRAILROAD)) {
                    this._worldEffects.setTile(x, y, Tile.VRAIL, Tile.BULLBIT);
                    break;
                }
            }
            return this.TOOLRESULT_FAILED;

        case Tile.LHPOWER: this._worldEffects.setTile(x, y, Tile.RAILVPOWERH, Tile.CONDBIT | Tile.BURNBIT | Tile.BULLBIT); break;
        case Tile.LVPOWER: this._worldEffects.setTile(x, y, Tile.RAILHPOWERV, Tile.CONDBIT | Tile.BURNBIT | Tile.BULLBIT); break;
        case Tile.ROADS: this._worldEffects.setTile(x, y, Tile.VRAILROAD, Tile.BURNBIT | Tile.BULLBIT); break;
        case Tile.ROADS2: this._worldEffects.setTile(x, y, Tile.HRAILROAD, Tile.BURNBIT | Tile.BULLBIT); break;
        default: return this.TOOLRESULT_FAILED;
    }

    this.addCost(cost);
    this.checkZoneConnections(x, y);
    return this.TOOLRESULT_OK;
};

Micro.RailTool.prototype.doTool = function(x, y, messageManager, blockMaps) {
    this.result = this.layRail(x, y);
};


Micro.WireTool = function (map) {
    Micro.BaseToolConnector.call( this );
    this.init(20, map, true, true);
}

Micro.WireTool.prototype = Object.create( Micro.BaseToolConnector.prototype );

Micro.WireTool.prototype.layWire = function(x, y) {
    this.doAutoBulldoze(x, y);
    var cost = 5;
    var tile = this._worldEffects.getTileValue(x, y);
    tile = Micro.normalizeRoad(tile);

    switch (tile) {
        case Tile.DIRT: this._worldEffects.setTile(x, y, Tile.LHPOWER, Tile.CONDBIT | Tile.BURNBIT | Tile.BULLBIT); break;
        case Tile.RIVER: case Tile.REDGE: case Tile.CHANNEL:
            cost = 25;
            if (x < this._map.width - 1) {
                tile = this._worldEffects.getTile(x + 1, y);
                if (tile.isConductive()) {
                    tile = tile.getValue();
                    tile = Micro.normalizeRoad(tile);
                    if (tile != Tile.HROADPOWER && tile != Tile.RAILHPOWERV && tile != Tile.HPOWER) {
                        this._worldEffects.setTile(x, y, Tile.VPOWER, Tile.CONDBIT | Tile.BULLBIT);
                        break;
                    }
                }
            }
            if (x > 0) {
                tile = this._worldEffects.getTile(x - 1, y);
                if (tile.isConductive()) {
                    tile = tile.getValue();
                    tile = Micro.normalizeRoad(tile);
                    if (tile != Tile.HROADPOWER && tile != Tile.RAILHPOWERV && tile != Tile.HPOWER) {
                        this._worldEffects.setTile(x, y, Tile.VPOWER, Tile.CONDBIT | Tile.BULLBIT);
                        break;
                    }
                }
            }
            if (y < this._map.height - 1) {
                tile = this._worldEffects.getTile(x, y + 1);
                if (tile.isConductive()) {
                    tile = tile.getValue();
                    tile = Micro.normalizeRoad(tile);
                    if (tile != Tile.VROADPOWER && tile != Tile.RAILVPOWERH && tile != Tile.VPOWER) {
                        this._worldEffects.setTile(x, y, Tile.HPOWER, Tile.CONDBIT | Tile.BULLBIT);
                        break;
                    }
                }
            }
            if (y > 0) {
                tile = this._worldEffects.getTile(x, y - 1);
                if (tile.isConductive()) {
                    tile = tile.getValue();
                    tile = Micro.normalizeRoad(tile);
                    if (tile != Tile.VROADPOWER && tile != Tile.RAILVPOWERH && tile != Tile.VPOWER) {
                        this._worldEffects.setTile(x, y, Tile.HPOWER, Tile.CONDBIT | Tile.BULLBIT);
                        break;
                    }
                }
            }
            return this.TOOLRESULT_FAILED;

        case Tile.ROADS: this._worldEffects.setTile(x, y, Tile.HROADPOWER, Tile.CONDBIT | Tile.BURNBIT | Tile.BULLBIT); break;
        case Tile.ROADS2: this._worldEffects.setTile(x, y, Tile.VROADPOWER, Tile.CONDBIT | Tile.BURNBIT | Tile.BULLBIT); break;
        case Tile.LHRAIL: this._worldEffects.setTile(x, y, Tile.RAILHPOWERV, Tile.CONDBIT | Tile.BURNBIT | Tile.BULLBIT); break;
        case Tile.LVRAIL: this._worldEffects.setTile(x, y, Tile.RAILVPOWERH, Tile.CONDBIT | Tile.BURNBIT | Tile.BULLBIT); break;
        default: return this.TOOLRESULT_FAILED;
    }

    this.addCost(cost);
    this.checkZoneConnections(x, y);
    return this.TOOLRESULT_OK;
};

Micro.WireTool.prototype.doTool = function(x, y, messageManager, blockMaps) {
    this.result = this.layWire(x, y);
};


Micro.RoadTool = function (map) {
    Micro.BaseToolConnector.call( this );
    this.init(10, map, true, true);
}

Micro.RoadTool.prototype = Object.create( Micro.BaseToolConnector.prototype );

Micro.RoadTool.prototype.layRoad = function(x, y) {
    this.doAutoBulldoze(x, y);
    var tile = this._worldEffects.getTileValue(x, y);
    var cost = 10;

    switch (tile) {
        case Tile.DIRT: this._worldEffects.setTile(x, y, Tile.ROADS, Tile.BULLBIT | Tile.BURNBIT); break;
        case Tile.RIVER:
        case Tile.REDGE:
        case Tile.CHANNEL:
            cost = 50;
            if (x < this._map.width - 1) {
                tile = this._worldEffects.getTileValue(x + 1, y);
                tile = Micro.normalizeRoad(tile);

                if (tile === Tile.VRAILROAD || tile === Tile.HBRIDGE || (tile >= Tile.ROADS && tile <= Tile.HROADPOWER)) {
                    this._worldEffects.setTile(x, y, Tile.HBRIDGE, Tile.BULLBIT);
                    break;
                }
            }
            if (x > 0) {
                tile = this._worldEffects.getTileValue(x - 1, y);
                tile = Micro.normalizeRoad(tile);

                if (tile === Tile.VRAILROAD || tile === Tile.HBRIDGE || (tile >= Tile.ROADS && tile <= Tile.INTERSECTION)) {
                    this._worldEffects.setTile(x, y, Tile.HBRIDGE, Tile.BULLBIT);
                    break;
                }
            }
            if (y < this._map.height - 1) {
                tile = this._worldEffects.getTileValue(x, y + 1);
                tile = Micro.normalizeRoad(tile);

                if (tile === Tile.HRAILROAD || tile === Tile.VROADPOWER || (tile >= Tile.VBRIDGE && tile <= Tile.INTERSECTION)) {
                    this._worldEffects.setTile(x, y, Tile.VBRIDGE, Tile.BULLBIT);
                    break;
                }
            }
            if (y > 0) {
                tile = this._worldEffects.getTileValue(x, y - 1);
                tile = Micro.normalizeRoad(tile);

                if (tile === Tile.HRAILROAD || tile === Tile.VROADPOWER || (tile >= Tile.VBRIDGE && tile <= Tile.INTERSECTION)) {
                    this._worldEffects.setTile(x, y, Tile.VBRIDGE, Tile.BULLBIT);
                    break;
                }
            }
            return this.TOOLRESULT_FAILED;

        case Tile.LHPOWER: this._worldEffects.setTile(x, y, Tile.VROADPOWER | Tile.CONDBIT | Tile.BURNBIT | Tile.BULLBIT); break;
        case Tile.LVPOWER: this._worldEffects.setTile(x, y, Tile.HROADPOWER | Tile.CONDBIT | Tile.BURNBIT | Tile.BULLBIT); break;
        case Tile.LHRAIL: this._worldEffects.setTile(x, y, Tile.HRAILROAD | Tile.BURNBIT | Tile.BULLBIT); break;
        case Tile.LVRAIL: this._worldEffects.setTile(x, y, Tile.VRAILROAD | Tile.BURNBIT | Tile.BULLBIT); break;
        default: return this.TOOLRESULT_FAILED;
    }

    this.addCost(cost);
    this.checkZoneConnections(x, y);
    return this.TOOLRESULT_OK;
};

Micro.RoadTool.prototype.doTool = function(x, y, messageManager, blockMaps) {
    this.result = this.layRoad(x, y);
};

Micro.QueryTool = function (map) {
    Micro.BaseTool.call( this );
    this.init(0, map, false, false);
}


// Keep in sync with QueryWindow
var debug = true;

Micro.QueryTool.prototype = Object.create( Micro.BaseTool.prototype );

Micro.QueryTool.prototype.classifyPopulationDensity = function(x, y, blockMaps) {
    var density = blockMaps.populationDensityMap.worldGet(x, y);
    //if (debug) document.getElementById("queryDensityRaw").innerHTML=density;
    density = density >> 6;
    density = density & 3;
    //document.getElementById("queryDensity").innerHTML=TXT.densityStrings[density];
};

Micro.QueryTool.prototype.classifyLandValue = function(x, y, blockMaps) {
    var landValue = blockMaps.landValueMap.worldGet(x, y);
    //if (debug) document.getElementById("queryLandValueRaw").innerHTML=landValue;

    var i = 0;
    if (landValue >= 150) i = 3;
    else if (landValue >= 80) i = 2;
    else if (landValue >= 30) i = 1;

    var text = TXT.landValueStrings[i];
    //document.getElementById("queryLandValue").innerHTML=text;
};


Micro.QueryTool.prototype.classifyCrime = function(x, y, blockMaps) {
    var crime = blockMaps.crimeRateMap.worldGet(x, y);
    //if (debug) document.getElementById("queryCrimeRaw").innerHTML=crime;

    crime = crime >> 6;
    crime = crime & 3;
    //document.getElementById("queryCrime").innerHTML=TXT.crimeStrings[crime];
};

Micro.QueryTool.prototype.classifyPollution = function(x, y, blockMaps) {
    var pollution = blockMaps.pollutionDensityMap.worldGet(x, y);
    //if (debug) document.getElementById("queryPollutionRaw").innerHTML=pollution;
    pollution = pollution >> 6;
    pollution = pollution & 3;
    //document.getElementById("queryPollution").innerHTML=TXT.pollutionStrings[pollution];
};

Micro.QueryTool.prototype.classifyRateOfGrowth = function(x, y, blockMaps) {
    var rate = blockMaps.rateOfGrowthMap.worldGet(x, y);
    //if (debug) document.getElementById("queryRateRaw").innerHTML=rate;
    rate = rate >> 6;
    rate = rate & 3;
    //document.getElementById("queryRate").innerHTML=TXT.rateStrings[rate];
};


Micro.QueryTool.prototype.classifyDebug = function(x, y, blockMaps) {
    if (!debug) return;
    /*document.getElementById("queryFireStationRaw").innerHTML=blockMaps.fireStationMap.worldGet(x, y);
    document.getElementById("queryFireStationEffectRaw").innerHTML=blockMaps.fireStationEffectMap.worldGet(x, y);
    document.getElementById("queryPoliceStationRaw").innerHTML=blockMaps.policeStationMap.worldGet(x, y);
    document.getElementById("queryPoliceStationEffectRaw").innerHTML=blockMaps.policeStationEffectMap.worldGet(x, y);
    document.getElementById("queryTerrainDensityRaw").innerHTML=blockMaps.terrainDensityMap.worldGet(x, y);
    document.getElementById("queryTrafficDensityRaw").innerHTML=blockMaps.trafficDensityMap.worldGet(x, y);
    document.getElementById("queryComRateRaw").innerHTML=blockMaps.comRateMap.worldGet(x, y);*/
};

Micro.QueryTool.prototype.classifyZone = function(x, y) {
    var baseTiles = [
        Tile.DIRT, Tile.RIVER, Tile.TREEBASE, Tile.RUBBLE,
        Tile.FLOOD, Tile.RADTILE, Tile.FIRE, Tile.ROADBASE,
        Tile.POWERBASE, Tile.RAILBASE, Tile.RESBASE, Tile.COMBASE,
        Tile.INDBASE, Tile.PORTBASE, Tile.AIRPORTBASE, Tile.COALBASE,
        Tile.FIRESTBASE, Tile.POLICESTBASE, Tile.STADIUMBASE, Tile.NUCLEARBASE,
        Tile.HBRDG0, Tile.RADAR0, Tile.FOUNTAIN, Tile.INDBASE2,
        Tile.FOOTBALLGAME1, Tile.VBRDG0, 952];

    var tileValue = this._map.getTileValue(x, y);
    if (tileValue >= Tile.COALSMOKE1 && tileValue < Tile.FOOTBALLGAME1) tileValue = Tile.COALBASE;

    var index = 0, l;
    for (index = 0, l = baseTiles.length - 1; index < l; index++) {
        if (tileValue < baseTiles[index + 1])
        break;
    }

    //document.getElementById("queryZoneType").innerHTML=TXT.zoneTypes[index];
  };

Micro.QueryTool.prototype.doTool = function(x, y, messageManager, blockMaps) {
    var text = 'Position (' + x + ', ' + y + ')';
    text += ' TileValue: ' + this._map.getTileValue(x, y);

    if (debug) {
      var tile = this._map.getTile(x, y);
      /*document.getElementById("queryTile").innerHTML=[x,y].join(', ');
      document.getElementById("queryTileValue").innerHTML=tile.getValue();
      document.getElementById("queryTileBurnable").innerHTML=tile.isCombustible();
      document.getElementById("queryTileBulldozable").innerHTML=tile.isBulldozable();
      document.getElementById("queryTileCond").innerHTML=tile.isConductive();
      document.getElementById("queryTileAnim").innerHTML=tile.isAnimated();
      document.getElementById("queryTilePowered").innerHTML=tile.isPowered();*/
    }

    this.classifyZone(x, y);
    this.classifyPopulationDensity(x, y, blockMaps);
    this.classifyLandValue(x, y, blockMaps);
    this.classifyCrime(x, y, blockMaps);
    this.classifyPollution(x, y, blockMaps);
    this.classifyRateOfGrowth(x, y, blockMaps);
    this.classifyDebug(x, y, blockMaps);

    messageManager.sendMessage(Messages.QUERY_WINDOW_NEEDED);

    this.result = this.TOOLRESULT_OK;
};

Micro.GameTools = function (map) {
    return {
        airport: new Micro.BuildingTool(10000, Tile.AIRPORT, map, 6, false),
        bulldozer: new Micro.BulldozerTool(map),
        coal: new Micro.BuildingTool(3000, Tile.POWERPLANT, map, 4, false),
        commercial: new Micro.BuildingTool(100, Tile.COMCLR, map, 3, false),
        fire: new Micro.BuildingTool(500, Tile.FIRESTATION, map, 3, false),
        industrial: new Micro.BuildingTool(100, Tile.INDCLR, map, 3, false),
        nuclear: new Micro.BuildingTool(5000, Tile.NUCLEAR, map, 4, true),
        park: new Micro.ParkTool(map),
        police: new Micro.BuildingTool(500, Tile.POLICESTATION, map, 3, false),
        port: new Micro.BuildingTool(3000, Tile.PORT, map, 4, false),
        rail: new Micro.RailTool(map),
        residential: new Micro.BuildingTool(100, Tile.FREEZ, map, 3, false),
        road: new Micro.RoadTool(map),
        query: new Micro.QueryTool(map),
        stadium: new Micro.BuildingTool(5000, Tile.STADIUM, map, 4, false),
        wire: new Micro.WireTool(map),
    };
};

Micro.BaseSprite = function(){}

Micro.BaseSprite.prototype = {
    constructor: Micro.BaseSprite,
    init : function(type, map, spriteManager, x, y) {
        this.type = type;
        this.map = map;
        this.spriteManager = spriteManager;
        this.x = x;
        this.y = y;
        this.origX = 0;
        this.origY = 0;
        this.destX = 0;
        this.destY = 0;
        this.count = 0;
        this.soundCount = 0;
        this.dir = 0;
        this.newDir = 0;
        this.step = 0;
        this.flag = 0;
        this.turn = 0;
        this.accel = 0;
        this.speed = 100;
    },
    getFileName : function() {
        return ['obj', this.type, '-', this.frame - 1].join('');
    },
    spriteNotInBounds : function() {
        var x = Micro.pixToWorld(this.x);
        var y = Micro.pixToWorld(this.y);

        return x < 0 || y < 0 || x >= this.map.width || y >= this.map.height;
    }
}

 Micro.TrainSprite = function(map, spriteManager, x, y) {
    Micro.BaseSprite.call( this );
    this.init(Micro.SPRITE_TRAIN, map, spriteManager, x, y);
    this.width = 32;
    this.height = 32;
    this.xOffset = -16;
    this.yOffset = -16;
    this.frame = 1;
    this.dir = 4;

    this.tileDeltaX = [  0, 16, 0, -16];
    this.tileDeltaY = [-16, 0, 16, 0 ];
    this.xDelta = [  0, 4, 0, -4, 0];
    this.yDelta = [ -4, 0, 4, 0, 0];

    this.TrainPic2 = [ 1, 2, 1, 2, 5];

    // Frame values
    this.NORTHSOUTH = 1;
    this.EASTWEST = 2;
    this.NWSE = 3;
    this.NESW = 4;
    this.UNDERWATER = 5;

    // Direction values
    this.NORTH = 0;
    this.EAST = 1;
    this.SOUTH = 2;
    this.WEST = 3;
    this.CANTMOVE = 4;
  }

Micro.TrainSprite.prototype = Object.create( Micro.BaseSprite.prototype );
 // BaseSprite(TrainSprite);


  /*var tileDeltaX = [  0, 16, 0, -16];
  var tileDeltaY = [-16, 0, 16, 0 ];
  var xDelta = [  0, 4, 0, -4, 0];
  var yDelta = [ -4, 0, 4, 0, 0];

  var TrainPic2 = [ 1, 2, 1, 2, 5];

  // Frame values
  var NORTHSOUTH = 1;
  var EASTWEST = 2;
  var NWSE = 3;
  var NESW = 4;
  var UNDERWATER = 5;

  // Direction values
  var NORTH = 0;
  var EAST = 1;
  var SOUTH = 2;
  var WEST = 3;
  var CANTMOVE = 4;*/

  Micro.TrainSprite.prototype.move = function(spriteCycle, messageManager, disasterManager, blockMaps) {
    // Trains can only move in the 4 cardinal directions
    // Over the course of 4 frames, we move through a tile, so
    // ever fourth frame, we try to find a direction to move in
    // (excluding the opposite direction from the current direction
    // of travel). If there is no possible direction found, our direction
    // is set to CANTMOVE. (Thus, if we're in a dead end, we can start heading
    // backwards next time round). If we fail to find a destination after 2 attempts,
    // we die.

    if (this.frame === this.NWSE || this.frame === this.NESW)
      this.frame = this.TrainPic2[this.dir];

    this.x += this.xDelta[this.dir];
    this.y += this.yDelta[this.dir];

    // Find a new direction.
    if ((spriteCycle & 3) === 0) {
      // Choose a random starting point for our search
      var dir = Random.getRandom16() & 3;

      for (var i = dir; i < dir + 4; i++) {
        var dir2 = i & 3;

        if (this.dir !== this.CANTMOVE) {
          // Avoid the opposite direction
          if (dir2 === ((this.dir + 2) & 3))
              continue;
        }

        var tileValue = Micro.getTileValue(this.map, this.x + this.tileDeltaX[dir2], this.y + this.tileDeltaY[dir2]);

        if ((tileValue >= Tile.RAILBASE && tileValue <= Tile.LASTRAIL) ||
            tileValue === Tile.RAILVPOWERH || tileValue === Tile.RAILHPOWERV) {
          if (this.dir !== dir2 && this.dir !== this.CANTMOVE) {
            if (this.dir + dir2 === this.WEST)
              this.frame = this.NWSE;
            else
              this.frame = this.NESW;
          } else {
            this.frame = this.TrainPic2[dir2];
          }

          if (tileValue === Tile.HRAIL || tileValue === Tile.VRAIL)
            this.frame = this.UNDERWATER;

          this.dir = dir2;
          return;
        }
      }

      // Nowhere to go. Die.
      if (this.dir === this.CANTMOVE) {
        this.frame = 0;
        return;
      }

      // We didn't find a direction this time. We'll try the opposite
      // next time around
      this.dir = this.CANTMOVE;
    }
  };


  Micro.TrainSprite.prototype.explodeSprite = function(messageManager) {
    this.frame = 0;
    this.spriteManager.makeExplosionAt(this.x, this.y);
    messageManager.sendMessage(Messages.TRAIN_CRASHED);
  };


  // Metadata for image loading
 /* Object.defineProperties(Micro.TrainSprite,
    {ID: Micro.makeConstantDescriptor(1),
     width: Micro.makeConstantDescriptor(32),
     frames: Micro.makeConstantDescriptor(5)});*/


//return TrainSprite;
//});


Micro.AirplaneSprite = function(map, spriteManager, x, y) {
  Micro.BaseSprite.call( this );
    this.init(Micro.SPRITE_AIRPLANE, map, spriteManager, x, y);
    this.width = 48;
    this.height = 48;
    this.xOffset = -24;
    this.yOffset = -24;
    if (x > Micro.worldToPix(map.width - 20)) {
      this.destX = this.x - 200;
      this.frame = 7;
    } else {
      this.destX = this.x + 200;
      this.frame = 11;
    }
    this.destY = this.y;

    this.xDelta = [0, 0, 6, 8, 6, 0, -6, -8, -6, 8, 8, 8];
    this.yDelta = [0, -8, -6, 0, 6, 8,  6, 0, -6, 0, 0, 0];

}


Micro.AirplaneSprite.prototype = Object.create( Micro.BaseSprite.prototype );


 
Micro.AirplaneSprite.prototype.move = function(spriteCycle, messageManager, disasterManager, blockMaps) {
    var frame = this.frame;

    if ((spriteCycle % 5) === 0) {
      // Frames > 8 mean the plane is taking off
      if (frame > 8) {
        frame--;
        if (frame < 9) {
          // Planes always take off to the east
          frame = 3;
        }
        this.frame = frame;
      } else {
        var d = Micro.getDir(this.x, this.y, this.destX, this.destY);
        frame = Micro.turnTo(frame, d);
        this.frame = frame;
      }
    }

    var absDist = Micro.absoluteDistance(this.x, this.y, this.destX, this.destY);
    if (absDist < 50) {
      // We're pretty close to the destination
      this.destX = Random.getRandom(Micro.worldToPix(this.map.width)) + 8;
      this.destY = Random.getRandom(Micro.worldToPix(this.map.height)) + 8;
    }

    if (disasterManager.enableDisasters) {
      var explode = false;

      var spriteList = this.spriteManager.getSpriteList();
      for (var i = 0; i < spriteList.length; i++) {
        var s = spriteList[i];

        //if (s.frame === 0 || s === sprite) continue;
        if (s.frame === 0 ) continue;

        if ((s.type === Micro.SPRITE_HELICOPTER ||
             s.type === Micro.SPRITE_AIRPLANE) &&
              Micro.checkSpriteCollision(this, s)) {
          s.explodeSprite(messageManager);
          explode = true;
        }
      }

      if (explode)
        this.explodeSprite(messageManager);
    }

    this.x += this.xDelta[frame];
    this.y += this.yDelta[frame];

    if (this.spriteNotInBounds()) this.frame = 0;
  };


Micro.AirplaneSprite.prototype.explodeSprite = function(messageManager) {
    this.frame = 0;
    this.spriteManager.makeExplosionAt(this.x, this.y);
    messageManager.sendMessage(Messages.PLANE_CRASHED);
};


  // Metadata for image loading
  /*Object.defineProperties(AirplaneSprite,
    {ID: Micro.makeConstantDescriptor(3),
     width: Micro.makeConstantDescriptor(48),
     frames: Micro.makeConstantDescriptor(11)});

*/


Micro.BoatSprite = function(map, spriteManager, x, y) {
  Micro.BaseSprite.call( this );
    this.init(Micro.SPRITE_SHIP, map, spriteManager, x, y);
    this.width = 48;
    this.height = 48;
    this.xOffset = -24;
    this.yOffset = -24;

    if (x < Micro.worldToPix(4)) this.frame = 3;
    else if (x >= Micro.worldToPix(map.width - 4)) this.frame = 7;
    else if (y < Micro.worldToPix(4)) this.frame = 5;
    else if (y >= Micro.worldToPix(map.height - 4)) this.frame = 1;
    else this.frame = 3;

    this.newDir = this.frame;
    this.dir = 10;
    this.count = 1;

    this.tileDeltaX = [0,  0,  1,  1,  1,  0, -1, -1, -1];
    this.tileDeltaY = [0, -1, -1,  0,  1,  1,  1,  0, -1];
    this.xDelta = [0,  0,  2,  2,  2,  0, -2, -2, -2];
    this.yDelta = [0, -2, -2,  0,  2,  2,  2,  0, -2];
    this.tileWhiteList = [Tile.RIVER, Tile.CHANNEL, Tile.POWERBASE, Tile.POWERBASE + 1, Tile.RAILBASE, Tile.RAILBASE + 1, Tile.BRWH, Tile.BRWV];

    this.CANTMOVE = 10;
}


Micro.BoatSprite.prototype = Object.create( Micro.BaseSprite.prototype );

Micro.BoatSprite.prototype.move = function(spriteCycle, messageManager, disasterManager, blockMaps) {
    var t = Tile.RIVER;
    //var tile = Tile.RIVER;

    if (this.soundCount > 0) this.soundCount--;

    if (this.soundCount === 0) {
      if ((Random.getRandom16() & 3) === 1) {
        // TODO Scenarios
        // TODO Sound
        messageManager.sendMessage(Messages.SOUND_HONKHONK);
      }

      this.soundCount = 200;
    }

    if (this.count > 0)
        this.count--;

    if (this.count === 0) {
      // Ships turn slowly: only 45° every 9 cycles
      this.count = 9;

      // If already executing a turn, continue to do so
      if (this.frame !== this.newDir) {
        this.frame = Micro.turnTo(this.frame, this.newDir);
        return;
      }

      // Otherwise pick a new direction
      // Choose a random starting direction to search from
      // 0 = N, 1 = NE, ... 7 = NW
      var startDir = Random.getRandom16() & 7;
      var frame = this.frame;
      for (var dir = startDir; dir < (startDir + 8); dir++) {
        frame = (dir & 7) + 1;

        if (frame === this.dir)
          continue;

        var x = Micro.pixToWorld(this.x) + this.tileDeltaX[frame];
        var y = Micro.pixToWorld(this.y) + this.tileDeltaY[frame];

        if (this.map.testBounds(x, y)) {
          var tileValue = this.map.getTileValue(x, y);

          // Test for a suitable water tile
          if (tileValue === Tile.CHANNEL || tileValue === Tile.BRWH ||
             tileValue === Tile.BRWV || this.oppositeAndUnderwater(tileValue, this.dir, frame)) {
            this.newDir = frame;
            this.frame = Micro.turnTo(this.frame, this.newDir);
            this.dir = frame + 4;

            if (this.dir > 8)
              this.dir -= 8;
            break;
          }
        }
      }

      if (dir === (startDir + 8)) {
        this.dir = this.CANTMOVE;
        this.newDir = (Random.getRandom16() & 7) + 1;
      }
    } else {
      frame = this.frame;

      if (frame === this.newDir)  {
        this.x += this.xDelta[frame];
        this.y += this.yDelta[frame];
      }
    }

    if (this.spriteNotInBounds()) {
      this.frame = 0;
      return;
    }

    // If we didn't find a new direction, we might explode
    // depending on the last tile we looked at.
    for (var i = 0; i < 8; i++) {
      if (t === this.tileWhiteList[i]) {
        break;
      }

      if (i === 7) {
        this.explodeSprite(messageManager);
        Micro.destroyMapTile(this.spriteManager, this.map, blockMaps, this.x, this.y);
      }
    }
};


Micro.BoatSprite.prototype.explodeSprite = function(messageManager) {
    this.frame = 0;
    this.spriteManager.makeExplosionAt(this.x, this.y);
    messageManager.sendMessage(Messages.SHIP_CRASHED);
};

  // This is an odd little function. It returns true if
  // oldDir is 180° from newDir and tileValue is underwater
  // rail or wire, and returns false otherwise
Micro.BoatSprite.prototype.oppositeAndUnderwater = function(tileValue, oldDir, newDir) {
    var opposite = oldDir + 4;
    if (opposite > 8) opposite -= 8;
    if (newDir != opposite) return false;
    if (tileValue == Tile.POWERBASE || tileValue == Tile.POWERBASE + 1 || tileValue == Tile.RAILBASE || tileValue == Tile.RAILBASE + 1) return true;
    return false;
};

  // Metadata for image loading
/*  Object.defineProperties(BoatSprite,
    {ID: Micro.makeConstantDescriptor(4),
     width: Micro.makeConstantDescriptor(48),
     frames: Micro.makeConstantDescriptor(8)});


  return BoatSprite;
});*/


Micro.CopterSprite = function (map, spriteManager, x, y) {
  Micro.BaseSprite.call( this );
    this.init(Micro.SPRITE_HELICOPTER, map, spriteManager, x, y);
    this.width = 32;
    this.height = 32;
    this.xOffset = -16;
    this.yOffset = -16;
    this.frame = 5;
    this.count = 1500;
    this.destX = Random.getRandom(Micro.worldToPix(map.width)) + 8;
    this.destY = Random.getRandom(Micro.worldToPix(map.height)) + 8;
    this.origX = x;
    this.origY = y;

    this.xDelta = [0, 0, 3, 5, 3, 0, -3, -5, -3];
    this.yDelta = [0, -5, -3, 0, 3, 5, 3, 0, -3];
}


Micro.CopterSprite.prototype = Object.create( Micro.BaseSprite.prototype );

Micro.CopterSprite.prototype.move = function(spriteCycle, messageManager, disasterManager, blockMaps) {
    if (this.soundCount > 0)
      this.soundCount--;

    if (this.count > 0)
      this.count--;

    if (this.count === 0) {
      // Head towards a monster, and certain doom
      var s = this.spriteManager.getSprite(Micro.SPRITE_MONSTER);

      if (s !== null) {
        this.destX = s.x;
        this.destY = s.y;
      } else {
        // No monsters. Hm. I bet flying near that tornado is sensible
        s = this.spriteManager.getSprite(Micro.SPRITE_TORNADO);

        if (s !== null) {
            this.destX = s.x;
            this.destY = s.y;
        } else {
            this.destX = this.origX;
            this.destY = this.origY;
        }
      }

      // If near destination, let's get her on the ground
      var absDist = Micro.absoluteDistance(this.x, this.y, this.origX, this.origY);
      if (absDist < 30) {
        this.frame = 0;
        return;
      }
    }

    if (this.soundCount === 0) {
        var x = Micro.pixToWorld(this.x);
        var y = Micro.pixToWorld(this.y);

        if (x >= 0 && x < this.map.width && y >= 0 && y < this.map.height) {
          if (blockMaps.trafficDensityMap.worldGet(x, y) > 170 && (Random.getRandom16() & 7) === 0) {
            messageManager.sendMessage(Messages.HEAVY_TRAFFIC, {x: x, y: y});
            messageManager.sendMessage(Messages.SOUND_HEAVY_TRAFFIC);
            this.soundCount = 200;
        }
      }
    }

    var frame = this.frame;

    if ((spriteCycle & 3) === 0) {
      var dir = Micro.getDir(this.x, this.y, this.destX, this.destY);
      frame = Micro.turnTo(frame, dir);
      this.frame = frame;
    }

    this.x += this.xDelta[frame];
    this.y += this.yDelta[frame];
  };


Micro.CopterSprite.prototype.explodeSprite = function(messageManager) {
    this.frame = 0;
    this.spriteManager.makeExplosionAt(this.x, this.y);
    messageManager.sendMessage(Messages.HELICOPTER_CRASHED);
  };

/*
  // Metadata for image loading
  Object.defineProperties(CopterSprite,
    {ID: Micro.makeConstantDescriptor(2),
     width: Micro.makeConstantDescriptor(32),
     frames: Micro.makeConstantDescriptor(8)});


  return CopterSprite;
});
*/

 Micro.ExplosionSprite = function (map, spriteManager, x, y) {
  Micro.BaseSprite.call( this );
    this.init(Micro.SPRITE_EXPLOSION, map, spriteManager, x, y);
    this.width = 48;
    this.height = 48;
    this.xOffset = -24;
    this.yOffset = -24;
    this.frame = 1;
  }


Micro.ExplosionSprite.prototype = Object.create( Micro.BaseSprite.prototype );


  Micro.ExplosionSprite.prototype.startFire = function(x, y) {
    x = Micro.pixToWorld(x);
    y = Micro.pixToWorld(y);

    if (!this.map.testBounds(x, y))
      return;

    var tile = this.map.getTile(x, y);
    var tileValue = tile.getValue();

    if (!tile.isCombustible() && tileValue !== Tile.DIRT)
      return;

    if (tile.isZone())
      return;

    this.map.setTo(x, y, Micro.randomFire());
  };


  Micro.ExplosionSprite.prototype.move = function(spriteCycle, messageManager, disasterManager, blockMaps) {
    if ((spriteCycle & 1) === 0) {
      if (this.frame === 1) {
        // Convert sprite coordinates to tile coordinates.
        var explosionX = Micro.pixToWorld(this.x);
        var explosionY = Micro.pixToWorld(this.y);
        messageManager.sendMessage(Messages.SOUND_EXPLOSIONHIGH);
        messageManager.sendMessage(Messages.EXPLOSION_REPORTED, {x: explosionX, y: explosionY});
      }

      this.frame++;
    }

    if (this.frame > 6) {
      this.frame = 0;

      this.startFire(this.x, this.y);
      this.startFire(this.x - 16, this.y - 16);
      this.startFire(this.x + 16, this.y + 16);
      this.startFire(this.x - 16, this.y + 16);
      this.startFire(this.x + 16, this.y + 16);
    }
  };
/*
  // Metadata for image loading
  Object.defineProperties(ExplosionSprite,
    {ID: Micro.makeConstantDescriptor(7),
     width: Micro.makeConstantDescriptor(48),
     frames: Micro.makeConstantDescriptor(6)});


  return ExplosionSprite;
});
*/

Micro.MonsterSprite = function (map, spriteManager, x, y) {
  Micro.BaseSprite.call( this );
    this.init(Micro.SPRITE_MONSTER, map, spriteManager, x, y);
    this.width = 48;
    this.height = 48;
    this.xOffset = -24;
    this.yOffset = -24;

    if (x > Micro.worldToPix(map.width) / 2) {
      if (y > Micro.worldToPix(map.height) / 2) this.frame = 10;
      else this.frame = 7;
    } else if (y > Micro.worldToPix(map.height) / 2) { this.frame = 1;
    } else { this.frame = 4;
    }

    this.flag = 0;
    this.count = 1000;
    this.destX = Micro.worldToPix(map.pollutionMaxX);
    this.destY = Micro.worldToPix(map.pollutionMaxY);
    this.origX = this.x;
    this.origY = this.y;
    this._seenLand = false;

    this.xDelta = [ 2, 2, -2, -2, 0];
    this.yDelta = [-2, 2, 2, -2, 0];
    this.cardinals1 = [ 0, 1, 2, 3];
    this.cardinals2 = [ 1, 2, 3, 0];
    this.diagonals1 = [ 2, 5, 8, 11];
    this.diagonals2 = [11, 2, 5, 8];
}

Micro.MonsterSprite.prototype = Object.create( Micro.BaseSprite.prototype );

Micro.MonsterSprite.prototype.move = function(spriteCycle, messageManager, disasterManager, blockMaps) {
    if (this.soundCount > 0)
      this.soundCount--;

    // Frames 1 - 12 are diagonal sprites, 3 for each direction.
    // 1-3 NE, 2-6 SE, etc. 13-16 represent the cardinal directions.
    var currentDir = Math.floor((this.frame - 1) / 3);
    var frame, dir;

    if (currentDir < 4) { /* turn n s e w */
      // Calculate how far in the 3 step animation we were,
      // move on to the next one
      frame = (this.frame - 1) % 3;

      if (frame === 2)
        this.step = 0;

      if (frame === 0)
        this.step = 1;

      if (this.step)
        frame++;
      else
        frame--;

      var absDist = Micro.absoluteDistance(this.x, this.y, this.destX, this.destY);

      if (absDist < 60) {
        if (this.flag === 0) {
          this.flag = 1;
          this.destX = this.origX;
          this.destY = this.origY;
        } else {
          this.frame = 0;
          return;
        }
      }

      // Perhaps switch to a cardinal direction
      dir = Micro.getDir(this.x, this.y, this.destX, this.destY);
      dir = Math.floor((dir - 1) / 2);

      if (dir !== currentDir && Random.getChance(10)) {
        if (Random.getRandom16() & 1)
          frame = this.cardinals1[currentDir];
        else
          frame = this.cardinals2[currentDir];

        currentDir = 4;

        if (!this.soundCount) {
          messageManager.sendMessage(Messages.SOUND_MONSTER);
          this.soundCount = 50 + Random.getRandom(100);
        }
      }
    } else {
      // Travelling in a cardinal direction. Switch to a diagonal
      currentDir = 4;
      dir = this.frame;
      frame = (dir - 13) & 3;

      if (!(Random.getRandom16() & 3)) {
        if (Random.getRandom16() & 1)
          frame = this.diagonals1[frame];
        else
          frame = this.diagonals2[frame];

        // We mung currentDir and frame here to
        // make the assignment below work
        currentDir = Math.floor((frame - 1) / 3);
        frame = (frame - 1) % 3;
      }
    }

    frame = currentDir * 3 + frame + 1;
    if (frame > 16)
      frame = 16;

    this.frame = frame;

    this.x += this.xDelta[currentDir];
    this.y += this.yDelta[currentDir];

    if (this.count > 0)
      this.count--;

    var tileValue = Micro.getTileValue(this.map, this.x, this.y);

    if (tileValue === -1 || (tileValue === Tile.RIVER && this.count < 500))
      this.frame = 0;

    if (tileValue === Tile.DIRT || tileValue > Tile.WATER_HIGH)
      this._seenLand = true;

    var spriteList = this.spriteManager.getSpriteList();
    for (var i = 0; i < spriteList.length; i++) {
      var s = spriteList[i];

      if (s.frame !== 0 &&
          (s.type === Micro.SPRITE_AIRPLANE || s.type === Micro.SPRITE_HELICOPTER ||
           s.type === Micro.SPRITE_SHIP || s.type === Micro.SPRITE_TRAIN) &&
            Micro.checkSpriteCollision(this, s))
        s.explodeSprite(messageManager);
    }

    Micro.destroyMapTile(this.spriteManager, this.map, blockMaps, this.x, this.y);
  };

/*
  // Metadata for image loading
  Object.defineProperties(MonsterSprite,
    {ID: Micro.makeConstantDescriptor(5),
     width: Micro.makeConstantDescriptor(48),
     frames: Micro.makeConstantDescriptor(16)});


  return MonsterSprite;
});
*/

 Micro.TornadoSprite = function (map, spriteManager, x, y) {
  Micro.BaseSprite.call( this );
    this.init(Micro.SPRITE_TORNADO, map, spriteManager, x, y);
    this.width = 48;
    this.height = 48;
    this.xOffset = -24;
    this.yOffset = -40;
    this.frame = 1;
    this.count = 200;

    this.xDelta = [2, 3, 2, 0, -2, -3];
    this.yDelta = [-2, 0, 2, 3, 2, 0];
}

Micro.TornadoSprite.prototype = Object.create( Micro.BaseSprite.prototype );

Micro.TornadoSprite.prototype.move = function(spriteCycle, messageManager, disasterManager, blockMaps) {
    var frame;
    frame = this.frame;

    // If middle frame, move right or left
    // depending on the flag value
    // If frame = 1, perhaps die based on flag
    // value
    if (frame === 2) {
      if (this.flag)
        frame = 3;
      else
        frame = 1;
    } else {
      if (frame === 1)
        this.flag = 1;
      else
        this.flag = 0;

      frame = 2;
    }

    if (this.count > 0)
      this.count--;

    this.frame = frame;

    var spriteList = this.spriteManager.getSpriteList();
    for (var i = 0; i < spriteList.length; i++) {
      var s = spriteList[i];

      // Explode vulnerable sprites
      if (s.frame !== 0 &&
          (s.type === Micro.SPRITE_AIRPLANE || s.type === Micro.SPRITE_HELICOPTER ||
           s.type === Micro.SPRITE_SHIP || s.type === Micro.SPRITE_TRAIN) &&
        Micro.checkSpriteCollision(this, s)) {
        s.explodeSprite(messageManager);
      }
    }

    frame = Random.getRandom(5);
    this.x += this.xDelta[frame];
    this.y += this.yDelta[frame];

    if (this.spriteNotInBounds())
      this.frame = 0;

    if (this.count !== 0 && Random.getRandom(500) === 0)
      this.frame = 0;

    Micro.destroyMapTile(this.spriteManager, this.map, blockMaps, this.x, this.y);
  };
/*

  // Metadata for image loading
  Object.defineProperties(TornadoSprite,
    {ID: Micro.makeConstantDescriptor(6),
     width: Micro.makeConstantDescriptor(48),
     frames: Micro.makeConstantDescriptor(3)});


  return TornadoSprite;
});
*/

Micro.SpriteManager = function (map, SIM) {
    this.sim = SIM;
    this.spriteList = [];
    this.map = map;
    this.spriteCycle = 0;
}

Micro.SpriteManager.prototype = {

    constructor: Micro.SpriteManager,
    
    getSprite : function(type) {
        var filteredList = this.spriteList.filter(function (s) {
            return s.frame !== 0 && s.type === type;
        });
        if (filteredList.length === 0) return null;
        return filteredList[0];
    },
    getSpriteList : function() {
        return this.spriteList.slice();
    },
    getSpritesInView : function(startX, startY, lastX, lastY) {
        var sprites = [];
        startX = Micro.worldToPix(startX);
        startY = Micro.worldToPix(startY);
        lastX = Micro.worldToPix(lastX);
        lastY = Micro.worldToPix(lastY);
        return this.spriteList.filter(function(s) {
          return (s.x + s.xOffset >= startX && s.y + s.yOffset >= startY) &&
                 !(s.x + s.xOffset >= lastX && s.y + s.yOffset >= lastY);
        });
    },
    moveObjects : function() {
        var messageManager = this.sim.messageManager;
        var disasterManager = this.sim.disasterManager;
        var blockMaps = this.sim.blockMaps;

        this.spriteCycle += 1;

        var list = this.spriteList.slice();

        var i = list.length;
        while(i--){
        //for (var i = 0, l = list.length; i < l; i++) {
            var sprite = list[i];
            if (sprite.frame === 0) continue;
            sprite.move(this.spriteCycle, messageManager, disasterManager, blockMaps);
        }

        this.pruneDeadSprites();
    },
    /*moveObjects : function(simData) {
        var messageManager = simData.messageManager;
        var disasterManager = simData.disasterManager;
        var blockMaps = simData.blockMaps;

        this.spriteCycle += 1;

        var list = this.spriteList.slice();

        for (var i = 0, l = list.length; i < l; i++) {
          var sprite = list[i];

          if (sprite.frame === 0)
            continue;

          sprite.move(this.spriteCycle, messageManager, disasterManager, blockMaps);
        }

        this.pruneDeadSprites();
    },*/
    makeSprite : function(type, x, y) {
      this.spriteList.push(new constructors[type](this.map, this, x, y));
    },
    makeTornado : function(messageManager) {
        var sprite = this.getSprite(Micro.SPRITE_TORNADO);
        if (sprite !== null) {
            sprite.count = 200;
            return;
        }
        var x = Random.getRandom(Micro.worldToPix(this.map.width) - 800) + 400;
        var y = Random.getRandom(Micro.worldToPix(this.map.height) - 200) + 100;

        this.makeSprite(Micro.SPRITE_TORNADO, x, y);
        messageManager.sendMessage(Messages.TORNADO_SIGHTED, {x: Micro.pixToWorld(x), y: Micro.pixToWorld(y)});
    },
    makeExplosion : function(x, y) {
        if (this.map.testBounds(x, y)) this.makeExplosionAt(Micro.worldToPix(x), Micro.worldToPix(y));
    },
    makeExplosionAt : function(x, y) {
        this.makeSprite(Micro.SPRITE_EXPLOSION, x, y);
    },
    generatePlane : function(x, y) {
        if (this.getSprite(Micro.SPRITE_AIRPLANE) !== null) return;
        this.makeSprite(Micro.SPRITE_AIRPLANE, Micro.worldToPix(x), Micro.worldToPix(y));
    },
    generateTrain : function(census, x, y) {
        if (census.totalPop > 20 &&
            this.getSprite(Micro.SPRITE_TRAIN) === null && Random.getRandom(25) === 0) this.makeSprite(Micro.SPRITE_TRAIN,Micro.worldToPix(x) + 8,Micro.worldToPix(y) + 8);
    },
    generateShip : function() {
    // XXX This code is borked. The map generator will never
    // place a channel tile on the edges of the map
    var x,y;

    if (Random.getChance(3)) {
      for (x = 4; x < this.map.width - 2; x++) {
        if (this.map.getTileValue(x, 0) === Tile.CHANNEL)  {
          this.makeShipHere(x, 0);
          return;
        }
      }
    }

    if (Random.getChance(3)) {
      for (y = 1; y < this.map.height - 2; y++) {
        if (this.map.getTileValue(0, y) === Tile.CHANNEL)  {
          this.makeShipHere(0, y);
          return;
        }
      }
    }

    if (Random.getChance(3)) {
      for (x = 4; x < this.map.width - 2; x++) {
        if (this.map.getTileValue(x, this.map.height - 1) === Tile.CHANNEL)  {
          this.makeShipHere(x, this.map.height - 1);
          return;
        }
      }
    }

    if (Random.getChance(3)) {
      for (y = 1; y < this.map.height - 2; y++) {
        if (this.map.getTileValue(this.map.width - 1, y) === Tile.CHANNEL)  {
          this.makeShipHere(this.map.width - 1, y);
          return;
        }
      }
    }
    },
    getBoatDistance : function(x, y) {
        var dist = 99999;
        var pixelX = Micro.worldToPix(x) + 8;
        var pixelY = Micro.worldToPix(y) + 8;
        var sprite;

        for (var i = 0, l = this.spriteList.length; i < l; i++) {
          sprite = this.spriteList[i];
          if (sprite.type === Micro.SPRITE_SHIP && sprite.frame !== 0) {
            var sprDist = Micro.absoluteValue(sprite.x - pixelX) + Micro.absoluteValue(sprite.y - pixelY);

            dist = Math.min(dist, sprDist);
          }
        }

        return dist;
    },
    makeShipHere : function(x, y) {
        this.makeSprite(Micro.SPRITE_SHIP,Micro.worldToPix(x),Micro.worldToPix(y));
    },
    generateCopter : function(x, y) {
        if (this.getSprite(Micro.SPRITE_HELICOPTER) !== null) return;
        this.makeSprite(Micro.SPRITE_HELICOPTER,Micro.worldToPix(x),Micro.worldToPix(y));
    },
    makeMonsterAt : function(messageManager, x, y) {
    this.makeSprite(Micro.SPRITE_MONSTER,
                    Micro.worldToPix(x),
                    Micro.worldToPix(y));
    messageManager.sendMessage(Messages.MONSTER_SIGHTED, {x: x, y: y});
    },
    makeMonster : function(messageManager) {
        var sprite = this.getSprite(Micro.SPRITE_MONSTER);
        if (sprite !== null) {
            sprite.soundCount = 1;
           sprite.count = 1000;
            sprite.destX = Micro.worldToPix(this.map.pollutionMaxX);
            sprite.destY = Micro.worldToPix(this.map.pollutionMaxY);
        }

        var done = 0;
        for (var i = 0; i < 300; i++)  {
            var x = Random.getRandom(this.map.width - 20) + 10;
            var y = Random.getRandom(this.map.height - 10) + 5;
            var tile = this.map.getTile(x, y);
            if (tile.getValue() === Tile.RIVER) {
                this.makeMonsterAt(messageManager, x, y);
                done = 1;
                break;
            }
        }

        if (done === 0) this.makeMonsterAt(messageManager, 60, 50);
    },
    pruneDeadSprites : function(type) {
        this.spriteList = this.spriteList.filter(function (s) { return s.frame !== 0; });
    }
}


var constructors = {};
constructors[Micro.SPRITE_TRAIN] = Micro.TrainSprite;
constructors[Micro.SPRITE_SHIP] = Micro.BoatSprite;
constructors[Micro.SPRITE_MONSTER] = Micro.MonsterSprite;
constructors[Micro.SPRITE_HELICOPTER] = Micro.CopterSprite;
constructors[Micro.SPRITE_AIRPLANE] = Micro.AirplaneSprite;
constructors[Micro.SPRITE_TORNADO] = Micro.TornadoSprite;
constructors[Micro.SPRITE_EXPLOSION] = Micro.ExplosionSprite;


//  return SpriteManager;
//});


// TODO L20N
Micro.InfoBar = function () {
    var setClass = function(classification) { document.getElementById("cclass").innerHTML = classification; };
    var setDate = function(m, year) { document.getElementById("date").innerHTML = [TXT.months[m], year].join(' '); };
    var setFunds = function(funds) { document.getElementById("funds").innerHTML = funds; };
    var setPopulation = function(pop) { document.getElementById("population").innerHTML = pop; };
    var setScore = function(score) { document.getElementById("score").innerHTML = score; };

    return {
        setClass: setClass,
        setDate: setDate,
        setFunds: setFunds,
        setPopulation: setPopulation,
        setScore: setScore
    }
}

var InfoBar = new Micro.InfoBar();

Micro.RCI = function (id, parentNode) {
    var e = new Error('Invalid parameter');

    if (arguments.length < 1) {
      throw e;
    }

    // Argument shuffling
    if (parentNode === undefined) {
      parentNode = id;
      id = Micro.RCI_DEFAULT_ID;
    } 

    if (typeof(parentNode) === 'string') {
      var orig = parentNode;
      //parentNode = $('#' + parentNode);
      parentNode = document.getElementById("RCIContainer")
      //parentNode = parentNode.length === 0 ? null : parentNode[0];
      if (parentNode === null)
        throw new Error('Node ' + orig + ' not found');
    }

    this._padding = 3; // 3 rectangles in each bit of padding
    this._buckets = 10; // 0.2000 is scaled in to 10 buckets 
    this._rectSize = 5; // Each rect is 5px
    this._scale = Math.floor(2000 / this._buckets);

    // Each bar is 1 unit of padding wide, and there are 2 units
    // of padding between the 3 bars. There are 2 units of padding
    // either side. So 9 units of padding total
    this._canvasWidth = 9 * this._rectSize;

    // Each bar can be at most bucket rectangles tall, but we multiply
    // that by 2 as we can have positive and negative directions. There
    // should be 1 unit of padding either side. The text box in the middle
    // is 1 unit of padding
    this._canvasHeight = (2 * this._buckets + 3 * this._padding) * this._rectSize;

    //this._canvas = $('<canvas></canvas>', {id: id})[0];
    this._canvas = document.createElement('canvas');
    this._canvas.id = id//'RCICanvas';
    //this._canvas.width = this._canvasWidth;
    //this._canvas.height = this._canvasHeight;

    // Remove any existing element with the same id
    //var elems = $('#' + id)
   /* var elems = document.getElementById(id);
    var current = elems.length > 0 ? elems[0] : null;
    if (current !== null) {
      if (current.parentNode === parentNode)
        parentNode.replaceChild(this._canvas, current);
      else
        throw new Error('ID ' + id + ' already exists in document!');
    } else*/
    //if(parentNode){
      if(parentNode.firstChild)parentNode.removeChild(parentNode.firstChild)
      parentNode.appendChild(this._canvas);
    //}
  }

Micro.RCI.prototype = {
    constructor: Micro.RCI,
    _clear : function(ctx) {
    ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    },
    _drawRect : function(ctx) {
    // The rect is inset by one unit of padding
    var boxLeft = this._padding * this._rectSize;
    // and is the length of a bar plus a unit of padding down
    var boxTop = (this._buckets + this._padding) * this._rectSize;
    // It must accomodate 3 bars, 2 bits of internal padding
    // with padding either side
    var boxWidth = 7 * this._padding * this._rectSize;
    var boxHeight = this._padding * this._rectSize;

    ctx.fillStyle = 'rgba(192, 192, 192,0.2)';
    ctx.fillRect(boxLeft, boxTop, boxWidth, boxHeight);
    },
    _drawValue : function(ctx, index, value) {
    // Need to scale com and ind
    if (index > 1)
      value = Math.floor(2000/1500 * value);

    var colours = ['rgb(0,255,0)', 'rgb(0, 0, 139)', 'rgb(255, 255, 0)'];
    var barHeightRect = Math.floor(Math.abs(value) / this._scale);
    var barStartY = (value >= 0) ?
      this._buckets + this._padding - barHeightRect : this._buckets + 2 * this._padding;
    var barStartX = 2 * this._padding + (index * 2 * this._padding);

    ctx.fillStyle = colours[index];
    ctx.fillRect(barStartX * this._rectSize, barStartY * this._rectSize,
                 this._padding * this._rectSize, barHeightRect * this._rectSize);
    },
    _drawLabel : function(ctx, index) {
    var labels = ['R', 'C', 'I'];
    var textLeft = 2 * this._padding + (index * 2 * this._padding) +
                   Math.floor(this._padding/2);

    ctx.font = 'normal xx-small sans-serif';
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.textBaseline = 'bottom';
    ctx.fillText(labels[index], textLeft * this._rectSize,
                 (this._buckets + 2 * this._padding) * this._rectSize);
    },
    update : function(res, com, ind) {
    var ctx = this._canvas.getContext('2d');
    this._clear(ctx);
    this._drawRect(ctx);

    var values = [res, com, ind];
    for (var i = 0; i < 3; i++) {
      this._drawValue(ctx, i, values[i]);
      this._drawLabel(ctx, i);
    }
    }
}


 // Object.defineProperty(RCI, 'DEFAULT_ID', Micro.makeConstantDescriptor('RCICanvas'));


Micro.DisasterWindow = function(opacityLayerID, disasterWindowID){
    this._opacityLayer =  opacityLayerID;
    this._disasterWindowID = disasterWindowID;
    //this._opacityLayer =  '#' + opacityLayerID;
    //this._disasterWindowID = '#' + disasterWindowID;
    this._requestedDisaster = Micro.DISASTER_NONE;
    
    var _this = this;

    document.getElementById('disasterCancel').addEventListener( 'click', function(e) { _this.cancel(e); }, false );
    document.getElementById('disasterForm').addEventListener( 'submit', function(e) { _this.submit(e); }, false );
}

Micro.DisasterWindow.prototype = {

    constructor: Micro.DisasterWindow,

    _toggleDisplay : function() {
    var opacityLayer = document.getElementById(this._opacityLayer);
    var disasterWindow = document.getElementById(this._disasterWindowID);
    if(opacityLayer.style.display !== "block")opacityLayer.style.display = "block";
    else opacityLayer.style.display = "none";
    if(disasterWindow.style.display !== "block")disasterWindow.style.display = "block";
    else{ disasterWindow.style.display = "none"; }
  },
  _registerButtonListeners : function() {
    //$('#' + disasterCancelID).one('click', cancel.bind(this));
    //$('#' + disasterFormID).one('submit', submit.bind(this));
  },
  open : function(callback) {
    //var i;
    this._callback = callback;

    // Ensure options have right values
    /*$('#disasterNone').attr('value', DisasterWindow.DISASTER_NONE);
    $('#disasterMonster').attr('value', DisasterWindow.DISASTER_MONSTER);
    $('#disasterFire').attr('value', DisasterWindow.DISASTER_FIRE);
    $('#disasterFlood').attr('value', DisasterWindow.DISASTER_FLOOD);
    $('#disasterCrash').attr('value', DisasterWindow.DISASTER_CRASH);
    $('#disasterMeltdown').attr('value', DisasterWindow.DISASTER_MELTDOWN);
    $('#disasterTornado').attr('value', DisasterWindow.DISASTER_TORNADO);*/

    //document.getElementById("disasterNone").getAttribute()

   // this._registerButtonListeners();
    this._toggleDisplay();
  },
  cancel : function(e) {
    e.preventDefault();
    /*$('#' + disasterFormID).off();*/
    this._toggleDisplay();
    this._callback(Micro.DISASTER_NONE);
  },
  submit : function(e) {
    e.preventDefault();

    var requestedDisaster = document.getElementById('disasterSelect').value;

    console.log(requestedDisaster);

    // Get element values
    /*var requestedDisaster = $('#' + disasterSelectID)[0].value;
    $('#' + disasterFormID).off();*/
    this._toggleDisplay();
    this._callback(requestedDisaster);
  }

}

Micro.EvaluationWindow = function(opacityLayerID, evaluationWindowID){
    //this._opacityLayer =  '#' + opacityLayerID;
    //this._evaluationWindowID = '#' + evaluationWindowID;
    this._opacityLayer =  opacityLayerID;
    this._evaluationWindowID = evaluationWindowID;

    var _this = this;
    
    document.getElementById('evalForm').addEventListener( 'submit', function(e) { _this.submit(e); }, false );
    document.getElementById('evalOK').addEventListener( 'click', function(e) { _this.submit(e); }, false );
  }

Micro.EvaluationWindow.prototype = {
    constructor: Micro.EvaluationWindow,
    _toggleDisplay : function() {
    var opacityLayer = document.getElementById(this._opacityLayer);// $(this._opacityLayer);
    /*opacityLayer = opacityLayer.length === 0 ? null : opacityLayer;
    if (opacityLayer === null)
      throw new Error('Node ' + orig + ' not found');*/

    var evaluationWindow = document.getElementById(this._evaluationWindowID);//$(this._evaluationWindowID);
    /*evaluationWindow = evaluationWindow.length === 0 ? null : evaluationWindow;
    if (evaluationWindow === null)
      throw new Error('Node ' + orig + ' not found');*/

    //opacityLayer.toggle();
    //evaluationWindow.toggle();

    if(opacityLayer.style.display !== "block")opacityLayer.style.display = "block";
    else opacityLayer.style.display = "none";
    if(evaluationWindow.style.display !== "block")evaluationWindow.style.display = "block";
    else evaluationWindow.style.display = "none";
    //evaluationWindow.style.display = "block";
  },
  _populateWindow : function(evaluation) {
    document.getElementById("evalYes").innerHTML=(evaluation.cityYes);
    document.getElementById("evalNo").innerHTML=(100-evaluation.cityYes);
    //$('#evalYes').text(evaluation.cityYes);
   // $('#evalNo').text(100 - evaluation.cityYes);
    for (var i = 0; i < 4; i++) {
      var problemNo = evaluation.getProblemNumber(i);
      var text = '';
      if (problemNo !== -1)
        text = Text.problems[problemNo];
      //$('#evalProb' + (i + 1)).text(text);
      document.getElementById("evalProb"+ (i + 1)).innerHTML=text;
    }

    document.getElementById("evalPopulation").innerHTML=evaluation.cityPop;
    document.getElementById("evalMigration").innerHTML=evaluation.cityPopDelta;
    document.getElementById("evalValue").innerHTML=evaluation.cityAssessedValue;
    document.getElementById("evalLevel").innerHTML=TXT.gameLevel[evaluation.gameLevel]
    document.getElementById("evalClass").innerHTML=TXT.cityClass[evaluation.cityClass]
    document.getElementById("evalScore").innerHTML=evaluation.cityScore
    document.getElementById("evalScoreDelta").innerHTML=evaluation.cityScoreDelta

   /* $('#evalPopulation').text(evaluation.cityPop);
    $('#evalMigration').text(evaluation.cityPopDelta);
    $('#evalValue').text(evaluation.cityAssessedValue);
    $('#evalLevel').text(Text.gameLevel[evaluation.gameLevel]);
    $('#evalClass').text(Text.cityClass[evaluation.cityClass]);
    $('#evalScore').text(evaluation.cityScore);
    $('#evalScoreDelta').text(evaluation.cityScoreDelta);*/
  },
  open : function(callback, evaluation) {
    this._callback = callback;
    this._populateWindow(evaluation);
    this._toggleDisplay();
  },
  submit : function(e) {
    e.preventDefault();

    // TODO Fix for enter keypress: submit isn't fired on FF due to form
    // only containing the submit button
    this._callback();

    this._toggleDisplay();
  }

}

Micro.QueryWindow = function(opacityLayerID, queryWindowID){
  
    this._opacityLayer =  opacityLayerID;
    this._queryWindowID = queryWindowID;
    this._debugToggled = false;

    this.debug = false;

    var _this = this;

    document.getElementById('queryForm').addEventListener( 'submit', function(e) { _this.submit(e); }, false );
    document.getElementById('queryOK').addEventListener( 'click', function(e) { _this.submit(e); }, false );
  }

  // Keep in sync with QueryTool
//  var debug = false;

 

Micro.QueryWindow.prototype = {
    constructor: Micro.QueryWindow,
    _toggleDisplay : function() {
    var opacityLayer = document.getElementById(this._opacityLayer);//$(this._opacityLayer);
    /*opacityLayer = opacityLayer.length === 0 ? null : opacityLayer;
    if (opacityLayer === null)
      throw new Error('Node ' + orig + ' not found');*/

    var queryWindow = document.getElementById(this._queryWindowID);//$(this._queryWindowID);
   /* queryWindow = queryWindow.length === 0 ? null : queryWindow;
    if (queryWindow === null)
      throw new Error('Node ' + orig + ' not found');*/

    //opacityLayer.toggle();
    //queryWindow.toggle();
    if(opacityLayer.style.display !== "block")opacityLayer.style.display = "block";
    else opacityLayer.style.display = "none";
    if(queryWindow.style.display !== "block")queryWindow.style.display = "block";
    else{ queryWindow.style.display = "none"; }

    if (this.debug && !this.debugToggled) {
      //$('#queryDebug').removeClass('hidden');
      this.debugToggled = true;
    }
  },
  open : function(callback) {
    this._callback = callback;
    this._toggleDisplay();
  },
  submit : function(e) {
    e.preventDefault();
    this._callback();
    this._toggleDisplay();
  }


}


//define([], function() {  "use strict";
Micro.BudgetWindow = function(opacityLayerID, budgetWindowID){
 // function BudgetWindow(opacityLayerID, budgetWindowID) {
    this._opacityLayer =  opacityLayerID;
    this._budgetWindowID = budgetWindowID;

    this.dataKeys = ['roadFund', 'fireFund', 'policeFund'];
    this.spendKeys = ['roadRate', 'fireRate', 'policeRate'];


    var _this = this;

    document.getElementById('budgetReset').addEventListener( 'click', function(e) { _this.resetItems(e); }, false );
    document.getElementById('budgetCancel').addEventListener( 'click', function(e) { _this.cancel(e); }, false );
    document.getElementById('budgetForm').addEventListener( 'submit', function(e) { _this.submit(e); }, false );

    //this._opacityLayer =  '#' + opacityLayerID;
    //this._budgetWindowID = '#' + budgetWindowID;
}


Micro.BudgetWindow.prototype = {
    constructor: Micro.BudgetWindow,

    setSpendRangeText : function(element, percentage, totalSpend) {
        var labelID = element + 'Label';
        var cash = Math.floor(totalSpend * (percentage / 100));
        var text = [percentage, '% of $', totalSpend, ' = $', cash].join('');
        document.getElementById(labelID).innerHTML = text;
        //$('#' + labelID).text(text);
    },
    onFundingUpdate : function(elementID, e) {
    var element = document.getElementById(elementID);//$('#' + elementID)[0];
    var percentage = element.value - 0;
    var dataSource = element.getAttribute('data-source');
    this.setSpendRangeText(elementID, percentage, this[dataSource]);
    },
    onTaxUpdate : function(e) {
    //var elem = $('#taxRateLabel')[0];
    //var sourceElem = $('#taxRate')[0];
    //var elem = $('#taxRateLabel')[0];
    //var sourceElem = $('#taxRate')[0];
    //$(elem).text(['Tax rate: ', sourceElem.value, '%'].join(''));

    //document.getElementById('taxRateLabel')[0].innerHTML = ['Tax rate: ', document.getElementById('taxRate')[0].value, '%'].join('');
    document.getElementById('taxRateLabel').innerHTML = ['Tax rate: ', document.getElementById('taxRate').value, '%'].join('');
    },
    resetItems : function(e) {
    for (var i = 0; i < this.spendKeys.length; i++) {
      var original = this['original' + this.spendKeys[i]];
     // $('#' + spendKeys[i])[0].value = original;
      document.getElementById(this.spendKeys[i]).value = original;
      this.setSpendRangeText(this.spendKeys[i], original, this[this.dataKeys[i]]);
    }
    //$('#taxRate')[0].value = this.originaltaxRate;
    document.getElementById('taxRate').value = this.originaltaxRate;
    this.onTaxUpdate();

    e.preventDefault();
    },
    cancel : function(e) {
    e.preventDefault();
    this._callback(true, null);

   // var toRemove = [budgetResetID, budgetOKID, 'taxRate',
     //               'roadRate', 'fireRate', 'policeRate'];

   // for (var i = 0, l = toRemove.length; i < l; i++)
   //   $('#' + toRemove[i]).off();

    this._toggleDisplay();
    },
    submit : function(e) {
    e.preventDefault();

    // Get element values
    var roadPercent =  document.getElementById('roadRate').value;//$('#roadRate')[0].value;
    var firePercent = document.getElementById('fireRate').value;//$('#fireRate')[0].value;
    var policePercent = document.getElementById('policeRate').value;//$('#policeRate')[0].value;
    var taxPercent = document.getElementById('taxRate').value;//$('#taxRate')[0].value;

    this._callback(false, {roadPercent: roadPercent, firePercent: firePercent,
                          policePercent: policePercent, taxPercent: taxPercent});

    //var toRemove = [budgetResetID, budgetCancelID, 'taxRate',
                 //   'roadRate', 'fireRate', 'policeRate'];



   // for (var i = 0, l = toRemove.length; i < l; i++)
    //  $('#' + toRemove[i]).off();

    this._toggleDisplay();
    },
    _toggleDisplay : function() {
    var opacityLayer = document.getElementById(this._opacityLayer);
    var budgetWindow = document.getElementById(this._budgetWindowID);
    //var opacityLayer = document.getElementById(this._opacityLayer);//$(this._opacityLayer);
    //opacityLayer = opacityLayer.length === 0 ? null : opacityLayer;
    //if (opacityLayer === null)
    //  throw new Error('Node ' + orig + ' not found');

   // var budgetWindow = document.getElementById(this._budgetWindowID);//$(this._budgetWindowID);
    //budgetWindow = budgetWindow.length === 0 ? null : budgetWindow;
   // if (budgetWindow === null)
     // throw new Error('Node ' + orig + ' not found');

  //  opacityLayer.toggle();
  //  budgetWindow.toggle();
    if(opacityLayer.style.display !== "block")opacityLayer.style.display = "block";
    else opacityLayer.style.display = "none";
    if(budgetWindow.style.display !== "block")budgetWindow.style.display = "block";
    else{ budgetWindow.style.display = "none"; }
    },
    open : function(callback, budgetData) {
       var _this = this;
    var i, elem;
    this._callback = callback;

    // Store max funding levels
    for (i = 0; i < this.dataKeys.length; i++) {
      if (budgetData[this.dataKeys[i]] === undefined)
        throw new Error('Missing budget data');
      this[this.dataKeys[i]] = budgetData[this.dataKeys[i]];
    }

    // Update form elements with percentages, and set up listeners
    for (i = 0; i < this.spendKeys.length; i++) {
      if (budgetData[this.spendKeys[i]] === undefined)
        throw new Error('Missing budget data');

      elem = this.spendKeys[i];
      this['original' + elem] = budgetData[elem];
      this.setSpendRangeText(elem, budgetData[this.spendKeys[i]], this[this.dataKeys[i]]);
      //elem = $('#' + elem);
      elem = document.getElementById(elem)
      elem.addEventListener( 'input', function(e) { _this.onFundingUpdate(_this, _this.spendKeys[i]); }, false );
      //elem.on('input', onFundingUpdate.bind(this, spendKeys[i]));
      //elem = elem[0];
      elem.value = budgetData[this.spendKeys[i]];
    }

    if (budgetData.taxRate === undefined)
      throw new Error('Missing budget data');

    this.originalTaxRate = budgetData.taxRate;
    //elem = $('#taxRate');
    elem = document.getElementById('taxRate')
    //elem.on('input', onTaxUpdate);

    elem.addEventListener( 'input', function(e) { _this.onTaxUpdate(e); }, false );
    //elem = elem[0];
    elem.value = budgetData.taxRate;
    this.onTaxUpdate();

    // Update static parts
    var previousFunds = budgetData.totalFunds;
    if (previousFunds === undefined)
      throw new Error('Missing budget data');

    var taxesCollected = budgetData.taxesCollected;
    if (taxesCollected === undefined)
      throw new Error('Missing budget data');

    var cashFlow = taxesCollected - this.roadFund - this.fireFund - this.policeFund;
    var currentFunds = previousFunds + cashFlow;
    /*$('#taxesCollected').text('$' + taxesCollected);
    $('#cashFlow').text((cashFlow < 0 ? '-$' : '$') + cashFlow);
    $('#previousFunds').text((previousFunds < 0 ? '-$' : '$') + previousFunds);
    $('#currentFunds').text('$' + currentFunds);*/

    document.getElementById('taxesCollected').innerHTML = '$' + taxesCollected;
    document.getElementById('cashFlow').innerHTML = (cashFlow < 0 ? '-$' : '$') + cashFlow;
    document.getElementById('previousFunds').innerHTML = (previousFunds < 0 ? '-$' : '$') + previousFunds;
    document.getElementById('currentFunds').innerHTML = '$' + currentFunds;

   // this._registerButtonListeners();
    this._toggleDisplay();
  }
}


//  return BudgetWindow;
//});

Micro.MapScanner = function (map, Sim) {
    this._map = map;
    this.mapHeight = this._map.height;
    this.mapWidth = this._map.width;
    this._actions = [];
    this.sim = Sim;
}

Micro.MapScanner.prototype = {
    constructor: Micro.MapScanner,
    addAction : function(criterion, action) {
        this._actions.push({criterion: criterion, action: action});
    },
    mapScan : function(startX, maxX, simData) {
        var y, x, i, id, tile, tileValue;
        y = this.mapHeight;
        while(y--){
           // x = maxX;
            //while(x==startX){
        //for (var y = 0; y < this._map.height; y++) {
            for (x = startX; x < maxX; x++) {
                
                id = x + y * this.mapWidth; //this._map._calculateIndex(x, y);
               // if (!(id in this._map.data)) this._map.data[id] = new Micro.Tile(this._map.defaultValue);
                tile = this._map.data[id] || new Micro.Tile();
                tileValue = tile.getValue();

                //tile = this._map.getTile(x, y);
                //tileValue = tile.getValue();

                //var tile = this._map.getTile(x, y);
                //var tileValue = tile.getValue();

                if (tileValue < Tile.FLOOD) continue;
                if (tile.isConductive()) this.sim.powerManager.setTilePower(x, y);
                if (tile.isZone()) {
                    this.sim.repairManager.checkTile(x, y, this.sim._cityTime);
                    //var powered = tile.isPowered();
                    if (tile.isPowered()) this.sim.census.poweredZoneCount += 1;
                    else this.sim.census.unpoweredZoneCount += 1;
                }
                i = this._actions.length;
                while(i--){
                //for (var i = 0, l = this._actions.length; i < l; i++) {
                    var current = this._actions[i];
                    var callable = Micro.isCallable(current.criterion);
                    if (callable && current.criterion.call(null, tile)) {
                        current.action.call(null, this._map, x, y, null);
                        break;
                    } else if (!callable && current.criterion === tileValue) {
                        current.action.call(null, this._map, x, y, null);
                        break;
                    }
                }
            }
        }
    }
}




Micro.PowerManager = function (map, SIM) {
    this.sim = SIM;
    this._map = map;
    this._powerStack = [];
    this.powerGridMap = new Micro.BlockMap(this._map.width, this._map.height, 1, 0);
}

Micro.PowerManager.prototype = {
    constructor: Micro.PowerManager,
    setTilePower : function(x, y) {
        var tile = this._map.getTile(x, y);
        var tileValue = tile.getValue();

        if (tileValue === Tile.NUCLEAR || tileValue === Tile.POWERPLANT || this.powerGridMap.worldGet(x, y) > 0) {
            tile.addFlags(Tile.POWERBIT);
            return;
        }

        tile.removeFlags(Tile.POWERBIT);
    },
    clearPowerStack : function() {
        this._powerStackPointer = 0;
        this._powerStack = [];
    },
    testForConductive : function(pos, testDir) {
        var movedPos = new this._map.Position(pos);
        if (movedPos.move(testDir)) {
            if (this._map.getTile(movedPos.x, movedPos.y).isConductive()) {
                if (this.powerGridMap.worldGet(movedPos.x, movedPos.y) === 0)
                    return true;
            }
        }
        return false;
    },
    // Note: the algorithm is buggy: if you have two adjacent power
    // plants, the second will be regarded as drawing power from the first
    // rather than as a power source itself
    doPowerScan : function(census, messageManager) {
        // Clear power this._map.
        this.powerGridMap.clear();

        // Power that the combined coal and nuclear power plants can deliver.
        var maxPower = census.coalPowerPop * Micro.COAL_POWER_STRENGTH + census.nuclearPowerPop * Micro.NUCLEAR_POWER_STRENGTH;

        var powerConsumption = 0; // Amount of power used.

        while (this._powerStack.length > 0) {
            var pos = this._powerStack.pop();
            var anyDir = Direction.INVALID;
            var conNum;
            do {
                powerConsumption++;
            if (powerConsumption > maxPower) {
                messageManager.sendMessage(Messages.NOT_ENOUGH_POWER);
                return;
            }

            if (anyDir !== Direction.INVALID)
                pos.move(anyDir);

            this.powerGridMap.worldSet(pos.x, pos.y, 1);
            conNum = 0;
            var dir = Direction.BEGIN;

            while (dir < Direction.END && conNum < 2) {
                if (this.testForConductive(pos, dir)) {
                    conNum++;
                    anyDir = dir;
                }
                dir = Direction.increment90(dir);
            }
            if (conNum > 1) this._powerStack.push(new this._map.Position(pos));
            } while (conNum);
        }
    },
    coalPowerFound : function(map, x, y, simData) {
        this.sim.census.coalPowerPop += 1;
        this._powerStack.push(new map.Position(x, y));

        // Ensure animation runs
        var dX = [-1, 2, 1, 2];
        var dY = [-1, -1, 0, 0];

        for (var i = 0; i < 4; i++) map.addTileFlags(x + dX[i], y + dY[i], Tile.ANIMBIT); 
    },
    nuclearPowerFound : function(map, x, y, simData) {
        var meltdownTable = [30000, 20000, 10000];
        // TODO With the auto repair system, zone gets repaired before meltdown
        // In original Micropolis code, we bail and don't repair if melting down
        if (this.sim.disasterManager.disastersEnabled && Random.getRandom(meltdownTable[this.sim.gameLevel]) === 0) {
           // simData.disasterManager.doMeltdown(messageManager, x, y);
            return;
        }
        this.sim.census.nuclearPowerPop += 1;
        this._powerStack.push(new map.Position(x, y));
        //console.log(x, y, new map.Position(x, y))

        // Ensure animation bits set
        for (var i = 0; i < 4; i++)  map.addTileFlags(x, y, Tile.ANIMBIT | Tile.CONDBIT | Tile.POWERBIT | Tile.BURNBIT);
    },
    registerHandlers : function(mapScanner, repairManager) {
        mapScanner.addAction(Tile.POWERPLANT, this.coalPowerFound.bind(this));
        mapScanner.addAction(Tile.NUCLEAR, this.nuclearPowerFound.bind(this));
        repairManager.addAction(Tile.POWERPLANT, 7, 4);
        repairManager.addAction(Tile.NUCLEAR, 7, 4);
    }
}

// var dX = [1, 2, 1, 2];
//  var dY = [-1, -1, 0, 0];

Micro.RepairManager = function (map) {
    this._map = map;
    this._actions = [];
}

Micro.RepairManager.prototype = {
    constructor: Micro.RepairManager,
    addAction : function(criterion, period, zoneSize) {
        this._actions.push({criterion: criterion, period: period, zoneSize: zoneSize});
    },
    repairZone : function(x, y, zoneSize) {
        var centre = this._map.getTileValue(x, y);
        var tileValue = centre - zoneSize - 2;
        for (var yy = -1; yy < zoneSize - 1; yy++) {
            for (var xx = -1; xx < zoneSize - 1; xx++) {
                tileValue++;

                var current = this._map.getTile(x + xx, y + yy);
                if (current.isZone() || current.isAnimated())
                  continue;

                var currentValue = current.getValue();
                if (currentValue < Tile.RUBBLE || currentValue >= Tile.ROADBASE)
                  this._map.setTo(x + xx, y + yy, new Micro.Tile(tileValue, Tile.CONDBIT | Tile.BURNBIT));
            }
        }
    },
    checkTile : function(x, y, cityTime) {
        for (var i = 0, l = this._actions.length; i < l; i++) {
            var current = this._actions[i];
            var period = current.period;
          
            if ((cityTime & period) !== 0) continue;

            var tile = this._map.getTile(x, y);
            var tileValue = tile.getValue();

            var callable = Micro.isCallable(current.criterion);
            if (callable && current.criterion.call(null, tile)) this.repairZone(x, y, current.zoneSize);
            else if (!callable && current.criterion === tileValue) this.repairZone(x, y, current.zoneSize);
        }
    }
}

Micro.vulnerable = function(tile) {
    var tileValue = tile.getValue();
    if (tileValue < Tile.RESBASE || tileValue > Tile.LASTZONE || tile.isZone()) return false;
    return true;
};

Micro.DisasterManager = function (map, spriteManager, gameLevel) {
    this._map = map;
    this._spriteManager = spriteManager;
    this._gameLevel = gameLevel;

    this._floodCount = 0;
    this.DisChance = [4800, 2400, 60];
    this.Dx = [ 0, 1, 0, -1];
    this.Dy = [-1, 0, 1, 0];

    // TODO enable disasters
    Object.defineProperty(this, 'disastersEnabled', Micro.makeConstantDescriptor(false));
}

Micro.DisasterManager.prototype = {

    constructor: Micro.DisasterManager,

    doDisasters : function(census, messageManager) {
        if (this._floodCount) this._floodCount--;

        // TODO Scenarios

        if (!this.disastersEnabled) return;


        if (Random.getRandom(this.DisChance[this._gameLevel])) {
          switch (Random.getRandom(8)) {
            case 0:
            case 1:
              this.setFire(messageManager);
              break;

            case 2:
            case 3:
              this.makeFlood(messageManager);
              break;

            case 4:
              break;

            case 5:
              this._spriteManager.makeTornado(messageManager);
              break;

            case 6:
              // TODO Earthquakes
              //this.makeEarthquake();
              break;

            case 7:
            case 8:
              if (census.pollutionAverage > 60)
                this._spriteManager.makeMonster(messageManager);
              break;
          }
        }
    },
    scenarioDisaster : function() {
    // TODO Scenarios
    },
    // User initiated meltdown: need to find the plant first
    makeMeltdown : function(messageManager) {
        for (var x = 0; x < (this._map.width - 1); x++) {
          for (var y = 0; y < (this._map.height - 1); y++) {
            if (this._map.getTileValue(x, y) === Tile.NUCLEAR) {
              this.doMeltdown(messageManager, x, y);
              return;
            }
          }
        }
    },
    makeEarthquake : function(messageManager) {
        var strength = Random.getRandom(700) + 300;
        this.doEarthquake(strength);

        messageManager.sendMessage(Messages.EARTHQUAKE, {x: this._map.cityCenterX, y: this._map.cityCenterY});

        for (var i = 0; i < strength; i++)  {
          var x = Random.getRandom(this._map.width - 1);
          var y = Random.getRandom(this._map.height - 1);

          if (Micro.vulnerable(this._map.getTile(x, y))) {
            if ((i & 0x3) !== 0)
              this._map.setTo(x, y, Micro.randomRubble());
            else
              this._map.setTo(x, y, Micro.randomFire());
          }
        }
    },
    setFire : function(messageManager, times, zonesOnly) {
        times = times || 1;
        zonesOnly = zonesOnly || false;

        for (var i = 0; i < times; i++) {
          var x = Random.getRandom(this._map.width - 1);
          var y = Random.getRandom(this._map.height - 1);
          var tile = this._map.getTile(x, y);

          if (!tile.isZone()) {
            tile = tile.getValue();
            var lowerLimit = zonesOnly ? Tile.LHTHR : Tile.TREEBASE;
            if (tile > lowerLimit && tile < Tile.LASTZONE) {
              this._map.setTo(x, y, Micro.randomFire());
              messageManager.sendMessage(Messages.FIRE_REPORTED, {x: x, y: y});
              return;
            }
          }
        }
    },
    makeCrash : function(messageManager) {
        var s = this._spriteManager.getSprite(Micro.SPRITE_AIRPLANE);
        //var s = this._spriteManager.getSprite(Micro.SPRITE_PLANE);
        if (s !== null) {
          s.explodeSprite(messageManager);
          return;
        }

        var x = Random.getRandom(this._map.width - 1);
        var y = Random.getRandom(this._map.height - 1);
        this._spriteManager.generatePlane(x, y);
        s = this._spriteManager.getSprite(Micro.SPRITE_AIRPLANE);
        s.explodeSprite(messageManager);
    },
    makeFire : function(messageManager) {
        this.setFire(messageManager, 40, false);
    },
    makeFlood : function(messageManager) {
        for (var i = 0; i < 300; i++) {
          var x = Random.getRandom(this._map.width - 1);
          var y = Random.getRandom(this._map.height - 1);
          var tileValue = this._map.getTileValue(x, y);

          if (tileValue > Tile.CHANNEL && tileValue <= Tile.WATER_HIGH) {
            for (var j = 0; j < 4; j++) {
              var xx = x + this.Dx[j];
              var yy = y + this.Dy[j];

              if (!this._map.testBounds(xx, yy))
                continue;

              var tile = this._map.getTile(xx, yy);
              tileValue = tile.getValue();

              if (tile === Tile.DIRT || (tile.isBulldozable() && tile.isCombustible)) {
                this._map.setTo(xx, yy, new Tile(Tile.FLOOD));
                this._floodCount = 30;
                messageManager.sendMessage(Messages.FLOODING_REPORTED, {x: xx, y: yy});
                return;
              }
            }
          }
        }
    },
    doFlood : function(x, y, blockMaps) {
        if (this._floodCount > 0) {
          // Flood is not over yet
          for (var i = 0; i < 4; i++) {
            if (Random.getChance(7)) {
              var xx = x + this.Dx[i];
              var yy = y + this.Dy[i];

              if (this._map.testBounds(xx, yy)) {
                var tile = this._map.getTile(xx, yy);
                var tileValue = tile.getValue();

                if (tile.isCombustible() || tileValue === Tile.DIRT ||
                    (tileValue >= Tile.WOODS5 && tileValue < Tile.FLOOD)) {
                  if (tile.isZone())
                    Micro.fireZone(this.map, xx, yy, blockMaps);

                  this._map.setTo(xx, yy, new Tile(Tile.FLOOD + Random.getRandom(2)));
                }
              }
            }
          }
        } else {
          if (Random.getChance(15))
            this._map.setTo(x, y, new Tile(Tile.DIRT));
        }
    },
    doMeltdown : function(messageManager, x, y) {
        this._spriteManager.makeExplosion(x - 1, y - 1);
        this._spriteManager.makeExplosion(x - 1, y + 2);
        this._spriteManager.makeExplosion(x + 2, y - 1);
        this._spriteManager.makeExplosion(x + 2, y + 2);

        var dY, dX;

        // Whole power plant is at fire
        for (dX = x - 1; dX < x + 3; dX++) {
          for (dY = y - 1; dY < y + 3; dY++) {
            this._map.setTo(dX, dY, Micro.randomFire());
          }
        }

        // Add lots of radiation tiles around the plant
        for (var i = 0; i < 200; i++)  {
          dX = x - 20 + Random.getRandom(40);
          dY = y - 15 + Random.getRandom(30);

          if (!this._map.testBounds(dX, dY))
            continue;

          var tile = this._map.getTile(dX, dY);

          if (tile.isZone())
              continue;

          if (tile.isCombustible() || tile.getValue() === Tile.DIRT)
              this._map.setTo(dX, dY, new Tile(Tile.RADTILE));
        }

        // Report disaster to the user
        messageManager.sendMessage(Messages.NUCLEAR_MELTDOWN, {x: x, y: y});
    }

}


Micro.InputStatus = function(map){
    this.gameTools = new Micro.GameTools(map);
    this.canvas = document.getElementById(Micro.DEFAULT_ID);

    // Tool clicks
    this.clickX = -1;
    this.clickY = -1;

    // Keyboard Movement
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;

    // Mouse movement
    this.mouseX = -1;
    this.mouseY = -1;

    // Tool buttons
    this.toolName = null;
    this.currentTool = null;
    this.toolWidth = 0;
    this.toolColour = '';

    // Other buttons
    this.budgetRequested = false;
    this.evalRequested = false;
    this.disasterRequested = false;

    // Speed
    this.speedChangeRequested = false;
    this.requestedSpeed = null;

    this.bindKeys();

    var _this = this;
    this.canvas.addEventListener( 'mouseenter', function(e) { _this.mouseEnterHandler(e); }, false );
    this.canvas.addEventListener( 'mouseleave', function(e) { _this.mouseLeaveHandler(e); }, false );

    var bb = document.getElementsByClassName('toolButton');
    for(var i=0; i<bb.length; i++){
        bb[i].addEventListener( 'click', function(e) { _this.toolButtonHandler(e); }, false );
        bb[i].addEventListener( 'mouseover', function(e) { _this.toolButtonOver(e); }, false );
    }

    document.getElementById('evalRequest').addEventListener( 'click', function(e) { _this.evalHandler(e); } , false );
    document.getElementById('budgetRequest').addEventListener( 'click', function(e) { _this.budgetHandler(e); } , false );
    document.getElementById('disasterRequest').addEventListener( 'click', function(e) { _this.disasterHandler(e); } , false );
    document.getElementById('pauseRequest').addEventListener( 'click', function(e) { _this.speedChangeHandler(e); } , false );
}

Micro.InputStatus.prototype = {

    constructor: Micro.InputStatus,

    bindKeys : function() {
        var _this = this;
        document.onkeydown = function(e) {
            e = e || window.event;
            var handled = false;
            if (e.keyCode == 38) { _this.up = true; handled = true; }
            else if (e.keyCode == 40) { _this.down = true; handled = true; } 
            else if (e.keyCode == 39) { _this.right = true; handled = true; } 
            else if (e.keyCode == 37) { _this.left = true; handled = true; }
            if (handled) e.preventDefault();
        };
        document.onkeyup = function(e) {
            e = e || window.event;
            if (e.keyCode == 38) _this.up = false;
            if (e.keyCode == 40) _this.down = false;
            if (e.keyCode == 39) _this.right = false;
            if (e.keyCode == 37) _this.left = false;
        };
        // self.focus()
    },
    clickHandled : function() {
        this.clickX = -1;
        this.clickY = -1;
        this.currentTool.clear();
    },
    getRelativeCoordinates : function(e) {
        var rect = this.canvas.getBoundingClientRect();
        var dx = window.innerWidth-200;
        var x;
        var y;
        if (e.x !== undefined && e.y !== undefined) {
            x = e.x- rect.left;
            y = e.y- rect.top;
        } else {
            x = e.clientX -  rect.left;//+ 0;
            y = e.clientY - rect.top;
        }
        return {x: x, y: y};
    },
    speedChangeHandled : function() {
        this.speedChangeRequested = false;
        this.requestedSpeed = null;
    },
    speedChangeHandler : function(e) {
        this.speedChangeRequested = true;
        var requestedSpeed = document.getElementById('pauseRequest').innerHTML;
        var newRequest = requestedSpeed === 'Pause' ? 'Play' : 'Pause';
        document.getElementById('pauseRequest').innerHTML=newRequest;
    },
    mouseEnterHandler : function(e) {
        var _this = this;
        this.canvas.addEventListener( 'mousemove', function(e) { _this.mouseMoveHandler(e); }, false );
        this.canvas.addEventListener( 'click', function(e) { _this.canvasClickHandler(e); }, false );
    },
    mouseLeaveHandler : function(e) {
        var _this = this;
        this.canvas.removeEventListener( 'mousemove', function(e) { _this.mouseMoveHandler(e); }, false );
        this.canvas.removeEventListener( 'click', function(e) { _this.canvasClickHandler(e); }, false );
        this.mouseX = -1;
        this.mouseY = -1;
    },
    mouseMoveHandler : function(e) {
        var coords = this.getRelativeCoordinates(e);
        this.mouseX = coords.x;
        this.mouseY = coords.y;
    },
    canvasClickHandler : function(e) {
        this.clickX = this.mouseX;
        this.clickY = this.mouseY;
        e.preventDefault();
    },
    toolButtonOver : function(e) {
        var name = e.target.getAttribute("data-tool");
        var price = e.target.getAttribute("data-price");
        if(price == 0){ price = ""; name = "info"}
        else price += "$";
        document.getElementById('buttonsInfos').innerHTML = name +" "+ price;
    },
    toolButtonHandler : function(e) {
        var bb = document.getElementsByClassName('selected');
        for(var i=0; i<bb.length; i++){
            bb[i].className = bb[i].className.replace("selected", "unselected");
        }
        e.target.className = e.target.className.replace("unselected", "selected");
        this.toolName = e.target.getAttribute("data-tool");
        this.toolWidth = e.target.getAttribute("data-size");
        this.currentTool = this.gameTools[this.toolName];
        this.toolColour = e.target.getAttribute("data-colour");
        e.preventDefault();
    },
    disasterHandler : function(e) {
        this.disasterRequested = true;
    },
    evalHandler : function(e) {
        this.evalRequested = true;
    },
    budgetHandler : function(e) {
        this.budgetRequested = true;
    },
    evalHandled : function(e) {
        this.evalRequested = false;
    },
    disasterHandled : function(e) {
        this.disasterRequested = false;
    },
    budgetHandled : function(e) {
        this.budgetRequested = false;
    }
}

Micro.Traffic = function(map, spriteManager) {
    this._map = map;
    this._stack = [];
    this._spriteManager = spriteManager;
}

Micro.Traffic.prototype = {

    constructor: Micro.Traffic,

    makeTraffic : function(x, y, blockMaps, destFn) {
        this._stack = [];

        var pos = new this._map.Position(x, y);

        if (this.findPerimeterRoad(pos)) {
            if (this.tryDrive(pos, destFn)) {
                this.addToTrafficDensityMap(blockMaps);
                return Micro.ROUTE_FOUND;
            }
            return Micro.NO_ROUTE_FOUND;
        } else {
            return Micro.NO_ROAD_FOUND;
        }
    },
    addToTrafficDensityMap : function(blockMaps) {
        var trafficDensityMap = blockMaps.trafficDensityMap;

        while (this._stack.length > 0) {
            var pos = this._stack.pop();

            // Could this happen?!?
            if (!this._map.testBounds(pos.x, pos.y)) continue;

            var tileValue = this._map.getTileValue(pos.x, pos.y);

            if (tileValue >= Tile.ROADBASE && tileValue < Tile.POWERBASE) {
                // Update traffic density.
                var traffic = trafficDensityMap.worldGet(pos.x, pos.y);
                traffic += 50;
                traffic = Math.min(traffic, 240);
                trafficDensityMap.worldSet(pos.x, pos.y, traffic);

                // Attract traffic copter to the traffic
                if (traffic >= 240 && Random.getRandom(5) === 0) {
                    var sprite = this._spriteManager.getSprite(Micro.SPRITE_HELICOPTER);
                    if (sprite !== null) {
                        sprite.destX = Micro.worldToPix(pos.x);
                        sprite.destY = Micro.worldToPix(pos.y);
                    }
                }
            }
        }
    },
    findPerimeterRoad : function(pos) {
        for (var i = 0; i < 12; i++) {
          var xx = pos.x + Micro.perimX[i];
          var yy = pos.y + Micro.perimY[i];

            if (this._map.testBounds(xx, yy)) {
                if (Micro.isDriveable(this._map.getTileValue(xx, yy))) {
                    pos.x = xx;
                    pos.y = yy;
                    return true;
                }
            }
        }
        return false;
    },
    tryDrive : function(startPos, destFn) {
        var dirLast = Direction.INVALID;
        var drivePos = new this._map.Position(startPos);

        /* Maximum distance to try */
        for (var dist = 0; dist < Micro.MAX_TRAFFIC_DISTANCE; dist++) {
            var  dir = this.tryGo(drivePos, dirLast);
            if (dir != Direction.INVALID) {
                drivePos.move(dir);
                dirLast = Direction.rotate180(dir);
                if (dist & 1) this._stack.push(new this._map.Position(drivePos));
                if (this.driveDone(drivePos, destFn)) return true;
            } else {
                if (this._stack.length > 0) {
                    this._stack.pop();
                    dist += 3;
                } else {
                    return false;
                }
            }
        }
        return false;
    },
    tryGo : function(pos, dirLast) {
        var  directions = [];
        // Find connections from current position.
        var dir = Direction.NORTH;
        var count = 0;
        for (var i = 0; i < 4; i++) {
            if (dir != dirLast && Micro.isDriveable(this._map.getTileFromMapOrDefault(pos, dir, Tile.DIRT))) {
                // found a road in an allowed direction
                directions[i] = dir;
                count++;
            } else {
                directions[i] = Direction.INVALID;
            }
            dir = Direction.rotate90(dir);
        }
        if (count === 0) return Direction.INVALID;
        if (count === 1) {
            for (i = 0; i < 4; i++) {
                if (directions[i] != Direction.INVALID) return directions[i];
            }
        }
        i = Random.getRandom16() & 3;
        while (directions[i] === Direction.INVALID) i = (i + 1) & 3;
        return directions[i];
    },
    driveDone : function(pos, destFn) {
        if (pos.y > 0) { if (destFn(this._map.getTileValue(pos.x, pos.y - 1))) return true; }
        if (pos.x < (this._map.width - 1)) { if (destFn(this._map.getTileValue(pos.x + 1, pos.y))) return true; }
        if (pos.y < (this._map.height - 1)) { if (destFn(this._map.getTileValue(pos.x, pos.y + 1)))  return true; }
        if (pos.x > 0) { if (destFn(this._map.getTileValue(pos.x - 1, pos.y))) return true; }
        return false;
    }
}

Micro.toKey = function(x, y) {
    return [x, y].join(',');
}

Micro.TileHistory = function(){
    this.data = {};
}

Micro.TileHistory.prototype = {

    constructor: Micro.TileHistory,
    
    getTile : function(x, y) {
        var key = Micro.toKey(x, y);
        return this.data[key];
    },
    setTile : function(x, y, value) {
        var key = Micro.toKey(x, y);
        this.data[key] = value;
    }
}


Micro.AnimationManager = function(map, animationPeriod, blinkPeriod){

    animationPeriod = animationPeriod || 5;
    blinkPeriod = blinkPeriod || 30;

    this._map = map;
    this.animationPeriod = animationPeriod;
    this.blinkPeriod = blinkPeriod;
    this.shouldBlink = false;
    this.count = 1;

    // When painting we keep track of what frames
    // have been painted at which map coordinates so we can
    // consistently display the correct frame even as the
    // canvas moves
    this._lastPainted = null;

    this._data = [];
    this.initArray();
    this.registerAnimations();
}

Micro.AnimationManager.prototype = {

    constructor: Micro.AnimationManager,

    initArray : function() {
        // Map all tiles to their own value in case we ever
        // look up a tile that is not animated
        for (var i = 0; i < Tile.TILE_COUNT; i++) this._data[i] = i;
    },
    inSequence : function(tileValue, lastValue) {
        // It is important that we use the base value as the starting point
        // rather than the last painted value: base values often don't recur
        // in their sequences
        var seen = [tileValue];
        var current = this._data[tileValue];

        while (seen.indexOf(current) === -1) {
            if (current === lastValue) return true;

            seen.push(current);
            current = this._data[current];
        }
        return false;
    },
    getTiles : function(startX, startY, boundX, boundY, isPaused) {
        isPaused = isPaused || false;

        var shouldChangeAnimation = false;
        if (!isPaused)
          this.count += 1;

        if ((this.count % this.blinkPeriod) === 0)
          this.shouldBlink = !this.shouldBlink;

        if ((this.count % this.animationPeriod) === 0 && !isPaused)
          shouldChangeAnimation = true;

        var newPainted = new Micro.TileHistory();
        var tilesToPaint = [];

        for (var x = startX; x < boundX; x++) {
            for (var y = startY; y < boundY; y++) {
                if (x < 0 || x >= this._map.width || y < 0 || y >= this._map.height) continue;

                var tile = this._map.getTile(x, y);
                if (tile.isZone() && !tile.isPowered() && this.shouldBlink) {
                    tilesToPaint.push({x: x, y: y, tileValue: Tile.LIGHTNINGBOLT});
                    continue;
                }

                if (!tile.isAnimated()) continue;

                var tileValue = tile.getValue();
                var newTile = Tile.TILE_INVALID;
                var last;
                if (this._lastPainted)
                  last = this._lastPainted.getTile(x, y);

                if (shouldChangeAnimation) {
                    // Have we painted any of this sequence before? If so, paint the next tile
                    if (last && this.inSequence(tileValue, last)) { 
                        newTile = this._data[last];
                    } else {
                        // Either we haven't painted anything here before, or the last tile painted
                        // there belongs to a different tile's animation sequence
                        newTile = this._data[tileValue];
                    }
                } else {
                    // Have we painted any of this sequence before? If so, paint the same tile
                    if (last && this.inSequence(tileValue, last)) newTile = last;
                }

                if (newTile === Tile.TILE_INVALID) continue;

                tilesToPaint.push({x: x, y: y, tileValue: newTile});
                newPainted.setTile(x, y, newTile);
            }
        }
        this._lastPainted = newPainted;
        return tilesToPaint;
    },
    registerSingleAnimation : function(arr) {
        for (var i = 1; i < arr.length; i++) this._data[arr[i - 1]] = arr[i];
    },
    registerAnimations : function() {
        this.registerSingleAnimation([56, 57, 58, 59, 60, 61, 62, 63, 56]);
        this.registerSingleAnimation([80, 128, 112, 96, 80]);
        this.registerSingleAnimation([81, 129, 113, 97, 81]);
        this.registerSingleAnimation([82, 130, 114, 98, 82]);
        this.registerSingleAnimation([83, 131, 115, 99, 83]);
        this.registerSingleAnimation([84, 132, 116, 100, 84]);
        this.registerSingleAnimation([85, 133, 117, 101, 85]);
        this.registerSingleAnimation([86, 134, 118, 102, 86]);
        this.registerSingleAnimation([87, 135, 119, 103, 87]);
        this.registerSingleAnimation([88, 136, 120, 104, 88]);
        this.registerSingleAnimation([89, 137, 121, 105, 89]);
        this.registerSingleAnimation([90, 138, 122, 106, 90]);
        this.registerSingleAnimation([91, 139, 123, 107, 91]);
        this.registerSingleAnimation([92, 140, 124, 108, 92]);
        this.registerSingleAnimation([93, 141, 125, 109, 93]);
        this.registerSingleAnimation([94, 142, 126, 110, 94]);
        this.registerSingleAnimation([95, 143, 127, 111, 95]);
        this.registerSingleAnimation([144, 192, 176, 160, 144]);
        this.registerSingleAnimation([145, 193, 177, 161, 145]);
        this.registerSingleAnimation([146, 194, 178, 162, 146]);
        this.registerSingleAnimation([147, 195, 179, 163, 147]);
        this.registerSingleAnimation([148, 196, 180, 164, 148]);
        this.registerSingleAnimation([149, 197, 181, 165, 149]);
        this.registerSingleAnimation([150, 198, 182, 166, 150]);
        this.registerSingleAnimation([151, 199, 183, 167, 151]);
        this.registerSingleAnimation([152, 200, 184, 168, 152]);
        this.registerSingleAnimation([153, 201, 185, 169, 153]);
        this.registerSingleAnimation([154, 202, 186, 170, 154]);
        this.registerSingleAnimation([155, 203, 187, 171, 155]);
        this.registerSingleAnimation([156, 204, 188, 172, 156]);
        this.registerSingleAnimation([157, 205, 189, 173, 157]);
        this.registerSingleAnimation([158, 206, 190, 174, 158]);
        this.registerSingleAnimation([159, 207, 191, 175, 159]);
        this.registerSingleAnimation([621, 852, 853, 854, 855, 856, 857, 858, 859, 852]);
        this.registerSingleAnimation([641, 884, 885, 886, 887, 884]);
        this.registerSingleAnimation([644, 888, 889, 890, 891, 888]);
        this.registerSingleAnimation([649, 892, 893, 894, 895, 892]);
        this.registerSingleAnimation([650, 896, 897, 898, 899, 896]);
        this.registerSingleAnimation([676, 900, 901, 902, 903, 900]);
        this.registerSingleAnimation([677, 904, 905, 906, 907, 904]);
        this.registerSingleAnimation([686, 908, 909, 910, 911, 908]);
        this.registerSingleAnimation([689, 912, 913, 914, 915, 912]);
        this.registerSingleAnimation([747, 916, 917, 918, 919, 916]);
        this.registerSingleAnimation([748, 920, 921, 922, 923, 920]);
        this.registerSingleAnimation([751, 924, 925, 926, 927, 924]);
        this.registerSingleAnimation([752, 928, 929, 930, 931, 928]);
        this.registerSingleAnimation([820, 952, 953, 954, 955, 952]);
        this.registerSingleAnimation([832, 833, 834, 835, 836, 837, 838, 839, 832]);
        this.registerSingleAnimation([840, 841, 842, 843, 840]);
        this.registerSingleAnimation([844, 845, 846, 847, 848, 849, 850, 851, 844]);
        this.registerSingleAnimation([932, 933, 934, 935, 936, 937, 938, 939, 932]);
        this.registerSingleAnimation([940, 941, 942, 943, 944, 945, 946, 947, 940]);
    }

}


Micro.GameCanvas = function(id, parentNode, width, height) {

    this._canvas = document.createElement('canvas');
    this._canvas.id = Micro.DEFAULT_ID;
    this._canvas.width = Micro.DEFAULT_WIDTH;
    this._canvas.height = Micro.DEFAULT_HEIGHT;

    // We will set this for real after a successful init
    this._justConstructed = false;
    this._moved = false;
    this._pendingTileSet = null;

    parentNode = document.getElementById("canvasContainer");
    parentNode.appendChild(this._canvas);

    this.ready = false;
}

Micro.GameCanvas.prototype = {

    constructor: Micro.GameCanvas,

    init : function(map, tileSet, spriteSheet) {
        var e = new Error('Invalid parameter');
        if (arguments.length < 3) throw e;
        if (!tileSet.loaded) throw new Error('TileSet not ready!');


        this._spriteSheet = spriteSheet;
        this._tileSet = tileSet;
        var w = this._tileSet.tileWidth;
        this._map = map;
        this._animationManager = new Micro.AnimationManager(map);

        if (this._canvas.width < w || this._canvas.height < w) throw new Error('Canvas too small!');

        this._calculateMaximaAndMinima();

        // Order is important here. ready must be set before the call to centreOn below
        this.ready = true;
        this.centreOn(Math.floor(this._map.width / 2), Math.floor(this._map.height / 2));

        this._justConstructed = true;
        this.paint(null, null);
    },
    _calculateMaximaAndMinima : function() {
        var w = this._tileSet.tileWidth;
        this.minX = 0 - Math.ceil(Math.floor(this._canvas.width/w) / 2);
        this.maxX = (this._map.width - 1) - Math.ceil(Math.floor(this._canvas.width/w) / 2);
        this.minY = 0 - Math.ceil(Math.floor(this._canvas.height/w) / 2);
        this.maxY = (this._map.height - 1) - Math.ceil(Math.floor(this._canvas.height/w) / 2);
        this._wholeTilesInViewX = Math.floor(this._canvas.width / w);
        this._wholeTilesInViewY = Math.floor(this._canvas.height / w);
        this._totalTilesInViewX = Math.ceil(this._canvas.width / w);
        this._totalTilesInViewY = Math.ceil(this._canvas.height / w);
    },
    moveNorth : function() {
        if (!this.ready) throw new Error("Not ready!");
        if (this._originY > this.minY) {
            this._moved = true;
            this._originY--;
        }
    },
    moveEast : function() {
        if (!this.ready) throw new Error("Not ready!");
        if (this._originX < this.maxX) {
            this._moved = true;
            this._originX++;
        }
    },
    moveSouth : function() {
        if (!this.ready) throw new Error("Not ready!");
        if (this._originY < this.maxY) {
            this._moved = true;
            this._originY++;
        }
    },
    moveWest : function() {
        if (!this.ready) throw new Error("Not ready!");
        if (this._originX > this.minX) {
            this._moved = true;
            this._originX--;
        }
    },
    moveTo : function(x, y) {
        var e = new Error('Invalid parameter');
        if (arguments.length < 1) throw e;
        if (!this.ready) throw new Error("Not ready!");
        if (x < this.minX || x > this.maxX || y < this.minY || y > this.maxY) throw new Error('Coordinates out of bounds');

        this._originX = x;
        this._originY = y;
        this._moved = true;
    },
    centreOn : function(x, y) {
        var e = new Error('Invalid parameter');
        if (arguments.length < 1) throw e;
        if (!this.ready) throw new Error("Not ready!");

        if (y === undefined) {
            y = x.y;
            x = x.x;
        }
        this._originX = Math.floor(x) - Math.ceil(this._wholeTilesInViewX / 2);
        this._originY = Math.floor(y) - Math.ceil(this._wholeTilesInViewY / 2);
        this._moved = true;
    },
    getTileOrigin : function() {
        var e = new Error('Not ready!');
        if (!this.ready) throw e;
        return {x: this._originX, y: this._originY};
    },
    getMaxTile : function() {
        var e = new Error('Not ready!');
        if (!this.ready) throw e;
        return {x: this._originX + this._totalTilesInViewX - 1, y: this._originY + this._totalTilesInViewY - 1};
    },
    canvasCoordinateToTileOffset : function(x, y) {
        var e = new Error('Invalid parameter');
        if (arguments.length < 2) throw e;
        if (!this.ready) throw new Error("Not ready!");
        return {x: Math.floor(x / this._tileSet.tileWidth), y: Math.floor(y / this._tileSet.tileWidth)};
    },
    canvasCoordinateToTileCoordinate : function(x, y) {
        var e = new Error('Invalid parameter');
        if (arguments.length < 2) throw e;
        if (!this.ready) throw new Error("Not ready!");
        if (x >= this._canvas.width || y >= this._canvas.height) return null;
        return {x: this._originX + Math.floor(x/this._tileSet.tileWidth), y: this._originY + Math.floor(y/this._tileSet.tileWidth)};
    },
    canvasCoordinateToPosition : function(x, y) {
        var e = new Error('Invalid parameter');
        if (arguments.length < 2) throw e;
        if (!this.ready) throw new Error("Not ready!");
        if (x >= this._canvas.width || y >= this._canvas.height) return null;
        x = this._originX + Math.floor(x / this._tileSet.tileWidth);
        y = this._originY + Math.floor(y / this._tileSet.tileWidth);
        if (x < 0 || x >= this._map.width || y < 0 || y >= this._map.height) return null;
        return new this._map.Position(x, y);
    },
    positionToCanvasCoordinate : function(p) {
        var e = new Error('Invalid parameter');
        if (arguments.length < 1) throw e;
        return this.tileToCanvasCoordinate(p);
    },
    tileToCanvasCoordinate : function(x, y) {
        var e = new Error('Invalid parameter');
        if (arguments.length < 1) throw e;
        if (!this.ready) throw new Error("Not ready!");
        if (y === undefined) {
            y = x.y;
            x = x.x;
        }

        if (x === undefined || y === undefined || x < this.minX || y < this.minY || x > (this.maxX + this._totalTilesInViewX - 1) || y > (this.maxY + this._totalTilesInViewY - 1)) throw e;
        if (x < this._originX || x >= this._originX + this._totalTilesInViewX || y < this._originY || y >= this._originY + this._totalTilesInViewY) return null;

        return {x: (x - this._originX) * this._tileSet.tileWidth, y: (y - this._originY) * this._tileSet.tileWidth};
    },
    changeTileSet : function(tileSet) {
        var e = new Error('Invalid parameter');
        if (arguments.length < 1) throw e;
        if (!this.ready) throw new Error("Not ready!");
        if (!tileSet.loaded) throw new Error('new tileset not loaded');
        if (this._pendingTileSet && (this._pendingHeight || this._pendingWidth)) throw new Error('dimensions have changed');

        var w = tileSet.tileWidth;
        var canvasWidth = this._pendingWidth === null ? this._canvas.width : this._pendingWidth;
        var canvasHeight = this._pendingHeight === null ? this._canvas.height : this._pendingHeight;

        if (canvasWidth < w || canvasHeight < w) throw new Error('canvas too small');

        this._pendingTileSet = tileSet;
    },
    takeScreenshot : function(onlyVisible) {
        var e = new Error('Invalid parameter');
        if (arguments.length < 1) throw e;
        if (!this.ready) throw new Error("Not ready!");
        if (onlyVisible) return this._canvas.toDataURL();

        var tempCanvas = document.createElement('canvas');
        tempCanvas.width = this._map.width * this._tileSet.tileWidth;
        tempCanvas.height = this._map.height * this._tileSet.tileWidth;

        for (var x = 0; x < this._map.width; x++) {
            for (var y = 0; y < this._map.height; y++) {
                this._paintTile(this._map.getTileValue(x, y), x * this._tileSet.tileWidth, y * this._tileSet.tileWidth, tempCanvas);
            }
        }
        return tempCanvas.toDataURL();
    },
    shoogle : function() {
        // TODO
    },
    _paintTile : function(tileVal, x, y, canvas) {
        canvas = canvas || this._canvas;
        var src = this._tileSet[tileVal];

        var ctx = canvas.getContext('2d');
        ctx.drawImage(src, x, y);
    },
    _paintVoid : function(x, y, w, h, col) {
        col = col || 'black';
        var ctx = this._canvas.getContext('2d');
        ctx.fillStyle = col;
        ctx.fillRect(x, y, w, h);
    },
    _getDataForPainting : function() {
        // Calculate bounds of tiles we're going to paint
        var xStart = this._originX;
        var yStart = this._originY;
        var xEnd = this._totalTilesInViewX;
        var yEnd = this._totalTilesInViewY;

        if (xStart < 0) {
          // Chop off number of tiles in void
          xEnd = xEnd + xStart;
          xStart = 0;
        }

        if (yStart < 0) {
          // Chop off number of tiles in void
          yEnd = yEnd + yStart;
          yStart = 0;
        }

        if (xStart + xEnd > this._map.width)
          xEnd = this._map.width - xStart;

        if (yStart + yEnd > this._map.height)
          yEnd = this._map.height - yStart;

        return {offsetX: xStart - this._originX,
                offsetY: yStart - this._originY,
                tileData: this._map.getTiles(xStart, yStart, xEnd, yEnd)};
    },
    _fullRepaint : function(paintData) {
        var ctx = this._canvas.getContext('2d');
        var start, end;

        // First, clear canvas
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

        // Paint any black voids
        if (this._originX < 0) this._paintVoid(0, 0, this._tileSet.tileWidth * (0 - this._originX), this._canvas.height);
        

        if (this._originX + this._totalTilesInViewX > this._map.width) {
           start = this.tileToCanvasCoordinate(this._map.width, this._originY).x;
            end = this._canvas.width - start;
            this._paintVoid(start, 0, end, this._canvas.height);
        }

        if (this._originY < 0) {
            this._paintVoid(0, 0, this._canvas.width, this._tileSet.tileWidth * (0 - this._originY));
        }

        if (this._originY + this._totalTilesInViewY > this._map.height) {
            start = this.tileToCanvasCoordinate(this._originX, this._map.height).x;
            end = this._canvas.height - start;
            this._paintVoid(0, start, this._canvas.width, end);
        }

        var xOffset = paintData.offsetX;
        var yOffset = paintData.offsetY;
        var tilesToPaint = paintData.tileData;

        for (var y = 0; y < tilesToPaint.length; y++) {
            var xs = tilesToPaint[y];
            for (var x = 0, l2 = xs.length; x < l2; x++) {
                this._paintTile(xs[x].getValue(), (x + xOffset) * this._tileSet.tileWidth, (y + yOffset) * this._tileSet.tileWidth);
            }
        }
    },
    _paintAnimatedTiles : function(isPaused) {
        var xMin = this._originX, xMax = xMin + this._totalTilesInViewX + 1;
        var yMin = this._originY, yMax = yMin + this._totalTilesInViewY + 1;

        var animatedTiles = this._animationManager.getTiles(xMin, yMin, xMax, yMax, isPaused);
        for (var i = 0, l = animatedTiles.length; i < l; i++) {
            var tile = animatedTiles[i];
            this._paintTile(tile.tileValue, (tile.x - xMin) * this._tileSet.tileWidth, (tile.y - yMin) * this._tileSet.tileWidth);
        }
    },


    _processSprites : function(spriteList) {
        var ctx = this._canvas.getContext('2d');
        for (var i = 0, l = spriteList.length; i < l; i++) {
            var sprite = spriteList[i];
            ctx.drawImage(this._spriteSheet,
                        (sprite.frame - 1) * 48,
                        (sprite.type - 1) * 48,
                        sprite.width,
                        sprite.width,
                        sprite.x + sprite.xOffset - this._originX * 16,
                        sprite.y + sprite.yOffset - this._originY * 16,
                        sprite.width,
                        sprite.width);
        }
    },


    _processMouse : function(mouse) {
        if (mouse.width === 0 || mouse.height === 0) return;

        // For outlines bigger than 2x2 (in either dimension) assume the mouse is offset by
        // one tile
        var mouseX = mouse.x;
        var mouseY = mouse.y;
        var mouseWidth = mouse.width;
        var mouseHeight = mouse.height;
        var options = {colour: mouse.colour, outline: true};

        if (mouseWidth > 2) mouseX -= 1;
        if (mouseHeight > 2) mouseY -= 1;

        var offMap = (this._originX + mouseX < 0 && this._originX + mouseX + mouseWidth <= 0) ||
                     (this._originY + mouseY < 0 && this._originY + mouseY + mouseHeight <= 0) ||
                     this._originX + mouseX >= this._map.width || this._originY + mouseY >= this._map.height;

        if (offMap) return;

        var pos = {x: mouseX * this._tileSet.tileWidth, y: mouseY * this._tileSet.tileWidth};
        var width = mouseWidth * this._tileSet.tileWidth;
        var height = mouseHeight * this._tileSet.tileWidth;
        Micro.MouseBox.draw(this._canvas, pos, width, height, options);
    },

    paint : function(mouse, sprites, isPaused) {
        var e = new Error('Invalid parameter');
        if (arguments.length < 2)  throw e;
        if (!this.ready) throw new Error("Not ready!");

        // Change tileSet if necessary
        var tileSetChanged = false;
        if (this._pendingTileSet !== null) {
            this._tileSet = this._pendingTileSet;
            this._pendingTileSet = null;
            tileSetChanged = true;
        }

        // Make any pending dimension changes to the canvas
        var dimensionsChanged = false;

        if (tileSetChanged || dimensionsChanged) this._calculateMaximaAndMinima();

        // TODO Selective repainting
        var needsFullPaint = true;
        if (this._justConstructed || this._moved || tileSetChanged) {
            this._justConstructed = false;
            this._moved = false;
            needsFullPaint = true;
        }

        var mapData = this._getDataForPainting();

        if (needsFullPaint) this._fullRepaint(mapData);
        this._paintAnimatedTiles(isPaused);
        if (mouse) this._processMouse(mouse);
        if (sprites) this._processSprites(sprites);
    }
}



Micro.copyFrom = function(sourceMap, sourceFn) {
    var mapFn = function(elem) { return sourceFn(elem); };
    //for (var y = 0, l = sourceMap.data.length; y < l; y++) this.data[y] = sourceMap.data[y].map(mapFn);
    var i = sourceMap.data.length; while(i--) this.data[i] = sourceMap.data[i].map(mapFn);
}

Micro.makeArrayOf = function(length, value) {
    //var result = [];
    //var result = new M_ARRAY_TYPE(length);
    var result = new Array(length);
   //for (var a = 0; a < length; a++) result[a] = value;
    var i = length; while(i--) result[i] = value;
    return result;
}

Micro.BlockMap = function(mapWidth, mapHeight, blockSize, defaultValue) {
    var sourceMap;
    var sourceFunction;
    var id = function(x) {return x;};

    var e = new Error('Invalid parameters');
    if (arguments.length < 3) { 
        if (!(mapWidth instanceof Micro.BlockMap) || (arguments.length === 2 && typeof(mapHeight) !== 'function')) throw e;
        sourceMap = mapWidth;
        sourceFunction = mapHeight === undefined ? id : mapHeight;
    }

    if (sourceMap !== undefined) {
        mapWidth = sourceMap.width;
        mapHeight = sourceMap.height;
        blockSize = sourceMap.blockSize;
        defaultValue = sourceMap.defaultValue;
    }

    Object.defineProperties(this,
        {mapWidth: Micro.makeConstantDescriptor(mapWidth),
        mapHeight: Micro.makeConstantDescriptor(mapHeight),
        width: Micro.makeConstantDescriptor(Math.floor((mapWidth  + 1) / blockSize)),
        height: Micro.makeConstantDescriptor(Math.floor((mapHeight + 1)/ blockSize)),
        blockSize: Micro.makeConstantDescriptor(blockSize),
        defaultValue: Micro.makeConstantDescriptor(defaultValue)}
    );

    this.data = [];

    if (sourceMap) Micro.copyFrom.call(this, sourceMap, sourceFunction);
    else this.clear();
}

Micro.BlockMap.prototype = {

    constructor: Micro.BlockMap,

    clear : function() {
        var maxY = Math.floor(this.mapHeight / this.blockSize) + 1;
        var maxX = Math.floor(this.mapWidth / this.blockSize) + 1;
        for (var y = 0; y < maxY; y++) this.data[y] = Micro.makeArrayOf(maxX, this.defaultValue);
    },
    get : function(x, y) {
        return this.data[y][x];
    },
    set : function(x, y, value) {
        this.data[y][x] = value;
    },
    toBlock : function(num) {
        return Math.floor(num / this.blockSize);
    },
    worldGet : function(x, y) { 
        return this.get(this.toBlock(x), this.toBlock(y));
    },
    worldSet : function(x, y, value) {
        this.set(this.toBlock(x), this.toBlock(y), value);
    }
}


var Residential, Commercial, Industrial, Transport, Road, EmergencyServices, MiscTiles, Stadia;

Micro.Simulation = function(gameMap, gameLevel, speed) {
    if (gameLevel !== Micro.LEVEL_EASY && gameLevel !== Micro.LEVEL_MED && gameLevel !== Micro.LEVEL_HARD) throw new Error('Invalid level!');
    if (speed !== Micro.SPEED_PAUSED && speed !== Micro.SPEED_SLOW && speed !== Micro.SPEED_MED && speed !== Micro.SPEED_FAST) throw new Error('Invalid speed!');

    this.map = gameMap;
    this.gameLevel = gameLevel;

    this.div = this.map.width / 8;

    this.speed = speed;
    this.speedCycle = 0;
    this.phaseCycle = 0;
    this.simCycle = 0;
    this.doInitialEval = true;
    this.cityTime = 50;
    this.cityPopLast = 0;
    this.messageLast = Messages.VILLAGE_REACHED;
    this.startingYear = 1900;

    // Last valves updated to the user
    this.resValveLast = 0;
    this.comValveLast = 0;
    this.indValveLast = 0;

    // Last date sent to front end
    this._cityYearLast = -1;
    this._cityMonthLast = -1;

    // And now, the main cast of characters
    this.evaluation = new Micro.Evaluation(this.gameLevel, this);
    this.valves = new Micro.Valves();
    this.budget = new Micro.Budget();
    this.census = new Micro.Census();
    this.messageManager = new Micro.MessageManager();
    this.powerManager = new Micro.PowerManager(this.map, this);
    this.spriteManager = new Micro.SpriteManager(this.map, this);
    this.mapScanner = new Micro.MapScanner(this.map, this);
    this.repairManager = new Micro.RepairManager(this.map);
    this.traffic = new Micro.Traffic(this.map, this.spriteManager);
    this.disasterManager = new Micro.DisasterManager(this.map, this.spriteManager, this.gameLevel);

    this.blockMaps = {
        comRateMap: new Micro.BlockMap(this.map.width, this.map.height, 8, 0),
        crimeRateMap: new Micro.BlockMap(this.map.width, this.map.height, 2, 0),
        fireStationMap: new Micro.BlockMap(this.map.width, this.map.height, 8, 0),
        fireStationEffectMap: new Micro.BlockMap(this.map.width, this.map.height, 8, 0),
        landValueMap: new Micro.BlockMap(this.map.width, this.map.height, 2, 0),
        policeStationMap: new Micro.BlockMap(this.map.width, this.map.height, 8, 0),
        policeStationEffectMap: new Micro.BlockMap(this.map.width, this.map.height, 8, 0),
        pollutionDensityMap: new Micro.BlockMap(this.map.width, this.map.height, 2, 0),
        populationDensityMap: new Micro.BlockMap(this.map.width, this.map.height, 2, 0),
        rateOfGrowthMap: new Micro.BlockMap(this.map.width, this.map.height, 8, 0),
        tempMap1: new Micro.BlockMap(this.map.width, this.map.height, 2, 0),
        tempMap2: new Micro.BlockMap(this.map.width, this.map.height, 2, 0),
        tempMap3: new Micro.BlockMap(this.map.width, this.map.height, 4, 0),
        terrainDensityMap: new Micro.BlockMap(this.map.width, this.map.height, 4, 0),
        trafficDensityMap: new Micro.BlockMap(this.map.width, this.map.height, 2, 0)
    };

    this.init();
}

Micro.Simulation.prototype = {
    constructor: Micro.Simulation,
    setSpeed : function(s) {
        if (s!== Micro.SPEED_PAUSED && s!== Micro.SPEED_SLOW && s!== Micro.SPEED_MED &&  s!== Micro.SPEED_FAST) throw new Error('Invalid speed!');
        this.speed = s;
    },
    isPaused : function() {
        return this.speed === Micro.SPEED_PAUSED;
    },
    /*simTick : function() {
        this.simFrame();
        // Move sprite objects
        //this.spriteManager.moveObjects(this._constructSimData());
        this.updateFrontEnd();
        // TODO Graphs
        return this.messageManager.getMessages();
    },*/
    simFrame : function() {
        if (this.budget.awaitingValues) return;
        if (this.speed === 0) return;
        if (this.speed === 1 && (this.speedCycle % 5) !== 0) return;
        if (this.speed === 2 && (this.speedCycle % 3) !== 0) return;

        this.messageManager.clear();
        //var simData = this._constructSimData();
        //this.simulate(simData);
        this.simulate();
    },
    clearCensus : function() {
        this.census.clearCensus();
        this.powerManager.clearPowerStack();
        this.blockMaps.fireStationMap.clear();
        this.blockMaps.policeStationMap.clear();
    },
    init : function() {
        // define 
        Residential = new Micro.Residential(this);
        Commercial = new Micro.Commercial(this);
        Industrial = new Micro.Industrial(this);
        Road = new Micro.Road(this);
        Transport = new Micro.Transport(this);
        EmergencyServices = new Micro.EmergencyServices(this);
        MiscTiles = new Micro.MiscTiles(this);
        Stadia = new Micro.Stadia(this);

        // Register actions
        Commercial.registerHandlers(this.mapScanner, this.repairManager);
        EmergencyServices.registerHandlers(this.mapScanner, this.repairManager);
        Industrial.registerHandlers(this.mapScanner, this.repairManager);
        MiscTiles.registerHandlers(this.mapScanner, this.repairManager);
        this.powerManager.registerHandlers(this.mapScanner, this.repairManager);
        Road.registerHandlers(this.mapScanner, this.repairManager);
        Residential.registerHandlers(this.mapScanner, this.repairManager);
        Stadia.registerHandlers(this.mapScanner, this.repairManager);
        Transport.registerHandlers(this.mapScanner, this.repairManager);

        this.budget.setFunds(20000);
        

        //var simData = this._constructSimData();
        this.evaluation.evalInit();
        this.valves.setValves(this.gameLevel, this.census, this.budget);
        this.clearCensus();
        //this.mapScanner.mapScan(0, this.map.width, simData);
        this.mapScanner.mapScan(0, this.map.width, null);
        this.powerManager.doPowerScan(this.census, this.messageManager);
        Micro.pollutionTerrainLandValueScan(this.map, this.census, this.blockMaps);
        Micro.crimeScan(this.census, this.blockMaps);
        Micro.populationDensityScan(this.map, this.blockMaps);
        Micro.fireAnalysis(this.blockMaps);
        this.census.totalPop = 1;
    },
    /*simulate : function() {
        var speedIndex = this.speed - 1;
           
        if (++this.simCycle > 1023) this.simCycle = 0;
        if (this.doInitialEval) { this.doInitialEval = false;  this.evaluation.cityEvaluation(); }
        this.cityTime++;
        if ((this.simCycle & 1) === 0) this.valves.setValves(this.gameLevel, this.census, this.budget);
        this.clearCensus();
       
        this.mapScanner.mapScan(0, this.map.width, null);
      
        if (this.cityTime % Micro.CENSUS_FREQUENCY_10 === 0){this.census.take10Census(this.budget);};
        if (this.cityTime % Micro.CENSUS_FREQUENCY_120 === 0) {this.census.take120Census(this.budget);}
        if (this.cityTime % Micro.TAX_FREQUENCY === 0)  { this.budget.collectTax(this.gameLevel, this.census, this.messageManager); this.evaluation.cityEvaluation(); };
       
        if ((this.simCycle % 5) === 0){ Micro.decRateOfGrowthMap(this.blockMaps);};  Micro.decTrafficMap(this.blockMaps); this.sendMessages();
        if ((this.simCycle % Micro.speedPowerScan[speedIndex]) === 0) this.powerManager.doPowerScan(this.census, this.messageManager);
        if ((this.simCycle % Micro.speedPollutionTerrainLandValueScan[speedIndex]) === 0) Micro.pollutionTerrainLandValueScan(this.map, this.census, this.blockMaps); 
        if ((this.simCycle % Micro.speedCrimeScan[speedIndex]) === 0) Micro.crimeScan(this.census, this.blockMaps);
        if ((this.simCycle % Micro.speedPopulationDensityScan[speedIndex]) === 0) Micro.populationDensityScan(this.map, this.blockMaps); 
        if ((this.simCycle % Micro.speedFireAnalysis[speedIndex]) === 0) Micro.fireAnalysis(this.blockMaps); this.disasterManager.doDisasters(this.census, this.messageManager); 
    },*/
    simulate : function() {
        this.phaseCycle &= 15;
        var speedIndex = this.speed - 1;
        switch (this.phaseCycle){
            case 0:
                if (++this.simCycle > 1023) this.simCycle = 0;
                if (this.doInitialEval) { this.doInitialEval = false;  this.evaluation.cityEvaluation(); }
                this.cityTime++;
                if ((this.simCycle & 1) === 0) this.valves.setValves(this.gameLevel, this.census, this.budget);
                this.clearCensus();
            break;
            case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8:
                this.mapScanner.mapScan((this.phaseCycle - 1) * this.div, this.phaseCycle * this.div, null);
              //  this.mapScanner.mapScan((this.phaseCycle - 1) * this.map.width / 8, this.phaseCycle * this.map.width / 8, null);
            break;
            case 9:
                if (this.cityTime % Micro.CENSUS_FREQUENCY_10 === 0){this.census.take10Census(this.budget);};
                if (this.cityTime % Micro.CENSUS_FREQUENCY_120 === 0) {this.census.take120Census(this.budget);}
                if (this.cityTime % Micro.TAX_FREQUENCY === 0)  { this.budget.collectTax(this.gameLevel, this.census, this.messageManager); this.evaluation.cityEvaluation(); };
            break;
            case 10: if ((this.simCycle % 5) === 0){ Micro.decRateOfGrowthMap(this.blockMaps);};  Micro.decTrafficMap(this.blockMaps); this.sendMessages(); break;
            case 11: if ((this.simCycle % Micro.speedPowerScan[speedIndex]) === 0) this.powerManager.doPowerScan(this.census, this.messageManager); break;
            case 12: if ((this.simCycle % Micro.speedPollutionTerrainLandValueScan[speedIndex]) === 0) Micro.pollutionTerrainLandValueScan(this.map, this.census, this.blockMaps); break;
            case 13: if ((this.simCycle % Micro.speedCrimeScan[speedIndex]) === 0) Micro.crimeScan(this.census, this.blockMaps); break;
            case 14: if ((this.simCycle % Micro.speedPopulationDensityScan[speedIndex]) === 0) Micro.populationDensityScan(this.map, this.blockMaps); break;
            case 15: if ((this.simCycle % Micro.speedFireAnalysis[speedIndex]) === 0) Micro.fireAnalysis(this.blockMaps); this.disasterManager.doDisasters(this.census, this.messageManager); break;
        }
        // Go on the the next phase.
        this.phaseCycle = (this.phaseCycle + 1) & 15;
    },
    sendMessages : function() {
        this.checkGrowth();
        var totalZonePop = this.census.resZonePop + this.census.comZonePop + this.census.indZonePop;
        var powerPop = this.census.nuclearPowerPop + this.census.coalPowerPop;
        switch (this.cityTime & 63) {
            case 1: if (Math.floor(totalZonePop / 4) >= this.census.resZonePop) this.messageManager.sendMessage(Messages.NEED_MORE_RESIDENTIAL); break;
            case 5: if (Math.floor(totalZonePop / 8) >= this.census.comZonePop) this.messageManager.sendMessage(Messages.NEED_MORE_COMMERCIAL); break;
            case 10: if (Math.floor(totalZonePop / 8) >= this.census.indZonePop) this.messageManager.sendMessage(Messages.NEED_MORE_INDUSTRIAL); break;
            case 14: if (totalZonePop > 10 && totalZonePop * 2 > this.census.roadTotal) this.messageManager.sendMessage(Messages.NEED_MORE_ROADS); break;
            case 18: if (totalZonePop > 50 && totalZonePop > this.census.railTotal) this.messageManager.sendMessage(Messages.NEED_MORE_RAILS); break;
            case 22: if (totalZonePop > 10 && powerPop == 0) this.messageManager.sendMessage(Messages.NEED_ELECTRICITY); break;
            case 26: if (this.census.resPop > 500 && this.census.stadiumPop === 0) { this.messageManager.sendMessage(Messages.NEED_STADIUM); this.valves.resCap = true; } else { this.valves.resCap = false;}; break;
            case 28: if (this.census.indPop > 70 && this.census.seaportPop === 0) { this.messageManager.sendMessage(Messages.NEED_SEAPORT); this.valves.indCap = true; } else { this.valves.indCap = false; }; break;
            case 30: if (this.census.comPop > 100 && this.census.airportPop === 0) { this.messageManager.sendMessage(Messages._NEED_AIRPORT); this.valves.comCap = true; } else { this.valves.comCap = false; }; break;
            case 32: var zoneCount = this.census.unpoweredZoneCount + this.census.poweredZoneCount; if (zoneCount > 0) { if (this.census.poweredZoneCount / zoneCount < 0.7) this.messageManager.sendMessage(Messages.BLACKOUTS_REPORTED);}; break;
            case 35: if (this.census.pollutionAverage > 60) this.messageManager.sendMessage(Messages.HIGH_POLLUTION); break;
            case 42: if (this.census.crimeAverage > 100) this.messageManager.sendMessage(Messages.HIGH_CRIME); break;
            case 45: if (this.census.totalPop > 60 && this.census.fireStationPop === 0) this.messageManager.sendMessage(Messages.NEED_FIRE_STATION); break;
            case 48: if (this.census.totalPop > 60 && this.census.policeStationPop === 0) this.messageManager.sendMessage(Messages.NEED_POLICE_STATION); break;
            case 51: if (this.budget.cityTax > 12) this.messageManager.sendMessage(Messages.TAX_TOO_HIGH); break;
            case 54: if (this.budget.roadEffect < Math.floor(5 * this.budget.MAX_ROAD_EFFECT / 8) && this.census.roadTotal > 30) this.messageManager.sendMessage(Messages.ROAD_NEEDS_FUNDING); break;
            case 57: if (this.budget.fireEffect < Math.floor(7 * this.budget.MAX_FIRE_STATION_EFFECT / 10) && this.census.totalPop > 20) this.messageManager.sendMessage(Messages.FIRE_STATION_NEEDS_FUNDING); break;
            case 60: if (this.budget.policeEffect < Math.floor(7 * this.budget.MAX_POLICE_STATION_EFFECT / 10) && this.census.totalPop > 20) this.messageManager.sendMessage(Messages.POLICE_NEEDS_FUNDING); break;
            case 63: if (this.census.trafficAverage > 60) this.messageManager.sendMessage(Messages.TRAFFIC_JAMS, -1, -1, true); break;
        }
    },
    checkGrowth : function() {
        if ((this.cityTime & 3) === 0) {
            var message = '';
            var thisCityPop = this.evaluation.getPopulation(this.census);

            if (this.cityPopLast > 0) {
                var lastClass = this.evaluation.getCityClass(this.cityPopLast);
                var newClass = this.evaluation.getCityClass(thisCityPop);
                if (lastClass !== newClass) {
                    switch (newClass) {
                        case Micro.CC_VILLAGE:
                          // Don't mention it.
                        break;
                        case Micro.CC_TOWN: message = Messages.REACHED_TOWN; break;
                        case Micro.CC_CITY: message = Messages.REACHED_CITY; break;
                        case Micro.CC_CAPITAL: message = Messages.REACHED_CAPITAL; break;
                        case Micro.CC_METROPOLIS: message = Messages.REACHED_METROPOLIS; break;
                        case Micro.CC_MEGALOPOLIS: message = Messages.REACHED_MEGALOPOLIS; break;
                        default: break;
                    }
                }
            }
            if (message !== '' && message !== this.messageLast) {
                this.messageManager.sendMessage(message);
                this.messageLast = message;
            }
            this.cityPopLast = thisCityPop;
        }
    },
    updateFrontEnd : function() {
        // Have valves changed?
        if (this.valves.changed) {
            this._resLast = this.valves.resValve;
            this._comLast = this.valves.comValve;
            this._indLast = this.valves.indValve;

            // Note: the valves changed the population
            this.messageManager.sendMessage(Messages.VALVES_UPDATED, {residential: this.valves.resValve, commercial: this.valves.comValve, industrial: this.valves.indValve});
            this.valves.changed = false;
        }
        this.updateTime();
        if (this.evaluation.changed) {
            this.messageManager.sendMessage(Messages.EVAL_UPDATED, {classification: this.evaluation.cityClass, population: this.evaluation.cityPop, score: this.evaluation.cityScore});
            this.evaluation.changed = false;
        }
    },
    setYear : function(year) {
        if (year < this.startingYear) year = this.startingYear;
        year = (year - this.startingYear) - (this.cityTime / 48);
        this.cityTime += year * 48;
        this.updateTime();
    },
    updateTime : function() {
        var megalinium = 1000000;
        var cityYear = Math.floor(this.cityTime / 48) + this.startingYear;
        var cityMonth = Math.floor(this.cityTime % 48) >> 2;

        if (cityYear >= megalinium) {
            this.setYear(this.startingYear);//startingYear);
            return;
        }

        if (this._cityYearLast !== cityYear || this._cityMonthLast !== cityMonth) {
            this._cityYearLast = cityYear;
            this._cityMonthLast = cityMonth;
            this.messageManager.sendMessage(Messages.DATE_UPDATED, {month: cityMonth, year: cityYear});
        }
    }
}

//define(['BudgetWindow', 'DisasterWindow', 'GameCanvas', 'EvaluationWindow', 'InfoBar', 'InputStatus', 'Messages', 'QueryWindow', 'RCI', 'Simulation'],

/*var nextFrame = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      null;*/

Micro.Game = function(gameMap, tileSet, spriteSheet, difficulty) {
    this.debug = document.getElementById("debug");
    difficulty = difficulty || 0;

    this.gameMap = gameMap;
    this.tileSet = tileSet || null;
    this.notification = new Micro.Notification();
    this.simulation = new Micro.Simulation(this.gameMap, difficulty, 3);
    this.rci = new Micro.RCI('RCIContainer');
    this.budgetWindow = new Micro.BudgetWindow('opaque', 'budget');
    this.queryWindow = new Micro.QueryWindow('opaque', 'queryWindow');
    this.evalWindow = new Micro.EvaluationWindow('opaque', 'evalWindow');
    this.disasterWindow = new Micro.DisasterWindow('opaque', 'disasterWindow');

    this.gameCanvas = null;
    if(this.tileSet !== null){
        this.gameCanvas = new Micro.GameCanvas('canvasContainer');
        this.gameCanvas.init(this.gameMap, this.tileSet, spriteSheet);
    }

    this.inputStatus = new Micro.InputStatus(this.gameMap);
    this.mouse = null;
    this.sprites = null;
    this.lastCoord = null;

    // Unhide controls
    this.revealControls();

    this.budgetShowing = false;
    this.queryShowing = false;
    this.evalShowing = false;
    this.simNeedsBudget = false;
    this.isPaused = false;

    //this.tick();
    //this.animate();

    var _this = this;

    this.timer = setInterval(_this.update, 1000/30, _this); //null;

    /*this.timer = null;
    this.delay = 0;
    this.timeStart = 0;
    this.timerStep = 1000/60;
    this.update(this);*/
}

Micro.Game.prototype = {
    constructor: Micro.Game,

    revealControls : function() {
        var h = document.getElementsByClassName("initialHidden");
        for(var i=0; i<h.length; i++){
            h[i].className = h[i].className.replace("initialHidden", "");
            if(h[i])if(h[i].id == "buttons")h[i].style.display = "table";
        }
        document.getElementById("buttonsInfos").style.display = "block";
        document.getElementById("miscControls").style.display = "block";
        this.notification.news(TXT.neutralMessages[Messages.WELCOME]);
        this.rci.update(0, 0, 0);
    },
    handleDisasterClosed : function(request) {
        this.disasterShowing = false;
        if (request === Micro.DISASTER_NONE) return;
        var m = new Micro.MessageManager();
        switch (request) {
            case Micro.DISASTER_MONSTER: this.simulation.spriteManager.makeMonster(m); break;
            case Micro.DISASTER_FIRE: this.simulation.disasterManager.makeFire(m); break;
            case Micro.DISASTER_FLOOD: this.simulation.disasterManager.makeFlood(m); break;
            case Micro.DISASTER_CRASH: this.simulation.disasterManager.makeCrash(m); break;
            case Micro.DISASTER_MELTDOWN: this.simulation.disasterManager.makeMeltdown(m); break;
            case Micro.DISASTER_TORNADO: this.simulation.spriteManager.makeTornado(m); break;
        }
        this.processMessages(m.getMessages());
    },
    handleEvalClosed : function() {
        this.evalShowing = false;
    },
    handleQueryClosed : function() {
        this.queryShowing = false;
    },
    handleBudgetClosed : function(cancelled, data) {
        this.budgetShowing = false;
        if (!cancelled) {
            this.simulation.budget.roadPercent = data.roadPercent / 100;
            this.simulation.budget.firePercent = data.firePercent / 100;
            this.simulation.budget.policePercent = data.policePercent / 100;
            this.simulation.budget.setTax(data.taxPercent);
            if (this.simNeededBudget) {
                this.simulation.budget.doBudget(new Micro.MessageManager());
                this.simNeededBudget = false;
            } else {
                this.simulation.budget.updateFundEffects();
            }
        }
    },
    handleDisasterRequest : function() {
        this.disasterShowing = true;
        this.disasterWindow.open(this.handleDisasterClosed.bind(this));

        // Let the input know we handled this request
        this.inputStatus.disasterHandled();
        //nextFrame(this.tick.bind(this));
        // this.nextFrame(this.tick);
    },
    handleEvalRequest : function() {
        this.evalShowing = true;
        this.evalWindow.open(this.handleEvalClosed.bind(this), this.simulation.evaluation);

        // Let the input know we handled this request
        this.inputStatus.evalHandled();
       // nextFrame(this.tick.bind(this));
        //this.nextFrame(this.tick);
    },
    handleBudgetRequest : function() {
        this.budgetShowing = true;

        var budgetData = {
            roadFund: this.simulation.budget.roadFund,
            roadRate: Math.floor(this.simulation.budget.roadPercent * 100),
            fireFund: this.simulation.budget.fireFund,
            fireRate: Math.floor(this.simulation.budget.firePercent * 100),
            policeFund: this.simulation.budget.policeFund,
            policeRate: Math.floor(this.simulation.budget.policePercent * 100),
            taxRate: this.simulation.budget.cityTax,
            totalFunds: this.simulation.budget.totalFunds,
            taxesCollected: this.simulation.budget.taxFund
        };
        this.budgetWindow.open(this.handleBudgetClosed.bind(this), budgetData);
        // Let the input know we handled this request
        this.inputStatus.budgetHandled();
       // nextFrame(this.tick.bind(this));
        //this.nextFrame(this.tick);
    },
    handleTool : function(x, y) {
        // Were was the tool clicked?
        var tileCoords = this.gameCanvas.canvasCoordinateToTileCoordinate(x, y);

        if (tileCoords === null) {
            this.inputStatus.clickHandled();
            return;
        }

        var tool = this.inputStatus.currentTool;

        var budget = this.simulation.budget;
        var evaluation = this.simulation.evaluation;
        var messageMgr = new Micro.MessageManager();

        // do it!
        tool.doTool(tileCoords.x, tileCoords.y, messageMgr, this.simulation.blockMaps);

        tool.modifyIfEnoughFunding(budget, messageMgr);
        switch (tool.result) {
            case tool.TOOLRESULT_NEEDS_BULLDOZE: document.getElementById("toolOutput").innerHTML = TXT.toolMessages.needsDoze; break;
            case tool.TOOLRESULT_NO_MONEY: document.getElementById("toolOutput").innerHTML = TXT.toolMessages.noMoney; break; 
            default: document.getElementById("toolOutput").innerHTML = '&nbsp;';
        }
        this.processMessages(messageMgr.getMessages());
        this.inputStatus.clickHandled();
    },
    handleSpeedChange : function() {
        // XXX Currently only offer pause and run to the user
        // No real difference among the speeds until we optimise the sim
        this.isPaused = !this.isPaused;

        if (this.isPaused) this.simulation.setSpeed(Micro.SPEED_PAUSED);
        else this.simulation.setSpeed(Micro.SPEED_SLOW);
        this.inputStatus.speedChangeHandled();
    },
    handleInput : function() {
        if (this.inputStatus.budgetRequested) { this.handleBudgetRequest(); return; }
        if (this.inputStatus.evalRequested) { this.handleEvalRequest(); return; }
        if (this.inputStatus.disasterRequested) { this.handleDisasterRequest(); return; }
        if (this.inputStatus.speedChangeRequested) { this.handleSpeedChange(); return; }

        // Handle keyboard movement
        if (this.inputStatus.left) this.gameCanvas.moveWest();
        else if (this.inputStatus.up) this.gameCanvas.moveNorth();
        else if (this.inputStatus.right) this.gameCanvas.moveEast();
        else if (this.inputStatus.down) this.gameCanvas.moveSouth();

        // Was a tool clicked?
        if (this.inputStatus.currentTool !== null && this.inputStatus.clickX !== -1 && this.inputStatus.clickY !== -1)
            this.handleTool(this.inputStatus.clickX, this.inputStatus.clickY);
    },
    processMessages : function(messages) {
        // Don't want to output more than one user message
        var messageOutput = false;

        for (var i = 0, l = messages.length; i < l; i++) {
            var m = messages[i];
            switch (m.message) {
                case Messages.BUDGET_NEEDED: this.simNeededBudget = true; this.handleBudgetRequest(); break;
                case Messages.QUERY_WINDOW_NEEDED: this.queryWindow.open(this.handleQueryClosed.bind(this)); break;
                case Messages.DATE_UPDATED: InfoBar.setDate(m.data.month, m.data.year); break;
                case Messages.EVAL_UPDATED: InfoBar.setClass(TXT.cityClass[m.data.classification]); InfoBar.setScore(m.data.score); InfoBar.setPopulation(m.data.population); break;
                case Messages.FUNDS_CHANGED: InfoBar.setFunds(m.data); break;
                case Messages.VALVES_UPDATED: this.rci.update(m.data.residential, m.data.commercial, m.data.industrial); break;
                default: 
                    if (!messageOutput && TXT.goodMessages[m.message] !== undefined) { 
                        messageOutput = true; this.notification.goodNews(TXT.goodMessages[m.message]); 
                        break;
                    }
                    if (!messageOutput && TXT.badMessages[m.message] !== undefined) {
                        messageOutput = true;
                        this.notification.badNews(TXT.badMessages[m.message]);
                        break;
                    }
                    if (!messageOutput && TXT.neutralMessages[m.message] !== undefined) {
                        messageOutput = true;
                        this.notification.news(TXT.neutralMessages[m.message]);
                        break;
                    }
            }
        }
    },
    calculateMouseForPaint : function() {
        // Determine whether we need to draw a tool outline in the canvas
        var mouse = null;

        if (this.inputStatus.mouseX !== -1 && this.inputStatus.toolWidth > 0) {
            var tileCoords = this.gameCanvas.canvasCoordinateToTileOffset(this.inputStatus.mouseX, this.inputStatus.mouseY);
            if (tileCoords !== null) {
                mouse = {};

                mouse.x = tileCoords.x;
                mouse.y = tileCoords.y;

                // The inputStatus fields came from DOM attributes, so will be strings.
                // Coerce back to numbers.
                mouse.width = this.inputStatus.toolWidth - 0;
                mouse.height = this.inputStatus.toolWidth - 0;
                mouse.colour = this.inputStatus.toolColour || 'yellow';
            }
        }
        return mouse;
    },
    calculateSpritesForPaint : function() {
        var origin = this.gameCanvas.getTileOrigin();
        var end = this.gameCanvas.getMaxTile();
        var spriteList = this.simulation.spriteManager.getSpritesInView(origin.x, origin.y, end.x + 1, end.y + 1);

        if (spriteList.length === 0) return null;
        return spriteList;
    },
   /* tick : function() {

        this.handleInput();

        if (this.budgetShowing || this.queryShowing || this.disasterShowing || this.evalShowing) {
            window.setTimeout(this.tick.bind(this), 0);
            return;
        }

        if (!this.simulation.isPaused()) {
            // Run the sim
            var messages = this.simulation.simTick();
            this.processMessages(messages);
        }

        // Run this even when paused: you can still build when paused
        this.mouse = this.calculateMouseForPaint();

        window.setTimeout(this.tick.bind(this), 0);
    },
    animate : function() {
        // Don't run on blur - bad things seem to happen
        // when switching back to our tab in Fx
        if (this.budgetShowing || this.queryShowing || this.disasterShowing || this.evalShowing) {
           nextFrame(this.animate.bind(this));
           return;
        }

        // TEMP
        this.frameCount++;

        var date = new Date();
        var elapsed = Math.floor((date - this.animStart) / 1000);

        // TEMP
        if (elapsed > 0) this.d.textContent = Math.floor(this.frameCount/elapsed) + ' fps';

        //if (!this.isPaused) this.simulation.spriteManager.moveObjects(this.simulation._constructSimData());
        if (!this.isPaused) this.simulation.spriteManager.moveObjects();

        this.sprite = this.calculateSpritesForPaint();
        this.gameCanvas.paint(this.mouse, this.sprite, this.isPaused);

        nextFrame(this.animate.bind(this));
    },*/

    //-----------------------------------------------------------
    /*update : function(){
        this.timeStart = Date.now();
        var t0 = new Date();
        this.handleInput();
        this.mouse = this.calculateMouseForPaint();
        var t1 = new Date();

        if (!this.isPaused){
            this.simulation.simFrame();
            this.simulation.updateFrontEnd();
            this.processMessages(this.simulation.messageManager.getMessages());
            this.simulation.spriteManager.moveObjects();
            //U.simulation.spriteManager.moveObjects(U.simulation._constructSimData());
        }
        var t2 = new Date();
        this.sprite = this.calculateSpritesForPaint();
        var t3 = new Date();
        this.gameCanvas.paint(this.mouse, this.sprite, this.isPaused);
        var t4 = new Date();

        this.debug.innerHTML = "input:" +(t1-t0)+" sim:"+(t2-t1)+" sprite:"+(t3-t2)+" paint:"+(t4-t3) +"<br> total:"+(t4-t0)+ "<br>"+this.isPaused ;

       // if(isTimout){
            this.delay = this.timerStep - (Date.now()-this.timeStart);
            this.timer = setTimeout(this.update, this.delay);
      //  }

    }*/
    update : function(U){
        //U.timeStart = Date.now();
        var t0 = new Date();
        U.handleInput();
        U.mouse = U.calculateMouseForPaint();
        var t1 = new Date();

        if (!U.isPaused){
            U.simulation.simFrame();
            U.simulation.updateFrontEnd();
            U.processMessages(U.simulation.messageManager.getMessages());
            U.simulation.spriteManager.moveObjects();
            //U.simulation.spriteManager.moveObjects(U.simulation._constructSimData());
        }
        var t2 = new Date();
        U.sprite = U.calculateSpritesForPaint();
        var t3 = new Date();
        U.gameCanvas.paint(U.mouse, U.sprite, U.isPaused);
        var t4 = new Date();

        U.debug.innerHTML = "input:" +(t1-t0)+" sim:"+(t2-t1)+" sprite:"+(t3-t2)+" paint:"+(t4-t3) +" total:"+(t4-t0)+ " "+U.isPaused ;

      
        //U.delay = U.timerStep - (Date.now()-U.timeStart);
        //U.timer = setTimeout(U.update, U.delay, U);
      

    }


}
