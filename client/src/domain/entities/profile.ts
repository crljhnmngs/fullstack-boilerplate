export type Profile = {
    userId: string;
    country: string;
    state: string;
    city: string;
    phone: string;
    birthdate: Date;
    profileImage?: string;
};

export type ProfileWithoutUserId = Omit<Profile, 'userId' | 'profileImage'> & {
    profileImage?: File;
};
