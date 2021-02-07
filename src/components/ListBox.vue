<template>
  <div id="listBox">
    <v-card class="mx-auto" max-width="400" tile>
      <v-toolbar color="purple darken-4" dark>
        <v-toolbar-title>{{ listBoxLabel }}</v-toolbar-title>
      </v-toolbar>

      <div v-for="(tasks, index) in taskData" :key="index">
        <v-list-item v-if="listBoxLabel === tasks.taskStage && tasks.projectName === currentProjectName">
          <v-list-item-content>
                <v-btn @click="viewTaskData(tasks)" block elevation="2" v-text="tasks.taskName"></v-btn>
        </v-list-item-content>
      </v-list-item>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "listBox",
  props: {
    listBoxLabel: String,
    passedUsername: String,
    selectedProject: String,
    //currentProjectName: String,
    currentListIndex: Number
  },

  mounted() {
    this.$http({
        method: "post",
        url: "http://localhost:2020/users/" + this.username + "/tasks/fetch",
        headers: {
          "Content-Type": "application/json",
        },
        // passing current username as "authentication" for the request
      data: this.username
    }).then(response => {
      this.taskData = response.data;
      //this.taskData.push([]);
    });
  },

  data() {
    return {
      taskData: [],
      username: this.passedUsername,
      currentProjectName: this.selectedProject
    };
  },

  methods: {
    viewTaskData: function(taskObject) {
      console.log(taskObject)
    }
  }
};
</script>

<style scoped>
</style>