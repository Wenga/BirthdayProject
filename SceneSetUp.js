// this does not need to be a singleton, just experimenting with different patterns
var SceneSetUp = (function(){
    const megaTable = [
        {
            SelectorTitle:"1",
            SkyPath:"./Sky/ACozyPlace.png",
            AudioPath:"./AudioFiles/ACozyPlace.mp3",
            TextContent:"A Cozy Place",
            Story:"A cozy place serving delicious food \n shared with a few close friends. \n --From Jacky",
            TextColor3D:new THREE.Color(1, 1, 1),
        },
        {
            SelectorTitle:"2",
            SkyPath:"./Sky/HomeWithFriends.png",
            AudioPath:"./AudioFiles/HomeWithFriends.mp3",
            TextContent:"At Home With Friends",
            Story:"Can't come up any. \n Celebrate birthday at home with friends.\n --From Luna",
            TextColor3D:new THREE.Color(1, 1, 1),
        },
        {
            SelectorTitle:"3",
            SkyPath:"./Sky/Home.png",
            AudioPath:"./AudioFiles/Home.mp3",
            TextContent:"Home",
            Story:" Home. \n --From Ji ",
            TextColor3D:new THREE.Color(1, 1, 1),
        },
        {
            SelectorTitle:"4",
            SkyPath:"./Sky/CozyNature.png",
            AudioPath:"./AudioFiles/CozyNature.mp3",
            TextContent:"Cozy Nature",
            Story:"Cozy nature, maybe forest? like some sort of 深山老林 lol. quiet surrounding + starry night + cold tone breeze + camp fire + a small group of friends talking shit lolol. \n --From eiyouwei",
            TextColor3D:new THREE.Color(1, 1, 1),
        },
        {
            SelectorTitle:"5",
            SkyPath:"./Sky/QualityTime.png",
            AudioPath:"./AudioFiles/QualityTime.mp3",
            TextContent:"With My Family And Friends",
            Story:"My ideal birthday celebration involves spending quality time with my family and friends. The day would start with a delightful meal at a cozy family restaurant, where we'd share stories and laughter with delicious dishes. After the meal, a 'Happy Birthday' song come out. The highlight would be cutting the birthday cake surrounded by the love and warmth of my friends and family. After the meal, we shall head back to my home for an evening of fun. The room would be decorated with balloons. There would also be sparkling fruit wine for sharing fun and joy. I am hosting a lively party where my friends and I indulge in entertaining party games, creating the best memories for birthday celebration.\n --From Ethan",
            TextColor3D:new THREE.Color(1, 1, 1),
        },
        {
            SelectorTitle:"6",
            SkyPath:"./Sky/HomeWithFamily.png",
            AudioPath:"./AudioFiles/HomeWithFamily.mp3",
            TextContent:"Home With Family",
            Story:"Memorable place: hotpot restaurant; Ideal place: home with family members. With the food I like, the people I love and unpack gifts.\n --From Pupu",
            TextColor3D:new THREE.Color(1, 1, 1),
          },
        {
            SelectorTitle:"7",
            SkyPath:"./Sky/HawaiiBeach.png",
            AudioPath:"./AudioFiles/HawaiiBeach.mp3",
            TextContent:"Hawaiian Beach",
            Story:"probably Hawaii, on the beach with good people, awesome surf, and delicious food. \n --From my name? handsome? genius? amazingly awesome?",
            TextColor3D:new THREE.Color(1, 1, 1),
        },
        {
            SelectorTitle:"8",
            SkyPath:"./Sky/GameConsoleMuseum.png",
            AudioPath:"./AudioFiles/GameConsoleMuseum.mp3",
            TextContent:"Game Console Museum",
            Story:"in game console museum.\n --From jiajia",
            TextColor3D:new THREE.Color(1, 0, 0),
        },
        {
            SelectorTitle:"9",
            SkyPath:"./Sky/NightClub.png",
            AudioPath:"./AudioFiles/NightClub.mp3",
            TextContent:"Night Club",
            Story:"Memorable place: Home. Ideal place: Nightclub. With dollar rain, dancer, DJ and alcohol. \n --From Juju",
            TextColor3D:new THREE.Color(1, 1, 1),
        },
        {
            SelectorTitle:"10",
            SkyPath:"./Sky/JapanHotel.png",
            AudioPath:"./AudioFiles/JapanHotel.mp3",
            TextContent:"Kyoto, Japan",
            Story:"Kyoto, Japan. In a hot spring hotel surrounded by bamboo trees. Very quiet and peaceful. \n --From Anonymous",
            TextColor3D:new THREE.Color(1, 1, 1),
        },
        {
            SelectorTitle:"11",
            SkyPath:"./Sky/Africa.png",
            AudioPath:"./AudioFiles/Africa.mp3",
            TextContent:"Africa",
            Story:"For my dream birthday cleebration, I hope to travel to Africa and experience the culture there. I wish I will be on a hot balloon in south Africa, being embraced by the beauty of nature, and being surrounded by people I love.\n --From Anonymous",
            TextColor3D:new THREE.Color(1, 1, 1),
        },
        {
            SelectorTitle:"12",
            SkyPath:"./Sky/Baotou.png",
            AudioPath:"./AudioFiles/Baotou.mp3",
            TextContent:"A Resturant In Baotou",
            Story:"A resturant in Baotou. \n --From Anonymous",
            TextColor3D:new THREE.Color(1, 1, 1),
        },
        {
            SelectorTitle:"13",
            SkyPath:"./Sky/ACultCeremony.png",
            AudioPath:"./AudioFiles/ACultCeremony.mp3",
            TextContent:"A Ceremony",
            Story:"A cult\’ s ceremony.\n --From Loooooner",
            TextColor3D:new THREE.Color(1, 1, 1),
        },
        {
            SelectorTitle:"14",
            SkyPath:"./Sky/AmusementPark.png",
            AudioPath:"./AudioFiles/AmusementPark.mp3",
            TextContent:"Roller Coaster",
            Story:"Magic mountain or 4 Flags parks. Roller Coaster.\n --From Anonymous",
            TextColor3D:new THREE.Color(1, 1, 1),
        },  
        {
            SelectorTitle:"15",
            SkyPath:"./Sky/NoCelebration.png",
            AudioPath:"./AudioFiles/NoCelebration.mp3",
            TextContent:"No Celebration",
            Story:"I prefer no celebration. \n --From 网红",
            TextColor3D:new THREE.Color(1, 1, 1),
        },
        {
            SelectorTitle:"16",
            SkyPath:"./Sky/DimSum.png",
            AudioPath:"./AudioFiles/DimSum.mp3",
            TextContent:"Dim Sum",
            Story:"Dim Sum. \n --From Anonymous",
            TextColor3D:new THREE.Color(1, 1, 1),
        },
        {
            SelectorTitle:"17",
            SkyPath:"./Sky/PaintNight.png",
            AudioPath:"./AudioFiles/PaintNight.mp3",
            TextContent:"Paint Night",
            Story:"Paint night with or without wine. \n --From Anonymous",
            TextColor3D:new THREE.Color(1, 1, 1),
        },
        {
            SelectorTitle:"18",
            SkyPath:"./Sky/BeachParty.png",
            AudioPath:"./AudioFiles/BeachParty.mp3",
            TextContent:"Beach Party",
            Story:"Beach party. \n --From Anonymous",
            TextColor3D:new THREE.Color(1, 1, 1),
        },
        {
            SelectorTitle:"19",
            SkyPath:"./Sky/Haidilao.png",
            AudioPath:"./AudioFiles/Haidilao.mp3",
            TextContent:"Haidilao",
            Story:"海底捞 \n --From Anonymous",
            TextColor3D:new THREE.Color(1, 1, 1),
        },
        {
            SelectorTitle:"20",
            SkyPath:"./Sky/GradeSix.png",
            AudioPath:"./AudioFiles/GradeSix.mp3",
            TextContent:"Grade Six",
            Story:"Celebrating birthday at home with a group of friends is always the happiest! That’s why I still remember the scene when five of my best friends came to my small birthday party on my Grade six. It was the first time we decided to do it since we were entering the last year of our elementary school. My parents prepared us a big white cream cake and my friends took presents, decorations, and snakes. The cake and the decorations were all classic 00’s pop - “生日快乐” written by strawberry jam surrounded by pink and yellow cream flowers. We also built a small tent with blankets for sharing gossip and a Tarot area on the ground next to it. The Tarot card was Cardcaptor Sakura series, one of the most popular anime of the time. Sweet memories. \n --From 软妹妹",
            TextColor3D:new THREE.Color(1, 1, 1),
        },
        {
            SelectorTitle:"21",
            SkyPath:"./Sky/FinalWorld.png",
            AudioPath:"./AudioFiles/FinalWorld.mp3",
            TextContent:"Final World",
            Story:"Right here, where my most cherished birthday memory took its first breath. I thank you for showing me different worlds through your memories and imagination. \n --From Wenga",
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
