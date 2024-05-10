import { GithubUser } from './github-user.js';

export class Favorites {
  constructor(rootElement) {
    this.rootElement = document.querySelector(rootElement);

    this.load();
  }

  load() {
    const entries = localStorage.getItem('@github-favorites');

    this.entries = JSON.parse(entries) || [];
  }

  save() {
    localStorage.setItem('@github-favorites', JSON.stringify(this.entries));
  }

  async add(userName) {
    if (!userName) {
      return;
    }

    try {
      const cleanUserName = userName.trim().toLowerCase();
  
      const alreadyExists = this.entries.some((entry) => entry.login.toLowerCase() === cleanUserName);
  
      if (alreadyExists) {
        throw new Error('Usuário já adicionado');
      }
  
      const githubUser = await GithubUser.search(cleanUserName);

      if (!githubUser.login) {
        throw new Error('Usuário não encontrado');
      }

      this.entries = [githubUser, ...this.entries];
  
      this.save();
    } catch (error) {
      alert(error.message);
    }
  
  }

  delete(user) {
    const remainingEntries = this.entries.filter((entry) => entry.login !== user.login);
    this.entries = remainingEntries;

    this.save();
  }
}
