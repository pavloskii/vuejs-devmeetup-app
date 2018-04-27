<template>
  <v-dialog width="350px" persistent>
      <v-btn fab accent slot="activator">
          <v-icon>edit</v-icon>
      </v-btn>

      <v-card>
          <v-container>
              <v-layout row wrap>
                  <v-flex xs12>
                      <v-card-title>Edit Meetup</v-card-title>
                  </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-layout row wrap>
                  <v-flex xs12>
                      content
                  </v-flex>
              </v-layout>
          </v-container>
      </v-card>
  </v-dialog>
</template>
