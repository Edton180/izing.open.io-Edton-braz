export interface ChannelCatalogItem {
  type: string;
  label: string;
  provider: string;
  isOfficial: boolean;
}

export const CHANNEL_CATALOG: ChannelCatalogItem[] = [
  {
    type: "whatsapp",
    label: "WhatsApp Web",
    provider: "Meta",
    isOfficial: false
  },
  {
    type: "waba",
    label: "WhatsApp Business API",
    provider: "Meta (BSP)",
    isOfficial: true
  },
  {
    type: "telegram",
    label: "Telegram",
    provider: "Telegram",
    isOfficial: true
  },
  {
    type: "instagram",
    label: "Instagram",
    provider: "Meta",
    isOfficial: true
  },
  {
    type: "messenger",
    label: "Facebook Messenger",
    provider: "Meta",
    isOfficial: true
  },
  {
    type: "hub_whatsapp",
    label: "Hub WhatsApp",
    provider: "Hub",
    isOfficial: true
  },
  {
    type: "hub_instagram",
    label: "Hub Instagram",
    provider: "Hub",
    isOfficial: true
  },
  {
    type: "hub_facebook",
    label: "Hub Facebook",
    provider: "Hub",
    isOfficial: true
  },
  {
    type: "con_instagram",
    label: "Connection Hub Instagram",
    provider: "Connection Hub",
    isOfficial: true
  },
  {
    type: "con_facebook",
    label: "Connection Hub Facebook",
    provider: "Connection Hub",
    isOfficial: true
  }
];

export const isSupportedChannelType = (type: string): boolean => {
  return CHANNEL_CATALOG.some(channel => channel.type === type);
};

