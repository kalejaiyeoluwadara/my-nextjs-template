export type UserProfileResponse = {
  status: string;
  data: UserProfileData;
};

export type UserProfileData = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type UserProfileUpdateRequest = UserProfileData & {
  newPassword?: string;
  currentPassword?: string;
};
