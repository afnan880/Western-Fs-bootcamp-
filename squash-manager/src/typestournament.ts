import { Player} from './types'

export interface Tournament {
    name: string
    id: string
    players: Player[]
    rounds: round[]
     status: 'unstarted' | 'inprogress' | 'finished'
}

export interface match{
    id: string
    finished: boolean
    player1: Player | null
    player2: Player | null
    winner: Player | null
}

export interface round {
    id:string
    matches: match[]
}