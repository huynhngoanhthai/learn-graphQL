import User from "../interfaces/User";

const runCypherQuery = async (
  session: any,
  query: string,
  params: {}
): Promise<any> => {
  try {
    const result = await session.run(query, params);
    // console.log(result);

    return result.records.map((record: any) => record.get("u").properties);
  } finally {
    session.close();
  }
};

const getAllUser = (session: any) => {
  const query = `
    MATCH(u:User)
    RETURN u
    `;
  return runCypherQuery(session, query, {});
};

const createUser = async (
  session: any,
  name: String,
  age: number
): Promise<Array<User>> => {
  const query = `
  CREATE(u:User{
    _id:$id,
    name:$name,
    age:$age
  })
  RETURN u
  `;
  const params = { id: Date.now(), name, age };
  console.log(query, params);
  return runCypherQuery(session, query, params);
};

const getUserById = async (session: any, id: number): Promise<Array<User>> => {
  const query = `
    MATCH(u:User{
      _id:$id
    })
    RETURN u
    `;
  const params = { id };
  console.log(query, params);
  const result = await runCypherQuery(session, query, params);
  return result[0];
};

export default {
  getAllUser,
  createUser,
  getUserById,
};
