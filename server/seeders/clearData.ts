import { User } from '../src/models/User/users';
import { Profile } from '../src/models/Profile/profiles';
import { Token } from '../src/models/Token/tokens';
import { connectDB, disconnectDB } from '../src/utils/db';

async function clearDatabase() {
    try {
        await connectDB();

        await Promise.all([
            User.deleteMany({}),
            Profile.deleteMany({}),
            Token.deleteMany({}),
        ]);

        console.log(
            'All data deleted from User, Profile, and Token collections'
        );

        await disconnectDB();
    } catch (err) {
        console.error('Error clearing data:', err);
        process.exit(1);
    }
}

clearDatabase();
