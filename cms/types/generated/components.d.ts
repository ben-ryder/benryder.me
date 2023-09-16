import type { Schema, Attribute } from '@strapi/strapi';

export interface LinkLink extends Schema.Component {
  collectionName: 'components_link_links';
  info: {
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    url: Attribute.String & Attribute.Required;
    text: Attribute.String & Attribute.Required;
  };
}

export interface SocialSocialLink extends Schema.Component {
  collectionName: 'components_social_social_links';
  info: {
    displayName: 'Social Link';
    icon: 'user';
    description: '';
  };
  attributes: {
    text: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    icon: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface Components {
      'link.link': LinkLink;
      'social.social-link': SocialSocialLink;
    }
  }
}
