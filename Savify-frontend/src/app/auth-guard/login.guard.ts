import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export const loginAuthGuard: CanActivateFn = () => {
    const auth = inject(AuthService)
    const router = inject(Router)

    console.log("loginAuthGuard → isLoggedIn:", auth.isLoggedIn());

    if (auth.isLoggedIn()) {
        return router.parseUrl('/dashboard')
    }
    return true
}

export const authGuard: CanActivateFn = () => {
    const auth = inject(AuthService)
    const router = inject(Router)

    console.log("authGuard → isLoggedIn:", auth.isLoggedIn());

    if (!auth.isLoggedIn()) {
        return router.parseUrl('/login')
    }
    return true
}