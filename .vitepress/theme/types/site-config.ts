export type ButtonVariant = "filled" | "tonal" | "outlined" | "text";
export type ButtonSize = "small" | "medium" | "large";
export type StatTone = "primary" | "tertiary" | "surface";

export interface SocialLinkConfig {
  label: string;
  href: string;
  /** Material Symbols name, used by the about page and footer. */
  icon: string;
  /** Optional handle shown on the about page. */
  handle?: string;
  /** Optional Simple Icons name used by the VitePress navbar. */
  navIcon?: string;
}

export interface AuthorConfig {
  name: string;
  url?: string;
  email?: string;
}

export interface ProfileConfig {
  name: string;
  handle: string;
  role: string;
  avatar: string;
  bio: string;
  location?: string;
  skills: string[];
  cta: {
    label: string;
    href: string;
  };
}

export interface ButtonConfig {
  label: string;
  href: string;
  icon?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export interface HomeStatConfig {
  icon: string;
  /** Supports the `{postCount}` placeholder. */
  value: string;
  label: string;
  tone?: StatTone;
  /** When set, the card renders as a horizontal link card. */
  href?: string;
}

export interface HomeConfig {
  hero: {
    eyebrowIcon: string;
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    titleTail: string;
    description: string;
    actions: ButtonConfig[];
    asideLabel: string;
    stats: HomeStatConfig[];
  };
  latest: {
    eyebrow: string;
    title: string;
    limit: number;
    action: ButtonConfig;
    empty: string;
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    action: ButtonConfig;
  };
}

export interface FooterLinkConfig {
  label: string;
  href: string;
}

export interface FooterConfig {
  since: number;
  icp?: string;
  links: FooterLinkConfig[];
  socialsLabel: string;
  builtWith: string;
  copyrightSuffix: string;
}

export interface OneLinerQuote {
  text: string;
  from: string;
  fromWho?: string;
}

export interface OneLinerConfig {
  source: string;
  label: string;
  offlineLabel: string;
  refreshLabel: string;
  loadingLabel: string;
  fallback: OneLinerQuote;
}

export interface M3EConfig {
  authors: Record<string, AuthorConfig | string>;
  profile: ProfileConfig;
  socials: SocialLinkConfig[];
  home: HomeConfig;
  footer: FooterConfig;
  oneLiner: OneLinerConfig;
}

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends readonly (infer U)[]
    ? U[]
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};
