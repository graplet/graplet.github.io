const embedCheckboxes = ['DESCRIPTION','TITLE','COLOUR','AUTHOR','FOOTER'];
const embedFooterboxes = ['FOOTER_TEXT','FOOTER_ICON_URL']
const embedAuthorboxes = ['AUTHOR_NAME','AUTHOR_URL','AUTHOR_ICON_URL']

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

embed_builder_method =   {
  saveExtraState: function() {
    return {
      'embedOptions': this.embedOptions,
      'footerOptions': this.footerOptions,
      'authorOptions': this.authorOptions
    };
  },
  
  loadExtraState: function(state) {
    this.embedOptions = state['embedOptions'];
    this.footerOptions = state['footerOptions'];
    this.authorOptions = state['authorOptions'];
    this.updateShape();
  },
  decompose: function(workspace) {
    var topBlock = workspace.newBlock('embed_mutator');
    for (let i= 0; i < this.embedOptions.length; i++){
      topBlock.setFieldValue(true,this.embedOptions[i])
    }
    topBlock.initSvg();
    return topBlock;
  },
  
  compose: function(topBlock) {
    this.embedOptions = []
    this.authorOptions = []
    this.footerOptions = []
    for (let i = 0; i < embedCheckboxes.length; i++) {
      if (topBlock.getFieldValue(embedCheckboxes[i]) == 'TRUE'){
        this.embedOptions.push(embedCheckboxes[i])
      }
    }
    if (topBlock.getFieldValue('AUTHOR') == 'TRUE'){
      for (let i = 0; i < embedAuthorboxes.length; i++) {
        if (topBlock.getFieldValue(embedAuthorboxes[i]) == 'TRUE'){
          this.authorOptions.push(embedAuthorboxes[i])
        }
      }
    }
    if (topBlock.getFieldValue('FOOTER') == 'TRUE'){
      for (let i = 0; i < embedFooterboxes.length; i++) {
        if (topBlock.getFieldValue(embedFooterboxes[i]) == 'TRUE'){
          this.footerOptions.push(embedFooterboxes[i])
        }
      }
    }
    this.updateShape();
  },
  updateShape: function() {
    for (let i = 0; i < embedCheckboxes.length; i++) {
      this.removeInput(embedCheckboxes[i],true);
    }
    for (let i = 0; i < embedFooterboxes.length; i++) {
      this.removeInput(embedFooterboxes[i],true);
    }
    for (let i = 0; i < embedAuthorboxes.length; i++) {
      this.removeInput(embedAuthorboxes[i],true);
    }
    console.log(this.embedOptions)
    for (let i = 0; i < this.embedOptions.length; i++){
      option = this.embedOptions[i];
      if (option == 'FOOTER'){
        this.appendDummyInput('FOOTER').appendField('Footer')
        for (let j = 0; j < this.footerOptions.length; j++){
          addInputs(this,this.footerOptions[j])
        }
      }else if (option == 'AUTHOR'){
        this.appendDummyInput('AUTHOR').appendField('Author')
        for (let j = 0; j < this.authorOptions.length; j++){
          addInputs(this,this.authorOptions[j])
        }
      }else{
        addInputs(this,option)
      }
    }
  }
}

function addInputs(thisblock,option){
  parent = thisblock.appendValueInput(option)
    .appendField(capitalizeFirstLetter(undoCases(`${option.toLowerCase()}:`)))
  if (workspace && !parent.connection.targetConnection && !parent.sourceBlock.isInFlyout){
    if (option == 'COLOUR'){
      var InputBlock = workspace.newBlock('colour_hsv_sliders')
    }else{
      var InputBlock = workspace.newBlock('input')
    }
      InputBlock.setShadow(true)
      InputBlock.initSvg()
      InputBlock.render();
    parent.connection.connect(InputBlock.outputConnection)
  }
}