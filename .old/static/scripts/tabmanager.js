const layoutContainer = document.getElementById('layoutContainer');
layoutContainer.style.background = 'rgba(var(--val), var(--val), var(--val), 0.3)';
layoutContainer.style.height = (window.innerHeight - document.querySelector('.navbar').offsetHeight) + 'px'
const loadingVector = '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" display="block" shape-rendering="auto" preserveAspectRatio="xMidYMid" viewBox="0 0 100 100"><path d="m26 50a24 24 0 0 0 48 0 24 26.3 0 0 1-48 0" fill="var(--default-text)" class="spinner" /></svg><style>@keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}.spinner{animation:spin 0.3s linear infinite;transform-origin:50% 50%;}</style><h3>Loading</h3>';
layoutContainer.innerHTML =   '<div id="load-screen" style="display: flex;justify-content: center;align-items: center;height:100%;">' + loadingVector + '</div>';

var config = {
  settings: {
    showPopoutIcon: false,
    showMaximiseIcon: false,
    showCloseIcon: false
  },
  dimensions: {
    borderWidth: 0,
    headerHeight: 36
  },
  content: [{
    type: 'stack', 
    content: [
      {
        type:'component',
        componentName: 'Blocks',
        isClosable: false
      },
      {
        type:'component',
        componentName: 'Code',
        isClosable: false
      },
      {
        type:'component',
        componentName: 'Settings',
        isClosable: false
      },
      {
        type:'component',
        componentName: 'Assets',
      }
    ]
  }]
};
var layout = new window.GoldenLayout( config, $('#layoutContainer') );

function getTabContent(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/static/tabs/' + name + '.html', false);
  xhr.send();
  return xhr.status === 200 ? xhr.responseText : null;
}

layout.registerComponent('Blocks', function(container){
  container.getElement().html("<div id='blocklyDiv'></div>")
})
layout.registerComponent('Assets', function(container){
  container.getElement().html(getTabContent('assetsDiv'))
})
layout.registerComponent('Code', function(container){
  container.getElement().html(getTabContent('codeDiv'))
})
layout.registerComponent('Settings', function(container){
  container.getElement().html(getTabContent('settingsDiv'))
})
layout.registerComponent('New Tab', function(container){
  container.getElement().html(getTabContent('newtabDiv'))
})
layout.init();
layout.on('initialised', function() {
  addNewTabButton();
  adjustLayoutSize();
  document.getElementById('load-screen').remove()
  layoutContainer.style.background = '';
});
layout.on('stateChanged', function() {
    const blocklyDiv = document.getElementById('blocklyDiv');
    blocklyDiv.style.width = blocklyDiv.parentElement.style.width
    blocklyDiv.style.height = blocklyDiv.parentElement.style.height
    Blockly.svgResize(Blockly.getMainWorkspace());
});
function SwitchMethodTab(element){
  if(!element.classList.contains('cst-active')){
    element.classList.toggle('cst-active');
    e1 = document.getElementById('info-automatic');
    e2 = document.getElementById('info-manual');
    if (element.nextElementSibling){
      element.nextElementSibling.classList.remove('cst-active')
      e1.style.display = 'block';
      e2.style.display = 'none';
    }else{
      element.previousElementSibling.classList.remove('cst-active')
      e1.style.display = 'none';
      e2.style.display = 'block';
    }
  }
}
window.addEventListener('resize', adjustLayoutSize);

function adjustLayoutSize() {
  layout.updateSize(window.innerWidth, (window.innerHeight - document.querySelector('.navbar').offsetHeight) + 'px')
}

// TODO : Make the splitters update instantly

function switchTab(query){
  layout._getAllContentItems().forEach(function(item){
    if (item.componentName === query){
      item.parent.setActiveContentItem(item);
    }
  })
};

function getActiveTab(){
  var active = null;
  layout._getAllContentItems().forEach(function(item){
    if (item.container && !item.container.isHidden) {
      active = item.componentName;
    }
  })
  return active;
}

function addNewTabButton(){
var tabgroups = document.querySelectorAll('.lm_tabs');
tabgroups.forEach(function(tabgroup){
  var newTabButton = document.createElement('div');
  newTabButton.classList.add('new_tab');
  newTabButton.innerHTML = '<svg class="icon strokevector" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4 12h16m-8-8v16" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>';
  newTabButton.onclick = function(){
    var newTab = {
      type:'component',
      componentName: 'New Tab',
    }
    layout.root.contentItems[0].addChild(newTab);
    layout.root.contentItems[0].setActiveContentItem(newTab);
  }
  insertAfter(tabgroup, newTabButton);
});
}

// TODO : make the new tab button appear on every tab groups dynamically

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}