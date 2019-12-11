<template>
<div class="Input">
  <input id="search" class="Input-Field" type="text" v-model="text"/>
  <label for="search" class="Input-Label"></label>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      text: '',
      wordsForAutocomplete: [],
      errors: [],
    }
  },

  mounted() {
    axios.get('https://desolate-mesa-06273.herokuapp.com/api')
    .then(res => this.wordsForAutocomplete = res)
    .catch(e => this.errors.push(e))
  }
}
</script>

<style lang="scss">
.Input {
  position: relative;
  width: 276px;
  padding: 7px 0;
  margin-right: auto;
  margin-left: auto;
  font-family: 'Roboto', sans-serif;
  font-size: 13px;

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
