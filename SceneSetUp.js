// this does not need to be a singleton, just experimenting with different patterns
var SceneSetUp = (function(){
    const megaTable = [
    {
        SelectorTitle:'1',
        SkyPath:'./Sky/skybox1.png',
        TextContent:'some dummy text\n for sky1',
    },
    {
        SelectorTitle:'2',
        SkyPath:'./Sky/skybox2.png',
        TextContent:'wanna some robux?',
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
