import { faker } from '@faker-js/faker';
import { connectDB, disconnectDB } from '../src/utils/db';
import { User } from '../src/models/User/users';
import { Profile } from '../src/models/Profile/profiles';
import { hashPassword } from '../src/utils/hashPassword';

const NUM_USERS = 10;

async function seedUsers() {
    try {
        await connectDB();

        for (let i = 0; i < NUM_USERS; i++) {
            const password = await hashPassword('Password123!');
            const role = i === 0 ? 'admin' : 'user';
            const user = await User.create({
                firstname: faker.person.firstName(),
                middlename: faker.person.middleName(),
                lastname: faker.person.lastName(),
                email: faker.internet.email(),
                password,
                role,
                isEmailVerified: true,
            });

            await Profile.create({
                userId: user._id,
                country: faker.location.country(),
                state: faker.location.state(),
                city: faker.location.city(),
                phone: faker.phone.number({ style: 'international' }),
                birthdate: faker.date.birthdate({
                    min: 18,
                    max: 65,
                    mode: 'age',
                }),
                profileImage: faker.image.avatar(),
            });

            console.log(`Seeded user: ${user.email}`);
        }

        console.log(`Successfully seeded ${NUM_USERS} users and profiles`);
    } catch (err) {
        console.error('Seeding error:', err);
    } finally {
        await disconnectDB();
    }
}

seedUsers();
