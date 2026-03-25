/**
 * TODO: Update this component to use your client-side framework's link
 * component. We've provided examples of how to do this for Next.js, Remix, and
 * Inertia.js in the Catalyst documentation:
 *
 * https://catalyst.tailwindui.com/docs#client-side-router-integration
 */

import { Link as InertiaLink, InertiaLinkProps } from '@inertiajs/react'
import * as Headless from '@headlessui/react'
import React, { forwardRef } from 'react'

export const Link = forwardRef(function Link(
  props: InertiaLinkProps & React.ComponentPropsWithoutRef<'a'>,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  return (
    <Headless.DataInteractive>
      <InertiaLink {...props} ref={ref} />
    </Headless.DataInteractive>
  )
})
