CREATE TABLE "guestbook_messages" (
    "id" SERIAL NOT NULL,
    "body" VARCHAR(280) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "guestbook_messages_pkey" PRIMARY KEY ("id")
);
