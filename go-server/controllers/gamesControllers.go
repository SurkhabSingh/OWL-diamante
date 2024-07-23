package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strconv"
)

func GetTokenHandler(w http.ResponseWriter, r *http.Request){

	config := []byte(`{"method":"post","maxBodyLength":Infinity,"headers":{}}`)
	resp, err := http.Post("https://id.twitch.tv/oauth2/token?client_id=5rqroe548z244rtq0z3yivankoxq7j&client_secret=7o5jn7eac7uq6wk6i4di7zi36rirzs&grant_type=client_credentials", "application/json", bytes.NewBuffer(config))
	if err != nil {
		
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	var data map[string]interface{}
	err = json.NewDecoder(resp.Body).Decode(&data)
	if err != nil {
		
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

func enableCors(w *http.ResponseWriter) {
	        
            (*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func GetGamesHandler(w http.ResponseWriter, r *http.Request){
    // enableCors(&w)
	token := r.URL.Query().Get("token")


	data := []byte(`fields id, release_dates.date,first_release_date,rating_count,genres.name,dlcs,name,summary,tags,rating,category,involved_companies,cover.url,screenshots.url;
	sort release_dates.date asc;
	where rating >= 90 & cover.url!= null & release_dates.date!=null & first_release_date!=null & rating_count!=null ;
	limit 500;
	`)

	url := "https://api.igdb.com/v4/games/"
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(data))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Client-ID", "5rqroe548z244rtq0z3yivankoxq7j")
	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Access-Control-Allow-Origin", "http://localhost:8080")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	fmt.Println(resp);

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(body) 
	
}

func GetInfoHandler(w http.ResponseWriter, r *http.Request){
    enableCors(&w)
	token := r.URL.Query().Get("token")
	idStr := r.URL.Query().Get("game_id")
	id, _ := strconv.ParseInt(idStr, 10, 64)


	query := []byte(`fields id, release_dates.date, similar_games, dlcs, franchise, platforms, language_supports.id, franchises, parent_game, genres.name, videos, involved_companies.id, name, summary, rating, storyline, cover.url, screenshots.url; where id=` + strconv.FormatInt(id, 10) + `;`)

	fmt.Println(token)
	fmt.Println(idStr)

	url := "https://api.igdb.com/v4/games/"
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(query))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Client-ID", "5rqroe548z244rtq0z3yivankoxq7j")
	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Access-Control-Allow-Origin", "http://localhost:8080")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(body)
}

func GetVideosHandler(w http.ResponseWriter, r *http.Request){
    enableCors(&w)
	token := r.URL.Query().Get("token")
	gameIdStr := r.URL.Query().Get("id")
	// gameId, _ := strconv.ParseInt(gameIdStr, 10, 64)


	query := []byte("fields checksum,game,name,video_id; where game= " + gameIdStr+ ";")

	url := "https://api.igdb.com/v4/game_videos"
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(query))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Client-ID", "5rqroe548z244rtq0z3yivankoxq7j")
	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Access-Control-Allow-Origin", "http://localhost:8080")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	fmt.Println(resp);

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(body)
}

func GetRecommendationsHandler(w http.ResponseWriter, r *http.Request){
    enableCors(&w)
	token := r.URL.Query().Get("token")
	idStr := r.URL.Query().Get("game_id")
	// id, _ := strconv.ParseInt(idStr, 10, 64)

query := []byte("fields id, similar_games, themes, release_dates.date, genres.name, videos, involved_companies.company, name, summary, rating, storyline, cover.url, screenshots.url; where id=(" + idStr + ");")


	url := "https://api.igdb.com/v4/games/"
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(query))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Client-ID", "5rqroe548z244rtq0z3yivankoxq7j")
	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Access-Control-Allow-Origin", "http://localhost:8080")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	fmt.Println(resp);

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(body)
}

func GetFranchiseHandler(w http.ResponseWriter, r *http.Request){
  enableCors(&w)
  token := r.URL.Query().Get("token")
	idStr := r.URL.Query().Get("franchises")
	// id, _ := strconv.ParseInt(idStr, 10, 64)


	query:= []byte("fields checksum,created_at,games,name,slug,updated_at,url;where id="+ idStr + ";")

	url := "https://api.igdb.com/v4/franchises/"
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(query))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Client-ID", "5rqroe548z244rtq0z3yivankoxq7j")
	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Access-Control-Allow-Origin", "http://localhost:8080")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	fmt.Println(resp);

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(body) 
}

func GetPlatformHandler(w http.ResponseWriter, r *http.Request){
  enableCors(&w)
  token := r.URL.Query().Get("token")
	idStr := r.URL.Query().Get("platforms")
	// id, _ := strconv.ParseInt(idStr, 10, 64)


	query:= []byte("fields abbreviation,alternative_name,category,checksum,created_at,generation,name,platform_family,platform_logo,slug,summary,updated_at,url,versions,websites;where id=(" + idStr + ");")

	url := "https://api.igdb.com/v4/platforms/"
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(query))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Client-ID", "5rqroe548z244rtq0z3yivankoxq7j")
	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Access-Control-Allow-Origin", "http://localhost:8080")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	fmt.Println(resp);

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(body)
}