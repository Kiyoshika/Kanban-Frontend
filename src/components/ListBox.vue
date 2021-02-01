<template>
  <div id="listBox">
    <v-card class="mx-auto" max-width="400" tile>
      <v-toolbar color="purple darken-4" dark>
        <v-toolbar-title>{{ listBoxLabel }}</v-toolbar-title>
      </v-toolbar>

      <div v-for="projName in projectData.projects" :key="projName.projectName">
        <v-list-item v-if="projName.projectName === currentProjectName">
          <v-list-item-content>
            <div v-for="projectItemName in projName.projectItems[currentListIndex]" :key="projectItemName">
                <v-btn block elevation="2" v-text="projectItemName"></v-btn>
            </div>
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
    //currentProjectName: String,
    currentListIndex: Number
  },
  data() {
    return {
      projectData: {
        "projects": [
          {"projectName": "Project A", "projectItems": [
            ["Backlog A", "Backlog B"], // backlog
            ["Scoping A", "Scoping B", "Scoping C"], // scoping
            ["InDev A", "InDev B", "InDev C"], // in development
            ["Completed A", "Completed B", "Completed C"], // completed
          ]},

          {"projectName": "Project B", "projectItems": [
            ["Backlog A", "Backlog B", "Backlog C", "Backlog D"], // backlog
            ["Scoping A"], // scoping
            ["InDev A", "InDev B"], // in development
            ["Completed A", "Completed B", "Completed C", "Completed D"], // completed
          ]}
        ]
      },

      currentProjectName: ''
    };
  },
};
</script>

<style scoped>
</style>