<template>
	<v-dialog with="350px" persistent v-model="editDialog">
		<v-btn fab accent slot="activator">
			<v-icon>edit</v-icon>
		</v-btn>
		<v-card style="background-color:white">
			<v-container>
				<v-layout wrap row>
					<v-flex xs12>
						<v-card-title>Edit Meetup</v-card-title>
					</v-flex>
				</v-layout>
				<v-layout wrap row>
					<v-flex xs12>
						<v-card-text>
							<v-text-field
              name="title"
              label="Title"
              id="title"
              v-model="editedTitle"
              required>
              </v-text-field>
              <v-text-field
              name="description"
              label="Description"
              id="description"
              v-model="editedDescription"
              multi-line
              required>
              </v-text-field>
              <v-text-field
              name="place"
              label="Place"
              id="place"
              v-model="editedPlace"
              required>
              </v-text-field>
						</v-card-text>
					</v-flex>
				</v-layout>
				<v-divider></v-divider>
				<v-layout row wrap>
					<v-flex xs12>
						<v-card-actions>
							<v-btn flat class="blue--text darken-1" @click.native="editDialog=false">Close</v-btn>
							<v-btn flat class="blue--text darken-1" @click.native="onSaveChange">Save</v-btn>
						</v-card-actions>
					</v-flex>
				</v-layout>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
  props: ['meetup'],
  data () {
    return {
      editDialog: false,
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description,
      editedPlace: this.meetup.place
    }
  },
  methods: {
    onSaveChange () {
      if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') return
      this.editDialog = false
      this.$store.dispatch('updateMeetup', {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription,
        place: this.editedPlace
      })
    }
  }
}
</script>
