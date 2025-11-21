import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUser = async (user: any) => {
  await AsyncStorage.setItem('user', JSON.stringify(user));
};

export const getUser = async (): Promise<any> => {
  const json = await AsyncStorage.getItem('user');
  return json ? JSON.parse(json) : null;
};

export const isUserRegistered = async () => {
  const user = await getUser();
  return !!user;
};
