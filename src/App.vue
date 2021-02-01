<template>
  <div id="app">
    <v-app>
      <h1>Example Kanban Board</h1>
      <h4>This is definitely not a bootleg JIRA clone...</h4>
      <br />
      <v-container>
        <v-row>
        <v-col md="2">
          <h5>Project List:</h5>
          <project-list v-bind:username="username" ref="projectList" @selectedProject="getSelectedProject"></project-list>
        </v-col>

        <v-col md="10">
          <v-row>
          <v-toolbar>
            <dropdown-menu menuName="Projects" :menuItems="projectsMenuItems" @clicked="performAction"></dropdown-menu>
            <dropdown-menu menuName="My Team" :menuItems="myTeamMenuItems" @clicked="performAction"></dropdown-menu>
            <dropdown-menu menuName="Tasks" :menuItems="taskMenuItems" @clicked="performAction"></dropdown-menu>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-row>
        <v-row>
          <v-col md="3">
            <list-box ref="projectListBox1" listBoxLabel="Backlog" :currentListIndex="0"></list-box>
          </v-col>

          <v-col md="3">
            <list-box ref="projectListBox2" listBoxLabel="Scoping" :currentListIndex="1"></list-box>
          </v-col>

          <v-col md="3">
            <list-box ref="projectListBox3" listBoxLabel="In Development" :currentListIndex="2"></list-box>
          </v-col>

          <v-col md="3">
            <list-box ref="projectListBox4" listBoxLabel="Completed" :currentListIndex="3"></list-box>
          </v-col>
        </v-row>
        </v-col>
        </v-row>
        <new-project-dialog ref="newProjectDialog" :showDialog="this.showNewProjectDialog" @newProj="createNewProject"></new-project-dialog>
        <delete-project-dialog ref="deleteProjectDialog" :showDialog="this.showDeleteProjectDialog" v-bind:projectName="selectedProjectName" @deleteProj="deleteProject"></delete-project-dialog>
      </v-container>
    </v-app>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import ListBox from "./components/ListBox.vue";
import DropdownMenu from "./components/DropdownMenu.vue";
import NewProjectDialog from './components/NewProjectDialog.vue';
import ProjectList from './components/ProjectList.vue';
import DeleteProjectDialog from './components/DeleteProjectDialog.vue';

export default {
  name: "App",
  components: {
    ListBox,
    DropdownMenu,
    NewProjectDialog,
    ProjectList,
    DeleteProjectDialog
  },
  
  data() {
    return {
      username: "zach",

      taskNameText: "",
      projectsMenuItems: ["New Project", "Delete Project"],
      myTeamMenuItems: ["Add Member", "Remove Member"],
      taskMenuItems: ["Create New Task"],

      showNewProjectDialog: false,
      showDeleteProjectDialog: false,

      selectedProjectName: ''
    };
  },

  methods: {
    performAction(action) {
        switch(action) {
          case "New Project": // open dialog for creating a new project
            this.$refs.newProjectDialog.dialog = true;
            break;

          case "Delete Project": // open dialog to confirm removal of project
            this.$refs.deleteProjectDialog.dialog = true;
            break;
        }
    },

    getSelectedProject(selectedProjectName) {
      this.selectedProjectName = selectedProjectName;
      this.$refs.projectListBox1.currentProjectName = selectedProjectName;
      this.$refs.projectListBox2.currentProjectName = selectedProjectName;
      this.$refs.projectListBox3.currentProjectName = selectedProjectName;
      this.$refs.projectListBox4.currentProjectName = selectedProjectName;
    },

    createNewProject(newProjectName) {
      this.$refs.projectList.projectList.push(newProjectName);
  },

    deleteProject(projectName) {
      // get current list of projects
      let projectArray = this.$refs.projectList.projectList;
      let projectIndex;

      // get position index of project
      for (let i = 0; i < projectArray.length; ++i) {
        if (projectArray[i] === projectName) {
          projectIndex = i;
          break;
        }
      }

      // remove project from list and push
      projectArray.splice(projectIndex, 1);
      this.$refs.projectList.projectList = projectArray;

      // get JSON of projects from each task box
      let projectsArrayJSON = this.$refs.projectListBox1.projectData.projects;
      // iterate over names to get the index (may not be the same as projectIndex)
      let projectIndexJSON;
      for (let i = 0; i < projectsArrayJSON.length; ++i) {
        if (projectsArrayJSON[i].projectName === projectName) {
          projectIndexJSON = i;
          break;
        }
      }

      // remove JSON project from all task box references
      this.$refs.projectListBox1.projectData.projects = projectsArrayJSON.splice(projectIndexJSON, 1);
    }
  }
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
