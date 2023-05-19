const typeDefs = `
  
"A User is a group of Modules"
type User {
  
    _id: ID!
    "this user name"
    name: String!
    "The number of user age "
    age: Int!
  }

  type Query {
    # this is description  
    """
      get all user in database
    """
    getUsers: [User]
    "get data by id "
    getUserById(id: ID!): User
  }

  type Mutation {
    "create a user and return user new"
    createUser(name: String!, age: Int!): User
  }
`;

export default typeDefs;
