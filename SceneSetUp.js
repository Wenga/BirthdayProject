// this does not need to be a singleton, just experimenting with different patterns
var SceneSetUp = (function(){
    const megaTable = [
    {
        SelectorTitle:'1',
        SkyPath:'./Sky/ACultCeremony.png',
        TextContent:'My ideal birthday place for birthday: a cult’s ceremony ',
        AudioPath:"./AudioFiles/ACultCeremony.mp3"
    },
    {
        SelectorTitle:'2',
        SkyPath:'./Sky/ACultCeremony2.png',
        TextContent:'A cult\'s ceremony',
        AudioPath:"./AudioFiles/ACultCeremony2.mp3"
    }];
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
