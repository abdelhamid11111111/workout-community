const fs = require('fs');
function fixFile(file) {
  let content = fs.readFileSync(file, 'utf8');

  // Fix prismaMock
  content = content.replace(
    /const prismaMock = \{\s*user:\s*\{\s*findMany:\s*jest\.fn\(\),\s*\}\s*,?\s*\}\s*jest\.mock\('@\/lib\/prisma', \(\) => \(\{ prisma: prismaMock \}\)\)/g,
    `import { prisma } from '@/lib/prisma'\n\njest.mock('@/lib/prisma', () => ({\n  prisma: { user: { findMany: jest.fn() } },\n}))`
  );
  content = content.replace(/prismaMock/g, '(prisma as any)');

  // Fix authMock in home/page.test.tsx
  if (file.includes('home/page.test.tsx')) {
    content = content.replace(
      /const authMock = \{\s*api:\s*\{\s*getSession:\s*jest\.fn\(\),\s*\},\s*\}\s*/g,
      ''
    );
    content = content.replace(
      /jest\.mock\('@\/lib\/auth', \(\) => \(\{ auth: authMock \}\)\)/g,
      `import { auth } from '@/lib/auth'\n\njest.mock('@/lib/auth', () => ({\n  auth: { api: { getSession: jest.fn() } },\n}))`
    );
    content = content.replace(/authMock/g, '(auth as any)');
  }

  // Fix authClient mock in sign-in and admin/page.test.tsx
  if (file.includes('sign-in/page.test.tsx') || file.includes('admin/page.test.tsx')) {
    content = content.replace(/const signInEmail = jest\.fn\(\)\n?/, '');
    content = content.replace(/signIn:\s*\{\s*email:\s*signInEmail,?\s*\}/g, 'signIn: { email: jest.fn() }');
    if (file.includes('admin/page.test.tsx')) {
        content = content.replace(/const signOut = jest\.fn\(\)\n?/, '');
        content = content.replace(/signOut,?\n/g, 'signOut: jest.fn(),\n');
    }
    content = `import { authClient } from '@/lib/auth-client'\n` + content;
    content = content.replace(/signInEmail/g, '(authClient.signIn.email as jest.Mock)');
    content = content.replace(/signOut/g, '(authClient.signOut as jest.Mock)');
  }

  // Fix challenge/[title]/page.test.tsx
  if (file.includes('challenge/[title]/page.test.tsx')) {
    content = content.replace(/const push = jest\.fn\(\)\nconst back = jest\.fn\(\)\n/, '');
    content = content.replace(/useRouter:\s*\(\) => \(\{ push, back \}\),/g, 'useRouter: () => ({ push: jest.fn(), back: jest.fn() }),');
    content = content.replace(/expect\(push\)\.toHaveBeenCalledWith/g, "const { useRouter } = require('next/navigation');\n      expect((useRouter().push as jest.Mock)).toHaveBeenCalledWith");
    
    // Also remove the useSession var
    content = content.replace(/const session = \{ user: \{ id: 'u1' \} \}\nconst useSession = jest\.fn\(\)\.mockReturnValue\(\{ data: session \}\)\n/, '');
    content = content.replace(/useSession: useSession,/g, "useSession: jest.fn().mockReturnValue({ data: { user: { id: 'u1' } } }),");
  }

  fs.writeFileSync(file, content);
}

const files = [
  'app/challenge/[title]/page.test.tsx',
  'lib/queries/getUserSignups.test.ts',
  'lib/queries/getUserJoins.test.ts',
  'app/sign-in/page.test.tsx',
  'app/home/page.test.tsx',
  'app/admin/page.test.tsx'
];
files.forEach(fixFile);
