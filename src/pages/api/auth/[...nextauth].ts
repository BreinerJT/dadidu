import NextAuth from 'next-auth';

import { authOptions } from '@/auth/server/auth';

export default NextAuth(authOptions);
