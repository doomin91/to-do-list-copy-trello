<template>
  <div>
    <div class="itemBox" v-for="(element, elementIdx) in items" :key="element.id">
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
          <div class="item" v-for="(item, itemIdx) in element.rows" :key="item.id" @mouseover="item.mouseOver=1" @mouseleave="item.mouseOver=0">
            <div>{{item.name}}</div>
            <div class="edit">
              <div @click="modifyCard(elementIdx, itemIdx)" v-if="item.mouseOver==1" ><font-awesome-icon icon="fa-regular fa-edit"/></div>
            </div>
          </div>
        </draggable>
      </div>
      <div class="itemFooter">
        <div class="btnBox" v-if="element.mode==0" @click="element.mode=1">
          <div class="btn">
          + Add another card
          </div>
          <div class="btn-img">
            <font-awesome-icon icon="fa-regular fa-note-sticky" />
          </div>
        </div>
        <div class="regBox" style="padding:0px; mn" v-if="element.mode==1">
          <div>
            <input v-model="element.addCardTitle" type="text" placeholder="Enter item title for list..." @keyup.enter="addCard(element)">
          </div>
          <div>
            <button class="addBtn" @click="addCard(element)">Add Card</button>
            <span class="cancleBtn" @click="element.mode=0">✖</span>
          </div>
        </div>
      </div>
    </div>

    <div class="addBox" @click="addMode=1" v-if="addMode==0" >
      <div>+ Add another list</div>
    </div>

    <div class="regBox" v-if="addMode==1">
      <div>
        <input v-model="addTitle" type="text" placeholder="Enter list title..."  @keyup.enter="addAnotherList()">
      </div>
      <div>
        <button @click="addAnotherList()" class="addBtn">Add List</button> 
        <span @click="addMode=0" class="cancleBtn">✖</span>
      </div>
    </div>

    <div class="addBox">
      {{items}}
      {{addTitle}}
    </div>
  </div>
</template>

<script>

import draggable from 'vuedraggable'
import * as todoApi from '@/api/todo'

export default {
  components: {
    draggable
  },
  data() {
    return {
      addMode: 0,
      addTitle: "",
      items: [
        {
          id: 1,
          mode: 0,
          addCardTitle: "",
          name: 'Team Resources',
          rows: [
                  {
                    id:1,
                    mouseOver: 0,
                    name:"Project Overview"
                  },
                  {
                    id:2,
                    mouseOver: 0,
                    name:"Weekly Updates"
                  }
          ]
        },
        {
          id: 2,
          mode: 0,
          addCardTitle: "",
          name: 'To Do',
          rows: [
                  {
                    id:3,
                    mouseOver: 0,
                    name:"Legal review"
                  },
                  {
                    id:4,
                    mouseOver: 0,
                    name:"Schedule C-suite meeting"
                  },
                  {
                    id:5,
                    mouseOver: 0,
                    name:"Create brand strategy"
                  }
          ]
        }
      ]
    } 
  },
  methods: {
    addAnotherList(){
      todoApi.getToDo()
      .then( (res) => {
        console.log(res);
      })

      if(this.addTitle == ""){
        alert("값을 입력해주세요.");
        return false;
      }
      this.addMode = 0;
      let data = {
          name: this.addTitle,
          rows: [],
          mode: 0,
          addCardTitle: "",
        }
      this.items.push(data)
      this.addTitle = ""
    },
    addCard(element){
      if(element.addCardTitle == ""){
        alert("값을 입력해주세요.")
        return false;
      }
      let data = {
        id:5,
        name:element.addCardTitle
      }
      element.rows.push(data)
      element.addCardTitle = ""
      element.mode = 0;
    },
    modifyCard(listIdx, itemIdx){
      let item = this.items[listIdx]['rows'][itemIdx];
      item.name = "테스트";
    },
    deleteCard(listIdx, itemIdx){
      this.items[listIdx]['rows'].splice(itemIdx, 1);
    }
  },
}
</script>
