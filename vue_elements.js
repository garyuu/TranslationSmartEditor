// Load after window is loaded
let videoArea
let jsonArea
let editArea

videoArea = new Vue({
  el: '#videoArea',
  data: {
    videoSource: '',
    recordButtonText: 'Record',
  },
  methods: {
    loadVideo: function(e){
      const file = e.target.files[0];
      const type = file.type;
      this.videoSource = URL.createObjectURL(file)
      try {
        this.$ref.video.load();
      }
      catch (err){
        console.log("Loading video error! " + err);
      }
    },
    clickVideo: function(e){
      if (this.$ref.video.paused) {
        this.$ref.video.play()
        this.$ref.video.setAttribute('controls')
      }
      else {
        this.$ref.video.pause()
        this.$ref.video.removeAttribute('controls')
      }
    },
    clickRecord: function(e){
      DataInterface.recordTime(this.$ref.video.currentTime)
    },
  },
})

jsonArea = new Vue({
  el: '#jsonArea',
  data: {
    json: '',
    exportButtonText: 'Export',
    importButtonText: 'Import',
  },
  methods: {
    exportJson: function(e){
      this.json = DataInterface.exportJSON()
      DataInterface.copy(this.$ref.json)
    },
    importJson: function(e){
      DataInterface.importJSON(this.json)
    },
  },
})

editArea = new Vue({
  el: '#editArea',
  data: {
    title: '',
    groups: [],
  },
  computed: {
    resetButtonText: function(){
      return 'ResetAll'
    }
  },
  methods: {
    resetAll: function(e) {
      DataInterface.resetEditor()
    },
    jumpToTime: function(time) {
      DataInterface.jumpToTime(videoArea.$ref.video, time)
    },
    delete: function(groupId, contentId) {
      DataInterface.deleteContent(groupId, contentId)
    },
    sizeClass: function(sizeIndex) {
      return SizeDataList[sizeIndex].class
    },
    colorClass: function(colorIndex) {
      return ColorDataList[colorIndex].class
    },
    titleChange: function(){
      DataInterface.saveTitleToLocalStorage()
    },
    groupChange: function(index) {
      DataInterface.saveGroupToLocalStorage(index)
    },
    changeType: function(groupId, contentId, data) {
      DataInterface.changeContentType(groupId, contentId, data)
      this.groupChange(groupId)
    },
    changeColor: function(groupId, contentId, data) {
      DataInterface.changeContentColor(groupId, contentId, data)
      this.groupChange(groupId)
    },
    changeSize: function(groupId, contentId, data) {
      DataInterface.changeContentSize(groupId, contentId, data)
      this.groupChange(groupId)
    },
  },
})
