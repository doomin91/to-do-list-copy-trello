<template>
  <div>
    <div class="itemBox">
      <div class="itemHeader">
        <div class="title">
          title
        </div>
        <div class="toggle">
          ⋯
        </div>
      </div>
      <div class="itemBody">  
        <draggable class="dragable" group="people" v-model="myArray1" @start="drag=true" @end="drag=false">
          <div class="item" v-for="element in myArray1" :key="element.id">{{element.name}}</div>
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

        <div class="itemBox">
      <div class="itemHeader">
        <div class="title">
          title
        </div>
        <div class="toggle">
          ⋯
        </div>
      </div>
      <div class="itemBody">  
        <draggable class="dragable" group="people" v-model="myArray2" @start="drag=true" @end="drag=false">
          <div class="item" v-for="element in myArray2" :key="element.id">{{element.name}}</div>
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

    <div class="addBox">
      + Add another list
    </div>

    <div class="addBox">
      {{myArray1}}
    </div>

    <div class="addBox">
      {{myArray2}}
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
      myArray1: [
        {
          id:1,
          name:"철수"
        },
        {
          id:2,
          name:"짱구"
        }
      ],
      myArray2: [
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
        },
      ]
    } 
  }
}
</script>
