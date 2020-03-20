<template>
  <div class="container-sm card mt-5 p-0 mb-5">
    <div class="container-fluid p-2 bg-secondary">
      <h3 class="m-0 text-white">Dino's Todo List</h3>
    </div>
    <div class="container-fluid py-1 px-1">
      <form @submit="submit()" class="form-inline d-flex form-group flex-grow-1 m-0">
        <div class="d-flex flex-row input-group btn-group m-1 flex-grow-1"
          role="group"
          aria-label="Basic example"
        >
          <input
            class="form-control flex-grow-1 border-right-0" type="text"
            placeholder="What you need to do?"
            @change="onChange"
            v-model="newItem.msg"
          >
          <button
            type="button" class="btn btn-warning flex-grow-0" @click="reset()"
            v-bind:disabled="newItem.msg === ''"
          >
            Reset
          </button>
          <button
            type="submit" class="btn btn-primary flex-grow-0"
            v-bind:disabled="newItem.msg === ''"
          >
            Submit
          </button>
        </div>
      </form>
      <div v-if="items.length > 0" class="card m-1" style="overflow: hidden">
        <ListItem
          v-for="listitem in items" v-bind:key="listitem.created"
          v-bind:data="listitem" v-bind:submit="submit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from './ListItem.vue';

const storageCurrent = 'todolist-current';
const storageItems = 'todolist-items';

export default {
  name: 'TodoList',
  props: {},
  data() {
    return (
      {
        newItem: {},
        items: [],
      }
    );
  },
  methods: {

    submit(updateItem) {
      const saveItem = updateItem || this.newItem;
      if (typeof (Storage) !== 'undefined') {
        if (updateItem) {
          saveItem.completed = Date.now();
        } else {
          saveItem.submitted = Date.now();
        }
        const saveItems = this.items.filter((item) => item.created !== saveItem.created);
        window.localStorage.setItem(storageItems, JSON.stringify(saveItems.concat(saveItem)));
      }
      this.reset();
      this.updateItems();
    },

    onChange() {
      if (typeof (Storage) !== 'undefined') {
        window.localStorage.setItem(storageCurrent, JSON.stringify(this.newItem));
      }
    },

    reset(isOnMount) {
      const resetValue = {
        msg: '',
        done: false,
        priority: 0,
        created: Date.now(),
        submitted: 0,
        completed: 0,
        timezoneOffset: new Date().getTimezoneOffset(),
      };

      if (isOnMount) {
        if (typeof (Storage) !== 'undefined') {
          const raw = window.localStorage.getItem(storageCurrent);
          if (raw) {
            this.newItem = JSON.parse(raw);
          } else {
            this.newItem = resetValue;
          }
        } else {
          this.newItem = resetValue;
        }
      } else {
        this.newItem = resetValue;
        this.onChange();
      }
    },

    updateItems() {
      const resetValue = [];
      if (typeof (Storage) !== 'undefined') {
        const raw = window.localStorage.getItem(storageItems);
        if (raw) {
          const updated = JSON.parse(raw);
          const undone = updated.filter((item) => !item.done)
            .sort((a, b) => a.created - b.created);
          const done = updated.filter((item) => item.done)
            .sort((a, b) => a.completed - b.completed);
          this.items = undone.reverse().concat(done.reverse());
        } else {
          this.items = resetValue;
        }
      } else {
        this.items = resetValue;
      }
    },
  },
  created() {
    this.reset(true);
    this.updateItems();
  },
  components: {
    ListItem,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .root {
    overflow: hidden;
  };
</style>
