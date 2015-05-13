app.service('CharacterService', [function() {

    var service = this;

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

        character.guid = guid || service.generateGUID();

        character.basic = {
            name:'',
            race:'',
            size:'M',
            alignment:'N',
            player:'',
            campaign:'',
        };

        character.classes = [
            {name:'', favored:false, skillranks:0, hitdie:0, level:0},
            {name:'', favored:false, skillranks:0, hitdie:0, level:0},
            {name:'', favored:false, skillranks:0, hitdie:0, level:0},
            {name:'', favored:false, skillranks:0, hitdie:0, level:0},
            {name:'', favored:false, skillranks:0, hitdie:0, level:0},
        ];

        character.experience = {
            points:0,
            track:'M',
        };

        character.abilities = [
            {name:'Strength',     base:[{bonus:10, desc:'Base'}], temp:[{bonus:0, desc:''}]},
            {name:'Dexterity',    base:[{bonus:10, desc:'Base'}], temp:[{bonus:0, desc:''}]},
            {name:'Constitution', base:[{bonus:10, desc:'Base'}], temp:[{bonus:0, desc:''}]},
            {name:'Intelligence', base:[{bonus:10, desc:'Base'}], temp:[{bonus:0, desc:''}]},
            {name:'Wisdom',       base:[{bonus:10, desc:'Base'}], temp:[{bonus:0, desc:''}]},
            {name:'Charisma',     base:[{bonus:10, desc:'Base'}], temp:[{bonus:0, desc:''}]},
        ];

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
            {name:'Use Magical Device', clas:false, untrained:false, ability:'Cha', ranks:0, misc:[{bonus:0, desc:''}]}
        ];

        character.feats = [{name:'~'}];
        character.traits = [{name:'~'}];
        character.features = [{name:'~'}];

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

    service.save = function(character) {
        localStorage.setItem(character.guid, angular.toJson(character));
    };

    service.load = function(guid) {
        console.log('Loading character: ' + guid);
        var data = localStorage.getItem(guid);
        if (!data) {
            console.log('Character not found, creating new!');
            return service.create(guid);
        }
        return angular.fromJson(data);
    };

    service.loadAll = function() {
        var characters = [];
        for (var i = 0; i < localStorage.length; i++){
            var guid = localStorage.key(i);
            characters.push(service.load(guid));
        }
        return characters;
    };

    service.deleteOne = function(guid) {
        localStorage.removeItem(guid);
    }

    service.deleteAll = function() {
        localStorage.clear();
    }

}]);
