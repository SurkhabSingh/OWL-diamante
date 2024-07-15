package routes

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/prabhpreet-code/go-owl/controllers"
)

func New() http.Handler {
  router := mux.NewRouter()

  // users routes
  router.HandleFunc("/api", controllers.CheckUsers).Methods("GET")
  router.HandleFunc("/api/users", controllers.GetAllUsers).Methods("GET")
  router.HandleFunc("/api/user/{id}",controllers.GetUserById).Methods("GET")
  router.HandleFunc("/api/user", controllers.CreateUser).Methods("POST") 
  router.HandleFunc("/api/user/{id}", controllers.UpdateUser).Methods("PUT")
  router.HandleFunc("/api/user/{id}", controllers.DeleteUser).Methods("DELETE")
  router.HandleFunc("/api/wish-list/{id}", controllers.UpdateWishList).Methods("PUT")
  router.HandleFunc("/api/wish-list/{id}", controllers.DeleteWishList).Methods("DELETE")
  router.HandleFunc("/api/wish-list/{id}", controllers.GetWishListById).Methods("GET")

  
  // games routes
  router.HandleFunc("/api/getToken", controllers.GetTokenHandler).Methods("GET")
	router.HandleFunc("/api/getGames", controllers.GetGamesHandler).Methods("GET")
	router.HandleFunc("/api/getInfo", controllers.GetInfoHandler).Methods("GET")
	router.HandleFunc("/api/getVideos", controllers.GetVideosHandler).Methods("GET")
	router.HandleFunc("/api/getRecommendations", controllers.GetRecommendationsHandler).Methods("GET")
	router.HandleFunc("/api/getFranchise", controllers.GetFranchiseHandler).Methods("GET")
	router.HandleFunc("/api/getPlatform", controllers.GetPlatformHandler).Methods("GET")
  
  return router
}