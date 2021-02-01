<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn style="margin-right: 20px;" color="primary" dark v-bind="attrs" v-on="on">{{ menuName }}</v-btn>
    </template>

    <v-list>
      <v-list-item-group>
        <v-list-item v-for="item in menuItems" :key="item" @click="performAction(item)">
          <v-list-item-content>
            <v-list-item-title
              v-text="item"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
  
  
</template>

<script>

export default {

    props: {
        menuItems: Array,
        menuName: String
    },
    
    data () {
        return {

        }
    },

    methods: {
        performAction: function(optionText) {
            switch(optionText) {
                case "New Project":
                    this.$emit('clicked', 'New Project');
                    break;

                case "Delete Project":
                    this.$emit('clicked', "Delete Project");
                    break;
            }
        }
    }
}
</script>

<style scoped>
</style>