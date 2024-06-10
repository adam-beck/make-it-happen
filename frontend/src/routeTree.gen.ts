/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as EventEventIdImport } from './routes/event.$eventId'

// Create Virtual Routes

const CreateLazyImport = createFileRoute('/create')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const CreateLazyRoute = CreateLazyImport.update({
  path: '/create',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/create.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const EventEventIdRoute = EventEventIdImport.update({
  path: '/event/$eventId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/create': {
      id: '/create'
      path: '/create'
      fullPath: '/create'
      preLoaderRoute: typeof CreateLazyImport
      parentRoute: typeof rootRoute
    }
    '/event/$eventId': {
      id: '/event/$eventId'
      path: '/event/$eventId'
      fullPath: '/event/$eventId'
      preLoaderRoute: typeof EventEventIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  CreateLazyRoute,
  EventEventIdRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/create",
        "/event/$eventId"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/create": {
      "filePath": "create.lazy.tsx"
    },
    "/event/$eventId": {
      "filePath": "event.$eventId.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
