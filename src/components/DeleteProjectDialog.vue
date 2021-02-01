<template>
  <div id="dialogueBox">
    <v-row justify="center">
      <v-dialog v-model="this.dialog" persistent width="400">
        <v-card>
          <v-card-title class="headline"> Delete Project </v-card-title>
          <v-card-text>Are you sure you want to delete "{{ projectName }}"?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="hideDialog"> No </v-btn>
            <v-btn color="red darken-1" text @click="deleteProject">
              Delete Project
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    projectName: String
  },

  data() {
    return {
      dialog: false,
      selectedProjectName: this.projectName
    };
  },

  methods: {
    hideDialog: function () {
      this.dialog = false;
    },

    deleteProject: function() {
      this.$emit('deleteProj', this.projectName);
      this.dialog = false;
    }
  },
};
</script>

<style scoped>
#dialogueBox {
  width: 300px;
}
</style>