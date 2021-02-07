<template>
  <div id="updateTaskDialog">
    <v-row justify="center">
      <v-dialog v-model="this.dialog" persistent width="600">
        <v-card>
          <v-card-title class="headline"> Update Task </v-card-title>
          <v-form ref="form" v-model="updateTaskFormValid" validation>
          <v-text-field
            disabled
            class="px-3"
            v-model="taskObject.taskName"
            label="Task Name"
            :rules="[rules.required]"
            outlined
            clearable
          ></v-text-field>
          <v-select
            class="px-3"
            v-model="taskObject.taskStage"
            :items="['Backlog', 'Scoping', 'In Development', 'Completed']"
            label="Stage"
            :rules="[rules.required]"
            outlined
            ></v-select>
            <v-select
              class="px-3"
              v-model="taskObject.taskPriority"
              :items="['Trivial', 'Minor', 'Normal', 'Major', 'Critical']"
              :rules="[rules.required]"
              label="Priority"
              outlined
              ></v-select>
            <v-textarea
              class="px-3"
              v-model="taskObject.taskDescription"
              label="Task Description"
              :rules="[rules.required]"
              value=""
              outlined
              ></v-textarea>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="hideDialog"> Close </v-btn>
            <v-btn :disabled="!updateTaskFormValid" color="blue darken-1" text @click="updateTask">
              Update
            </v-btn>
          </v-card-actions>
          </v-form>
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
      taskObject: {},
      updateTaskFormValid: false,
      rules: {
        required: (value) => !!value || "Required."
      }
    }
  },

  methods: {
    hideDialog: function () {
      this.taskName = "";
      this.dialog = false;
    },

    updateTask: function () {
      //console.log("Project Created: " + this.projectName);
      let updatedTaskObject = {
        "taskName": this.taskObject.taskName,
        "taskStage": this.taskObject.taskStage,
        "taskType": this.taskObject.taskType,
        "taskPriority": this.taskObject.taskPriority,
        "taskDescription": this.taskObject.taskDescription
      }

      this.$emit('updateTaskObj', updatedTaskObject);
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
#dialogueBox {
  width: 500px;
}
</style>