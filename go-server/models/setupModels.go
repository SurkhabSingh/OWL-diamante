package models

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	// dsn := fmt.Sprintf(
	// 	"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
	// 	os.Getenv("DB_HOST"),
	// 	os.Getenv("DB_USER"),
	// 	os.Getenv("DB_PASSWORD"),
	// 	os.Getenv("DB_NAME"),
	// 	os.Getenv("DB_PORT"),
	// )
	dsn := "postgresql://prabhpreetsingh.singh0203:qlgQcy6jw0ot@ep-mute-king-272149.ap-southeast-1.aws.neon.tech/neondb"
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database")
	}
  database.AutoMigrate(&User{})

	DB = database
}