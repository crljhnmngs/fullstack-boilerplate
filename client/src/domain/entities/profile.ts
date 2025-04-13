export type Profile = {
    userId: string;
    address: string;
    phone: string;
    birthdate: string;
    profileImage?: string;
};

export type ProfileWithoutUserId = Omit<Profile, 'userId' | 'profileImage'> & {
    profileImage?: File;
};
