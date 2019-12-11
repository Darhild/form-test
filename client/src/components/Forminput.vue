<template>
  <div class="Input">
    <div class="Input-Wrapper">
      <input id="search" class="Input-Field" type="text" v-model="searchText"/>
      <label for="search" class="Input-Label"></label>
    </div>
    <div class="Input-Autocomplete Autocomplete" v-if="wordsForAutocomplete.length !== 0">
      <div class="Autocomplete-Item" v-for="item in wordsForAutocomplete" :key="item">
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
      searchText: '',
      autocompleteData: [],
      wordsForAutocomplete: [],
      errors: [],
    }
  },

  watch: {
    searchText(value) {
      this.wordsForAutocomplete = this.autocompleteData.filter(item => item.indexOf(value) !== -1);
    }
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

    &:before {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: #999;
    }

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
</style>
