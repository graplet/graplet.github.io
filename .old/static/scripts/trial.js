openDatabase()
  .then(db => {
    const transaction = db.transaction(["settings"], "readwrite");
    const trialStore = transaction.objectStore("settings");
    const request = trialStore.get('trial');
    request.onerror = (event) => {
      alert("There was an error retrieving Data.");
      console.error(event);
    };
    request.onsuccess = (event) => {
      if (!request.result){
        renderTrial(0);
      }
    };
  })
  .catch(error => {
    console.log('Error opening database', error);
  });
  
const trials = [
  ['Blocks', 'Welcome to Graplet!', 'To quickly memorize and understand how Graplet works, I will guide you through this epic trial - step by step.'],
  ['Blocks', 'Blocks, Code & Settings', 'Those are the 3 default tabs. You cannot close them. Let\'s take a look at them.',['.lm_tab[title="Blocks"]','.lm_tab[title="Code"]','.lm_tab[title="Settings"]'],'S'],
  ['Blocks', 'The Workspace', 'Here you can drag & build with the blocks. Right-click to open the menu.', ['.blocklyWorkspace']],
  ['Blocks', 'The Toolbox', 'Here are the block categories, you can find your blocks here.', ['.blocklyToolboxDiv'], 'E'],
  ['Blocks', 'The Blocks', 'Drag the blocks out of the Flyout to build with them.', ['.blocklyFlyout'], 'E'],
  ['Blocks', 'The Controls', 'Here you can adjust the size of the blocks or center them. You can also use your mouse wheel.', ['.blocklyZoom'], 'NW'],
  ['Blocks', 'That\'s it!', '🎉 Congratulations, brave warrior! You have completed this trial.'],
];

function renderTrial(i) {
  const box = document.createElement('div');
  box.id = 'trial';
  box.innerHTML = `
    <h3>${trials[i][1]}</h3>
    <hr>
    <p style="margin-bottom: 10px">${trials[i][2]}</p>
    <div class="panel-container" style="justify-content: space-between;">
      <div class="navigator" id='trial-prev' style="opacity: 0.5;"><p>previous</p></div>
      <div class="navigator" id='trial-next' onclick='updateTrial(1)'><p>next</p></div>
    </div>
  `;
  box.style.position = 'absolute';
  box.style.left = '50%';
  box.style.top = '50%';
  document.body.appendChild(box);
}

function updateTrial(i) {
  if (i >= 0 && i < trials.length) {
    if (getActiveTab() != trials[i][0]){
      switchTab(trials[i][0]);
    }
    if (trials[i][3] == '.blocklyFlyout') {
      Blockly.getMainWorkspace().toolbox_.selectItemByPosition(0);
    }else{
      Blockly.getMainWorkspace().toolbox_.clearSelection();
    }
    const trialNext = document.getElementById('trial-next');
    const trialPrev = document.getElementById('trial-prev');
    const box = document.getElementById('trial');
    const finishOptions = box.querySelector('#finish-options');

    if (finishOptions) box.removeChild(finishOptions);
    if (i === trials.length - 1) {
      trialNext.onclick = null;
      trialNext.style.opacity = '0.5';
      trialNext.style.pointerEvents = 'none';
      const finishBox = document.createElement('div');
      finishBox.id = 'finish-options';
      finishBox.innerHTML = `
        <p>Next steps:</p>
        <div class="navigator" onclick="loadTutorialBlocks(); document.getElementById('trial').remove();"><p>Load a template with tutorial</p></div>
        <div class="navigator" onclick="document.getElementById('trial').remove();"><p>Start from zero</p></div>
      `;
      box.insertBefore(finishBox, box.querySelector('.panel-container'));
    } else {
      trialNext.onclick = () => updateTrial(i + 1);
      trialNext.style.opacity = '1';
      trialNext.style.pointerEvents = 'auto';
    }

    if (i === 0) {
      trialPrev.onclick = null;
      trialPrev.style.opacity = '0.5';
      trialPrev.style.pointerEvents = 'none';
    } else {
      trialPrev.onclick = () => updateTrial(i - 1);
      trialPrev.style.opacity = '1';
      trialPrev.style.pointerEvents = 'auto';
    }
    box.querySelector('h3').textContent = trials[i][1];
    box.querySelector('p').textContent = trials[i][2];
    if (trials[i][3]) {
        const locate = calculateElementPosition(trials[i][3], trials[i][4]);
        box.style.left = `${locate.left}px`;
        box.style.top = `${locate.top}px`;
    }else{
      box.style.left = '50%';
      box.style.top = '50%';
    }

    document.getElementById('highlight')?.remove();
    if (trials[i][3]) highlightElement(trials[i][3]);
  }
}

function getCombinedRect(elements) {
  if (elements.length === 0) {
    return new DOMRect(0, 0, 0, 0); 
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  elements.forEach(element => {
    const rect = element.getBoundingClientRect();
    minX = Math.min(minX, rect.x);
    minY = Math.min(minY, rect.y);
    maxX = Math.max(maxX, rect.x + rect.width);
    maxY = Math.max(maxY, rect.y + rect.height);
  });

  const combinedRectWidth = maxX - minX;
  const combinedRectHeight = maxY - minY;

  return new DOMRect(minX, minY, combinedRectWidth, combinedRectHeight);
}


function calculateElementPosition(selectors, loc) {
  const box = document.getElementById('trial');
  const elements = selectors.map(e => document.querySelector(e));
  const rect = getCombinedRect(elements);

  const offsetx = box.getBoundingClientRect().width / 2
  const offsety = box.getBoundingClientRect().height / 2

  const centerx = rect.left + rect.width / 2;
  const centery = rect.top + rect.height / 2;
  const padding = 10;

  let left, top;
  switch (loc) {
    case 'W':
      left = rect.left - offsetx - padding;
      top = centery;
      break;
    case 'NW':
      left = rect.left - offsetx - padding;
      top = rect.top - offsety - padding;
      break;
    case 'N':
      left = centerx;
      top = rect.top - offsety - padding;
      break;
    case 'NE': 
      left = rect.right + offsetx + padding;
      top = rect.top - offsety - padding;
      break;
    case 'E':
      left = padding + rect.right + offsetx;
      top = centery;
      break;
    case 'SE':
      left = rect.right + offsetx + padding;
      top = rect.bottom + offsety + padding;
      break;
    case 'S':
      left = centerx;
      top = padding + rect.bottom + offsety;
      break;
    case 3.5:
      left = rect.left - offsetx - padding;
      top = rect.bottom + offsety + padding;
      break;
    default:
      left = centerx;
      top = centery;
  }
  return { left, top };
}

function highlightElement(selectors){
  const elements = selectors.map(e => document.querySelector(e));
  const rect = getCombinedRect(elements);
  const highlight = document.createElement('div');
  highlight.id = 'highlight';
  const borderWidth = 3;
  highlight.style.cssText = `
    position: absolute;
    left: ${rect.left}px;
    top: ${rect.top}px;
    width: ${Math.min(rect.width, window.innerWidth) - borderWidth * 2}px;
    height: ${Math.min(rect.height, window.innerHeight) - borderWidth * 2}px;
    border: ${borderWidth}px dashed var(--default-text);
    z-index: 9999;
    pointer-events: none;
    border-radius: 5px;
    opacity: 0.5;
  `;
  document.body.appendChild(highlight);
}