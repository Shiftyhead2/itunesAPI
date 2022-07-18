"use strict";

$(window).on("load",function(){
  $(".loader").toggleClass("hidden");
});

$(function(){
  $("#search").submit(function(e){
    e.preventDefault();
    findArtistByName($("#name").val());
  });
});

async function findArtistByName(url){
  $(".cards").empty();
  $(".loader").toggleClass("hidden");
  setTimeout(() => {
    $(".loader").toggleClass("hidden");
  },300);
  try{
    const res = await fetch(`https://itunes.apple.com/search?term=${url}&limit=5&entity=musicTrack`);

    if(!res.ok){
      throw Error(`HTTP response: ${res.statusText}`)
    }

    if(url === ""){
      throw Error(`Artist name cannot be empty`)
    }

    const data = await res.json();
    data.results.map((user) => {
      $(".cards").append(`
      <div class = "card">
        <h2>${user.artistName}</h2>
        <img src = ${user.artworkUrl60} alt = ${user.artistName}>
        <p>${user.trackName}</p>
        <p>${user.primaryGenreName} ${user.kind}</p>
      </div>`)
    }); 
    $("#name").val("");
  }catch(error){
    console.error(error);
  }
}