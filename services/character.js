app.service('CharacterService', [function() {

    var service = this;

    var polyfill = function(character) {
        if (!character.movement) {
            character.movement = {
                base:30,
                misc:[{bonus:0, desc:''}],
                temp:[{bonus:0, desc:''}],
            };
        }
        if (!character.attacks) {
            character.attacks = [
                {weapon:'~', bonus:0, ability:'Str', damage:'', critical:'20x2', type:'', range:0, notes:''},
            ];
        }
        if (!character.hp || !character.hp.max) {
            character.hp = {
                auto:true,
                max:[{bonus:0, desc:''}],
                current:0,
                temp:0,
                nonlethal:0,
                damagereduction:'',
            };
        }
        if (!character.languages) {
            character.languages = [{name:'~'}];
        }
        if (!character.proficiencies) {
            character.proficiencies = [{name:'~'}];
        }
    };

    service.generateGUID = function() {
        var d = Date.now();
        var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return guid;
    };

    service.create = function(guid) {
        var character = {};

        character.basic = {
            name:'',
            race:'',
            size:'Medium',
            alignment:'N',
            player:'',
            campaign:'',
            quadruped:false,
        };

        character.classes = [
            {name:'', favored:false, baseattackbonus:'3/4', hitdie:'d8', level:0},
            {name:'', favored:false, baseattackbonus:'3/4', hitdie:'d8', level:0},
            {name:'', favored:false, baseattackbonus:'3/4', hitdie:'d8', level:0},
            {name:'', favored:false, baseattackbonus:'3/4', hitdie:'d8', level:0},
            {name:'', favored:false, baseattackbonus:'3/4', hitdie:'d8', level:0},
        ];

        character.experience = {
            points:0,
            track:'Medium',
        };

        character.abilities = [
            {name:'Strength',     base:[{bonus:10, desc:'Base'}], temp:[{bonus:0, desc:''}]},
            {name:'Dexterity',    base:[{bonus:10, desc:'Base'}], temp:[{bonus:0, desc:''}]},
            {name:'Constitution', base:[{bonus:10, desc:'Base'}], temp:[{bonus:0, desc:''}]},
            {name:'Intelligence', base:[{bonus:10, desc:'Base'}], temp:[{bonus:0, desc:''}]},
            {name:'Wisdom',       base:[{bonus:10, desc:'Base'}], temp:[{bonus:0, desc:''}]},
            {name:'Charisma',     base:[{bonus:10, desc:'Base'}], temp:[{bonus:0, desc:''}]},
        ];

        character.movement = {
            base:30,
            misc:[{bonus:0, desc:''}],
            temp:[{bonus:0, desc:''}],
        };

        character.saves = [
            {name:'Fortitude', ability:'Con', base:[{bonus:0, desc:''}], misc:[{bonus:0, desc:''}]},
            {name:'Reflex',    ability:'Dex', base:[{bonus:0, desc:''}], misc:[{bonus:0, desc:''}]},
            {name:'Will',      ability:'Wis', base:[{bonus:0, desc:''}], misc:[{bonus:0, desc:''}]},
        ];

        character.armorclass = {
            natural:[{bonus:0, desc:''}],
            deflection:[{bonus:0, desc:''}],
            dodge:[{bonus:0, desc:''}],
            misc:[{bonus:0, desc:''}],
        };

        character.hp = {
            auto:true,
            max:[{bonus:0, desc:''}],
            current:0,
            temp:0,
            nonlethal:0,
            damagereduction:'',
        };

        character.attacks = [
            {weapon:'~', bonus:0, ability:'Str', damage:'', critical:'20x2', type:'', range:0, notes:''},
        ];

        character.skills = [
            {name:'Acrobatics',         clas:false, untrained:true,  ability:'Dex', ranks:0, misc:[{bonus:0, desc:''}]},
            {name:'Appraise',           clas:false, untrained:true,  ability:'Int', ranks:0, misc:[{bonus:0, desc:''}]},
            {name:'Bluff',              clas:false, untrained:true,  ability:'Cha', ranks:0, misc:[{bonus:0, desc:''}]},
            {name:'Climb',              clas:false, untrained:true,  ability:'Str', ranks:0, misc:[{bonus:0, desc:''}]},
            {name:'Craft',              clas:false, untrained:true,  ability:'Int', ranks:0, misc:[{bonus:0, desc:''}]},
            {name:'Diplomacy',          clas:false, untrained:true,  ability:'Cha', ranks:0, misc:[{bonus:0, desc:''}]},
            {name:'Disable Device',     clas:false, untrained:false, ability:'Dex', ranks:0, misc:[{bonus:0, desc:''}]},
            {name:'Disguise',           clas:false, untrained:true,  ability:'Cha', ranks:0, misc:[{bonus:0, desc:''}]},
            {name:'Escape Artist',      clas:false, untrained:true,  ability:'Dex', ranks:0, misc:[{bonus:0, desc:''}]},
            {name:'Fly',                clas:false, untrained:true,  ability:'Dex', ranks:0, misc:[{bonus:0, desc:''}]},
            {name:'Handle Animal',      clas:false, untrained:false, ability:'Cha', ranks:0, misc:[{bonus:0, desc:''}]},
            {name:'Heal',               clas:false, untrained:true,  ability:'Wis', ranks:0, misc:[{bonus:0, desc:''}]},
            {name:'Intimidate',         clas:false, untrained:true,  ability:'Cha', ranks:0, misc:[{bonus:0, desc:''}]},
            {name:'Knowledge',          clas:false, untrained:false, ability:'Int', ranks:0, misc:[{bonus:0, desc:''}]},
            {name:'Linguistics',        clas:false, untrained:false, ability:'Int', ranks:0, misc:[{bonus:0, desc:''}]},
            {name:'Perception',         clas:false, untrained:true,  ability:'Wis', ranks:0, misc:[{bonus:0, desc:''}]},
            {name:'Perform',            clas:false, untrained:true,  ability:'Cha', ranks:0, misc:[{bonus:0, desc:''}]},
            {name:'Profession',         clas:false, untrained:false, ability:'Wis', ranks:0, misc:[{bonus:0, desc:''}]},
            {name:'Ride',               clas:false, untrained:true,  ability:'Dex', ranks:0, misc:[{bonus:0, desc:''}]},
            {name:'Sense Motive',       clas:false, untrained:true,  ability:'Wis', ranks:0, misc:[{bonus:0, desc:''}]},
            {name:'Sleight of Hand',    clas:false, untrained:false, ability:'Dex', ranks:0, misc:[{bonus:0, desc:''}]},
            {name:'Spellcraft',         clas:false, untrained:false, ability:'Int', ranks:0, misc:[{bonus:0, desc:''}]},
            {name:'Stealth',            clas:false, untrained:true,  ability:'Dex', ranks:0, misc:[{bonus:0, desc:''}]},
            {name:'Survival',           clas:false, untrained:true,  ability:'Wis', ranks:0, misc:[{bonus:0, desc:''}]},
            {name:'Swim',               clas:false, untrained:true,  ability:'Str', ranks:0, misc:[{bonus:0, desc:''}]},
            {name:'Use Magical Device', clas:false, untrained:false, ability:'Cha', ranks:0, misc:[{bonus:0, desc:''}]},
        ];

        character.feats = [{name:'~'}];
        character.traits = [{name:'~'}];
        character.features = [{name:'~'}];
        character.languages = [{name:'~'}];
        character.proficiencies = [{name:'~'}];

        character.equipment = {
            armor: {
                name:'',
                type:'Light',
                equipped:'No',
                armorclass:0,
                maxdex:0,
                checkpenalty:0,
                spellfailure:0,
            },
            shield: {
                name:'',
                type:'Light',
                equipped:'No',
                armorclass:0,
                checkpenalty:0,
                spellfailure:0,
            },
        };


        return character;
    };

    service.import = function(compressed) {
        var data = LZString.decompressFromBase64(compressed);
        var character = angular.fromJson(data);
        return character;
    };

    service.export = function(character) {
        var data = angular.toJson(character);
        var compressed = LZString.compressToBase64(data);
        return compressed;
    };

    service.save = function(storage, guid, character, callback) {
        console.log('Character: Saving ' + guid + '...');
        storage.set(guid, character, callback);
    };

    service.load = function(storage, guid, callback) {
        console.log('Character: Loading ' + guid + '...');
        storage.get(guid, function(character) {
            if (!character) {
                console.log('Character: Not found, creating new!');
                character = service.create(guid);
            }

            // Used in list
            character.guid = guid;

            polyfill(character);
            callback(character);
        });
    };

    service.loadAll = function(storage, callback) {
        console.log('Character: Loading all...');
        storage.list(function(guids) {
            console.log('Character: Got list...');
            var characters = [];
            var number = 0;
            for (var i = 0; i < guids.length; i++) {
                service.load(storage, guids[i], function(character) {
                    characters.push(character)
                    number = number + 1;
                    if (number == guids.length) {
                        callback(characters);
                    }
                });
            }
            /* Special case */
            if (guids.length == 0) {
                callback([]);
            }
        });
    };

    service.delete = function(storage, guid, callback) {
        console.log('Character: Deleting ' + guid + '...');
        storage.delete(guid, callback);
    };

    service.deleteAll = function(storage, callback) {
        console.log('Character: Deleting all...');
        storage.list(function(guids) {
            var successAll = true;
            var number = 0;
            for (var i = 0; i < guids.length; i++) {
                service.delete(storage, guids[i], function(success) {
                    successAll = successAll && success;
                    number = number + 1;
                    if (number == guids.length) {
                        callback(successAll);
                    }
                });
            }
        });
    };

}]);
