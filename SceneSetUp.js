// this does not need to be a singleton, just experimenting with different patterns
var SceneSetUp = (function(){
    const megaTable = [
      {
        SelectorTitle:"1",
        SkyPath:"./Sky/HawaiiBeach.png",
        AudioPath:"./AudioFiles/HawaiiBeach.mp3",
        TextContent:"Hawaii Beach",
        Story:"Story or details this person told 1",
        TextColor3D:new THREE.Color(1, 1, 1),
      },
      {
        SelectorTitle:"2",
        SkyPath:"./Sky/JapanHotel.png",
        AudioPath:"./AudioFiles/JapanHotel.mp3",
        TextContent:"Japan Hotel",
        Story:"Story or details this person told 2",
        TextColor3D:new THREE.Color(1, 1, 1),
      },
      {
        SelectorTitle:"3",
        SkyPath:"./Sky/NightClub.png",
        AudioPath:"./AudioFiles/NightClub.mp3",
        TextContent:"Night Club",
        Story:"Story or details this person told 3",
        TextColor3D:new THREE.Color(1, 1, 1),
      },
      {
        SelectorTitle:"4",
        SkyPath:"./Sky/ACozyPlace.png",
        AudioPath:"./AudioFiles/ACozyPlace.mp3",
        TextContent:"A Cozy Place",
        Story:"Story or details this person told 4",
        TextColor3D:new THREE.Color(1, 1, 1),
      },
      {
        SelectorTitle:"5",
        SkyPath:"./Sky/Home.png",
        AudioPath:"./AudioFiles/Home.mp3",
        TextContent:"Home",
        Story:"Story or details this person told 5",
        TextColor3D:new THREE.Color(1, 1, 1),
      },
      {
        SelectorTitle:"6",
        SkyPath:"./Sky/AmusementPark.png",
        AudioPath:"./AudioFiles/AmusementPark.mp3",
        TextContent:"Amusement Park",
        Story:"Story or details this person told 6",
        TextColor3D:new THREE.Color(1, 1, 1),
      },
      {
        SelectorTitle:"7",
        SkyPath:"./Sky/Baotou.png",
        AudioPath:"./AudioFiles/Baotou.mp3",
        TextContent:"Baotou",
        Story:"Story or details this person told 7",
        TextColor3D:new THREE.Color(1, 1, 1),
      },
      {
        SelectorTitle:"8",
        SkyPath:"./Sky/GradeSix.png",
        AudioPath:"./AudioFiles/GradeSix.mp3",
        TextContent:"Grade Six",
        Story:"Story or details this person told 8",
        TextColor3D:new THREE.Color(1, 1, 1),
      },
      {
        SelectorTitle:"9",
        SkyPath:"./Sky/BeachParty.png",
        AudioPath:"./AudioFiles/BeachParty.mp3",
        TextContent:"Beach Party",
        Story:"Story or details this person told 9",
        TextColor3D:new THREE.Color(1, 1, 1),
      },
      {
        SelectorTitle:"10",
        SkyPath:"./Sky/HomeWithFriends.png",
        AudioPath:"./AudioFiles/HomeWithFriends.mp3",
        TextContent:"Home With Friends",
        Story:"Story or details this person told 10",
        TextColor3D:new THREE.Color(1, 1, 1),
      },
      {
        SelectorTitle:"11",
        SkyPath:"./Sky/GameConsoleMuseum.png",
        AudioPath:"./AudioFiles/GameConsoleMuseum.mp3",
        TextContent:"Game Console Museum",
        Story:"Story or details this person told 11",
        TextColor3D:new THREE.Color(1, 0, 0),
      },
      {
        SelectorTitle:"12",
        SkyPath:"./Sky/Haidilao.png",
        AudioPath:"./AudioFiles/Haidilao.mp3",
        TextContent:"Haidilao",
        Story:"Story or details this person told 12",
        TextColor3D:new THREE.Color(1, 1, 1),
      },
      {
        SelectorTitle:"13",
        SkyPath:"./Sky/CozyNature.png",
        AudioPath:"./AudioFiles/CozyNature.mp3",
        TextContent:"Cozy Nature",
        Story:"Story or details this person told 13",
        TextColor3D:new THREE.Color(1, 1, 1),
      },
      {
        SelectorTitle:"14",
        SkyPath:"./Sky/HomeWithFamily.png",
        AudioPath:"./AudioFiles/HomeWithFamily.mp3",
        TextContent:"Home With Family",
        Story:"Story or details this person told 14",
        TextColor3D:new THREE.Color(1, 1, 1),
      },
      {
        SelectorTitle:"15",
        SkyPath:"./Sky/ACultCeremony.png",
        AudioPath:"./AudioFiles/ACultCeremony.mp3",
        TextContent:"A Cult Ceremony",
        Story:"Story or details this person told 15",
        TextColor3D:new THREE.Color(1, 1, 1),
      },
      {
        SelectorTitle:"16",
        SkyPath:"./Sky/Africa.png",
        AudioPath:"./AudioFiles/Africa.mp3",
        TextContent:"Africa",
        Story:"Story or details this person told 16",
        TextColor3D:new THREE.Color(1, 1, 1),
      },
      {
        SelectorTitle:"17",
        SkyPath:"./Sky/PaintNight.png",
        AudioPath:"./AudioFiles/PaintNight.mp3",
        TextContent:"Paint Night",
        Story:"Story or details this person told 17",
        TextColor3D:new THREE.Color(1, 1, 1),
      },
      {
        SelectorTitle:"18",
        SkyPath:"./Sky/FInalWorld.png",
        AudioPath:"./AudioFiles/FInalWorld.mp3",
        TextContent:"F Inal World",
        Story:"Story or details this person told 18",
        TextColor3D:new THREE.Color(1, 1, 1),
      },
      {
        SelectorTitle:"19",
        SkyPath:"./Sky/QualityTime.png",
        AudioPath:"./AudioFiles/QualityTime.mp3",
        TextContent:"Quality Time",
        Story:"Story or details this person told 19",
        TextColor3D:new THREE.Color(1, 1, 1),
      },
      {
        SelectorTitle:"20",
        SkyPath:"./Sky/NoCelebration.png",
        AudioPath:"./AudioFiles/NoCelebration.mp3",
        TextContent:"No Celebration",
        Story:"Story or details this person told 20",
        TextColor3D:new THREE.Color(1, 1, 1),
      },
      {
        SelectorTitle:"21",
        SkyPath:"./Sky/DimSum.png",
        AudioPath:"./AudioFiles/DimSum.mp3",
        TextContent:"Dim Sum",
        Story:"Story or details this person told 21",
        TextColor3D:new THREE.Color(1, 1, 1),
      },
      
    ];
    function _SceneSetUp() 
    {
        return {
            getSceneCount :function()
            {
                return megaTable.length;
            },
            getSceneDetails : function(index)
            {
                return megaTable[index%megaTable.length];
            },
            getSceneTitlesAll : function()
            {
                return megaTable.map(item => item.SelectorTitle);
            },
        }
    }


    var instance;
    return {
        getInstance: function()
        {
            if (instance == null) 
            {
                instance = new _SceneSetUp();
                instance.constructor = null;
            }
            return instance;
        },
   };
})();
