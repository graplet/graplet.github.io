Blockly.Msg.ACTION_HUE = 230;
Blockly.Msg.EVENT_HUE = 20;
Blockly.Msg.INSTANCE_HUE = 290;
Blockly.utils.colour.setHsvSaturation(0.55); 
Blockly.utils.colour.setHsvValue(0.78);  
Blockly.FieldCheckbox.CHECK_CHAR = '✔'

Blockly.Scrollbar.scrollbarThickness = 15;

let HasChanges = false;

const graplet_theme = Blockly.Theme.defineTheme('graplet', {
  'base': Blockly.Themes.Zelos,
  'startHats': true,
});

layout.on('initialised', function() {
  initializeBlockly();
});

Blockly.Blocks['channel_action'] = channelActions
Blockly.Blocks['message_action'] = messageActions
Blockly.Blocks['role_action'] = roleActions


Blockly.Extensions.registerMutator(
  'embed_builder_mutator',embed_builder_method,undefined,[]);

let workspace;
async function initializeBlockly(){
  workspace = Blockly.inject("blocklyDiv", { 
    renderer: "zelos",
    theme: graplet_theme,
    toolbox: toolbox,
    sounds: false,
    grid:{
      spacing: 20,
      length: 1,
      colour: '#ccc',
      snap: true
    },
    zoom: {
      controls: true,
      wheel: true,
      startScale: 0.75,
      maxScale: 3,
      minScale: 0.3,
      scaleSpeed: 1.2,
      pinch: true
    },
    trashcan: false 
  });
  workspace.addChangeListener(Blockly.Events.disableOrphans);
  loadBlocksDefault()
  blocklyMiscOptions()
}

function loadBlocksDefault(){
  let PayloadBlocks;
  if (ProjectIDRoot != '') {
    console.info("Loading ProjectID: " + ProjectIDRoot);
    openDatabase()
    .then(db => {
      // DB Action
      const transaction = db.transaction('projects')
        .objectStore('projects')
        .get(parseInt(ProjectIDRoot));
      transaction.onerror = (event) => {
        alert("There was an Error retrieving from IndexedDB");
        console.error(event);
        PayloadBlocks = {};
      };
      transaction.onsuccess = (event) => {
        const Project = event.target.result;
        PayloadBlocks = JSON.parse(Project.blocks);
        Blockly.serialization.workspaces.load(PayloadBlocks, workspace);
        document.getElementById('projectName').value = Project.name;
        document.getElementById('img-input').value = Project.image;
        if (Project.image){
          document.getElementById('project-icon').src = Project.image;
        }
        console.info("Loaded!");
      };
    })
    .catch(error => {
      console.error("Error opening database:", error);
    });
  
  
  }
}  


function loadTutorialBlocks(){
  PayloadBlocks = {"blocks":{"languageVersion":0,"blocks":[{"type":"bot_login","id":"EfmK.b-lkZU_$cP}n[:`","x":-410,"y":290,"inputs":{"TOKEN_INPUT":{"shadow":{"type":"token_input","id":"3K?6nV7Se+,L8u8U0@qN","fields":{"TOKEN":"Your token here"}}}}},{"type":"once","id":"xRRtwo%Fd0$l%bvjluqJ","x":-410,"y":90,"inputs":{"EVENT":{"block":{"type":"botready","id":"#Wh1tj8h03-`$JPb,TC2"}},"DO":{"block":{"type":"terminal_log","id":"e%{:7BOv{nvgeRS0*MrO","inputs":{"LOG":{"shadow":{"type":"input","id":"*R~;i)$Pp,Mpge[}?3.c","fields":{"TEXT":"we have logged in the bot!"}}}}}}}}]}};
  Blockly.serialization.workspaces.load(PayloadBlocks, workspace);
}

function blocklyMiscOptions(){
  workspace.addChangeListener(codeUpdateListener);
  workspace.addChangeListener(event => {
    if (event.type === Blockly.Events.FINISHED_LOADING) {
      console.log('Finished loading!')
      HasChanges = false;
    }
  });
  var BlocklyLabels = document.getElementsByClassName('blocklyTreeLabel');
  Array.from(BlocklyLabels).forEach(function(element) {
    element.style.fontFamily = 'Fredoka', 'sans-serif';
  });
  Blockly.registry.register(
    Blockly.registry.Type.TOOLBOX_ITEM,
    Blockly.ToolboxCategory.registrationName,
    CustomCategory, true);
}

const options = {
  contextMenu: true,
  shortcut: true,
};

const copypaste = new CrossTabCopyPaste();
copypaste.init(options, () => {
  console.log('Copy paste plugin initiated.');
});

class CustomCategory extends Blockly.ToolboxCategory {
    constructor(categoryDef, toolbox, opt_parent) {
      super(categoryDef, toolbox, opt_parent);
    }
    addColourBorder_(colour){
        this.rowDiv_.style.backgroundColor = colour;
    }
  }


const supportedEvents = new Set([
  Blockly.Events.BLOCK_CHANGE,
  Blockly.Events.BLOCK_CREATE,
  Blockly.Events.BLOCK_DELETE,
  Blockly.Events.BLOCK_MOVE,
]);

function codeUpdateListener(event) {
  if (workspace.isDragging()) return; // Don't update while changes are happening.
  if (!supportedEvents.has(event.type)) return;
  HasChanges = true;
  updateCode();
 }

let CODE_LANGUAGE = 'py';

function updateCode(){
  HasChanges = true;
  const output = document.getElementById('generated-code')
  if (CODE_LANGUAGE == 'js'){
    document.getElementById('dependecy-text').innerHTML = 'Ensure you have <a href="https://nodejs.org/en">Node.js</a> installed.';
    document.getElementById('dependecy-run').innerHTML = '<li>type <code>npm install discord.js</code> to install the necessary packages</li>\n<li>Finally, run the bot using <code>node bot.js</code></li>';
    const code = javascript.javascriptGenerator.workspaceToCode(workspace);
    output.textContent =  `const Discord = require('discord.js');\nconst client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds]})\n\n${code}`;
  } else if (CODE_LANGUAGE == 'py'){
    document.getElementById('dependecy-text').innerHTML = 'Ensure you have <a href="https://python.org/downloads">Python</a> installed.';
    document.getElementById('dependecy-run').innerHTML = '<li>type <code>pip install discord.py</code> to install the necessary modules</li>\n<li>Finally, run the bot using <code>python bot.py</code></li>';
    const code = python.pythonGenerator.workspaceToCode(workspace);
    output.textContent = `import discord\nclient = discord.Client(intents=discord.Intents.all())\n\n${code}`
  }
} 

window.addEventListener("beforeunload", function(event) {
  if (HasChanges == true){
    var confirmation = window.confirm();
    if (!confirmation){
      event.preventDefault();
    }
  }
});

function SwitchLanguage(lang){
  CODE_LANGUAGE = lang;
  updateCode()
}

function to_snake_case(text) {
  const originalText = text;
  let unmodifiedText = undoCases(originalText);
  let modifiedText = unmodifiedText;

  modifiedText = unmodifiedText.toLowerCase().split(" ").join("_");

  return modifiedText;
}

function undoCases(text) {
  if (typeof text !== "string") return text;
  if (text.includes(" ")) return text;
  if (text.includes("_")) return text.replaceAll(/_/g, " ");
  if (text.includes("-")) return text.replaceAll(/-/g, " ");
  const regexCapitalized = /([a-z])([A-Z])/g;
  if (regexCapitalized.test(text)) return text.replace(regexCapitalized, "$1 $2");
  return text;
}