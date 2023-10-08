// this does not need to be a singleton, just experimenting with different patterns
var SceneSetUp = (function(){
    const megaTable = [
        {
            SelectorTitle:"1",
            SkyPath:"./Sky/HawaiiBeach.png",
            AudioPath:"./AudioFiles/HawaiiBeach.mp3",
            TextContent:"Hawaii Beach"
          },
          {
            SelectorTitle:"2",
            SkyPath:"./Sky/JapanHotel.png",
            AudioPath:"./AudioFiles/JapanHotel.mp3",
            TextContent:"Japan Hotel"
          },
          {
            SelectorTitle:"3",
            SkyPath:"./Sky/NightClub.png",
            AudioPath:"./AudioFiles/NightClub.mp3",
            TextContent:"Night Club"
          },
          {
            SelectorTitle:"4",
            SkyPath:"./Sky/ACozyPlace.png",
            AudioPath:"./AudioFiles/ACozyPlace.mp3",
            TextContent:"A Cozy Place"
          },
          {
            SelectorTitle:"5",
            SkyPath:"./Sky/Home.png",
            AudioPath:"./AudioFiles/Home.mp3",
            TextContent:"Home"
          },
          {
            SelectorTitle:"6",
            SkyPath:"./Sky/GradeSix.png",
            AudioPath:"./AudioFiles/GradeSix.mp3",
            TextContent:"Grade Six"
          },
          {
            SelectorTitle:"7",
            SkyPath:"./Sky/HomeWithFriends.png",
            AudioPath:"./AudioFiles/HomeWithFriends.mp3",
            TextContent:"Home With Friends"
          },
          {
            SelectorTitle:"8",
            SkyPath:"./Sky/GameConsoleMuseum.png",
            AudioPath:"./AudioFiles/GameConsoleMuseum.mp3",
            TextContent:"Game Console Museum"
          },
          {
            SelectorTitle:"9",
            SkyPath:"./Sky/Haidilao.png",
            AudioPath:"./AudioFiles/Haidilao.mp3",
            TextContent:"Haidilao"
          },
          {
            SelectorTitle:"10",
            SkyPath:"./Sky/CozyNature.png",
            AudioPath:"./AudioFiles/CozyNature.mp3",
            TextContent:"Cozy Nature"
          },
          {
            SelectorTitle:"11",
            SkyPath:"./Sky/HomeWithFamily.png",
            AudioPath:"./AudioFiles/HomeWithFamily.mp3",
            TextContent:"Home With Family"
          },
          {
            SelectorTitle:"12",
            SkyPath:"./Sky/ACultCeremony.png",
            AudioPath:"./AudioFiles/ACultCeremony.mp3",
            TextContent:"A Cult Ceremony"
          },
          {
            SelectorTitle:"13",
            SkyPath:"./Sky/QualityTime.png",
            AudioPath:"./AudioFiles/QualityTime.mp3",
            TextContent:"Quality Time"
          },
          {
            SelectorTitle:"14",
            SkyPath:"./Sky/NoCelebration.png",
            AudioPath:"./AudioFiles/NoCelebration.mp3",
            TextContent:"No Celebration"
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
