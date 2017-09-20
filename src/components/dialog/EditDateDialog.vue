<template>
	<v-dialog width="350px" persistent v-model="editDialog">
		<v-btn flat fab accent slot="activator">
			<v-icon class="black--text darken-1">event</v-icon>
		</v-btn>
		<v-card style="background-color:white">
			<v-container>
				<v-layout wrap row>
					<v-flex xs12>
						<v-card-title class="black--text darken-1">Edit Meetup Date</v-card-title>
					</v-flex>
				</v-layout>
				<v-layout wrap row>
					<v-flex xs12>
						<v-card-text>
							<v-date-picker v-model="editedDate" style="width:100%" actions></v-date-picker>
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
      editedDate: null
    }
  },
  created () {
    this.editedDate = new Date(this.meetup.date)
  },
  methods: {
    onSaveChange () {
      const newDate = new Date(this.meetup.date)
      const newYear = new Date(this.editedDate).getUTCFullYear()
      const newMonth = new Date(this.editedDate).getUTCMonth()
      const newDay = new Date(this.editedDate).getUTCDate()
      newDate.setUTCDate(newDay)
      newDate.setUTCMonth(newMonth)
      newDate.setUTCFullYear(newYear)
      this.editDialog = false
      this.$store.dispatch('updateMeetup', {
        id: this.meetup.id,
        date: newDate
      })
    }
  }
}
</script>

<style>
.picker--date {
  color: black;
}
</style>