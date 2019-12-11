<template>
  <div class="Input">
    <div class="Input-Wrapper" :class="{'Input-Wrapper--border': !isFocus}">
      <input id="search" class="Input-Field" v-model="searchText" @focusin="isFocus = true" @focusout="isFocus = false"/>
      <label for="search" class="Input-Label"></label>
    </div>
    <div class="Input-Autocomplete Autocomplete" v-if="wordsForAutocomplete.length !== 0">
      <div class="Autocomplete-Item" v-for="item in wordsForAutocomplete" :key="item" @click="searchText = item">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { SERVER_URL } from './../env';

export default {
  data() {
    return {
      isFocus: false,
      searchText: '',
      autocompleteData: [],
      wordsForAutocomplete: [],
      errors: [],
    }
  },

  watch: {
    searchText(value) {
      if(value.length > 2) {
        this.wordsForAutocomplete = this.autocompleteData.filter(item => item.indexOf(value.slice(0, 2)) !== -1);
      }
      else this.wordsForAutocomplete = [];
    }
  },

  filters: {

  },

  mounted() {
    axios.get(`${SERVER_URL}/api`)
    .then(res => this.autocompleteData = res.data)
    .catch(e => this.errors.push(e))
  }
}
</script>

<style lang="scss">
.Input {
  width: 276px;
  margin-right: auto;
  margin-left: auto;
  font-family: 'Roboto', sans-serif;
  font-size: 13px;

  &-Wrapper {
    position: relative;
    padding: 7px 0;

    &:focus:before {
      display: none;
    }

    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 5px;
      right: 0;
      width: 10px;
      height: 10px;
      transform: rotate(45deg);
      border-right: 1px solid #858585;
      border-bottom: 1px solid #858585;
    }
  }

  &-Wrapper--border:before {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #999;
  }

  &-Field {
    width: 100%;
    border: none;

    &:focus {
      outline: none;
      border-bottom: none;
    }

    &:focus + .Input-Label {
      transform: scaleX(276);
      visibility: visible;
    }
  }

  &-Label {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 1px;
    height: 2px;
    background-color: #1155CC;
    transition: all 0.2s linear;
    visibility: hidden;
  }
}

.Autocomplete {
  padding-top: 6px;
  text-align-last: left;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  &-Item {
    padding: 5px 12px;
    font-size: 13px;
    line-height: 15px;
    cursor: pointer;
    border-bottom: 1px solid #F1F1F1;

    &:hover {
      background-color: #F1F1F1;;
    }
  }
}
</style>
