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

    getAllCharacters() {
        return this.getResource('/characters?page=5&pageSize=10');
    }
    getCharacters(id) {
        return this.getResource(`/characters/${id}`);
    }
    getAllHouse() {
        return this.getResource(`/houses`);
    }
    getAllBooks() {
        return this.getResource(`/books`);
    }

}
