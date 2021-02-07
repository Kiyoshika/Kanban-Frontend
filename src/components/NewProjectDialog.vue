<template>
  <div id="dialogueBox">
    <v-row justify="center">
      <v-dialog v-model="this.dialog" persistent width="400">
        <v-card>
          <v-card-title class="headline"> Create New Project </v-card-title>
          <v-text-field
            class="px-3"
            v-model="projectName"
            label="Project Name"
            outlined
            clearable
          ></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="hideDialog"> Close </v-btn>
            <v-btn color="blue darken-1" text @click="createProject">
              Create
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      projectName: "",
    };
  },

  methods: {
    hideDialog: function () {
      this.projectName = "";
      this.dialog = false;
    },

    createProject: function () {
      //console.log("Project Created: " + this.projectName);
      this.$emit('newProj', this.projectName);
      this.projectName = "";
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
#dialogueBox {
  width: 300px;
}
</style>