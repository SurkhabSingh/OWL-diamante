package models

import (
	"time"

	"github.com/lib/pq"
	"gorm.io/gorm"
)

type User struct {
  gorm.Model
  // ID uint `json:"id" gorm:"primary_key"`  
	WalletAddress string `json:"walletAddress"`
  SecretKey string `json:"secretKey"`
  Username string `json:"username"`
  Email string `json:"email"`
  Picture string `json:"picture"`
  Tags pq.StringArray ` gorm:"type:text[]" json:"tags"`
  Bio string `json:"bio"`
  WishList pq.StringArray ` gorm:"type:text[]" json:"wishList"`
  GamesOwned pq.StringArray ` gorm:"type:text[]" json:"gamesOwned"`
  CreatedAt time.Time `json:"created_at"`
  UpdatedAt time.Time `json:"updated_at"`
}

func NewUser(walletAddress string, secretKey string) (user *User, err error){
  user = &User{
    WalletAddress: walletAddress,
    SecretKey : secretKey,
  }

  DB.Create(&user)
   
  return user, nil
}