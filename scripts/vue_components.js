Vue.component('drop',{
  props: ['defaultindex', 'dataarray', 'onselectchange', 'frameclass', 'selectorclass', 'listclass'],
  data: function(){
    return {
      showList: false,
      index: this.defaultindex ? this.defaultindex : 0
    }
  },
  computed: {
    name: function(){
      return this.dataarray[this.index].name
    }
  },
  methods: {
    change: function(index){
      if (this.index != index)
      {
        this.index = index
        this.$emit('onselectchange', index)
      }
    },
    openList: function(){
      this.showList = true
    },
    closeList: function(){
      this.showList = false
    },
    onClick: function(){
      this.showList = !this.showList;
    },
    elementclass: function(index){
      if (this.dataarray[index].class){
        return this.dataarray[index].class
      }
      else {
        return ''
      }
    }
  },
  template:  `<div class="dropFrame" :class="frameclass">
                <span @click="onClick()" @blur="closeList()" class="dropSelector noselect" :class="selectorclass" tabindex="0">
                  {{ name }}
                </span>
                <div v-if="showList" class="dropList noselect" :class="listclass">
                  <div v-for="(data, index) in dataarray" @focus="change(index)" tabindex="0" :class="elementclass(index)">
                    {{ data.name }}
                  </div>
                </div>
              </div>
            `
})

Vue.component('type-list', {
  props: ['defaultindex', 'type-change'],
  computed: {
    typeList: function() {
      return TypeDataList
    }
  },
  methods: {
    changeType: function(index) {
      this.$emit('type-change', [index, this.typeList[index]])
    }
  },
  template: `<drop :defaultindex="defaultindex"
                   :dataarray="typeList"
                   @onselectchange="changeType($event)"
                   frameclass="typeFrame"
                   selectorclass="typeSelector"
                   listclass="typeList"
             ></drop>`
})

Vue.component('color-selector', {
  props: ['defaultindex', 'color-change'],
  data: function(){
    return {
      colorselector: 'colorSelector ' + ColorDataList[this.defaultindex].class
    }
  },
  watch: {
    defaultindex: function(val){
      this.changeColor(val)
    }
  },
  computed: {
    colorList: function() {
      return ColorDataList
    }
  },
  methods: {
    changeColor: function(index) {
      this.colorselector = 'colorSelector ' + this.colorList[index].class
      this.$emit('color-change', [index, this.colorList[index]])
    }
  },
  template: `<drop :defaultindex="defaultindex"
                   :dataarray="colorList"
                   @onselectchange="changeColor($event)"
                   frameclass="colorFrame"
                   :selectorclass="colorselector"
                   listclass="colorList"
             ></drop>`
})

Vue.component('size-selector', {
  props: ['defaultindex', 'size-change'],
  computed: {
    sizeList: function(){
      return SizeDataList
    }
  },
  methods: {
    changeSize: function(index){
      this.$emit('size-change', [index, this.sizeList[index]])
    }
  },
  template: `<drop :defaultindex="defaultindex"
                   :dataarray="sizeList"
                   @onselectchange="changeSize($event)"
                   frameclass="sizeFrame"
                   selectorclass="sizeSelector"
                   listclass="sizeList"
             ></drop>`
})