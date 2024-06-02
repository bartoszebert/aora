import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.belearn.aora",
  projectId: "665c5d39003ae7edea18",
  databaseId: "665c5f07001f9f7cad18",
  userCollectionId: "665c5f37002e36fea2eb",
  videoCollectionId: "665c5f6b003aad3ae429",
  storageId: "665c612c00128bd569b4",
};

const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error("Failed to create user");

    const avatarUrl = avatars.getInitials(username);
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        username,
        email,
        avatar: avatarUrl,
        accountId: newAccount.$id,
      }
    );
    
    await signIn(email, password);

    return newUser;
  } catch (error) {
    throw new Error("Failed to create user");
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to sign in");
  }
};
