# Badminton tournament
This is a full-stack project for managing badminton tournament.

# Business logic
A badminton tournament holds single and/or double matches, so players can enrol in either single or double or both. Each team has two players. A tournament should have at least 8 enrollments for single and have at least 4 enrollments for double. Once enrollments are finished, a tournament then starts by creating a list of random matches for single and double.

Admin can see live ranking and update match result. After all matches in a round, admin can decide to end the round and move to the next round with paired matches according to live ranking.

# Project structure
This repo is a mono-repo, which includes backend, frontend, and libs.

## Backend
The backend uses nest.js and prisma (postgresql), It has sever modules: player, match, round, and tournament.

Player module has endpoints for creating a player and getting all players.

Tournament module has many endpoints:
 - create a tournament
 - get a tournament detail
 - get all single enrollments
 - enrol a player to single matches
 - get registered players who're not enrolled in single matches in a tournament
 - register a new player and enrol the player to a tournament
 - get all double enrollments
 - enrol two players as a team in a tournament
 - get registered players who're not enrolled in double matches in a tournament
 - start a tournament
 - get latest single round of a tournament with ranking
 - get latest double round of a tournament with ranking
 - update scores of a match of a round in a tournament
 - proceed to next round

Other modules have some helper functions for tournament module to use.

## Frontend
The frontend uses next.js, chakraUI, and Formik.
The full routes are not set up yet.
Currently it only has 3 pages:
 - /tournament/new to create a tournament
 - /tournament/:id to enrol players and teams to the tournament
 - /tournament/:id/rounds/latest to view the latest single/double rounds (rankings and matches) in a tournament and also to edit match results

Currently it can only support single mathces due to time limitation.

## Libs
The libs contain interface definition and helper functions that can be used in both backend and frontend.