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
  props: {
    username: String,
  },

  mounted() {
    this.$http({
      method: "post",
      url: "http://localhost:2020/users/" + this.userName + "/projectList",
      headers: {
        "Content-Type": "text/plain",
      },
      data: this.userName,
    }).then((response) => (this.projectList = response.data));
  },

  data() {
    return {
      userName: this.username,
      projectList: [],
    };
  },

  methods: {
    selectProject(projectName) {
      this.$emit("selectedProject", projectName);
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