import { users } from '../data/users.json';

export default (userID: string) => {
  // find user with matching userID
  const user = users.find((user) => user.userID === userID);
  if (user?.toxic_responses) {
    // create reply with random toxic response
    const reply =
      user.toxic_responses[
        Math.floor(Math.random() * user.toxic_responses.length)
      ];
    return reply;
  } else return null;
};
