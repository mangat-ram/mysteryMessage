import { NextResponse,NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    '/signIn',
    '/signUp',
    '/',
    '/dashboard/:path*',
    '/verify/:path*'
  ],
}
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  const token = await getToken({req: request});
  const url = request.nextUrl;

  if(
    token && 
    (
      url.pathname.startsWith('/signIn') ||
      url.pathname.startsWith('/signUp') ||
      url.pathname.startsWith('/verify')  ||
      url.pathname.startsWith('/')
    )
  ){
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if(!token && url.pathname.startsWith('/dashboard')){
    return NextResponse.redirect(new URL('/signIn', request.url));
  }
  return NextResponse.next();
}
