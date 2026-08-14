import {defineStore} from 'pinia';
import { Tournament , round, match} from '../typestournament';

export const useTournamentStore =  defineStore('tournament', {
    state: () => ({
        tournament: null as Tournament | null,
      }),
      actions: {
        
      }
})