-- CreateEnum
CREATE TYPE "State" AS ENUM ('New', 'Learning', 'Review', 'Relearning');

-- CreateEnum
CREATE TYPE "Rating" AS ENUM ('Manual', 'Again', 'Hard', 'Good', 'Easy');

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL DEFAULT extract(epoch from now()),
    "updatedAt" BIGINT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,
    "link" TEXT,
    "hash" TEXT,
    "review" INTEGER NOT NULL DEFAULT 0,
    "love" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL DEFAULT extract(epoch from now()),
    "updatedAt" BIGINT NOT NULL,
    "content" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    "uuid" TEXT NOT NULL,
    "oauth" TEXT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatarUrl" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" VARCHAR(255) NOT NULL,
    "avatarUrl" TEXT,
    "uuid" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parameters" (
    "uid" INTEGER NOT NULL,
    "request_retention" DOUBLE PRECISION NOT NULL DEFAULT 0.9,
    "maximum_interval" INTEGER NOT NULL DEFAULT 36500,
    "w" JSONB NOT NULL,
    "enable_fuzz" BOOLEAN NOT NULL DEFAULT false,
    "card_limit" INTEGER NOT NULL DEFAULT 50,
    "lapses" INTEGER NOT NULL DEFAULT 8,

    CONSTRAINT "Parameters_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Note" (
    "nid" SERIAL NOT NULL,
    "question" TEXT NOT NULL DEFAULT '',
    "answer" TEXT NOT NULL DEFAULT '',
    "extend" JSONB NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "postId" INTEGER,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("nid")
);

-- CreateTable
CREATE TABLE "Card" (
    "cid" SERIAL NOT NULL,
    "due" BIGINT NOT NULL DEFAULT extract(epoch from now()),
    "stability" DOUBLE PRECISION NOT NULL,
    "difficulty" DOUBLE PRECISION NOT NULL,
    "elapsed_days" INTEGER NOT NULL,
    "scheduled_days" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "lapses" INTEGER NOT NULL,
    "state" "State" NOT NULL DEFAULT 'New',
    "last_review" BIGINT NOT NULL DEFAULT 0,
    "nid" INTEGER NOT NULL,
    "suspended" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("cid")
);

-- CreateTable
CREATE TABLE "Revlog" (
    "lid" TEXT NOT NULL,
    "grade" "Rating" NOT NULL,
    "state" "State" NOT NULL,
    "due" BIGINT NOT NULL,
    "stability" DOUBLE PRECISION NOT NULL,
    "difficulty" DOUBLE PRECISION NOT NULL,
    "elapsed_days" INTEGER NOT NULL,
    "last_elapsed_days" INTEGER NOT NULL,
    "scheduled_days" INTEGER NOT NULL,
    "review" BIGINT NOT NULL,
    "duration" BIGINT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Revlog_pkey" PRIMARY KEY ("lid")
);

-- CreateTable
CREATE TABLE "RevlogCardRel" (
    "uuid" TEXT NOT NULL,
    "lid" TEXT NOT NULL,
    "cid" INTEGER NOT NULL,

    CONSTRAINT "RevlogCardRel_pkey" PRIMARY KEY ("lid","cid","uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_link_key" ON "Post"("link");

-- CreateIndex
CREATE UNIQUE INDEX "Post_hash_key" ON "Post"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Parameters_uid_key" ON "Parameters"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Note_nid_key" ON "Note"("nid");

-- CreateIndex
CREATE UNIQUE INDEX "Card_cid_key" ON "Card"("cid");

-- CreateIndex
CREATE UNIQUE INDEX "Card_nid_key" ON "Card"("nid");

-- CreateIndex
CREATE UNIQUE INDEX "Revlog_lid_key" ON "Revlog"("lid");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parameters" ADD CONSTRAINT "Parameters_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_nid_fkey" FOREIGN KEY ("nid") REFERENCES "Note"("nid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RevlogCardRel" ADD CONSTRAINT "RevlogCardRel_lid_fkey" FOREIGN KEY ("lid") REFERENCES "Revlog"("lid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RevlogCardRel" ADD CONSTRAINT "RevlogCardRel_cid_fkey" FOREIGN KEY ("cid") REFERENCES "Card"("cid") ON DELETE RESTRICT ON UPDATE CASCADE;
