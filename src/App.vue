<template>
  <div id="app">
    <v-app>
      <h1>Kanban Board</h1>
      <h4>Welcome to the development version of this project manager!</h4>
      <h4>Note that some things may be broken / not functional in the development version.</h4>
      <br />
      <v-container>
        <v-row>
          <v-col md="2">
            <h5>Project List:</h5>
            <project-list
              :key="projectListComponentKey"
              v-bind:username="username"
              ref="projectList"
              @selectedProject="getSelectedProject"
            ></project-list>
          </v-col>

          <v-col md="10">
            <v-row>
              <v-toolbar>
                <dropdown-menu
                  menuName="Projects"
                  :menuItems="projectsMenuItems"
                  @clicked="performAction"
                ></dropdown-menu>
                <dropdown-menu
                  menuName="My Team"
                  :menuItems="myTeamMenuItems"
                  @clicked="performAction"
                ></dropdown-menu>
                <dropdown-menu
                  menuName="Tasks"
                  :menuItems="taskMenuItems"
                  @clicked="performAction"
                ></dropdown-menu>
                <v-spacer></v-spacer>
              </v-toolbar>
            </v-row>
            <v-row>
              <v-col md="3">
                <list-box
                  ref="projectListBox1"
                  listBoxLabel="Backlog"
                  :selectedProject="this.selectedProjectName"
                  :passedUsername="this.username"
                  :key="listBoxComponentKey"
                ></list-box>
              </v-col>

              <v-col md="3">
                <list-box
                  ref="projectListBox2"
                  listBoxLabel="Scoping"
                  :selectedProject="this.selectedProjectName"
                  :passedUsername="this.username"
                  :key="listBoxComponentKey"
                ></list-box>
              </v-col>

              <v-col md="3">
                <list-box
                  ref="projectListBox3"
                  listBoxLabel="In Development"
                  :selectedProject="this.selectedProjectName"
                  :passedUsername="this.username"
                  :key="listBoxComponentKey"
                ></list-box>
              </v-col>

              <v-col md="3">
                <list-box
                  ref="projectListBox4"
                  listBoxLabel="Completed"
                  :selectedProject="this.selectedProjectName"
                  :passedUsername="this.username"
                  :key="listBoxComponentKey"
                ></list-box>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <new-project-dialog
          ref="newProjectDialog"
          :showDialog="this.showNewProjectDialog"
          @newProj="createNewProject"
        ></new-project-dialog>
        <delete-project-dialog
          ref="deleteProjectDialog"
          :showDialog="this.showDeleteProjectDialog"
          v-bind:projectName="selectedProjectName"
          @deleteProj="deleteProject"
        ></delete-project-dialog>
        <new-task-dialog
          ref="newTaskDialog"
          :showDialog="this.showNewTaskDialog"
          @newTask="createNewTask"
        ></new-task-dialog>
      </v-container>
    </v-app>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import ListBox from "./components/ListBox.vue";
import DropdownMenu from "./components/DropdownMenu.vue";
import NewProjectDialog from "./components/NewProjectDialog.vue";
import ProjectList from "./components/ProjectList.vue";
import DeleteProjectDialog from "./components/DeleteProjectDialog.vue";
import NewTaskDialog from "./components/NewTaskDialog.vue";

export default {
  name: "App",
  components: {
    ListBox,
    DropdownMenu,
    NewProjectDialog,
    ProjectList,
    DeleteProjectDialog,
    NewTaskDialog,
  },

  data() {
    return {
      // used for updating after API calls
      projectListComponentKey: 0,
      listBoxComponentKey: 0,

      username: "zach",

      taskNameText: "",
      projectsMenuItems: ["New Project", "Delete Project"],
      myTeamMenuItems: ["Add Member", "Remove Member"],
      taskMenuItems: ["Create New Task"],

      showNewProjectDialog: false,
      showDeleteProjectDialog: false,
      showNewTaskDialog: false,

      selectedProjectName: "",
    };
  },

  methods: {
    performAction(action) {
      switch (action) {
        case "New Project": // open dialog for creating a new project
          this.$refs.newProjectDialog.dialog = true;
          break;

        case "Delete Project": // open dialog to confirm removal of project
          this.$refs.deleteProjectDialog.dialog = true;
          break;

        case "Create New Task": // open dialog to create a new task
          this.$refs.newTaskDialog.dialog = true;
          break;
      }
    },

    getSelectedProject(selectedProjectName) {
      this.selectedProjectName = selectedProjectName;
      // "refresh" component
      this.listBoxComponentKey += 0.0001;
    },

    createNewProject(newProjectName) {
      this.$http({
        method: "post",
        url:
          "https://simple-project-manager.herokuapp.com/users/" +
          this.username +
          "/projectList/add/" +
          newProjectName,
        headers: {
          "Content-Type": "text/plain",
        },
        // passing current username as "authentication" for the request
        data: this.username,
      });

      // when creating a new project, the selections are removed: update boolean here
      this.$refs.projectList.projectIsSelected = false;
      // key switching to re-render components
      this.projectListComponentKey += 0.0001;
      this.listBoxComponentKey += 0.0001;
    },

    deleteProject(projectName) {
      this.$http({
        method: "post",
        url:
          "https://simple-project-manager.herokuapp.com/users/" +
          this.username +
          "/projectList/remove/" +
          projectName,
        headers: {
          "Content-Type": "text/plain",
        },
        // passing current username as "authentication" for the request
        data: this.username,
      });

      // key switching to re-render component
      this.projectListComponentKey += 0.0001;
    },

    async createNewTask(taskObj) {
      // add username and project name to task object
      taskObj.projectName = this.selectedProjectName;
      taskObj.username = this.username;

      await this.$http({
        method: "post",
        url: "https://simple-project-manager.herokuapp.com/users/" + this.username + "/tasks/create",
        headers: {
          "Content-Type": "application/json",
        },
        data: taskObj,
      });

      // "refresh" listboxes after creating a new task
      this.listBoxComponentKey += 0.0001;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button,
input {
  height: 35px;
}
</style>
