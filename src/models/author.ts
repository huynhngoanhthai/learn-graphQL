import User from "../interfaces/User";

const runCypherQuery = async (
  driver: any,
  query: string,
  params: {}
): Promise<any> => {
  const session = driver.session();
  console.log(session);

  try {
    const result = await session.run(query, params);
    return result.records.map((record: any) => record.get("u").properties);
  } finally {
    session.close();
  }
};

const getAllUser = async (driver: any): Promise<Object> => {
  // console.log(driver);

  const query = `
    MATCH(u:User)
    RETURN u
    `;
  return runCypherQuery(driver, query, {});
};

const createUser = async (
  driver: Promise<Object>,
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

  return runCypherQuery(driver, query, params);
};
const getUserById = async (
  driver: Promise<Object>,
  id: number
): Promise<Array<User>> => {
  const query = `
  MATCH(u:User{
    _id:$id
  })
  RETURN u 
  `;
  const params = { id };
  // console.log(id);

  console.log(query, params);
  return runCypherQuery(driver, query, params);
};

export default {
  getAllUser,
  createUser,
  getUserById,
};
