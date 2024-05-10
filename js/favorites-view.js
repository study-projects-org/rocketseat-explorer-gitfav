import { Favorites } from './favorites.js';

export class FavoritesView extends Favorites {
  constructor(rootElement) {
    super(rootElement);

    this.tbody = document.querySelector('table tbody');

    this.onAdd();
    this.update();
  }

  async onAdd() {
    const btnAdd = this.rootElement.querySelector('.search button');
    const input = this.rootElement.querySelector('.search input');

    btnAdd.onclick = async () => {
      const { value } = input;

      await this.add(value);
      this.update();
      input.value = '';
    }
  }

  update() {
    this.removeAllTr();

    if (this.entries.length === 0) {
      this.tbody.appendChild(this.createEmptyDataRow());
      return;
    }

    this.entries.forEach((user) => {
      const row = this.createDataRow();

      row.querySelector('img').src = `https://github.com/${user.login}.png`;
      row.querySelector('img').alt = `Imagem de perfil de ${user.name}`;
      row.querySelector('.user a').href = `https://github.com/${user.login}`;
      row.querySelector('.user p').textContent = user.name;
      row.querySelector('.user span').textContent = `/${user.login}`;
      row.querySelector('.repositories').textContent = user.public_repos;
      row.querySelector('.followers').textContent = user.followers;

      row.querySelector('.remove').onclick = () => {
        this.onDelete(user);
      };

      this.tbody.append(row);
    });
  }

  onDelete(user) {
    const isOk = confirm(`Deseja remover ${user.name} dos favoritos?`);

    if (isOk) {
      this.delete(user);
      this.update();
    }
  }

  createDataRow() {
    const tr = document.createElement('tr');

    const contentRow = `
      <td>
        <div class="user">
          <img src="https://github.com/ronaldo-nunes.png" alt="">
          <a href="https://github.com/ronaldo-nunes">
            <p>Fulano</p>
            <span>/fulano</span>
          </a>
        </div>
      </td>

      <td class="repositories">123</td>
      <td class="followers">321</td>
      <td>
        <button class="remove">Remover</button>
      </td>
    `;

    tr.innerHTML = contentRow;
    return tr;
  }

  createEmptyDataRow() {
    const tr = document.createElement('tr');

    const contentRow = `
      <td colspan="4" align="center">
        <div class="no-data">
          <img src="./assets/star.svg" alt="Estrela">
          <p>Nenhum favorito ainda</p>
        </div>
      </td>
    `;
    tr.innerHTML = contentRow;
    return tr;
  }

  removeAllTr() {
    this.tbody.querySelectorAll('tr').forEach(tr => tr.remove());
  }
}