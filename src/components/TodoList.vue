<template>
  <div class="container card mt-5 p-0 mb-5">
    <div class="container-fluid p-2 bg-info">
      <h3 class="m-0 text-white">Dino's Todo List</h3>
    </div>
    <div class="container-fluid p-2">
      <form class="form-inline">
        <div class="form-group flex-fill">
            <input
              class="form-control flex-fill" type="text" placeholder="What is your task/s to do?"
            >
            <div class="btn-group ml-2" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-warning">Reset</button>
              <button type="button" class="btn btn-primary">Submit</button>
            </div>
        </div>
      </form>
      <ListItem/>
    </div>
  </div>
</template>

<script>
import ListItem from './ListItem.vue';

export default {
  name: 'TodoList',
  props: {},
  data: () => ({
    lists: [],
  }),
  components: {
    ListItem,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
