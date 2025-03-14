async function fetchAnime() {
    const query = `{
        Page(perPage: 10) {
            media(type: ANIME) {
                title { romaji }
                coverImage { large }
            }
        }
    }`;

    const response = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
    });

    const data = await response.json();
    const animeList = data.data.Page.media;

    const container = document.getElementById("anime-container");
    container.innerHTML = "";

    animeList.forEach(anime => {
        const animeDiv = document.createElement("div");
        animeDiv.classList.add("anime");
        animeDiv.innerHTML = `
            <img src="${anime.coverImage.large}" alt="${anime.title.romaji}">
            <h3>${anime.title.romaji}</h3>
        `;
        container.appendChild(animeDiv);
    });
}
