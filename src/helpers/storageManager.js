
class StorageManager {

  constructor() {
    this.key = 'max-score'
  }

  saveScore(score) {
    localStorage.setItem(this.key, score)
  }

  getScore() {
    return Number(localStorage.getItem(this.key)) || 0
  }

  clearScore() {
    localStorage.removeItem(this.key)
  }

}

export default new StorageManager()
