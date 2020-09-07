export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    async getAllCharacters() {
        const res = await this.getResource('/characters?page=5&pageSize=10');

        return res.map(this._transformCharacted);
    }

    async getCharacters(id) {
        const res = await this.getResource(`/characters/${id}`);
        return this._transformCharacted(res);
    }

    getAllHouse() {
        return this.getResource(`/houses`);
    }

    getHouse(id) {
        return this.getResource(`/houses/${id}`);
    }

    getAllBooks() {
        return this.getResource(`/books`);
    }

    getBooks(id) {
        return this.getResource(`/books/${id}`);
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }

    _transformCharacted(char) {
        return {
            id: this._extractId(char),
            name: char.name || "no data(",
            gender: char.gender || "no data(",
            born: char.born || "no data(",
            died: char.died || "no data(",
            culture: char.culture || "no data("
        }
    }

    _transformHouse(house) {
        return {
            id: this._extractId(house),
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transformBook(book) {
        return {
            id: this._extractId(book),
            name: book.name,
            numberOfPages: book.numberOfPages,
            publiser: book.publiser,
            released: book.released
        }
    }
}