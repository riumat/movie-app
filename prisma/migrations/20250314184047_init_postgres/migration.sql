-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('movie', 'tv');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('pending', 'accepted', 'rejected');

-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "watchtime" INTEGER NOT NULL DEFAULT 0,
    "featured_content_id" INTEGER,
    "featured_content_type" "ContentType",

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "content_to_genre" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "content_id" INTEGER NOT NULL,
    "content_type" "ContentType" NOT NULL,
    "genre_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "content_to_genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content" (
    "user_id" INTEGER NOT NULL,
    "content_id" INTEGER NOT NULL,
    "content_type" "ContentType" NOT NULL,
    "rating" INTEGER,
    "review" VARCHAR(400),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "content_pkey" PRIMARY KEY ("user_id","content_id","content_type")
);

-- CreateTable
CREATE TABLE "content_genre" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "content_genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "watchlist" (
    "user_id" INTEGER NOT NULL,
    "content_id" INTEGER NOT NULL,
    "content_type" "ContentType" NOT NULL,
    "content_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "watchlist_pkey" PRIMARY KEY ("user_id","content_id","content_type")
);

-- CreateTable
CREATE TABLE "person" (
    "person_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "person_pkey" PRIMARY KEY ("person_id","user_id")
);

-- CreateTable
CREATE TABLE "relationships" (
    "id" SERIAL NOT NULL,
    "requester_id" INTEGER NOT NULL,
    "receiver_id" INTEGER NOT NULL,
    "status" "RequestStatus" NOT NULL,
    "requested_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "responded_at" TIMESTAMP(3),

    CONSTRAINT "relationships_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "content_to_genre_user_id_genre_id_idx" ON "content_to_genre"("user_id", "genre_id");

-- CreateIndex
CREATE INDEX "content_to_genre_content_id_content_type_idx" ON "content_to_genre"("content_id", "content_type");

-- AddForeignKey
ALTER TABLE "content_to_genre" ADD CONSTRAINT "content_to_genre_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_to_genre" ADD CONSTRAINT "content_to_genre_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "content_genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_to_genre" ADD CONSTRAINT "content_to_genre_user_id_content_id_content_type_fkey" FOREIGN KEY ("user_id", "content_id", "content_type") REFERENCES "content"("user_id", "content_id", "content_type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content" ADD CONSTRAINT "content_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watchlist" ADD CONSTRAINT "watchlist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person" ADD CONSTRAINT "person_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relationships" ADD CONSTRAINT "relationships_requester_id_fkey" FOREIGN KEY ("requester_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relationships" ADD CONSTRAINT "relationships_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
