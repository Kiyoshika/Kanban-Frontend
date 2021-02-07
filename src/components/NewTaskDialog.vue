<template>
  <div id="dialogueBox">
    <v-row justify="center">
      <v-dialog v-model="this.dialog" persistent width="600">
        <v-card>
          <v-card-title class="headline"> Create New Task </v-card-title>
          <v-form ref="form" v-model="newTaskFormValid" validation>
          <v-text-field
            class="px-3"
            v-model="taskName"
            label="Task Name"
            :rules="[rules.required]"
            outlined
            clearable
          ></v-text-field>
          <v-select
            class="px-3"
            v-model="taskStage"
            :items="['Backlog', 'Scoping', 'In Development', 'Completed']"
            :rules="[rules.required]"
            label="Stage"
            outlined
            ></v-select>
            <v-select
              class="px-3"
              v-model="taskType"
              :items="['Enhancement', 'Bug', 'Design']"
              :rules="[rules.required]"
              label="Task Type"
              outlined
            ></v-select>
            <v-select
              class="px-3"
              v-model="taskPriority"
              :items="['Trivial', 'Minor', 'Normal', 'Major', 'Critical']"
              :rules="[rules.required]"
              label="Priority"
              outlined
              ></v-select>
            <v-textarea
              class="px-3"
              v-model="taskDescription"
              label="Task Description"
              :rules="[rules.required]"
              value=""
              outlined
              ></v-textarea>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="hideDialog"> Close </v-btn>
            <v-btn :disabled="!newTaskFormValid" color="blue darken-1" text @click="createTask">
              Create
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

  props: {
    updatingTaskProp: Boolean,
    taskObject: Object
  },

  mounted() {
    if (this.updatingTaskProp) {
      this.taskName = this.taskObject.taskName;
      this.taskStage = this.taskObject.taskStage;
      this.taskType = this.taskObject.taskType;
      this.taskPriority = this.taskObject.taskPriority;
      this.taskDescription = this.taskObject.taskDescription;
    }
  },

  data() {
    return {
      dialog: false,
      newTaskFormValid: false,
      taskName: "",
      taskStage: "",
      taskType: "",
      taskPriority: "",
      taskDescription: "",
      rules: {
        required: (value) => !!value || "Required."
      }
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
      this.taskStage = "";
      this.taskType = "";
      this.taskPriority = "";
      this.taskDescription = "";
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