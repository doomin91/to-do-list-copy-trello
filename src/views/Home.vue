<template>
  <div>
    <div class="itemBox" v-for="element in data" :key="element.id">
      <div class="itemHeader">
        <div class="title">
          {{element.name}}
        </div>
        <div class="toggle">
          ⋯
        </div>
      </div>
      <div class="itemBody">  
        <draggable class="dragable" group="people" v-model="element.rows" @start="drag=true" @end="drag=false">
          <div class="item" v-for="item in element.rows" :key="item.id">{{item.name}}</div>
        </draggable>
      </div>
      <div class="itemFooter">
        <div class="btn">
        + Add another card
        </div>
        <div class="btn-img">
          <font-awesome-icon icon="fa-regular fa-note-sticky" />
        </div>
      </div>
    </div>

    <div class="addBox" @click="addAnotherList()">
      <div v-if="addMode==0" @click="this.addMode=1">+ Add another list</div>
      <div v-if="addMode==1"></div>
    </div>

    <div class="addBox">
      {{data}}
    </div>
  </div>
</template>

<script>

import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  data() {
    return {
      addMode: 0,
      data: [
        {
          id: 1,
          name: 'To-Do-List',
          rows: [
                  {
                    id:1,
                    name:"철수"
                  },
                  {
                    id:2,
                    name:"짱구"
                  }
          ]
        },
        {
          id: 2,
          name: 'Bucket-List',
          rows: [
                  {
                    id:3,
                    name:"맹구"
                  },
                  {
                    id:4,
                    name:"유리"
                  },
                  {
                    id:5,
                    name:"훈이"
                  }
          ]
        }
      ]
    } 
  },
  methods: {
    addAnotherList(){

      let data = {
          id: 2,
          name: 'Bucket-List',
          rows: [
                  {
                    id:3,
                    name:"맹구"
                  },
                  {
                    id:4,
                    name:"유리"
                  },
                  {
                    id:5,
                    name:"훈이"
                  }
          ]
        }
      this.data.push(data)
    }
  }
}
</script>
