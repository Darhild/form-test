<template>
  <div class="Input">
    <div :class="[ isFocus ? 'Input-Wrapper' : 'Input-Wrapper Input-Wrapper--border' ]"
    >
      <input
        id="search"
        class="Input-Field"
        v-model="searchText"
        @focusin="isFocus = true"
        @focusout="isFocus = false"
        @keyup.up="onArrowUp"
        @keyup.down="onArrowDown"
        @keyup.enter="onEnter"
      />
      <label for="search" class="Input-Label"></label>
    </div>
    <div
      class="Input-Autocomplete Autocomplete"
      v-if="wordsForAutocomplete.length !== 0 && (isFocus || isHovered)"
    >
      <div
        :class="[
          wordsCounter === index
            ? 'Autocomplete-Item Autocomplete-Item--state_highlighted'
            : 'Autocomplete-Item'
        ]"
        v-for="(item, index) in wordsForAutocomplete"
        :key="item.value"
        @click="onClickItem(item.value)"
        @mouseover="isHovered = true"
        @mouseout="isHovered = false"
      >
        <span v-html="item.raw"></span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { SERVER_URL } from "./../env";

export default {
  data() {
    return {
      isFocus: false,
      isHovered: false,
      searchText: "",
      wordsCounter: 0,
      autocompleteData: [],
      wordsForAutocomplete: [],
      errors: []
    };
  },

  watch: {
    searchText(value) {
      if (value !== "") {
        this.wordsForAutocomplete = this.autocompleteData
          .filter(item => item.indexOf(value) !== -1)
          .map(item => {
            const bold = item.substr(item.indexOf(value), value.length);
            const start = item.slice(0, item.indexOf(value));
            const end = item.slice(item.indexOf(value) + value.length);

            return {
              value: item,
              raw: `${start}<b>${bold}</b>${end}`
            };
          });
      } else this.wordsForAutocomplete = [];
    }
  },

  methods: {
    onClickItem(item) {
      this.searchText = item;
      this.isHovered = false;
    },

    onArrowDown() {
      if (this.wordsCounter < this.wordsForAutocomplete.length - 1)
        this.wordsCounter++;
    },

    onArrowUp() {
      if (this.wordsCounter > 0) this.wordsCounter--;
    },

    onEnter() {
      this.searchText = this.wordsForAutocomplete[this.wordsCounter].value;
      this.isHovered = false;
      this.isFocus = false;
      this.wordsCounter = -1;
    }
  },

  mounted() {
    axios
      .get(`${SERVER_URL}/api`)
      .then(res => (this.autocompleteData = res.data))
      .catch(e => this.errors.push(e));
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

.Input {
  width: 276px;
  margin-right: auto;
  margin-left: auto;
  font-family: "Roboto", sans-serif;
  font-size: 13px;

  &-Wrapper {
    position: relative;
    padding: 7px 0;

    &:focus:before {
      display: none;
    }

    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 5px;
      right: 0;
      width: 10px;
      height: 10px;
      background-color: #fff;
      transform: rotate(45deg);
      border-right: 1px solid #858585;
      border-bottom: 1px solid #858585;
      cursor: pointer;
    }
  }

  &-Wrapper--border:before {
    content: "";
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
    font-family: "Roboto", sans-serif;
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
    background-color: #1155cc;
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
    border-bottom: 1px solid #f1f1f1;

    &--state_highlighted {
      background-color: #f1f1f1;
    }

    &:hover {
      background-color: #f1f1f1;
    }
  }
}
</style>
