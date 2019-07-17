export const randomNames = [
  { name: 'Davide', surname: 'Valentini', gender: 'male', region: 'Italy' },
  { name: 'Codrina', surname: 'Goga', gender: 'female', region: 'Romania' },
  { name: 'Sergio', surname: 'Cortés', gender: 'male', region: 'Spain' },
  { name: 'Ηλιόδωρος', surname: 'Γαλάνη', gender: 'male', region: 'Greece' }
]
export const initialState = {
  game: {
    gameFinished: false,
    gameStarted: false,
    pads: [
      { active: false, id: 'green', name: '', url: '' },
      { active: false, id: 'red', name: '', url: '' },
      { active: false, id: 'blue', name: '', url: '' },
      { active: false, id: 'yellow', name: '', url: '' }
    ],
    score: 0
  },
  player: {
    ai: [],
    guessed: []
  }
}
