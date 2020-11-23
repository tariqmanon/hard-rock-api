document.getElementById('search-btn').addEventListener("click",searchResultFind)

    

    function searchResultFind(){

        document.getElementById('song-lyrics').innerHTML = "";
        const songTitle = document.getElementById('song-title').value;
        
        fetch(`https://api.lyrics.ovh/suggest/${songTitle}`)
        .then(res => res.json())
        .then(data => {
            fetchdata = data;
            for (let i = 0; i < data.data.length; i++) {
                const title = data.data[i].title;
                const artist = data.data[i].artist.name;

                document.getElementById('song-lyrics').innerHTML += `<p class="author lead"><strong>${title}</strong> Album by <span>${artist}</span> <button class="btn btn-success" onClick='getLyrics(${i})'>Get Lyrics</button></p>`;

                if (i == 9){
                    break;
                }
                
            }
        });
    }


    function getLyrics(index){
        document.getElementById('lyrics').innerHTML = "";
        const title = fetchdata.data[index].title;
        const artist = fetchdata.data[index].artist.name;

        fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res=>res.json())
        .then(data => {
            const lyrics = data.lyrics;
            document.getElementById('artist-title').innerHTML = `${artist} -- ${title}`;
            if( lyrics == undefined){
                alert("No Lyrics Found")
            }
            document.getElementById('lyrics').innerHTML = `<h2>${lyrics}</h2>`
        })
    }

    
     
    