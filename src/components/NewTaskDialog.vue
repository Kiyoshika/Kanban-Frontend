<template>
  <div id="dialogueBox">
    <v-row justify="center">
      <v-dialog v-model="this.dialog" persistent width="600">
        <v-card>
          <v-card-title class="headline"> Create New Task </v-card-title>
          <v-text-field
            class="px-3"
            v-model="taskName"
            label="Task Name"
            outlined
            clearable
          ></v-text-field>
          <v-select
            class="px-3"
            v-model="taskStage"
            :items="['Backlog', 'Scoping', 'In Development', 'Completed']"
            label="Stage"
            outlined
            ></v-select>
            <v-select
              class="px-3"
              v-model="taskType"
              :items="['Enhancement', 'Bug', 'Design']"
              label="Task Type"
              outlined
            ></v-select>
            <v-select
              class="px-3"
              v-model="taskPriority"
              :items="['Trivial', 'Minor', 'Normal', 'Major', 'Critical']"
              label="Priority"
              outlined
              ></v-select>
            <v-textarea
              class="px-3"
              v-model="taskDescription"
              label="Task Description"
              value=""
              outlined
              ></v-textarea>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="hideDialog"> Close </v-btn>
            <v-btn color="blue darken-1" text @click="createTask">
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
      taskName: "",
      taskStage: "",
      taskType: "",
      taskPriority: "",
      taskDescription: ""
    };
  },

  methods: {
    hideDialog: function () {
      this.taskName = "";
      this.dialog = false;
    },

    createTask: function () {
      //console.log("Project Created: " + this.projectName);
      let newTaskObj = {
        "taskName": this.taskName,
        "taskStage": this.taskStage,
        "taskType": this.taskType,
        "taskPriority": this.taskPriority,
        "taskDescription": this.taskDescription
      }

      this.$emit('newTask', newTaskObj);
      this.taskName = "";
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