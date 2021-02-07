<template>
  <div id="listContainer">
    <v-card class="mx-auto scroller" max-width="400">
      <v-list id="listOverflow">
        <v-list-item-group color="indigo">
          <v-list-item
            v-for="project in projectList"
            :key="project"
            @click="selectProject(project)"
          >
            <v-list-item-content>
              <v-list-item-title v-text="project"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {

  mounted: function() {
      this.username = this.$store.getters.getUsername;

      this.$http({
      method: "post",
      url: this.$servername + "/projectList",
      headers: {
        "Content-Type": "application/json",
      },
      // passing username as "authentication" for the request
      data: {"username":this.$store.getters.getUsername, "password": this.$store.getters.getPassword},
    }).then((response) => (this.projectList = response.data));
  },

  data() {
    return {
      username: '',
      projectSelected: false,
      lastProjectSelected: '',
      projectList: [],
    };
  },

  methods: {
    selectProject(projectName) {
      // if a project is currently selected and you select again: "disable" the selection
      if (this.projectSelected === true && this.lastProjectSelected === projectName) {
        this.projectSelected = false;
        this.$emit("selectedProject", "")
      } else {
        this.$emit("selectedProject", projectName);
        this.projectSelected = true;
        this.lastProjectSelected = projectName;
      }
    },
  },
};
</script>

<style scoped>
.scroller {
  max-height: 500px;
  overflow-y: auto;
}
</style>