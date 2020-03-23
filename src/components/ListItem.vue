<template>
  <div v-bind:class="{'alert-secondary': item.done, 'alert-info': !item.done, 'p-2': true}">
    <h3 v-bind:class="{strike: item.done}">{{item.msg}}</h3>
    <p class="" v-if="item.completed > 0">
      <i>completed on : {{getDate('completed')}}</i>
    </p>
    <p class="" v-if="item.submitted > 0">
      <i>created on : {{getDate('submitted')}}</i>
    </p>
    <button v-if="!item.done" @click="update()">Done</button>
  </div>
</template>

<script>
import DateFormat from '../assets/js/dateformat';

export default {
  name: 'ListItem',
  props: {
    data: {},
    submit: {},
  },
  data() {
    return ({
      item: {},
    });
  },
  methods: {
    reset() {
      this.item = { ...this.data };
    },
    update() {
      this.item.done = true;
      this.submit(null, this.item);
    },
    getDate(type) {
      switch (type) {
        case 'completed': {
          return DateFormat.format(this.item.completed, 'formal');
        }
        case 'submitted': {
          return DateFormat.format(this.item.submitted, 'formal', this.item.timezoneOffset);
        }
        default: {
          return DateFormat.format(this.item.completed);
        }
      }
    },
  },
  created() {
    this.reset();
  },
  components: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .strike {
    text-decoration: line-through;
  };
</style>
