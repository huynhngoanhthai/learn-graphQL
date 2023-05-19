import Factory from "../utils/factoryMethod";
``;
const resolvers = {
  Query: {
    getUsers: (_parent: any, _agree: any, driver: any) => {
      return Factory.getAllUser(driver.session());
    },
    getUserById: (_parent: any, agree: { id: string }, driver: any) => {
      // console.log(agree.id);
      const user = Factory.getUserById(driver.session(), parseInt(agree.id));
      // console.log(user);

      return user;
    },
  },
  Mutation: {
    createUser: async (
      _parent: any,
      agre: { name: string; age: number },
      driver: any
    ) => {
      console.log(typeof agre);
      const user = await Factory.createUser(
        driver.session(),
        agre.name,
        agre.age
      );
      console.log(user);
      console.info(user);
      return user[0];
    },
  },
};

export default resolvers;
