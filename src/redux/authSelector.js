import { createSelector } from "@reduxjs/toolkit";

export const getProfile = state => state.user

export const isAuthenticated = createSelector([getProfile], profile => {
    const authenticated = profile?.authenticated

    return authenticated
})

export const isAuthorized = createSelector([getProfile], profile => {
    const authorized = profile?.token?.claims?.superuser

    return authorized
})

export const isLoading = createSelector([getProfile], profile => {
    const loading = !profile?.isLoaded

    return loading
})

export const getAccessToken = createSelector([getProfile], auth => {
    const accessToken = auth?.stsTokenManager?.accessToken

    return accessToken
})