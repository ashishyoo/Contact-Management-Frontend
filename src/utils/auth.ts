import api from "./api";
import {
  UserRegisterDto,
  UserLoginDto,
  UserResponseDto,
  LoginResponseDto,
} from "@/types/user";

export const register = async (
  userData: UserRegisterDto
): Promise<UserResponseDto> => {
  const response = await api.post<UserResponseDto>("/users/register", userData);
  return response.data;
};

export const login = async (
  userData: UserLoginDto
): Promise<LoginResponseDto> => {
  const response = await api.post<LoginResponseDto>("/users/login", userData);
  localStorage.setItem("token", response.data.accessToken);
  return response.data;
};

export const getCurrentUser = async (): Promise<UserResponseDto> => {
  const response = await api.get<UserResponseDto>("/users/currentuser");
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};
