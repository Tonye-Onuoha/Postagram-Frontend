import { faker } from "@faker-js/faker";
import { v4 as uuid4 } from "uuid";
import userFixtures from "./user";
import postFixtures from "./post";

function commentFixtures(isLiked = false, isEdited = false, post = undefined, user = undefined) {
    return {
        id: uuid4(),
        post: post || postFixtures(),
        author: user || userFixtures(),
        body: faker.lorem.sentence(20),
        edited: isEdited,
        liked: isLiked,
        likes_count: Math.floor(Math.random() * 10),
        created: faker.date.recent(),
        updated: faker.date.recent()
    };
}

export default commentFixtures;
