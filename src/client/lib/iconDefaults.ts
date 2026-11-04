import type { IconProps } from "@phosphor-icons/react";

/**
 * Phosphor icons are decorative by default, as Lucide's were: screen readers
 * skip them. An icon that carries meaning passes aria-hidden={false} with its
 * own label. Mounted through IconContext at each React root.
 */
export const ICON_DEFAULTS = { "aria-hidden": true } satisfies IconProps;
